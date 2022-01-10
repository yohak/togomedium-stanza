import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InfoCell } from "../../../stanzas/media-alignment-table/components/InfoCell";

export default {
  title: "InfoCell",
  component: InfoCell,
} as ComponentMeta<typeof InfoCell>;

const Template: ComponentStory<typeof InfoCell> = (args) => <InfoCell {...args} />;

export const CompactSingle = Template.bind({});
CompactSingle.args = {
  expanded: false,
  info: [{ id: "HM_D00001a", label: "REACTIVATION WITH LIQUID MEDIUM 1" }],
};

export const ExpandedSingle = Template.bind({});
ExpandedSingle.args = {
  expanded: true,
  info: [{ id: "HM_D00001a", label: "REACTIVATION WITH LIQUID MEDIUM 1" }],
};

export const CompactMultiple = Template.bind({});
CompactMultiple.args = {
  expanded: false,
  info: [
    { id: "HM_D00001a", label: "REACTIVATION WITH LIQUID MEDIUM 1" },
    { id: "HM_D00001a", label: "Acidovorax avenae subsp. avenae ATCC 19860" },
  ],
};

export const ExpandedMultiple = Template.bind({});
ExpandedMultiple.args = {
  expanded: true,
  info: [
    { id: "HM_D00001a", label: "REACTIVATION WITH LIQUID MEDIUM 1" },
    { id: "HM_D00001a", label: "Acidovorax avenae subsp. avenae ATCC 19860" },
  ],
};
