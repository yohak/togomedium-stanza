import { n as newStyled } from './emotion-styled.browser.esm-90764b6a.js';
import { c as COLOR_PRIMARY_DARK, C as COLOR_PRIMARY, d as COLOR_WHITE } from './StanzaReactProvider-13f58d86.js';

const ColWrapper = newStyled.div `
  display: flex;
  justify-content: space-between;
`;
const InfoId = newStyled.div `
  display: flex;
  span {
    font-weight: 300;
    font-size: 16px;
  }
  .tag-list {
    display: flex;
    margin-left: 20px;
    gap: 4px;
  }

  a {
    color: ${COLOR_PRIMARY_DARK};
  }
`;
const InfoTitle = newStyled.h1 `
  font-size: 40px;
  margin: 24px 0 16px;
  font-weight: 300;
  line-height: 0.9;
  small {
    font-size: 24px;
    margin-left: 10px;
  }
`;
const SubHeading = newStyled.h3 `
  font-weight: 600;
  margin-top: 24px;
  margin-bottom: 8px;
  font-size: 20px;
`;
const ColorButton = newStyled.a `
  background-color: ${COLOR_PRIMARY};
  color: ${COLOR_WHITE};
  padding: 4px 8px 2px;
  border-radius: 3px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
`;
const TagList = newStyled.div `
  display: flex;
  gap: 8px;
`;
const StandardParagraph = newStyled.p `
  font-size: 16px;
  font-weight: 300;
  span {
    font-weight: 300;
    font-size: 16px;
  }
`;

export { ColorButton as C, InfoId as I, StandardParagraph as S, TagList as T, InfoTitle as a, SubHeading as b, ColWrapper as c };
//# sourceMappingURL=styles-ad8b0922.js.map
