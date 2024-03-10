import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { StanzaView } from "./StanzaView";
import { data1 } from "../../../api/all-media/data1";
import { makeComponentStoryTitle } from "../../../shared/utils/storybook";

export default {
  title: makeComponentStoryTitle(StanzaView.name, "MetaList"),
  component: StanzaView,
} as ComponentMeta<typeof StanzaView>;

const Template: ComponentStory<typeof StanzaView> = (args) => <StanzaView {...args} />;

const defaultArgs: ComponentProps<typeof StanzaView> = {
  data: data1,
  title: "Title",
  showColumnNames: true,
  columnSizes: [20, 30, 50],
  offset: 0,
  setOffset: () => {},
  limit: 20,
  setLimit: () => {},
  isLoading: false,
};

export const Primary = Template.bind({});
Primary.args = { ...defaultArgs };
