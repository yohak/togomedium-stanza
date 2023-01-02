import { css } from "@emotion/react";
import { Badge, Tab, Tabs } from "@mui/material";
import React, { FC } from "react";
import { AcceptsEmotion } from "yohak-tools";
import {
  MediaTabName,
  mediaTabNames,
  useMediaTabFocusMutators,
  useMediaTabFocusState,
} from "../../state/mediaTabFocus";
import { useSelectedMediaState } from "../../state/selectedMedia";
import { COLOR_GRAY_LINE, SIZE4 } from "../styles";

type Props = {} & AcceptsEmotion;

export const MediaTab: FC<Props> = ({ css, className }) => {
  const mediaTabFocus = useMediaTabFocusState();
  const selectedMedia = useSelectedMediaState();
  const { setMediaTabFocus } = useMediaTabFocusMutators();
  const handleChange = (event: React.SyntheticEvent, newValue: MediaTabName) => {
    setMediaTabFocus(newValue);
  };
  return (
    <div css={[wrapper, css]} className={className}>
      <Tabs value={mediaTabFocus} onChange={handleChange}>
        {mediaTabNames.map((label) => {
          if (label === "Selected media") {
            return (
              <Tab
                key={label}
                label={
                  <Badge badgeContent={selectedMedia.length.toString()} color="primary">
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
