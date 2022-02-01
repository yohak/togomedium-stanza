import { css } from "@emotion/react";
import Button from "@mui/material/Button";
import React, { FC } from "react";
import {
  COLOR_WHITE,
  FONT_WEIGHT_MEDIUM,
  ROUNDED_CORNER,
  SIZE05,
  SIZE1,
  SIZE2,
} from "../../../components/styles";
import { useSelectedMediaMutators, useSelectedMediaState } from "../states/selectedMedia";

type Props = { actionLabel: string };

export const ActionPane: FC<Props> = ({ actionLabel }) => {
  const selectedMedia = useSelectedMediaState();
  const { clearSelectedMedia } = useSelectedMediaMutators();

  return (
    <div css={wrapper}>
      <p className={"info"}>{getInfoText(selectedMedia.length)}</p>
      <div css={buttonWrapper}>
        <Button
          variant="contained"
          disableElevation={true}
          disabled={selectedMedia.length === 0}
          sx={{ textTransform: "none" }}
        >
          {actionLabel}
        </Button>
        <Button variant="outlined" onClick={clearSelectedMedia} sx={{ textTransform: "none" }}>
          Clear selection
        </Button>
      </div>
    </div>
  );
};

const getInfoText = (mediaLength: number): string => {
  if (mediaLength === 0) {
    return "No media selected";
  } else if (mediaLength === 1) {
    return "1 medium selected";
  } else {
    return `${mediaLength} media selected`;
  }
};

const wrapper = css`
  ${ROUNDED_CORNER};
  background-color: ${COLOR_WHITE};
  padding: ${SIZE1} ${SIZE2};

  p.info {
    margin-bottom: ${SIZE05};
    font-size: 18px;
    ${FONT_WEIGHT_MEDIUM};
  }
`;

const buttonWrapper = css`
  display: flex;
  gap: ${SIZE1};

  & > * {
    flex-grow: 1;
    flex-basis: 0;
  }
`;
