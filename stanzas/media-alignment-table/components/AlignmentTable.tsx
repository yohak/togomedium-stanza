import { css } from "@emotion/react";
import React, { ComponentProps, FC } from "react";
import { HeaderRow } from "./HeaderRow";
import { MediaRow } from "./MediaRow";
import { useIsMediaExpendedState } from "../states/isMediaExpanded";
import { useIsOrganismsExpendedState } from "../states/isOrganismsExpanded";

type Props = {};

export const AlignmentTable: FC<Props> = () => {
  const isMediaExpanded = useIsMediaExpendedState();
  const isOrganismsExpanded = useIsOrganismsExpendedState();
  return (
    <div css={wrapper}>
      <HeaderRow />
      <MediaRow {...{ ...rowProps, isMediaExpanded, isOrganismsExpanded }} />
    </div>
  );
};

const wrapper = css`
  display: flex;
  gap: 1px;
  flex-direction: column;
`;

const rowProps: ComponentProps<typeof MediaRow> = {
  isMediaExpanded: false,
  isOrganismsExpanded: false,
  media: { id: "HM_D00001a", label: "REACTIVATION WITH LIQUID MEDIUM 1" },
  organisms: [
    { id: "384676", label: "Pseudomonas entomophila L48" },
    { id: "643561", label: "Acidovorax avenae subsp. avenae ATCC 19860" },
  ],
  components: [
    {
      state: "available",
      id: "aaa",
      label: "hogehoge",
    },
    {
      state: "grouped",
      id: "bbb",
      label: "hogehoge",
    },
    {
      state: "none",
      id: "ccc",
      label: "hogehoge",
    },
  ],
};
