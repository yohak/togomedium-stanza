import * as d3 from "d3";
import { API_GROWTH_MEDIUM } from "../../utils/variables";
import Stanza from "togostanza/stanza";

type D3Selection = d3.Selection<any, any, any, any>;

// 'kegg_code - kegg_T_num' SPARQList via KEGG API
//  将来的にはTogoDB "http://dev.togodb.org/sparql/kegg_gold" を使う？
//  今はSPARQL endpointに不具合あり。遅い。
const TID_API: string = `${API_GROWTH_MEDIUM}gms_kegg_code_tid`;

export default class GmdbRoundtree extends Stanza<StanzaParameters> {
  async render() {
    const params = this.params;
    const [newicText, codeList] = await downloadData(params.newick, TID_API);
    const newicTree = parseNewic(newicText);
    const leafList = createLeafList(newicTree, codeList);

    this.renderTemplate({
      template: "stanza.html.hbs",
      parameters: {
        greeting: `Hello, ${params.newick}!`,
      },
    });

    renderD3(this, newicTree, codeList, leafList);
  }
}

const downloadData = async (newicUrl: string, tidApi: string): Promise<[string, any]> => {
  return Promise.all([
    fetch(newicUrl, { method: "get", mode: "cors" }).then((res) => res.text()),
    fetch(tidApi, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }).then((res) => res.json()),
  ]);
};

