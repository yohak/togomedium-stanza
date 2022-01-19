import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps, FC, useEffect } from "react";
import { ActionPane } from "./ActionPane";
import { makeComponentStoryTitle } from "../../../utils/storybook";
import { useSelectedMediaMutators } from "../states/selectedMedia";

type WrapperProps = { selectedMedia: string[] } & ComponentProps<typeof ActionPane>;
const Wrapper: FC<WrapperProps> = (args) => {
  const { setSelectedMedia } = useSelectedMediaMutators();
  useEffect(() => {
    setSelectedMedia(args.selectedMedia);
  }, [args.selectedMedia]);
  return <ActionPane {...args} />;
};

export default {
  title: makeComponentStoryTitle("ActionPane", "MediaFinder"),
  component: Wrapper,
  args: { actionLabel: "compare media" },
} as ComponentMeta<typeof Wrapper>;

const Template: ComponentStory<typeof Wrapper> = (args) => <Wrapper {...args} />;

export const NoSelection = Template.bind({});
NoSelection.args = {
  selectedMedia: [],
};

export const OneSelection = Template.bind({});
OneSelection.args = {
  selectedMedia: ["aa"],
};

export const MultipleSelection = Template.bind({});
MultipleSelection.args = {
  selectedMedia: ["aa", "bb", "cc"],
};
