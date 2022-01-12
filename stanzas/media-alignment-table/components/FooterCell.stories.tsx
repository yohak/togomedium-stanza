import { ComponentMeta, ComponentStory } from "@storybook/react";
import { FooterCell } from "./FooterCell";

export default {
  title: "FooterCell",
  component: FooterCell,
} as ComponentMeta<typeof FooterCell>;

const Template: ComponentStory<typeof FooterCell> = (args) => <FooterCell {...args} />;

export const Level0 = Template.bind({});
Level0.args = {
  label: "Distilled Water",
  level: 0,
  hasChildren: false,
  isOpen: false,
};

export const Level1 = Template.bind({});
Level1.args = {
  label: "Distilled Water",
  level: 1,
  hasChildren: true,
  isOpen: true,
};
