import { css } from "@emotion/react";
import React, { ComponentProps, FC, useEffect, useState } from "react";
import { FooterRow } from "./FooterRow";
import { HeaderRow } from "./HeaderRow";
import { MediaRow } from "./MediaRow";
import { MediaAlignmentTableResponse } from "../../../api/media-alignment-table/types";
import { COLOR_GRAY_LINE } from "../../../components/styles";
import { makeComponentTree } from "../functions/makeComponentBranch";
import { makerFooterData } from "../functions/makerFooterData";
import { toggleFooterComponent } from "../functions/toggleFooterComponent";
import { useComponentTreeMutators, useComponentTreeState } from "../states/componentTree";
import { useIsMediaExpendedState } from "../states/isMediaExpanded";
import { useIsOrganismsExpendedState } from "../states/isOrganismsExpanded";
import { ComponentBranch, ComponentTree } from "../types";

type Props = { data: MediaAlignmentTableResponse };
type RowProps = Omit<ComponentProps<typeof MediaRow>, "isOrganismsExpanded" | "isMediaExpanded">[];
type FooterProps = ComponentProps<typeof FooterRow>["components"];

export const AlignmentTable: FC<Props> = ({ data }) => {
  const [rowProps, setRowProps] = useState<RowProps>([]);
  const componentTree = useComponentTreeState();
  const { setComponentTree } = useComponentTreeMutators();
  const [components, setComponents] = useState<FooterProps>([]);
  const isMediaExpanded = useIsMediaExpendedState();
  const isOrganismsExpanded = useIsOrganismsExpendedState();
  useEffect(() => {
    setComponentTree(makeComponentTree(data.components));
  }, [data]);
  useEffect(() => {
    setComponents(makerFooterData(componentTree).map((item) => ({ ...item })));
  }, [componentTree]);
  return (
    <div css={wrapper}>
      <HeaderRow {...{ isMediaExpanded, isOrganismsExpanded }} />
      {rowProps.map((props) => (
        <MediaRow {...{ ...props, isMediaExpanded, isOrganismsExpanded }} key={props.media.id} />
      ))}
      <FooterRow
        {...{
          components,
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
  background-color: ${COLOR_GRAY_LINE};
  padding: 1px;
`;
