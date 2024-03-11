import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { FC } from "react";
import { AcceptsEmotion } from "yohak-tools";
import { BottomController } from "./BottomController";
import { ListTable } from "./ListTable";
import { LoadingCover } from "./LoadingCover";
import { TopInfo } from "./TopInfo";
import { StanzaWrapper } from "../../../shared/components/StanzaWrapper";
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
  errorMessage: string;
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
  errorMessage,
}) => {
  return (
    <div css={[stanzaView, css]} className={className}>
      {title && (
        <Header>
          <h2>{title}</h2>
        </Header>
      )}
      <StanzaWrapper>
        <TopInfo {...{ total: data.total, limit, setLimit, setOffset }} />
        <div style={{ position: "relative" }}>
          <ListTable {...{ data, showColumnNames, columnSizes, limit }} />
          <LoadingCover {...{ isLoading, errorMessage }} />
        </div>
        <BottomController {...{ total: data.total, offset, limit, setOffset }} />
      </StanzaWrapper>
    </div>
  );
};

const stanzaView = css``;
const Header = styled.header`
  h2 {
    -webkit-font-smoothing: antialiased;
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 8px;
    padding-left: 8px;
  }
`;
