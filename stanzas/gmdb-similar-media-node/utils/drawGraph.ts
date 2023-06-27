import { colord, extend } from "colord";
import mixPlugin from "colord/plugins/mix";
import * as d3 from "d3";
import { SimulationLinkDatum, SimulationNodeDatum } from "d3";
import { D3DragEvent } from "d3-drag";
import { GraphData } from "./useGraphData";
import { COLOR_ACCENT, COLOR_PRIMARY, COLOR_WHITE } from "../../../shared/styles/variables";

extend([mixPlugin]);

type NodeDatum = GraphData["nodes"][0] & SimulationNodeDatum & { isDragging?: boolean };
type LinkDatum = SimulationLinkDatum<NodeDatum> & { score: number };
type DragEvent = D3DragEvent<SVGCircleElement, NodeDatum, NodeDatum>;
type D3SimpleSelection<elm extends Element> = d3.Selection<elm, undefined, null, undefined>;

//make singleton class named GraphManager
class GraphManager {
  private static instance: GraphManager;
  static getInstance(wrapper: HTMLDivElement) {
    if (!GraphManager.instance) {
      GraphManager.instance = new GraphManager();
    }
    GraphManager.instance.init(wrapper);
    return GraphManager.instance;
  }
  private wrapper!: HTMLDivElement;
  private svg!: D3SimpleSelection<SVGSVGElement>;
  private nodeWrapper!: D3SimpleSelection<SVGGElement>;
  private linkWrapper!: D3SimpleSelection<SVGGElement>;
  private force!: d3.Simulation<NodeDatum, LinkDatum>;
  private nodesData: NodeDatum[] = [];
  private linksData: LinkDatum[] = [];

  private constructor() {
    GraphManager.instance = this;
  }

  public draw(data: GraphData) {
    const hasAllData = includesAllData(data, this.nodesData, this.linksData);
    if (!hasAllData) {
      this.nodesData = [];
      this.linksData = [];
    }
    this.redraw(data);
  }

  private init(wrapper: HTMLDivElement) {
    if (this.wrapper === wrapper) return;
    this.wrapper = wrapper;
    const width = this.wrapper.clientWidth;
    const height = this.wrapper.clientHeight;
    this.svg = d3
      .create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height].toString())
      .attr("style", "max-width: 100%; height: auto; height: intrinsic; display: block;");
    this.linkWrapper = this.svg.append("g").classed("links", true);
    this.nodeWrapper = this.svg.append("g").classed("nodes", true);
    this.force = d3
      .forceSimulation<NodeDatum, LinkDatum>()
      .force("charge", d3.forceManyBody().strength(-5))
      .force("collision", d3.forceCollide(8))
      .force("center", d3.forceCenter(0, 0));

    wrapper.appendChild(this.svg.node()!);
  }

  private redraw(data: GraphData) {
    const [nodesData, linksData] = parseNodeData(data, this.nodesData, this.linksData);
    this.nodesData = nodesData;
    this.linksData = linksData;
    const links = this.linkWrapper.selectAll("line").data(linksData);
    const newLinks = links
      .enter()
      .append("line")
      .style("opacity", 0)
      .attr("stroke-width", (d) => ((d.score - 50) / 50) * 2)
      .attr("stroke", (d) =>
        colord(COLOR_ACCENT)
          .mix(COLOR_WHITE, 1 - d.score / 100)
          .toHex()
      );
    newLinks.transition().duration(300).style("opacity", 1);
    links.exit().remove();

    //
    const nodes = this.nodeWrapper.selectAll("g").data(nodesData);
    const newNodes = nodes
      .enter()
      .append("g")
      .style("opacity", 0)
      .attr("transform", "scale(0.5)")
      .attr("data-id", (d) => d.id);
    nodes.exit().remove();
    newNodes.transition().duration(300).style("opacity", 1).attr("transform", "scale(1)");

    //circles
    newNodes
      .append("circle")
      .attr("r", 5)
      .attr("fill", setCircleColor(false))
      .attr("stroke", setCircleStroke(false))
      .attr("stroke-width", setCircleStrokeWidth(false))
      .style("cursor", "pointer")
      .call(this.drag());
    //
    // texts
    // newNodes
    //   .append("text")
    //   .attr("fill", (d) => (d.level === 0 ? "white" : "black"))
    //   .style("font-family", "sans-serif")
    //   .style("text-anchor", "middle")
    //   .style("font-size", "9")
    //   .style("alignment-baseline", "central")
    //   .style("pointer-events", "none")
    //   .style("user-select", "none")
    //   .text((d) => d.id);
    //
    this.nodeWrapper
      .selectAll("circle")
      .data(nodesData)
      .filter((d) => !d.isDragging)
      .attr("fill", setCircleColor(false))
      .attr("stroke", setCircleStroke(false));
    this.force = this.force
      .force(
        "link",
        d3.forceLink(linksData).strength((d) => d.score / 100)
      )
      .nodes(nodesData);
    // this.force.alphaTarget(0.3).restart();
    this.force.alphaTarget(0.001).restart();
    this.force.on("tick", this.tick.bind(this));
  }

  private tick() {
    const links = this.linkWrapper.selectAll("line").data(this.linksData);
    const nodes = this.nodeWrapper.selectAll("g").data(this.nodesData);
    links
      .attr("x1", (d) => (d.source as NodeDatum).x!)
      .attr("y1", (d) => (d.source as NodeDatum).y!)
      .attr("x2", (d) => (d.target as NodeDatum).x!)
      .attr("y2", (d) => (d.target as NodeDatum).y!);
    nodes
      .select("circle")
      .attr("cx", (d) => d.x!)
      .attr("cy", (d) => d.y!);
    nodes
      .select("text")
      .attr("x", (d) => d.x!)
      .attr("y", (d) => d.y!);
  }
  private drag() {
    return d3
      .drag<SVGCircleElement, NodeDatum>()
      .on("start", (e: DragEvent) => {
        console.log(e, e.target.subject());
        if (!e.active) this.force.alphaTarget(0.01).restart();
        e.subject.fx = e.subject.x;
        e.subject.fy = e.subject.y;
        this.changeColor(true, e.subject.id);
      })
      .on("drag", (e: DragEvent) => {
        e.subject.fx = e.x;
        e.subject.fy = e.y;
      })
      .on("end", (e: DragEvent) => {
        if (!e.active) this.force.alphaTarget(0.05);
        e.subject.fx = null;
        e.subject.fy = null;
        this.changeColor(false, e.subject.id);
      });
  }

  private changeColor(active: boolean, id: string) {
    const relatedLinkData = this.linksData.filter(
      (d) => (d.source as NodeDatum).id === id || (d.target as NodeDatum).id === id
    );
    const relatedNodeData = this.nodesData.filter((node) =>
      relatedLinkData.some((link) => link.source === node || link.target === node)
    );

    const nodes = this.nodeWrapper.selectAll("g").data(this.nodesData);
    nodes
      .filter((d) => relatedNodeData.includes(d))
      .select("circle")
      .transition()
      .duration((d) => {
        d.isDragging = active;
        return 200;
      })
      .attr("fill", setCircleColor(active))
      .attr("stroke", setCircleStroke(active))
      .attr("stroke-width", setCircleStrokeWidth(active));
  }
}