const parseNewic = (rawText: string): NewicObj => {
  let newick = rawText.replace(/\n/g, "");
  if (newick.match(/\):/)) {
    let array = newick.split(/\)/);
    let count = 1;
    for (let i = 0; i < array.length; i++) {
      if (array[i].match(/^:/)) {
        array[i] = "n" + count + array[i];
        count++;
      }
    }
    newick = array.join(")");
  }
  if (newick.match(/\);$/)) {
    newick = newick.replace(/^\(/, "").replace(/\);$/, "");
  }
  let stack = [];
  let child: any;
  let root: any = [];
  let nodeObj = root;

  let array = newick.split("").reverse();
  for (let i = 0; i < array.length; i++) {
    if (array[i] === ")") {
      stack.push(nodeObj);
      nodeObj = child.children = [];
    } else if (array[i] === "(") {
      nodeObj = stack.pop();
    } else if (array[i] === ",") {
      //
    } else {
      let string = "";
      for (let j = i; j < array.length; j++) {
        if (array[j] === "(" || array[j] === ")" || array[j] === ",") {
          i = j - 1;
          let element = string.split(":");
          let obj: any = {
            name: element[0],
            distance: element[1],
            type: "branch",
          };
          if (element[0].match("_")) {
            obj = {
              name: element[0].split("_")[1],
              distance: element[1],
              tag: element[0].split("_")[0],
              type: "leaf",
            };
          }
          nodeObj.push((child = obj));
          break;
        }
        string = array[j] + string;
      }
    }
  }

  return { name: "root", children: root };
};
const createLeafList = (newicObj: NewicObj, codeList: any): { [key: string]: string } => {
  const result: { [key: string]: string } = {};
  const process = (obj: NewicObj | NewicLeaf | NewicBranch) => {
    if ("children" in obj) {
      process(obj.children[0]);
      process(obj.children[1]);
    }
    if ("type" in obj && obj.type === "leaf") {
      const id = codeList[obj.name].tid;
      result[obj.name] = id;
    }
  };

  process(newicObj);

  return result;
};
const getChildrenIDs = (d: any, includeBranches: boolean = true): string[] => {
  const arr: any = [];
  const loopChildren = (c: any) => {
    c.children.forEach((child: any) => {
      if (child.children) {
        // console.log("has children", child);
        if (includeBranches) {
          arr.push(child.data.name);
        }
        loopChildren(child);
      } else {
        arr.push(child.data.name);
      }
    });
  };
  loopChildren(d);
  return arr;
};
const renderD3 = (
  stanza: Stanza,
  newicTree: NewicObj,
  codeList: any,
  leafList: { [key: string]: string }
) => {
  const div: HTMLDivElement = stanza.root.querySelector("#renderDiv");
  const d3Canvas = d3.select(div);
  const linkGenerator: any = d3
    .linkRadial()
    .angle((d: any) => {
      return ((d.x + 90) * Math.PI) / 180;
    })
    .radius((d: any) => {
      return d.y;
    });

  const onClickItem = (d: any) => {
    // console.log(d);
    const taxIds: string[] = (d.children ? getChildrenIDs(d, false) : [d.data.name]).map(
      (str) => leafList[str]
    );
    // console.log(taxIds);
    stanza.root.dispatchEvent(
      new CustomEvent("STANZA_ROUND_TREE_CLICK", {
        bubbles: true,
        composed: true,
        detail: {
          taxIds,
        },
      })
    );
  };

  type RenderResult = {
    svg: D3Selection;
    rePlot: () => void;
  };

  const renderCluster = (): RenderResult => {
    let treeShape = 0;
    const radius = 400;
    const svg = d3Canvas
      .append("svg")
      .attr("version", 1.1)
      .attr("xmlns", "http://www.w3.org/2000/svg")
      .attr("id", "roundtree")
      .attr("width", radius * 2)
      .attr("height", radius * 2);
    const popup = d3Canvas
      .append("div")
      .attr("id", "popup")
      .style("display", "none")
      .style("position", "absolute")
      .style("padding", "10px")
      .style("background-color", "rgba(255,255,255,0.75)")
      .style("border", "solid 2px #888888")
      .style("max-width", "300px");
    const g = svg.append("g").attr("transform", "translate(" + radius + "," + radius + ")");

    let hierarchyNode = d3.hierarchy(newicTree);
    const cluster = d3.cluster().size([360, radius - 80]); // cluster type
    const tree = d3
      .tree()
      .size([360, radius - 80])
      .separation((a, b) => {
        return (a.parent == b.parent ? 1 : 2) / a.depth;
      }); // tree type
    cluster(hierarchyNode);

    let link = g
      .selectAll(".edge")
      .data(hierarchyNode.links())
      .enter()
      .append("path")
      .attr("class", "edge")
      .attr("fill", "none")
      .attr("stroke", "#555")
      .attr("stroke-width", "1.5px")
      .attr("opacity", "0.6")
      .attr("d", linkGenerator);

    let node = g
      .selectAll(".node")
      .data(hierarchyNode.descendants())
      .enter()
      .append("g")
      .attr("class", (d: any) => {
        let type = "";
        if (d.data) {
          type = " " + d.data.tag + "Node";
        }
        return "node " + d.data.type + "Node" + type;
      })
      .attr("transform", (d: any) => {
        return "rotate(" + d.x + ")translate(" + d.y + ")";
      });

    node
      .append("circle")
      .attr("id", (d) => {
        return d.data.name;
      })
      .attr("r", 4.5);

    const rePlot = () => {
      hierarchyNode = d3.hierarchy(newicTree);
      if (treeShape == 0) {
        tree(hierarchyNode);
        treeShape = 1;
      } // tree type
      else {
        cluster(hierarchyNode);
        treeShape = 0;
      } // cluster type

      g.selectAll(".edge")
        .data(hierarchyNode.links())
        .transition()
        .delay(200)
        .duration(700)
        .attr("d", linkGenerator);
      g.selectAll(".node")
        .data(hierarchyNode.descendants())
        .transition()
        .delay(200)
        .duration(700)
        .attr("transform", function (d: any) {
          return "rotate(" + d.x + ")translate(" + d.y + ")";
        });
    };

    return { svg, rePlot };
  };
  const setLeafLabel = (svg: D3Selection) => {
    svg
      .selectAll(".leafNode")
      .append("text")
      .attr("dy", 3)
      .style("text-anchor", (d: any) => {
        return d.x < 90 || d.x > 270 ? "start" : "end";
      })
      .attr("transform", (d: any) => {
        return d.x < 90 || d.x > 270 ? "translate(8)" : "rotate(180)translate(-8)";
      })
      .text((d: any) => {
        return d.data.name;
      })
      .on("mouseover", (e: MouseEvent, d: any) => {
        d3Canvas
          .select("#popup")
          .style("left", e.offsetX + 10 + "px")
          .style("top", e.offsetY - 10 + "px")
          .style("display", "block")
          .text(codeList[d.data.name].label);
      })
      .on("mouseout", (e, d) => {
        d3Canvas.select("#popup").style("display", "none");
      });
  };
  const setBranchAction = (svg: D3Selection) => {
    svg
      .selectAll(".branchNode")
      .on("click", (e, d: any) => {
        onClickItem(d);
        svg.selectAll(".branchNode, .leafNode").selectAll("circle").classed("active", false);
        const activeIDs = getChildrenIDs(d);
        activeIDs.push(d.data.name);
        activeIDs.forEach((str) => {
          svg.select(`#${str}`).classed("active", true);
        });
        //
      })
      .on("mouseover", (e: MouseEvent, d: any) => {
        svg.select("#" + d.data.name).style("stroke", "#89ffff");
      })
      .on("mouseout", (e: MouseEvent, d: any) => {
        svg.select("#" + d.data.name).style("stroke", "");
      });
  };
  const setLeafAction = (svg: D3Selection) => {
    svg
      .selectAll(".leafNode")
      .on("click", (e, d: any) => {
        onClickItem(d);
        svg.selectAll(".branchNode, .leafNode").selectAll("circle").classed("active", false);
        svg.select(`#${d.data.name}`).classed("active", true);
        //
      })
      .on("mouseover", (e, d: any) => {
        svg.select("#" + d.data.name).style("stroke", "#89ffff");
      })
      .on("mouseout", (e, d: any) => {
        svg.select("#" + d.data.name).style("stroke", "");
      });
  };
  const appendBtn = (rePlot: () => void) => {
    let dlButtonDiv = d3Canvas.append("div").attr("id", "dl_button").style("text-align", "right");

    dlButtonDiv
      .append("input")
      .attr("class", "downloadButton")
      .attr("type", "button")
      .attr("value", "change tree shape")
      .on("click", () => {
        rePlot();
      });

    dlButtonDiv
      .append("input")
      .attr("class", "downloadButton")
      .attr("type", "button")
      .attr("value", "svg")
      .on("click", () => {
        downloadImg("svg");
      });

    dlButtonDiv
      .append("input")
      .attr("class", "downloadButton")
      .attr("type", "button")
      .attr("value", "png")
      .on("click", () => {
        downloadImg("png");
      });
  };
  const downloadImg = (format: string) => {
    let filename = "tree";
    const pngZoom = 2; // png resolution rate
    let url: string, img: HTMLImageElement, canvas: D3Selection, context: CanvasRenderingContext2D;

    const treeHTML = div.querySelector("#roundtree");

    const styleString = div.parentElement.querySelector("style").outerHTML.replace(/[\r\n]/g, "");
    const tmp = treeHTML.outerHTML.match(/^([^\>]+\>)(.+)$/);
    const sourceString = tmp[1] + styleString + tmp[2];
    const w = parseInt(d3.select(treeHTML).style("width"));
    const h = parseInt(d3.select(treeHTML).style("height"));

    // downloading function
    const aLinkClickDL = () => {
      if (format === "png") {
        context.drawImage(img, 0, 0, w, h, 0, 0, w * pngZoom, h * pngZoom);
        url = canvas.node().toDataURL("image/png");
      }

      const a = d3.select("body").append("a");
      a.attr("class", "downloadLink")
        .attr("download", filename)
        .attr("href", url)
        .text("test")
        .style("display", "none");

      a.node().click();

      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        if (format == "png") {
          canvas.remove();
        }
        a.remove();
      }, 10);
    };

    if (format === "svg") {
      // SVG
      filename += ".svg";
      let blobObject = new Blob([sourceString], {
        type: "data:image/svg+xml;base64",
      });
      url = window.URL.createObjectURL(blobObject);
      aLinkClickDL();
    } else if (format === "png") {
      // PNG
      filename += ".png";
      img = new Image();
      img.src = "data:image/svg+xml;utf8," + encodeURIComponent(sourceString);
      img.addEventListener("load", aLinkClickDL, false);

      canvas = d3
        .select("body")
        .append("canvas")
        .attr("width", w * pngZoom)
        .attr("height", h * pngZoom)
        .style("display", "none");
      context = canvas.node().getContext("2d");
    }
  };
  //
  //

  const { svg, rePlot } = renderCluster();
  setLeafLabel(svg);
  setBranchAction(svg);
  setLeafAction(svg);
  appendBtn(rePlot);
};

interface StanzaParameters {
  newick: string;
}

interface NewicBranch {
  name: string;
  distance: string;
  type: string;
  children: [NewicBranch, NewicBranch] | [NewicLeaf, NewicLeaf];
}

interface NewicLeaf {
  name: string;
  distance: string;
  tag: string;
  type: string;
  id: string;
}

interface NewicObj {
  name: "root";
  children: [NewicBranch, NewicBranch];
}
