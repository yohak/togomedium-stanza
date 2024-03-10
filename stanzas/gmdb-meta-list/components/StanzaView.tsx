import { css } from "@emotion/react";
import React, { FC } from "react";
import { AcceptsEmotion } from "yohak-tools";
import { Controller } from "./Controller";
import { ListTable } from "./ListTable";
import { stanzaWrapper } from "../../../shared/styles/common";
import { ListApiBody } from "../types";
import { getPagination } from "../utils/getPagination";

type Props = {
  data: ListApiBody;
  title: string;
  showColumnNames: boolean;
  columnSizes: number[];
  offset: number;
  setOffset: (offset: number) => void;
  limit: number;
  setLimit: (limit: number) => void;
  isLoading: boolean;
} & AcceptsEmotion;

export type StanzaViewParams = Props;

export const StanzaView: FC<Props> = ({
  css,
  className,
  data,
  title,
  showColumnNames,
  columnSizes,
  offset,
  setOffset,
  limit,
  setLimit,
  isLoading,
}) => {
  return (
    <div css={[stanzaView, css]} className={className}>
      {title && (
        <header>
          <h2>{title}</h2>
        </header>
      )}
      <div css={stanzaWrapper}>
        <ListTable {...{ data, showColumnNames, columnSizes }} />
        <Controller {...{ total: data.total, offset, limit, setOffset, setLimit }} />
      </div>
    </div>
  );
};

const stanzaView = css``;
