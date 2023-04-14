import styled from "@emotion/styled";
import React from "react";
import { COLOR_PRIMARY, COLOR_PRIMARY_DARK, COLOR_WHITE } from "../../styles/variables";

export const ColWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const InfoId = styled.div`
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

export const InfoTitle = styled.h1`
  font-size: 40px;
  margin: 24px 0 16px;
  font-weight: 300;
  line-height: 0.9;
  small {
    font-size: 24px;
    margin-left: 10px;
  }
`;

export const SubHeading = styled.h3`
  font-weight: 600;
  margin-top: 24px;
  margin-bottom: 8px;
  font-size: 20px;
`;

export const ColorButton = styled.a`
  background-color: ${COLOR_PRIMARY};
  color: ${COLOR_WHITE};
  padding: 4px 8px 2px;
  border-radius: 3px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
`;

export const TagList = styled.div`
  display: flex;
  gap: 8px;
`;

export const StandardParagraph = styled.p`
  font-size: 16px;
  font-weight: 300;
  span {
    font-weight: 300;
    font-size: 16px;
  }
`;
