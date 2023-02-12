import { css } from "@emotion/react";
import { Badge, Tab, Tabs } from "@mui/material";
import React, { FC } from "react";
import { AcceptsEmotion } from "yohak-tools";
import { COLOR_GRAY_LINE, SIZE4 } from "../../../shared/styles/variables";
import {
  OrganismTabName,
  organismTabNames,
  useOrganismTabFocusMutators,
  useOrganismTabFocusState,
} from "../states/organismTabFocus";
import { useSelectedOrganismsState } from "../states/selectedOrganisms";

type Props = {} & AcceptsEmotion;

export const OrganismTab: FC<Props> = ({ css, className }) => {
  const tabFocus = useOrganismTabFocusState();
  const { setOrganismTabFocus } = useOrganismTabFocusMutators();
  const selected = useSelectedOrganismsState();
  const handleChange = (event: React.SyntheticEvent, newValue: OrganismTabName) => {
    setOrganismTabFocus(newValue);
  };
  return (
    <div css={[wrapper, css]} className={className}>
      <Tabs value={tabFocus} onChange={handleChange}>
        {organismTabNames.map((label) => {
          if (label === "Selected organisms") {
            return (
              <Tab
                key={label}
                label={
                  <Badge badgeContent={selected.length} color="primary">
                    {label}
                  </Badge>
                }
                value={label}
                css={tabCSS}
              />
            );
          }
          return <Tab key={label} label={label} value={label} css={tabCSS} />;
        })}
      </Tabs>
    </div>
  );
};

const wrapper = css`
  width: 100%;
  border-bottom: 1px solid ${COLOR_GRAY_LINE};
  & > * {
    position: relative;
    top: 1px;
  }
`;

const tabCSS = css`
  text-transform: none;
  padding-left: ${SIZE4};
  padding-right: ${SIZE4};
  //width: 200px;
`;
