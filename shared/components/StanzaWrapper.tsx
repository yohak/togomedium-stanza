import styled from "@emotion/styled";
import { COLOR_TEXT, COLOR_WHITE } from "../styles/variables";

export const StanzaWrapper = styled.div`
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
