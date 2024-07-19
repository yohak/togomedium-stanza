import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { StanzaView } from "./StanzaView";
import { makeComponentStoryTitle } from "../../../shared/utils/storybook";
import { data1 } from "../testing/data1";

export default {
  title: makeComponentStoryTitle(StanzaView.name, "MediaByGMID"),
  component: StanzaView,
} as ComponentMeta<typeof StanzaView>;

const Template: ComponentStory<typeof StanzaView> = (args) => <StanzaView {...args} />;

const defaultArgs: ComponentProps<typeof StanzaView> = data1;

export const Primary = Template.bind({});
Primary.args = { ...defaultArgs };
