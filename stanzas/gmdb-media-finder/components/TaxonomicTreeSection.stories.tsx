import { ComponentMeta, ComponentStory } from "@storybook/react";
import { TaxonomicTreeSection } from "./TaxonomicTreeSection";
import { makeComponentStoryTitle } from "../../../utils/storybook";

export default {
  title: makeComponentStoryTitle("TaxonomicTreeSection", "MediaFinder"),
  component: TaxonomicTreeSection,
} as ComponentMeta<typeof TaxonomicTreeSection>;

const Template: ComponentStory<typeof TaxonomicTreeSection> = (args) => (
  <TaxonomicTreeSection {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
