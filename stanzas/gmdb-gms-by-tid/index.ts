import { getData } from "../../utils/get-data";
import * as d3 from "d3";
import { addClass } from "../../utils/dom";
import { API_GROWTH_MEDIUM } from "../../utils/variables";
import Stanza from "togostanza/stanza";

type D3Selection = d3.Selection<any, any, any, any>;

let mouseX = 0;
let mouseY = 0;
document.body.addEventListener("mousemove", function (e) {
  // console.log(e);
  mouseX = e.clientX;
  mouseY = e.clientY;
});

export default class GmdbGmsByTid extends Stanza<StanzaParameters> {
  async render() {
    const params = this.params;
    const apiName = "gms_by_kegg_tids_3";
    const result = await getData<ApiBody>(`${API_GROWTH_MEDIUM}${apiName}`, {
      t_id: params.t_id,
    });

    const { sorted_groups } = processData(result.body);
    this.renderTemplate<TemplateParameters>({ template: "stanza.html.hbs", parameters: {} });
    const wrapper = this.root.querySelector<HTMLElement>("#table_area");

    if (wrapper) {
      makeTable(wrapper, result.body!, sorted_groups);
    }
  }
}

const processData = (json: any) => {
  let group_count: any = {};
  let group_label: any = {};
  for (let gm of json.growth_media) {
    let groups = Object.keys(gm.components_group);
    for (let group of groups) {
      if (!group_count[group]) {
        group_count[group] = 0;
        group_label[group] = gm.components_group[group].label;
      }
      group_count[group]++;
    }
  }

  // sort component_group by component count
  let groups = Object.keys(group_count).map(function (group) {
    return { uri: group, count: group_count[group], label: group_label[group] };
  });
  let sorted_groups = groups.sort(function (a, b) {
    if (a.count > b.count) {
      return -1;
    }
    if (a.count < b.count) {
      return 1;
    }
    return 0;
  });

  // hash to list 'components_group'
  for (let gm of json.growth_media) {
    gm.components_group_list = [];
    for (let group of sorted_groups) {
      if (gm.components_group[group.uri]) {
        gm.components_group_list.push({
          elements: gm.components_group[group.uri].elements,
        });
      } else {
        gm.components_group_list.push({ elements: [] });
      }
    }
  }

  return { sorted_groups };
};

const makeTable = (div: HTMLElement, data: ApiBody, sorted_groups: any) => {
  let renderDiv: D3Selection = d3.select(div);
  let mainTable: D3Selection = renderDiv.append("table");
  let popup: D3Selection = renderDiv
    .append("div")
    .attr("id", "popup")
    .style("display", "none")
    .style("position", "fixed")
    .style("padding", "10px")
    .style("background-color", "rgba(255,255,255,0.75)")
    .style("border", "solid 2px #888888")
    .style("max-width", "300px")
    .style("z-index", 10);

  // thead
  let thead: D3Selection = mainTable.append("thead");
  let tr: D3Selection = thead.append("tr");
  tr.append("th").attr("class", "header").text("Medium");
  tr.append("th").attr("class", "header").text("Organisms");
  tr.append("th").attr("class", "header").attr("colspan", sorted_groups.length).text("Components");
  tr = thead.append("tr");
  tr.append("th");
  tr.append("th");
  tr.selectAll(".role_component")
    .data(sorted_groups)
    .enter()
    .append("th")
    .attr("class", "role_component")
    .append("a")
    .attr("href", function (d: any) {
      return "/component/" + d.uri.replace("http://purl.jp/bio/10/gmo/", "");
    })
    .append("div")
    .attr("class", "entypo-db-shape role_component_style")
    .on("mouseover", function (e, d: any) {
      renderDiv
        .select("#popup")
        .style("left", mouseX + 10 + "px")
        .style("top", mouseY - 10 + "px")
        .style("display", "block")
        .text(d.label);
    })
    .on("mouseout", function (d) {
      renderDiv.select("#popup").style("display", "none");
    });

  // tbody
  let tbody = mainTable.append("tbody");
  tr = tbody
    .selectAll(".organism_line")
    .data(data.growth_media)
    .enter()
    .append("tr")
    .attr("class", "organism_line");
  tr.append("td")
    .attr("class", "medium")
    .append("a")
    .attr("href", function (d: any) {
      return "/medium/" + d.uri.replace("http://purl.jp/bio/10/gm/", "");
    })
    .text(function (d: any) {
      return d.uri.replace("http://purl.jp/bio/10/gm/", "");
    })
    .on("mouseover", function (d) {
      renderDiv
        .select("#popup")
        .style("left", mouseX + 10 + "px")
        .style("top", mouseY - 10 + "px")
        .style("display", "block")
        .text(d.label);
    })
    .on("mouseout", function (d) {
      renderDiv.select("#popup").style("display", "none");
    });
  tr.append("td")
    .attr("class", "organism")
    .html(function (d: any) {
      return d.species.map((x: any) => x.tid).join("<br>");
    })
    .on("mouseover", function (d) {
      renderDiv
        .select("#popup")
        .style("left", mouseX + 10 + "px")
        .style("top", mouseY - 10 + "px")
        .style("display", "block")
        .html(d.species.map((x: any) => x.label).join("<br>"));
    })
    .on("mouseout", function (d) {
      renderDiv.select("#popup").style("display", "none");
    });

  let td = tr
    .selectAll(".component")
    .data(function (d: any) {
      return d.components_group_list;
    })
    .enter()
    .append("td")
    .attr("class", "component")
    .filter(function (d: any) {
      return d.elements[0];
    })
    .selectAll(".medium_list")
    .data(function (d: any) {
      return d.elements;
    })
    .enter()
    .append("a")
    .attr("class", "medium_list")
    .attr("href", function (d: any) {
      return "/component/" + d.component.uri.replace("http://purl.jp/bio/10/gmo/", "");
    })
    .append("div")
    .attr("class", "entypo-db-shape component_style")
    .on("mouseover", function (e, d: any) {
      renderDiv
        .select("#popup")
        .style("left", mouseX + 10 + "px")
        .style("top", mouseY - 10 + "px")
        .style("display", "block")
        .text(d.component.label);
    })
    .on("mouseout", function (d) {
      renderDiv.select("#popup").style("display", "none");
    });

  // tfoot
  let tfoot = mainTable.append("tfoot");
  tr = tfoot.append("tr");
  tr.append("td");
  tr.append("td");
  tr.selectAll(".component_label")
    .data(sorted_groups)
    .enter()
    .append("td")
    .attr("class", "component_label")
    .append("p")
    .text(function (d: any) {
      return d.label;
    });

  const subTable = makeSubTable(renderDiv, data);
  fitSubTableHeight(mainTable.node(), subTable.node()!);
  makeScrollable(renderDiv.node(), mainTable.node(), subTable.node()!);
};

