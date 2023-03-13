import { n as newStyled, C as COLOR_PRIMARY, f as COLOR_WHITE, h as COLOR_TEXT } from './EmotionCacheProvider-3b758372.js';
import { c as css } from './index-56cafe6b.js';

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
`;
const InfoTitle = newStyled.h1 `
  font-size: 40px;
  margin: 24px 0 16px;
  font-weight: 300;
  line-height: 0.9;
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

const stanzaWrapper = css `
  position: relative;
  font-size: 16px;
  //font-family: $web-font, sans-serif;
  padding: 16px;
  background-color: ${COLOR_WHITE};
  border-radius: 5px;
  font-weight: 300;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: ${COLOR_TEXT};
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
`;

export { ColorButton as C, InfoId as I, StandardParagraph as S, TagList as T, InfoTitle as a, SubHeading as b, ColWrapper as c, stanzaWrapper as s };
//# sourceMappingURL=common-b9bd53c8.js.map