const setCircleColor = (active: boolean) => (d: NodeDatum) => {
  switch (true) {
    case d.status === "ready":
      return "#CCC";
    case d.status === "processing":
      return "white";
    default:
      return colord(COLOR_PRIMARY)
        .mix(COLOR_WHITE, Math.min(d.level * 0.2, 0.8))
        .toHex();
  }
};
const setCircleStroke = (active: boolean) => (d: NodeDatum) => {
  switch (true) {
    case active:
      return "red";
    case d.status === "processing":
      return COLOR_PRIMARY;
    // case !d.processed:
    //   return "#EEE";
    default:
      return "white";
  }
};

const setCircleStrokeWidth = (active: boolean) => (active ? 1.5 : 1);

const includesAllData = (
  data: GraphData,
  currentNodes: NodeDatum[],
  currentLinks: LinkDatum[]
): boolean =>
  currentNodes.every((node) => data.nodes.find((n) => n.id === node.id)) &&
  currentLinks.every(
    (link) =>
      data.links.find(
        (l) =>
          l.source === (link.source as NodeDatum).id && l.target === (link.target as NodeDatum).id
      ) !== undefined
  );

const parseNodeData = (
  data: GraphData,
  currentNodes: NodeDatum[],
  currentLinks: LinkDatum[]
): [NodeDatum[], LinkDatum[]] => {
  currentNodes.forEach(
    (node) => (node.status = data.nodes.find((n) => n.id === node.id)!.status || false)
  );
  const nodesData: NodeDatum[] = [
    ...currentNodes,
    ...data.nodes
      .map((node) => ({ ...node }))
      .filter((node) => !currentNodes.find((n) => n.id === node.id)),
  ];
  const linksData: LinkDatum[] = [
    ...currentLinks,
    ...data.links
      .map((link) => ({
        source: nodesData.find((node) => node.id === link.source)!,
        target: nodesData.find((node) => node.id === link.target)!,
        score: link.score,
      }))
      .filter(
        (link) => !currentLinks.find((l) => l.source === link.source && l.target === link.target)
      ),
  ];
  return [nodesData, linksData];
};

export const drawGraph = (wrapper: HTMLDivElement, data: GraphData) => {
  GraphManager.getInstance(wrapper).draw(data);
};