const _makeSubTable = (data: ApiBody) => {
  const subTable: HTMLTableElement = document.createElement("table");
  addClass(subTable, "sub-table");
  //
  const thead: HTMLTableSectionElement = document.createElement("thead");
  subTable.append(thead);
  //
  const headRow: HTMLTableRowElement = document.createElement("tr");
  thead.append(headRow);
};

const makeSubTable = (renderDiv: D3Selection, data: ApiBody) => {
  const subTable = renderDiv.append("table");
  subTable.classed("sub-table", true);

  let thead = subTable.append("thead");
  let tr = thead.append("tr");
  tr.append("th").attr("class", "header").text("Medium");
  tr.append("th").attr("class", "header").text("Organisms");
  tr = thead.append("tr");
  tr.append("th");
  tr.append("th");

  // tbody
  let tbody = subTable.append("tbody");
  tr = tbody
    .selectAll(".organism_line")
    .data(data.growth_media)
    .enter()
    .append("tr")
    .attr("class", "organism_line");
  tr.append("td")
    .attr("class", "medium")
    .append("a")
    .attr("href", (d) => {
      return "/medium/" + d.uri.replace("http://purl.jp/bio/10/gm/", "");
    })
    .text((d) => {
      return d.uri.replace("http://purl.jp/bio/10/gm/", "");
    })
    .on("mouseover", (e, d) => {
      renderDiv
        .select("#popup")
        .style("left", mouseX + 10 + "px")
        .style("top", mouseY - 10 + "px")
        .style("display", "block")
        .text(d.label);
    })
    .on("mouseout", (e, d) => {
      renderDiv.select("#popup").style("display", "none");
    });
  tr.append("td")
    .attr("class", "organism")
    .html((d) => {
      return d.species.map((x: any) => x.tid).join("<br>");
    })
    .on("mouseover", (e, d: any) => {
      renderDiv
        .select("#popup")
        .style("left", mouseX + 10 + "px")
        .style("top", mouseY - 10 + "px")
        .style("display", "block")
        .html(d.species.map((x: any) => x.label).join("<br>"));
    })
    .on("mouseout", (d) => {
      renderDiv.select("#popup").style("display", "none");
    });

  let tfoot = subTable.append("tfoot");
  tr = tfoot.append("tr");
  tr.append("td");
  tr.append("td");

  return subTable;
};

const fitSubTableHeight = (main: HTMLElement, sub: HTMLElement) => {
  const header2Height = main
    .querySelector("thead tr:nth-child(2) th")!
    .getBoundingClientRect().height;
  sub.querySelector<HTMLTableHeaderCellElement>(
    "thead tr:nth-child(2) th"
  )!.style.height = `${header2Height}px`;
  const footerHeight = main.querySelector("tfoot td")!.getBoundingClientRect().height;
  sub.querySelector<HTMLTableDataCellElement>("tfoot td")!.style.height = `${footerHeight}px`;
  const mainBodyRows = main.querySelectorAll<HTMLTableRowElement>("tbody tr");
  const subBodyRows = sub.querySelectorAll<HTMLTableRowElement>("tbody tr");
  mainBodyRows.forEach((elm, i) => {
    const bound = elm.getBoundingClientRect();
    subBodyRows[i].style.width = `${bound.width}px`;
    subBodyRows[i].style.height = `${bound.height}px`;
  });
};

const makeScrollable = (wrapper: HTMLElement, main: HTMLElement, sub: HTMLElement) => {
  const scroller = document.createElement("div");
  scroller.classList.add("scroller");
  wrapper.prepend(scroller);
  scroller.append(main);

  wrapper.style.position = "relative";
  scroller.style.overflowX = "auto";
  sub.style.position = "absolute";
  sub.style.left = "0";
  sub.style.top = "0";
};

interface StanzaParameters {
  t_id: string;
}

interface TemplateParameters {}

interface ApiBody {
  growth_media: GrowthMedia[];
}

interface GrowthMedia {
  uri: string;
  label: string;
  species: Species[];
  components_group: {
    [key: string]: ComponentsGroup;
  };
}

interface ComponentsGroup {
  label: string;
  elements: {
    component: {
      uri: string;
      label: string;
    };
    role?: {
      uri: string;
      label: string;
    };
  }[];
}

interface Species {
  tid: string;
  label: string;
}
