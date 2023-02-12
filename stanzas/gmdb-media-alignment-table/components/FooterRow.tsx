import { css } from "@emotion/react";
import React, { ComponentProps, FC } from "react";
import { FooterCell } from "./FooterCell";
import { COLOR_WHITE } from "../../../shared/styles/variables";
import { WIDTH_COMPACT, WIDTH_EXPANDED } from "../consts";
import { useIsMediaExpendedState } from "../states/isMediaExpanded";
import { useIsOrganismsExpendedState } from "../states/isOrganismsExpanded";

type Props = {
  components: ComponentProps<typeof FooterCell>[];
};

export const FooterRow: FC<Props> = ({ components }) => {
  const isMediaExpanded = useIsMediaExpendedState();
  const isOrganismsExpanded = useIsOrganismsExpendedState();
  return (
    <div css={wrapper}>
      <div css={infoSpacer} className={isMediaExpanded ? "expand" : "compact"} />
      <div css={infoSpacer} className={isOrganismsExpanded ? "expand" : "compact"} />
      {components.map((component) => (
        <FooterCell {...component} key={component.id} />
      ))}
      <div css={componentSpacer} />
    </div>
  );
};

const wrapper = css`
  display: flex;
  gap: 1px;
  width: 100%;
  & > * {
    flex-grow: 0;
    flex-shrink: 0;
  }
`;

const infoSpacer = css`
  background-color: ${COLOR_WHITE};
  &.expand {
    width: ${WIDTH_EXPANDED};
  }
  &.compact {
    width: ${WIDTH_COMPACT};
  }
`;

const componentSpacer = css`
  background-color: ${COLOR_WHITE};
  flex-grow: 1 !important;
`;
