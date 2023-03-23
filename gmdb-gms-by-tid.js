import { S as Stanza, _ as __awaiter, d as defineStanzaElement } from './stanza-bd712360.js';
import { s as select } from './transform-83917164.js';
import { g as getData } from './getData-c69eb59a.js';
import { U as URL_API } from './variables-4ec2e9c7.js';

let mouseX = 0;
let mouseY = 0;
document.body.addEventListener("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
});
class GmdbGmsByTid extends Stanza {
    render() {
        return __awaiter(this, void 0, void 0, function* () {
            const params = this.params;
            const apiName = "gms_by_kegg_tids_3";
            const result = yield getData(`${URL_API}${apiName}`, {
                t_id: params.t_id,
            });
            const { sorted_groups } = processData(result.body);
            this.renderTemplate({ template: "stanza.html.hbs", parameters: {} });
            const wrapper = this.root.querySelector("#table_area");
            if (wrapper) {
                makeTable(wrapper, result.body, sorted_groups);
            }
        });
    }
}
const processData = (json) => {
    const group_count = {};
    const group_label = {};
    for (const gm of json.growth_media) {
        const groups = Object.keys(gm.components_group);
        for (const group of groups) {
            if (!group_count[group]) {
                group_count[group] = 0;
                group_label[group] = gm.components_group[group].label;
            }
            group_count[group]++;
        }
    }
    const groups = Object.keys(group_count).map(function (group) {
        return { uri: group, count: group_count[group], label: group_label[group] };
    });
    const sorted_groups = groups.sort(function (a, b) {
        if (a.count > b.count) {
            return -1;
        }
        if (a.count < b.count) {
            return 1;
        }
        return 0;
    });
    for (const gm of json.growth_media) {
        gm.components_group_list = [];
        for (const group of sorted_groups) {
            if (gm.components_group[group.uri]) {
                gm.components_group_list.push({
                    elements: gm.components_group[group.uri].elements,
                });
            }
            else {
                gm.components_group_list.push({ elements: [] });
            }
        }
    }
    return { sorted_groups };
};
const makeTable = (div, data, sorted_groups) => {
    const renderDiv = select(div);
    const mainTable = renderDiv.append("table");
    renderDiv
        .append("div")
        .attr("id", "popup")
        .style("display", "none")
        .style("position", "fixed")
        .style("padding", "10px")
        .style("background-color", "rgba(255,255,255,0.75)")
        .style("border", "solid 2px #888888")
        .style("max-width", "300px")
        .style("z-index", 10);
    const thead = mainTable.append("thead");
    let tr = thead.append("tr");
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
        .attr("href", function (d) {
        return "/component/" + d.uri.replace("http://purl.jp/bio/10/gmo/", "");
    })
        .append("div")
        .attr("class", "entypo-db-shape role_component_style")
        .on("mouseover", function (e, d) {
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
    const tbody = mainTable.append("tbody");
    tr = tbody
        .selectAll(".organism_line")
        .data(data.growth_media)
        .enter()
        .append("tr")
        .attr("class", "organism_line");
    tr.append("td")
        .attr("class", "medium")
        .append("a")
        .attr("href", function (d) {
        return "/medium/" + d.uri.replace("http://purl.jp/bio/10/gm/", "");
    })
        .text(function (d) {
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
        .html(function (d) {
        return d.species.map((x) => x.tid).join("<br>");
    })
        .on("mouseover", function (d) {
        renderDiv
            .select("#popup")
            .style("left", mouseX + 10 + "px")
            .style("top", mouseY - 10 + "px")
            .style("display", "block")
            .html(d.species.map((x) => x.label).join("<br>"));
    })
        .on("mouseout", function (d) {
        renderDiv.select("#popup").style("display", "none");
    });
    tr
        .selectAll(".component")
        .data(function (d) {
        return d.components_group_list;
    })
        .enter()
        .append("td")
        .attr("class", "component")
        .filter(function (d) {
        return d.elements[0];
    })
        .selectAll(".medium_list")
        .data(function (d) {
        return d.elements;
    })
        .enter()
        .append("a")
        .attr("class", "medium_list")
        .attr("href", function (d) {
        return "/component/" + d.component.uri.replace("http://purl.jp/bio/10/gmo/", "");
    })
        .append("div")
        .attr("class", "entypo-db-shape component_style")
        .on("mouseover", function (e, d) {
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
    const tfoot = mainTable.append("tfoot");
    tr = tfoot.append("tr");
    tr.append("td");
    tr.append("td");
    tr.selectAll(".component_label")
        .data(sorted_groups)
        .enter()
        .append("td")
        .attr("class", "component_label")
        .append("p")
        .text(function (d) {
        return d.label;
    });
    const subTable = makeSubTable(renderDiv, data);
    fitSubTableHeight(mainTable.node(), subTable.node());
    makeScrollable(renderDiv.node(), mainTable.node(), subTable.node());
};
const makeSubTable = (renderDiv, data) => {
    const subTable = renderDiv.append("table");
    subTable.classed("sub-table", true);
    const thead = subTable.append("thead");
    let tr = thead.append("tr");
    tr.append("th").attr("class", "header").text("Medium");
    tr.append("th").attr("class", "header").text("Organisms");
    tr = thead.append("tr");
    tr.append("th");
    tr.append("th");
    const tbody = subTable.append("tbody");
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
        return d.species.map((x) => x.tid).join("<br>");
    })
        .on("mouseover", (e, d) => {
        renderDiv
            .select("#popup")
            .style("left", mouseX + 10 + "px")
            .style("top", mouseY - 10 + "px")
            .style("display", "block")
            .html(d.species.map((x) => x.label).join("<br>"));
    })
        .on("mouseout", (d) => {
        renderDiv.select("#popup").style("display", "none");
    });
    const tfoot = subTable.append("tfoot");
    tr = tfoot.append("tr");
    tr.append("td");
    tr.append("td");
    return subTable;
};
const fitSubTableHeight = (main, sub) => {
    const header2Height = main
        .querySelector("thead tr:nth-child(2) th")
        .getBoundingClientRect().height;
    sub.querySelector("thead tr:nth-child(2) th").style.height = `${header2Height}px`;
    const footerHeight = main.querySelector("tfoot td").getBoundingClientRect().height;
    sub.querySelector("tfoot td").style.height = `${footerHeight}px`;
    const mainBodyRows = main.querySelectorAll("tbody tr");
    const subBodyRows = sub.querySelectorAll("tbody tr");
    mainBodyRows.forEach((elm, i) => {
        const bound = elm.getBoundingClientRect();
        subBodyRows[i].style.width = `${bound.width}px`;
        subBodyRows[i].style.height = `${bound.height}px`;
    });
};
const makeScrollable = (wrapper, main, sub) => {
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

var stanzaModule = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': GmdbGmsByTid
});

var metadata = {
	"@context": {
	stanza: "http://togostanza.org/resource/stanza#"
},
	"@id": "gmdb-gms-by-tid",
	"stanza:label": "Gmdb gms by tid",
	"stanza:definition": "",
	"stanza:type": "Stanza",
	"stanza:display": "Table",
	"stanza:provider": "",
	"stanza:license": "MIT",
	"stanza:author": "Satoshi Onoda",
	"stanza:address": "satoshionoda@yohak.design",
	"stanza:contributor": [
],
	"stanza:created": "2021-02-22",
	"stanza:updated": "2021-02-22",
	"stanza:parameter": [
	{
		"stanza:key": "t_id",
		"stanza:example": "T00077,T00741,T03382,T03902,T02663,T03900,T00022,T02976,T05425",
		"stanza:description": "KEGG organism identifier",
		"stanza:required": true
	}
],
	"stanza:menu-placement": "none",
	"stanza:style": [
	{
		"stanza:key": "--greeting-color",
		"stanza:type": "color",
		"stanza:default": "#eb7900",
		"stanza:description": "text color of greeting"
	},
	{
		"stanza:key": "--greeting-align",
		"stanza:type": "single-choice",
		"stanza:choice": [
			"left",
			"center",
			"right"
		],
		"stanza:default": "center",
		"stanza:description": "text align of greeting"
	}
]
};

var templates = [
  ["stanza.html.hbs", {"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"wrapper\">\n  <div class=\"inner\">\n    <div id=\"table_area\"></div>\n  </div>\n</div>\n";
},"useData":true}]
];

const url = import.meta.url.replace(/\?.*$/, '');

defineStanzaElement({stanzaModule, metadata, templates, url});
//# sourceMappingURL=gmdb-gms-by-tid.js.map
