import { ComponentMeta, ComponentStory } from "@storybook/react";
import { TaxonomicTreeTab } from "./TaxonomicTreeTab";
import { makeComponentStoryTitle } from "../../../utils/storybook";

export default {
  title: makeComponentStoryTitle("TaxonomicTreeTab", "MediaFinder"),
  component: TaxonomicTreeTab,
} as ComponentMeta<typeof TaxonomicTreeTab>;

const Template: ComponentStory<typeof TaxonomicTreeTab> = (args) => <TaxonomicTreeTab {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
