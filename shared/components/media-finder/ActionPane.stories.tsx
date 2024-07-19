import { Meta, StoryObj } from "@storybook/react";
import { ComponentProps, useEffect } from "react";
import { ActionPane } from "./ActionPane";
import { useSelectedMediaMutators } from "../../state/media-finder/selectedMedia";
import { LabelInfo } from "../../utils/labelInfo";

type WithCustomArgs = { selectedMedia: LabelInfo[] } & ComponentProps<typeof ActionPane>;
const meta: Meta<WithCustomArgs> = {
  component: ActionPane,
  decorators: [
    (StoryItem, { args }) => {
      const { selectedMedia } = args;
      const { setSelectedMedia } = useSelectedMediaMutators();
      useEffect(() => {
        setSelectedMedia(selectedMedia);
      }, [selectedMedia]);
      return <StoryItem />;
    },
  ],
  args: {
    actionLabel: "compare media",
  },
};
export default meta;

type Story = StoryObj<WithCustomArgs>;
export const NoSelection: Story = {
  args: {
    selectedMedia: [],
  },
};
export const OneSelection: Story = {
  args: {
    selectedMedia: [{ id: "aa", label: "aa" }],
  },
};
export const MultipleSelection: Story = {
  args: {
    selectedMedia: [
      { id: "aa", label: "aa" },
      { id: "bb", label: "bb" },
      { id: "cc", label: "cc" },
    ],
  },
};
