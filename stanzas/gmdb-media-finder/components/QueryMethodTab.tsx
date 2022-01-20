import { css } from "@emotion/react";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React, { FC } from "react";
import { COLOR_GRAY_LINE, SIZE4 } from "../../../components/styles";
import { AcceptsEmotion } from "../../../utils/types";
import { QueryMethod, useQueryMethodMutators, useQueryMethodState } from "../states/queryMethod";

type Props = {} & AcceptsEmotion;

const tabNames: QueryMethod[] = ["Taxonomic tree", "Organism phenotypes", "Media attributes"];

export const QueryMethodTab: FC<Props> = ({ css, className }) => {
  const queryMethod = useQueryMethodState();
  const { setQueryMethod } = useQueryMethodMutators();
  const handleChange = (event: React.SyntheticEvent, newValue: QueryMethod) => {
    setQueryMethod(newValue);
  };
  //
  return (
    <div css={[wrapper, css]} className={className}>
      <Tabs value={queryMethod} onChange={handleChange}>
        {tabNames.map((label) => (
          <Tab key={label} label={label} value={label} css={tabCSS} />
        ))}
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
