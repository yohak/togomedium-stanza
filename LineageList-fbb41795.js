import { M as COLOR_GRAY_LINE, C as COLOR_PRIMARY, j as jsx, a as jsxs } from './StanzaReactProvider-36ae7cf4.js';
import { n as newStyled } from './emotion-styled.browser.esm-798c6504.js';
import { l as lineageRanks } from './types-8994330c.js';
import { c as capitalizeFirstLetter, m as makeSpeciesName } from './string-4de5f4fa.js';

const LineageList = ({ lineage }) => {
    return (jsx(LineageListWrapper, { children: lineageRanks
            .filter((rank) => !!lineage[rank] && lineage[rank].label !== "NA")
            .map((rank, index) => {
            const item = lineage[rank];
            return (jsx(LineageItem, { rank: rank, label: item.label, id: item.taxid.toString() }, index));
        }) }));
};
const LineageListWrapper = newStyled.ul `
  display: flex;
  gap: 8px;

  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid ${COLOR_GRAY_LINE};
    border-radius: 5px;

    span {
      width: 100%;
      text-align: center;
      border-bottom: 1px solid ${COLOR_GRAY_LINE};
      padding: 4px 8px;
      font-weight: 500;
    }

    a {
      padding: 4px 8px;
      color: ${COLOR_PRIMARY};
    }
  }
`;
const LineageItem = ({ rank, label, id }) => (jsxs("li", { children: [jsx("span", { children: capitalizeFirstLetter(rank) }), jsx("a", { href: `/taxon/${id}`, children: rank === "species" ? makeSpeciesName(label) : label })] }));
const parseLineage = (lineage) => lineage.reduce((accum, current) => {
    return current.label === "NA"
        ? Object.assign({}, accum) : Object.assign(Object.assign({}, accum), { [current.rank]: {
            taxid: current.taxid.toString(),
            label: current.label,
        } });
}, {});

export { LineageList as L, parseLineage as p };
//# sourceMappingURL=LineageList-fbb41795.js.map
