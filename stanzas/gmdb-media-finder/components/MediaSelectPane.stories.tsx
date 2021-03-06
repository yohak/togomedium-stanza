import { css } from "@emotion/react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps, FC, useEffect } from "react";
import { MediaSelectPane } from "./MediaSelectPane";
import { makeComponentStoryTitle } from "../../../utils/storybook";
import { LabelInfo } from "../../../utils/types";
import { useFoundMediaMutators } from "../states/foundMedia";
import { QueryData, useQueryDataMutators } from "../states/queryData";

type WrapperProps = { query: QueryData; foundMedia: LabelInfo[] } & ComponentProps<
  typeof MediaSelectPane
>;
const Wrapper: FC<WrapperProps> = (args) => {
  const { setQueryData } = useQueryDataMutators();
  const { setFoundMedia } = useFoundMediaMutators();
  useEffect(() => {
    setQueryData(args.query);
  }, [args.query]);
  useEffect(() => {
    setFoundMedia(args.foundMedia);
  }, [args.foundMedia]);
  return (
    <div css={wrapperCSS}>
      <MediaSelectPane css={extraCSS} {...args} />
    </div>
  );
};

export default {
  title: makeComponentStoryTitle(MediaSelectPane.name, "MediaFinder"),
  component: Wrapper,
} as ComponentMeta<typeof Wrapper>;

const Template: ComponentStory<typeof Wrapper> = (args) => <Wrapper {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  query: {
    "tax-id": ["124242, 94820"],
  },
  foundMedia: [
    {
      id: "abc",
      label: "hogehoge",
    },
    {
      id: "efg",
      label: "mogemoge",
    },
    {
      id: "hij",
      label: "fugafuga",
    },
  ],
};

const wrapperCSS = css`
  min-height: 500px;
  background-color: blue;
  display: flex;
  flex-direction: column;
`;
const extraCSS = css`
  flex-grow: 1;
`;
