import { css } from "@emotion/react";
import React, { FC } from "react";
import { AcceptsEmotion } from "yohak-tools";
import { COLOR_GRAY_LINE, COLOR_PRIMARY_DARK } from "../../../shared/styles/variables";
import { decodeHTMLEntities } from "../../../shared/utils/string";

type Props = {
  index: number;
  name: string;
  referenceId?: string;
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

export const RecipeTable: FC<Props> = ({ css, className, name, items, referenceId }) => {
  return (
    <div css={[recipeTable, css]} className={className}>
      <div css={titleWrapper}>
        <h4 css={titleStyle}>{name}</h4>
        {referenceId && (
          <span>
            (See also <a href={`/medium/${referenceId}`}>{referenceId}</a>)
          </span>
        )}
      </div>
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
                  <a href={`/component/${item.id}`} target={"_blank"} rel="noreferrer">
                    {item.id}
                  </a>
                </td>
                <td className="name">{decodeHTMLEntities(item.componentLabel)}</td>
                <td className="name">
                  <span>{item.componentName.replace(/\(see.*\)/, "(see below)")}</span>
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

const titleWrapper = css`
  margin-top: 16px;
  display: flex;
  gap: 16px;
  span {
    padding-top: 2px;
  }
  a {
    color: ${COLOR_PRIMARY_DARK};
  }
`;

const titleStyle = css`
  font-size: 18px;
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
