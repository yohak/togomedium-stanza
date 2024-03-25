import { css } from "@emotion/react";
import { nanoid } from "nanoid";
import React, { FC } from "react";
import { AcceptsEmotion } from "yohak-tools";
import { COLOR_PRIMARY_DARK } from "../../../shared/styles/variables";
import { decodeHTMLEntities } from "../../../shared/utils/string";
import { ListApiBody } from "../types";

type Props = {
  data: ListApiBody;
  showColumnNames: boolean;
  columnSizes: number[];
  limit: number;
} & AcceptsEmotion;

export const ListTable: FC<Props> = ({
  css,
  className,
  data,
  columnSizes,
  showColumnNames,
  limit,
}) => {
  const extraRows = Array(Math.max(0, limit - data.contents.length))
    .fill(null)
    .map(() => nanoid());
  return (
    <table css={[listTable, css]} className={className}>
      {showColumnNames && (
        <thead>
          <tr>
            {data.columns.map((column, index) => {
              const size = columnSizes[index];
              const isSizeEnabled = !!size && data.columns.length === columnSizes.length;
              return (
                <th style={isSizeEnabled ? { width: `${size}%` } : {}} key={column.key}>
                  {column.label}
                </th>
              );
            })}
          </tr>
        </thead>
      )}
      <tbody>
        {data.contents.map((row, i) => (
          <tr key={i}>
            {data.columns.map((column) => {
              const key = column.key;
              const item = row[key];
              const noWrap: boolean = !!column.nowrap;
              return (
                <td key={key} style={noWrap ? { whiteSpace: "nowrap" } : {}}>
                  <CellContent item={item} />
                </td>
              );
            })}
          </tr>
        ))}
        {extraRows.map((rowId) => (
          <tr key={rowId}>
            {data.columns.map((column) => {
              const key = column.key;
              return <td key={key}>-</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

type CellContentProps = { item: ListApiBody["contents"][0][0] };
const CellContent: FC<CellContentProps> = ({ item }) => {
  if (typeof item === "string") {
    return <>{decodeHTMLEntities(item)}</>;
  }
  if (typeof item === "number") {
    return <>{item}</>;
  }
  return (
    <a href={item.href} target={"_blank"} rel="noreferrer">
      {decodeHTMLEntities(item.label)}
    </a>
  );
};

const listTable = css`
  border: 1px solid #ccc;
  width: 100%;
  font-size: 16px;
  border-collapse: collapse;

  td,
  th {
    padding: 6px 8px;
    border-bottom: 1px solid #ccc;
    text-align: left;
    line-height: 1.2;
  }

  tr:nth-of-type(2n) {
    background-color: #f6f6f6;
  }

  a {
    color: ${COLOR_PRIMARY_DARK};
    text-decoration: none;
  }
`;
