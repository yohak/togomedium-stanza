import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { TaxonomicTree } from "./TaxonomicTree";
import { makeComponentStoryTitle } from "../../../utils/storybook";

export default {
  title: makeComponentStoryTitle(TaxonomicTree.name, "MediaFinder"),
  component: TaxonomicTree,
} as ComponentMeta<typeof TaxonomicTree>;

const Template: ComponentStory<typeof TaxonomicTree> = (args) => <TaxonomicTree {...args} />;

const defaultArgs: ComponentProps<typeof TaxonomicTree> = {};

export const Primary = Template.bind({});
Primary.args = { ...defaultArgs };
