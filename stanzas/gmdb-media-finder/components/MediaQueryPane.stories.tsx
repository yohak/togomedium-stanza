import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps, FC, useEffect } from "react";
import { ActionPane } from "./ActionPane";
import { MediaQueryPane } from "./MediaQueryPane";
import { makeComponentStoryTitle } from "../../../utils/storybook";
import { QueryData, useQueryDataMutators } from "../states/queryData";
import { useSelectedMediaMutators } from "../states/selectedMedia";

type WrapperProps = { query: QueryData } & ComponentProps<typeof MediaQueryPane>;
const Wrapper: FC<WrapperProps> = (args) => {
  const { setQueryData } = useQueryDataMutators();
  useEffect(() => {
    setQueryData(args.query);
  }, [args.query]);
  return <MediaQueryPane {...args} />;
};

export default {
  title: makeComponentStoryTitle("MediaQueryPane", "MediaFinder"),
  component: Wrapper,
} as ComponentMeta<typeof Wrapper>;

const Template: ComponentStory<typeof Wrapper> = (args) => <Wrapper {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  query: {
    "tax-id": ["124242, 94820"],
  },
};
