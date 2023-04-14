import { css } from "@emotion/react";
import React, { FC } from "react";
import { AcceptsEmotion } from "yohak-tools";
import { COLOR_GRAY_LINE, COLOR_PRIMARY_DARK } from "../../../shared/styles/variables";

type Props = {
  index: number;
  name: string;
  items: {
    id: string;
    referenceMediaId: string;
    componentName: string;
    componentLabel: string;
    concValue: string;
    concUnit: string;
    volume: string;
    unit: string;
  }[];
} & AcceptsEmotion;

export const RecipeTable: FC<Props> = ({ css, className, name, items }) => {
  return (
    <div css={[recipeTable, css]} className={className}>
      <h4 css={titleStyle}>{name}</h4>
      <table css={tableStyle}>
        <thead>
          <tr>
            <th className="id">GMO ID</th>
            <th className="name">Component</th>
            <th className="name">Original label</th>
            <th className="volume">&nbsp;</th>
            <th className="volume">Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => {
            return (
              <tr key={index}>
                <td className="id">
                  <a href={`/component/${item.id}`}>{item.id}</a>
                </td>
                <td className="name">{item.componentLabel}</td>
                <td className="name">
                  {item.referenceMediaId ? (
                    <a href={`/media/${item.referenceMediaId}`}>{item.componentName}</a>
                  ) : (
                    <span>{item.componentName}</span>
                  )}
                </td>
                <td className="volume">
                  <span>{item.concValue}</span>
                  <span>{item.concUnit}</span>
                </td>
                <td className="volume">
                  <span>{item.volume}</span>
                  <span>{item.unit}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const recipeTable = css``;

const titleStyle = css`
  font-size: 18px;
  margin-top: 16px;
`;

const tableStyle = css`
  width: 100%;
  border-collapse: collapse;
  margin: 4px 0 16px;
  border: 1px solid ${COLOR_GRAY_LINE};
  a {
    color: ${COLOR_PRIMARY_DARK};
  }
  th,
  td {
    border: 1px solid ${COLOR_GRAY_LINE};
    padding: 8px;
    text-align: left;
  }
  tbody {
    tr:nth-of-type(odd) {
      background-color: #f2f2f2;
    }
  }
  .id {
    width: 10%;
    white-space: nowrap;
  }
  .name {
    width: 35%;
  }
  .volume {
    width: 10%;
    white-space: nowrap;
    span {
      display: inline-block;
      &:first-of-type {
        width: 60%;
        text-align: right;
        box-sizing: border-box;
        padding-right: 4px;
      }
      &:last-of-type {
        width: 40%;
      }
    }
  }
`;
