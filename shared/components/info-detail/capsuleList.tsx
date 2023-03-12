import styled from "@emotion/styled";
import React, { FC } from "react";
import { COLOR_PRIMARY } from "../../styles/variables";

export const CapsuleList: FC<{ labels: string[] }> = ({ labels }) => (
  <CapsuleListWrapper>
    {labels.map((label, index) => (
      <li key={index}>{label}</li>
    ))}
  </CapsuleListWrapper>
);

const CapsuleListWrapper = styled.ul`
  display: flex;
  margin-top: 8px;
  margin-bottom: -8px;
  flex-wrap: wrap;

  li {
    border: 1px solid ${COLOR_PRIMARY};
    padding: 5px 10px;
    border-radius: 20px;
    margin-right: 8px;
    margin-bottom: 8px;
  }
`;
