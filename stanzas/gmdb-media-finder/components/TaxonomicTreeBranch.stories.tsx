import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { TaxonomicTreeBranch } from "./TaxonomicTreeBranch";
import { taxonomyChildrenMocks } from "../../../api/taxonomy_children/msw";
import { makeComponentStoryTitle, makeMswParameter } from "../../../utils/storybook";

export default {
  title: makeComponentStoryTitle(TaxonomicTreeBranch.name, "MediaFinder"),
  component: TaxonomicTreeBranch,
} as ComponentMeta<typeof TaxonomicTreeBranch>;

const Template: ComponentStory<typeof TaxonomicTreeBranch> = (args) => (
  <TaxonomicTreeBranch {...args} />
);

const defaultArgs: ComponentProps<typeof TaxonomicTreeBranch> = {
  id: "2157",
  label: "Archaea",
};

export const Primary = Template.bind({});
Primary.parameters = {
  msw: makeMswParameter(taxonomyChildrenMocks),
};
Primary.args = { ...defaultArgs };
