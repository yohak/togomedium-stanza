import { css } from "@emotion/react";
import { Badge, Tab, Tabs } from "@mui/material";
import React, { FC } from "react";
import { AcceptsEmotion } from "yohak-tools";
import {
  MediaTabName,
  mediaTabNames,
  useMediaTabFocusMutators,
  useMediaTabFocusState,
} from "../../state/media-finder/mediaTabFocus";
import { useSelectedMediaState } from "../../state/media-finder/selectedMedia";
import { COLOR_GRAY_LINE, SIZE4 } from "../../styles/variables";

type Props = {} & AcceptsEmotion;

export const MediaTab: FC<Props> = ({ css, className }) => {
  const tabFocus = useMediaTabFocusState();
  const { setMediaTabFocus } = useMediaTabFocusMutators();
  const selected = useSelectedMediaState();
  const handleChange = (event: React.SyntheticEvent, newValue: MediaTabName) => {
    setMediaTabFocus(newValue);
  };
  return (
    <div css={[wrapper, css]} className={className}>
      <Tabs value={tabFocus} onChange={handleChange}>
        {mediaTabNames.map((label) => {
          if (label === "Selected media") {
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
