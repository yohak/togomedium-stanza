import { d as defineComponent, s as script$1, c as createBlock, w as withCtx, r as resolveComponent, o as openBlock, a as createElementBlock, F as Fragment, b as renderList, e as createBaseVNode, t as toDisplayString, f as createCommentVNode, g as createApp } from './Layout-ef4f7178.js';

var script = defineComponent({
  components: {
    Layout: script$1
  },

  props: ['allMetadata'],

  setup(props) {
    return props;
  }
});

const _hoisted_1 = /*#__PURE__*/createBaseVNode("h1", { class: "display-4" }, "List of Stanzas", -1 /* HOISTED */);
const _hoisted_2 = {
  key: 0,
  class: "list-group mt-3"
};
const _hoisted_3 = ["href"];
const _hoisted_4 = {
  key: 0,
  class: "small text-muted text-truncate mt-1 mb-0"
};
const _hoisted_5 = { key: 1 };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Layout = resolveComponent("Layout");

  return (openBlock(), createBlock(_component_Layout, null, {
    default: withCtx(() => [
      _hoisted_1,
      (_ctx.allMetadata.length > 0)
        ? (openBlock(), createElementBlock("div", _hoisted_2, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.allMetadata, (metadata) => {
              return (openBlock(), createElementBlock("a", {
                key: metadata['@id'],
                href: `./${metadata['@id']}.html`,
                class: "list-group-item list-group-item-action py-3"
              }, [
                createBaseVNode("div", null, toDisplayString(metadata['stanza:label']), 1 /* TEXT */),
                (metadata['stanza:definition'])
                  ? (openBlock(), createElementBlock("p", _hoisted_4, toDisplayString(metadata['stanza:definition']), 1 /* TEXT */))
                  : createCommentVNode("v-if", true)
              ], 8 /* PROPS */, _hoisted_3))
            }), 128 /* KEYED_FRAGMENT */))
          ]))
        : (openBlock(), createElementBlock("p", _hoisted_5, "No stanzas defined."))
    ]),
    _: 1 /* STABLE */
  }))
}

script.render = render;
script.__file = "node_modules/togostanza/src/components/Index.vue";

