import { css } from "@emotion/react";
import React, { FC } from "react";
import { AcceptsEmotion } from "yohak-tools";
import { ListApiBody } from "../types";

type Props = {
  data: ListApiBody;
  showColumnNames: boolean;
  columnSizes: number[];
} & AcceptsEmotion;

export const ListTable: FC<Props> = ({ css, className, data, columnSizes, showColumnNames }) => {
  return (
    <table>
      {showColumnNames && (
        <thead>
          <tr>
            {data.columns.map((column, index) => {
              const size = columnSizes[index];
              return (
                <th style={size ? { width: `${size}%` } : {}} key={column.key}>
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
            {data.columns.map((columns) => {
              const key = columns.key;
              const col = row[key];
              if (typeof col === "string") {
                return <td key={key}>{col}</td>;
              } else {
                return (
                  <td key={key}>
                    <a href={col.href} target={"_blank"} rel="noreferrer">
                      {col.label}
                    </a>
                  </td>
                );
              }
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const listTable = css``;
