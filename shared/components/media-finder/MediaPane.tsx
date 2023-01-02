import { css } from "@emotion/react";
import React, { FC } from "react";
import { AcceptsEmotion } from "yohak-tools";
import { ActionPane } from "./ActionPane";
import { FoundMediaList } from "./FoundMediaList";
import { MediaTab } from "./MediaTab";
import { SelectedMediaList } from "./SelectedMediaList";
import { useMediaTabFocusState } from "../../state/mediaTabFocus";
import { COLOR_WHITE, ROUNDED_CORNER, SIZE1, SIZE2 } from "../styles";

type Props = {
  dispatchEvent: (gmIds: string[]) => void;
  next: () => void;
  prev: () => void;
} & AcceptsEmotion;

export const MediaPane: FC<Props> = ({ css, className, dispatchEvent, next, prev }) => {
  const mediaTabFocus = useMediaTabFocusState();
  return (
    <div css={wrapper}>
      <div css={[media, css]} className={className}>
        <MediaTab />
        <div css={contents}>
          {mediaTabFocus === "Found media" && <FoundMediaList next={next} prev={prev} />}
          {mediaTabFocus === "Selected media" && <SelectedMediaList />}
        </div>
      </div>
      {mediaTabFocus === "Selected media" && (
        <ActionPane actionLabel={"Compare media"} dispatchEvent={dispatchEvent} />
      )}
    </div>
  );
};

const wrapper = css`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: ${SIZE1};
`;

const media = css`
  ${ROUNDED_CORNER};
  padding: ${SIZE1};
  background-color: ${COLOR_WHITE};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const contents = css`
  padding: ${SIZE2} ${SIZE1};
  //background-color: #007bff;
  flex-grow: 1;
  overflow-y: auto;
`;
