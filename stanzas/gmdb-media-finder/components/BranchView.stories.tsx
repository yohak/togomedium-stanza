import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { BranchView } from "./BranchView";
import { makeComponentStoryTitle } from "../../../utils/storybook";

export default {
  title: makeComponentStoryTitle(BranchView.name, "MediaFinder"),
  component: BranchView,
} as ComponentMeta<typeof BranchView>;

const Template: ComponentStory<typeof BranchView> = (args) => <BranchView {...args} />;

const defaultArgs: ComponentProps<typeof BranchView> = {
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
