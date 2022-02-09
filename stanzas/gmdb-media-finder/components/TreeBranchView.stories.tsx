import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { TreeBranchView } from "./TreeBranchView";
import { makeComponentStoryTitle } from "../../../utils/storybook";

export default {
  title: makeComponentStoryTitle(TreeBranchView.name, "MediaFinder"),
  component: TreeBranchView,
} as ComponentMeta<typeof TreeBranchView>;

const Template: ComponentStory<typeof TreeBranchView> = (args) => <TreeBranchView {...args} />;

const defaultArgs: ComponentProps<typeof TreeBranchView> = {
  label: "Archaea",
  id: "2157",
  check: "checked",
  hasChildren: true,
  linkString: "taxid:2157",
  linkURL: "/",
  isOpen: true,
  tag: "Phylum",
  onClickCheck: () => {
    console.log("onClickCheck");
  },
  onToggleChildren: () => {
    console.log("onCLickToggle");
  },
};

export const Primary = Template.bind({});
Primary.args = { ...defaultArgs };

const Template2: ComponentStory<typeof TreeBranchView> = (args) => (
  <TreeBranchView {...args}>
    <TreeBranchView {...args} />
    <TreeBranchView {...args}>
      <TreeBranchView {...args} />
      <TreeBranchView {...args} />
    </TreeBranchView>
    <TreeBranchView {...args} />
  </TreeBranchView>
);
export const Tree = Template2.bind({});
Tree.args = { ...defaultArgs };
