import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { NodeCanvas } from "./NodeCanvas";
import { StanzaView } from "./StanzaView";
import { makeComponentStoryTitle } from "../../../shared/utils/storybook";

export default {
  title: makeComponentStoryTitle(StanzaView.name, "SimilarMediaNode"),
  component: StanzaView,
} as ComponentMeta<typeof StanzaView>;

const Template: ComponentStory<typeof StanzaView> = (args) => <StanzaView {...args} />;

const defaultArgs: ComponentProps<typeof StanzaView> = {
  gmId: "M2294",
};

export const Primary = Template.bind({});
Primary.args = { ...defaultArgs };
