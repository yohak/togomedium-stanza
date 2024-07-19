import { Meta, StoryObj } from "@storybook/react";
import { ComponentProps } from "react";
import { TreeBranchView } from "./TreeBranchView";

const meta: Meta<typeof TreeBranchView> = {
  component: TreeBranchView,
};
export default meta;

const defaultArgs: ComponentProps<typeof TreeBranchView> = {
  label: "Archaea",
  id: "2157",
  check: "checked",
  hasChildren: true,
  linkString: "taxid:2157",
  linkURL: "/",
  isOpen: true,
  isLoading: false,
  tag: "Phylum",
  onClickCheck: () => {
    console.log("onClickCheck");
  },
  onToggleChildren: () => {
    console.log("onCLickToggle");
  },
};

type Story = StoryObj<typeof TreeBranchView>;
export const Primary: Story = {
  args: { ...defaultArgs },
};
export const Tree: Story = {
  decorators: [
    (Item) => {
      return (
        <TreeBranchView {...defaultArgs}>
          <TreeBranchView {...defaultArgs}></TreeBranchView>
          <TreeBranchView {...defaultArgs}>
            <Item />
          </TreeBranchView>
        </TreeBranchView>
      );
    },
  ],
  args: { ...defaultArgs },
};
