import { css } from "@emotion/react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps, FC, useEffect } from "react";
import { MediaSelectPane } from "./MediaSelectPane";
import { FoundMedia, useFoundMediaMutators } from "../../../shared/state/foundMedia";
import { QueryData, useQueryDataMutators } from "../../../shared/state/queryData";
import { makeComponentStoryTitle } from "../../../shared/utils/storybook";

type WrapperProps = { query: QueryData; media: FoundMedia } & ComponentProps<
  typeof MediaSelectPane
>;
const Wrapper: FC<WrapperProps> = (args) => {
  const { setQueryData } = useQueryDataMutators();
  const { setFoundMedia } = useFoundMediaMutators();
  useEffect(() => {
    setQueryData(args.query);
  }, [args.query]);
  useEffect(() => {
    setFoundMedia(args.media);
  }, [args.media]);
  return (
    <div css={wrapperCSS}>
      <MediaSelectPane css={extraCSS} {...args} />
    </div>
  );
};

export default {
  title: makeComponentStoryTitle(MediaSelectPane.name, "FindMediaByComponents"),
  component: Wrapper,
} as ComponentMeta<typeof Wrapper>;

const Template: ComponentStory<typeof Wrapper> = (args) => <Wrapper {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  media: {
    contents: [
      {
        gm_id: "abc",
        name: "hogehoge",
      },
      {
        gm_id: "efg",
        name: "mogemoge",
      },
      {
        gm_id: "hij",
        name: "fugafuga",
      },
    ],
    limit: 0,
    offset: 0,
    total: 3,
  },
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