var allMetadata = [{"@context":{"stanza":"http://togostanza.org/resource/stanza#"},"@id":"gmdb-component-by-gmoid","stanza:label":"Gmdb component by gmoid","stanza:definition":"","stanza:type":"Stanza","stanza:display":"Text","stanza:provider":"","stanza:license":"MIT","stanza:author":"Satoshi Onoda","stanza:address":"satoshionoda@gmail.com","stanza:contributor":[],"stanza:created":"2021-03-07","stanza:updated":"2021-03-07","stanza:parameter":[{"stanza:key":"gmo_id","stanza:example":"GMO_001005","stanza:description":"","stanza:required":true}],"stanza:about-link-placement":"bottom-right","stanza:style":[{"stanza:key":"--greeting-color","stanza:type":"color","stanza:default":"#eb7900","stanza:description":"text color of greeting"},{"stanza:key":"--greeting-align","stanza:type":"single-choice","stanza:choice":["left","center","right"],"stanza:default":"center","stanza:description":"text align of greeting"}]},{"@context":{"stanza":"http://togostanza.org/resource/stanza#"},"@id":"gmdb-gms-by-tid","stanza:label":"Gmdb gms by tid","stanza:definition":"","stanza:type":"Stanza","stanza:display":"Table","stanza:provider":"","stanza:license":"MIT","stanza:author":"Satoshi Onoda","stanza:address":"satoshionoda@yohak.design","stanza:contributor":[],"stanza:created":"2021-02-22","stanza:updated":"2021-02-22","stanza:parameter":[{"stanza:key":"t_id","stanza:example":"T00077,T00741,T03382,T03902,T02663,T03900,T00022,T02976,T05425","stanza:description":"KEGG organism identifier","stanza:required":true}],"stanza:about-link-placement":"bottom-right","stanza:style":[{"stanza:key":"--greeting-color","stanza:type":"color","stanza:default":"#eb7900","stanza:description":"text color of greeting"},{"stanza:key":"--greeting-align","stanza:type":"single-choice","stanza:choice":["left","center","right"],"stanza:default":"center","stanza:description":"text align of greeting"}]},{"@context":{"stanza":"http://togostanza.org/resource/stanza#"},"@id":"gmdb-media-alignment-table","stanza:label":"Media Alignment Table","stanza:definition":"","stanza:license":"MIT","stanza:author":"Satoshi Onoda","stanza:contributor":[],"stanza:created":"2022-01-01","stanza:updated":"2022-01-01","stanza:parameter":[{"stanza:key":"gm_ids","stanza:type":"string","stanza:example":"HM_D00001a,HM_D00065","stanza:description":"","stanza:required":true}],"stanza:menu-placement":"none","stanza:style":[],"stanza:incomingEvent":[],"stanza:outgoingEvent":[]},{"@context":{"stanza":"http://togostanza.org/resource/stanza#"},"@id":"gmdb-media-finder","stanza:label":"Media Finder","stanza:definition":"","stanza:license":"MIT","stanza:author":"Satoshi Onoda","stanza:contributor":[],"stanza:created":"2022-01-01","stanza:updated":"2022-01-01","stanza:parameter":[],"stanza:menu-placement":"none","stanza:style":[],"stanza:incomingEvent":[],"stanza:outgoingEvent":[]},{"@context":{"stanza":"http://togostanza.org/resource/stanza#"},"@id":"gmdb-medium-by-gmid","stanza:label":"Gmdb Medium By Gmid","stanza:definition":"","stanza:type":"Stanza","stanza:display":"Table","stanza:provider":"","stanza:license":"MIT","stanza:author":"Satoshi Onoda","stanza:address":"satoshionoda@gmail.com","stanza:contributor":[],"stanza:created":"2021-03-05","stanza:updated":"2021-03-05","stanza:parameter":[{"stanza:key":"gm_id","stanza:example":"NBRC_M249","stanza:description":"","stanza:required":true}],"stanza:about-link-placement":"bottom-right","stanza:style":[{"stanza:key":"--greeting-color","stanza:type":"color","stanza:default":"#eb7900","stanza:description":"text color of greeting"},{"stanza:key":"--greeting-align","stanza:type":"single-choice","stanza:choice":["left","center","right"],"stanza:default":"center","stanza:description":"text align of greeting"}]},{"@context":{"stanza":"http://togostanza.org/resource/stanza#"},"@id":"gmdb-meta-list","stanza:label":"GMDB meta list","stanza:definition":"","stanza:type":"Stanza","stanza:display":"Table","stanza:provider":"","stanza:license":"MIT","stanza:author":"Satoshi Onoda","stanza:address":"satoshionoda@yohak.design","stanza:contributor":[],"stanza:created":"2021-02-19","stanza:updated":"2021-02-19","stanza:parameter":[{"stanza:key":"api_url","stanza:example":"http://growthmedium.org/sparqlist/api/gmdb_list_media_by_keyword?keyword=MEDIUM","stanza:description":"URL of the SPARQList API with queries","stanza:required":true},{"stanza:key":"limit","stanza:example":"10","stanza:description":"limit","stanza:required":true},{"stanza:key":"title","stanza:example":"Media of Glucose","stanza:description":"title","stanza:required":false},{"stanza:key":"column_names","stanza:example":"true","stanza:description":"whether display column names","stanza:required":true},{"stanza:key":"column_sizes","stanza:example":"30,70","stanza:description":"column sizes from left. should be separated with comma","stanza:required":false},{"stanza:key":"web_font","stanza:example":"Fira Sans Condensed","stanza:description":"google font name","stanza:required":false}],"stanza:about-link-placement":"bottom-right","stanza:style":[{"stanza:key":"--link-color","stanza:type":"color","stanza:default":"#6FA80C","stanza:description":"text color of greeting"},{"stanza:key":"--web-font","stanza:type":"string","stanza:default":"Fira Sans Condensed","stanza:description":"google font name"}]},{"@context":{"stanza":"http://togostanza.org/resource/stanza#"},"@id":"gmdb-organism-by-taxid","stanza:label":"Gmdb organism by taxid","stanza:definition":"","stanza:type":"Stanza","stanza:display":"Table","stanza:provider":"","stanza:license":"MIT","stanza:author":"Satoshi Onoda","stanza:address":"satoshionoda@gmail.com","stanza:contributor":[],"stanza:created":"2021-03-06","stanza:updated":"2021-03-06","stanza:parameter":[{"stanza:key":"tax_id","stanza:example":"315405","stanza:description":"","stanza:required":true}],"stanza:about-link-placement":"bottom-right","stanza:style":[{"stanza:key":"--greeting-color","stanza:type":"color","stanza:default":"#eb7900","stanza:description":"text color of greeting"},{"stanza:key":"--greeting-align","stanza:type":"single-choice","stanza:choice":["left","center","right"],"stanza:default":"center","stanza:description":"text align of greeting"}]},{"@context":{"stanza":"http://togostanza.org/resource/stanza#"},"@id":"gmdb-phenotype-info","stanza:label":"Gmdb phenotype info","stanza:definition":"","stanza:type":"Stanza","stanza:display":"Table","stanza:provider":"","stanza:license":"MIT","stanza:author":"Satoshi Onoda","stanza:address":"satoshionoda@gmail.com","stanza:contributor":[],"stanza:created":"2021-03-07","stanza:updated":"2021-03-07","stanza:parameter":[{"stanza:key":"tax_id","stanza:example":"1254","stanza:description":"","stanza:required":true}],"stanza:about-link-placement":"bottom-right","stanza:style":[{"stanza:key":"--greeting-color","stanza:type":"color","stanza:default":"#eb7900","stanza:description":"text color of greeting"},{"stanza:key":"--greeting-align","stanza:type":"single-choice","stanza:choice":["left","center","right"],"stanza:default":"center","stanza:description":"text align of greeting"}]},{"@context":{"stanza":"http://togostanza.org/resource/stanza#"},"@id":"gmdb-roundtree","stanza:label":"Gmdb roundtree","stanza:definition":"","stanza:type":"Stanza","stanza:display":"Graph","stanza:provider":"","stanza:license":"MIT","stanza:author":"Satoshi Onoda","stanza:address":"satoshionoda@gmail.com","stanza:contributor":[],"stanza:created":"2021-02-20","stanza:updated":"2021-02-20","stanza:parameter":[{"stanza:key":"newick","stanza:example":"http://keggoc-rdf.dbcls.jp/tmp/phylo2.newick","stanza:description":"newick tree format","stanza:required":true}],"stanza:about-link-placement":"bottom-right","stanza:style":[{"stanza:key":"--greeting-color","stanza:type":"color","stanza:default":"#eb7900","stanza:description":"text color of greeting"},{"stanza:key":"--greeting-align","stanza:type":"single-choice","stanza:choice":["left","center","right"],"stanza:default":"center","stanza:description":"text align of greeting"}]},{"@context":{"stanza":"http://togostanza.org/resource/stanza#"},"@id":"gmdb-taxon-by-taxid","stanza:label":"Gmdb taxon by taxid","stanza:definition":"","stanza:type":"Stanza","stanza:display":"Table","stanza:provider":"","stanza:license":"MIT","stanza:author":"Satoshi Onoda","stanza:address":"satoshionoda@gmail.com","stanza:contributor":[],"stanza:created":"2021-03-07","stanza:updated":"2021-03-07","stanza:parameter":[{"stanza:key":"tax_id","stanza:example":"1678","stanza:description":"","stanza:required":true}],"stanza:about-link-placement":"bottom-right","stanza:style":[{"stanza:key":"--greeting-color","stanza:type":"color","stanza:default":"#eb7900","stanza:description":"text color of greeting"},{"stanza:key":"--greeting-align","stanza:type":"single-choice","stanza:choice":["left","center","right"],"stanza:default":"center","stanza:description":"text align of greeting"}]},{"@context":{"stanza":"http://togostanza.org/resource/stanza#"},"@id":"hello-react","stanza:label":"Hello react","stanza:definition":"","stanza:license":"MIT","stanza:author":"Yoji Shidara","stanza:contributor":[],"stanza:created":"2021-10-11","stanza:updated":"2021-10-11","stanza:parameter":[{"stanza:key":"say-to","stanza:type":"string","stanza:example":"world","stanza:description":"who to say hello to","stanza:required":false}],"stanza:menu-placement":"bottom-right","stanza:style":[{"stanza:key":"--greeting-color","stanza:type":"color","stanza:default":"#eb7900","stanza:description":"text color of greeting"},{"stanza:key":"--greeting-align","stanza:type":"single-choice","stanza:choice":["left","center","right"],"stanza:default":"center","stanza:description":"text align of greeting"}],"stanza:incomingEvent":[],"stanza:outgoingEvent":[]}];

createApp(script, {allMetadata}).mount('body');
//# sourceMappingURL=index-app.js.map
