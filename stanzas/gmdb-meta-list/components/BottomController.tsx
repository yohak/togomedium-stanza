import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Slider from "@mui/material/Slider";
import React, { FC, useEffect, useMemo, useState } from "react";
import { AcceptsEmotion } from "yohak-tools";
import { AngleLeftIcon } from "../../../shared/components/svg/AngleLeftIcon";
import { AngleRightIcon } from "../../../shared/components/svg/AngleRightIcon";
import { DoubleAngleLeftIcon } from "../../../shared/components/svg/DoubleAngleLeftIcon";
import { DoubleAngleRightIcon } from "../../../shared/components/svg/DoubleAngleRightIcon";
import { COLOR_GRAY500, COLOR_PRIMARY, COLOR_WHITE } from "../../../shared/styles/variables";
import { getPagination } from "../utils/getPagination";

type Props = {
  total: number;
  offset: number;
  limit: number;
  setOffset: (offset: number) => void;
} & AcceptsEmotion;

export const BottomController: FC<Props> = ({
  css,
  className,
  total,
  offset,
  limit,
  setOffset,
}) => {
  const totalPages = useMemo(() => Math.ceil(total / limit), [total, limit]);
  const currentPage = useMemo(() => Math.ceil(offset / limit) + 1, [offset, limit]);
  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;
  const [pagination, setPagination] = useState<number[]>([]);
  const [tempCurrentPage, setTempCurrentPage] = useState(currentPage);
  const changePage = (page: number) => {
    setOffset((page - 1) * limit);
  };
  const commitPageInput = (val: number) => {
    if (val <= 0 || isNaN(val)) {
      changePage(1);
    } else if (val >= totalPages) {
      changePage(totalPages);
    } else {
      changePage(val);
    }
  };
  useEffect(() => {
    setPagination(getPagination({ totalPages, currentPage: tempCurrentPage }));
  }, [totalPages, tempCurrentPage]);
  useEffect(() => {
    setPagination(getPagination({ totalPages, currentPage }));
  }, [totalPages, currentPage]);
  useEffect(() => {
    setTempCurrentPage(currentPage);
  }, [currentPage]);
  if (totalPages <= 1) return null;

  return (
    <div css={[controller, css]} className={className}>
      <Pagination>
        {!isFirst ? (
          <IconWrapper onClick={() => changePage(1)}>
            <DoubleAngleLeftIcon />
          </IconWrapper>
        ) : (
          <IconDummy />
        )}
        {!isFirst ? (
          <IconWrapper onClick={() => changePage(currentPage - 1)}>
            <AngleLeftIcon />
          </IconWrapper>
        ) : (
          <IconDummy />
        )}

        <PageNums>
          {pagination.map((p) => (
            <li
              key={p}
              onClick={() => {
                changePage(p);
              }}
              className={p === tempCurrentPage ? "active" : ""}
            >
              {p}
            </li>
          ))}
        </PageNums>
        {!isLast ? (
          <IconWrapper onClick={() => changePage(currentPage + 1)}>
            <AngleRightIcon />
          </IconWrapper>
        ) : (
          <IconDummy />
        )}
        {!isLast ? (
          <IconWrapper onClick={() => changePage(totalPages)}>
            <DoubleAngleRightIcon />
          </IconWrapper>
        ) : (
          <IconDummy />
        )}
      </Pagination>
      <Right>
        {totalPages > 5 && (
          <SliderWrapper>
            <Slider
              value={tempCurrentPage}
              min={1}
              max={totalPages}
              aria-label="Default"
              valueLabelDisplay="auto"
              onChange={(e, v) => {
                setTempCurrentPage(v as number);
              }}
              onChangeCommitted={(e, v) => {
                changePage(v as number);
              }}
            />
          </SliderWrapper>
        )}
        <Info>
          <span>Page</span>
          <CurrentPageInput
            type={"number"}
            value={tempCurrentPage}
            onChange={(e) => {
              setTempCurrentPage(parseInt(e.target.value));
            }}
            onBlur={() => {
              commitPageInput(tempCurrentPage);
            }}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                commitPageInput(tempCurrentPage);
              }
            }}
          />
          <span>of {totalPages}</span>
        </Info>
      </Right>
    </div>
  );
};

const controller = css`
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
`;

const CurrentPageInput = styled.input`
  width: 64px;
  display: inline-block;
  margin-inline: 8px;
  padding-inline: 4px;
`;

const Right = styled.div`
  display: flex;
  gap: 20px;
`;

const Info = styled.div`
  font-size: 14px;
  white-space: nowrap;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SliderWrapper = styled.div`
  width: 240px;
`;

const Pagination = styled.div`
  display: flex;
  height: 26px;
`;

const IconWrapper = styled.div`
  height: 24px;
  width: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  svg {
    fill: ${COLOR_GRAY500};
    height: 18px;
    width: auto;
  }
`;
const IconDummy = styled.div`
  height: 24px;
  width: 24px;
`;

const PageNums = styled.ul`
  background-color: ${COLOR_PRIMARY};
  width: fit-content;
  display: flex;
  padding: 1px;
  gap: 1px;
  li {
    background-color: ${COLOR_WHITE};
    font-size: 14px;
    min-width: 28px;
    height: 24px;
    padding-inline: 2px;
    box-sizing: border-box;
    line-height: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    user-select: none;
    &.active {
      background-color: ${COLOR_PRIMARY};
      color: ${COLOR_WHITE};
      font-weight: bold;
    }
  }
`;
