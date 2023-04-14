import { _ as __awaiter } from './stanza-33129828.js';
import { n as newStyled, b as COLOR_GRAY300, C as COLOR_PRIMARY, a as jsxs, j as jsx } from './StanzaReactProvider-5a1c35e0.js';

const fetchWikipediaData = (link) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const key = link.split("/").pop();
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${key}`;
    const res = yield fetch(url);
    const data = yield res.json();
    if (!data)
        return { link };
    return { thumb: (_a = data.thumbnail) === null || _a === void 0 ? void 0 : _a.source, description: data.extract, link };
});
const WikipediaView = ({ thumb, description, link }) => (jsxs(WikipediaInfo, { children: [jsxs("p", { children: [thumb && jsx("img", { src: thumb, alt: "" }), description] }), jsx("cite", { children: jsx("a", Object.assign({ href: link, target: "_blank", rel: "noreferrer" }, { children: "From Wikipedia" })) })] }));
const WikipediaInfo = newStyled.div `
  margin-top: 32px;
  width: 336px;
  border: 1px ${COLOR_GRAY300} dashed;
  padding: 8px;
  border-radius: 5px;
  height: fit-content;
  line-height: 1.3;
  cite {
    display: block;
    text-align: right;
    margin-top: 8px;
    a {
      color: ${COLOR_PRIMARY};
    }
  }
`;

export { WikipediaView as W, fetchWikipediaData as f };
//# sourceMappingURL=WikipediaView-b99d8779.js.map
