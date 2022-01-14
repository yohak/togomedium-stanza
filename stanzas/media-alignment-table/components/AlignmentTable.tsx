import { css } from "@emotion/react";
import React, { ComponentProps, FC, useEffect, useState } from "react";
import { FooterRow } from "./FooterRow";
import { HeaderRow } from "./HeaderRow";
import { MediaRow } from "./MediaRow";
import { MediaAlignmentTableResponse } from "../../../api/media-alignment-table/types";
import { COLOR_GRAY_LINE } from "../../../components/styles";
import { makeComponentTree } from "../functions/makeComponentBranch";
import { makeFooterData } from "../functions/makeFooterData";
import { useComponentTreeMutators, useComponentTreeState } from "../states/componentTree";

type Props = { data: MediaAlignmentTableResponse };
type RowProps = Omit<ComponentProps<typeof MediaRow>, "isOrganismsExpanded" | "isMediaExpanded">[];
type FooterProps = ComponentProps<typeof FooterRow>["components"];

export const AlignmentTable: FC<Props> = ({ data }) => {
  const [rowProps, setRowProps] = useState<RowProps>([]);
  const componentTree = useComponentTreeState();
  const { setComponentTree } = useComponentTreeMutators();
  const [components, setComponents] = useState<FooterProps>([]);
  useEffect(() => {
    setComponentTree(makeComponentTree(data.components));
  }, [data]);
  useEffect(() => {
    setComponents(makeFooterData(componentTree).map((item) => ({ ...item })));
  }, [componentTree]);
  return (
    <div css={wrapper}>
      <HeaderRow />
      {rowProps.map((props) => (
        <MediaRow {...{ ...props }} key={props.media.id} />
      ))}
      <FooterRow {...{ components }} />
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
