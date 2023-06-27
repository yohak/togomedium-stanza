import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { NodeCanvas } from "./NodeCanvas";
import { makeComponentStoryTitle } from "../../../shared/utils/storybook";
import { data1 } from "../utils/data1";
import { data2 } from "../utils/data2";

export default {
  title: makeComponentStoryTitle(NodeCanvas.name, "SimilarMediaNode"),
  component: NodeCanvas,
} as ComponentMeta<typeof NodeCanvas>;

const Template: ComponentStory<typeof NodeCanvas> = (args) => <NodeCanvas {...args} />;

const defaultArgs: ComponentProps<typeof NodeCanvas> = {
  data: data2,
};

export const Primary = Template.bind({});
Primary.args = { ...defaultArgs };
