import { ComponentMeta, ComponentStory } from "@storybook/react";
import { MediaCell } from "../../../stanzas/media-alignment-table/components/MediaCell";

export default {
  title: "MediaCell",
  component: MediaCell,
} as ComponentMeta<typeof MediaCell>;

const Templete: ComponentStory<typeof MediaCell> = (args) => <MediaCell {...args} />;

export const Compact = Templete.bind({});
Compact.args = {
  expanded: false,
  media: [{ id: "HM_D00001a", label: "REACTIVATION WITH LIQUID MEDIUM 1" }],
};

export const Expanded = Templete.bind({});
Expanded.args = {
  expanded: true,
  media: [{ id: "HM_D00001a", label: "REACTIVATION WITH LIQUID MEDIUM 1" }],
};
