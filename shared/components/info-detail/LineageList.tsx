import styled from "@emotion/styled";
import React, { ComponentProps, FC } from "react";
import {
  LineageRank,
  lineageRanks,
} from "../../../stanzas/gmdb-media-strains-alignment-table/functions/types";
import { COLOR_GRAY_LINE, COLOR_PRIMARY } from "../../styles/variables";
import { capitalizeFirstLetter, makeSpeciesName } from "../../utils/string";

export type ApiLineage = {
  uri: string;
  taxid: number;
  label: string;
  rank: string;
}[];

export const LineageList: FC<{
  lineage: Partial<
    Record<
      LineageRank,
      {
        taxid: string | number;
        label: string;
      }
    >
  >;
}> = ({ lineage }) => {
  return (
    <LineageListWrapper>
      {lineageRanks
        .filter((rank) => !!lineage[rank])
        .map((rank, index) => {
          const item = lineage[rank]!;
          return (
            <LineageItem rank={rank} label={item.label} id={item.taxid.toString()} key={index} />
          );
        })}
    </LineageListWrapper>
  );
};

const LineageListWrapper = styled.ul`
  display: flex;
  gap: 8px;

  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid ${COLOR_GRAY_LINE};
    border-radius: 5px;

    span {
      width: 100%;
      text-align: center;
      border-bottom: 1px solid ${COLOR_GRAY_LINE};
      padding: 4px 8px;
      font-weight: 500;
    }

    a {
      padding: 4px 8px;
      color: ${COLOR_PRIMARY};
    }
  }
`;

const LineageItem: FC<{ rank: LineageRank; label: string; id: string }> = ({ rank, label, id }) => (
  <li>
    <span>{capitalizeFirstLetter(rank)}</span>
    <a href={`/taxon/${id}`}>{rank === "species" ? makeSpeciesName(label) : label}</a>
  </li>
);

export const parseLineage = (lineage: ApiLineage): ComponentProps<typeof LineageList>["lineage"] =>
  lineage.reduce((accum, current) => {
    return current.label === "NA"
      ? { ...accum }
      : {
          ...accum,
          [current.rank]: {
            taxid: current.taxid.toString(),
            label: current.label,
          },
        };
  }, {});
