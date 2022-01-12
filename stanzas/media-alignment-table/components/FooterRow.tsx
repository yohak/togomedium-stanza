import { css } from "@emotion/react";
import React, { ComponentProps, FC } from "react";
import { FooterCell } from "./FooterCell";
import { COLOR_WHITE } from "../../../components/styles";
import { WIDTH_COMPACT, WIDTH_EXPANDED } from "../consts";

type Props = {
  isMediaExpanded: boolean;
  isOrganismsExpanded: boolean;
  components: ComponentProps<typeof FooterCell>[];
};

export const FooterRow: FC<Props> = ({ components, isMediaExpanded, isOrganismsExpanded }) => {
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
  width: 100%;
  display: flex;
  gap: 1px;
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
  flex-grow: 1;
`;
