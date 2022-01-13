import { css } from "@emotion/react";
import React, { ComponentProps, FC, useEffect, useState } from "react";
import { FooterRow } from "./FooterRow";
import { HeaderRow } from "./HeaderRow";
import { MediaRow } from "./MediaRow";
import { MediaAlignmentTableResponse } from "../../../api/media-alignment-table/types";
import { makeComponentTree } from "../functions/makeComponentBranch.spec";
import { useIsMediaExpendedState } from "../states/isMediaExpanded";
import { useIsOrganismsExpendedState } from "../states/isOrganismsExpanded";
import { ComponentBranch, ComponentTree } from "../types";

type Props = { data: MediaAlignmentTableResponse };

export const AlignmentTable: FC<Props> = ({ data }) => {
  const [rowProps, setRowProps] = useState<
    Omit<ComponentProps<typeof MediaRow>, "isOrganismsExpanded" | "isMediaExpanded">[]
  >([]);
  const [componentTree, setComponentTree] = useState<ComponentTree>([]);
  const [components, setComponents] = useState([]);

  const isMediaExpanded = useIsMediaExpendedState();
  const isOrganismsExpanded = useIsOrganismsExpendedState();
  const onClickFooterItem = (id: string) => {
    console.log(id);
  };
  useEffect(() => {
    setComponentTree(makeComponentTree(data));
  }, [data]);
  return (
    <div css={wrapper}>
      <HeaderRow {...{ isMediaExpanded, isOrganismsExpanded }} />
      {rowProps.map((props) => (
        <MediaRow {...{ ...props, isMediaExpanded, isOrganismsExpanded }} key={props.media.id} />
      ))}
      <FooterRow
        {...{
          components: [
            {
              onClickFooterItem,
              label: "DistilledWater",
              id: "this is id 1",
              isOpen: false,
              level: 0,
              hasChildren: false,
            },
            {
              onClickFooterItem,
              label: "Ager",
              id: "this is id 2",
              isOpen: false,
              level: 0,
              hasChildren: false,
            },
            {
              onClickFooterItem,
              label: "Extract",
              id: "this is id 3",
              isOpen: false,
              level: 0,
              hasChildren: false,
            },
          ],
          isMediaExpanded,
          isOrganismsExpanded,
        }}
      />
    </div>
  );
};

const wrapper = css`
  display: flex;
  gap: 1px;
  flex-direction: column;
`;

// const rowProps: ComponentProps<typeof MediaRow> = {
//   isMediaExpanded: false,
//   isOrganismsExpanded: false,
//   media: { id: "HM_D00001a", label: "REACTIVATION WITH LIQUID MEDIUM 1" },
//   organisms: [
//     { id: "384676", label: "Pseudomonas entomophila L48" },
//     { id: "643561", label: "Acidovorax avenae subsp. avenae ATCC 19860" },
//   ],
//   components: [
//     {
//       state: "available",
//       id: "aaa",
//       label: "hogehoge",
//     },
//     {
//       state: "grouped",
//       id: "bbb",
//       label: "hogehoge",
//     },
//     {
//       state: "none",
//       id: "ccc",
//       label: "hogehoge",
//     },
//   ],
// };
