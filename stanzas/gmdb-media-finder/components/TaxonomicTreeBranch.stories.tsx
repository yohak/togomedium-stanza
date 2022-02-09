import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { TaxonomicTreeBranch } from "./TaxonomicTreeBranch";
import { taxonomyChildrenMocks } from "../../../api/taxonomy_children/msw";
import { makeComponentStoryTitle, makeMswParameter } from "../../../utils/storybook";
import { useInitTaxonTree } from "../hooks/useInitTaxonTree";

export default {
  title: makeComponentStoryTitle(TaxonomicTreeBranch.name, "MediaFinder"),
  component: TaxonomicTreeBranch,
} as ComponentMeta<typeof TaxonomicTreeBranch>;

const Template: ComponentStory<typeof TaxonomicTreeBranch> = (args) => {
  useInitTaxonTree();
  return <TaxonomicTreeBranch {...args} />;
};

const defaultArgs: ComponentProps<typeof TaxonomicTreeBranch> = {
  id: "2157",
};

export const Primary = Template.bind({});
// Primary.parameters = {
//   msw: makeMswParameter(taxonomyChildrenMocks),
// };
Primary.args = { ...defaultArgs };
