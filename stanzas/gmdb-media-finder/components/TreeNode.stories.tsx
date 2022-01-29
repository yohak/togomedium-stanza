import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { TreeNode } from "./TreeNode";
import { makeComponentStoryTitle } from "../../../utils/storybook";

export default {
  title: makeComponentStoryTitle("TreeNode", "MediaFinder"),
  component: TreeNode,
} as ComponentMeta<typeof TreeNode>;

const Template: ComponentStory<typeof TreeNode> = (args) => <TreeNode {...args} />;

const defaultArgs: ComponentProps<typeof TreeNode> = {
  label: "Archaea",
  id: "2157",
  level: 0,
  check: "checked",
  hasChildren: true,
  linkString: "taxid:2157",
  linkURL: "/",
  isOpen: false,
  onClickCheck: () => {
    console.log("onClickCheck");
  },
  onToggleChildren: () => {
    console.log("onCLickToggle");
  },
};

export const Primary = Template.bind({});
Primary.args = { ...defaultArgs };
