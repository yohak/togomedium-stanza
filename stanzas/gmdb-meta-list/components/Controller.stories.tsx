import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { Controller } from "./Controller";
import { StanzaWrapper } from "../../../shared/components/StanzaWrapper";
import { makeComponentStoryTitle } from "../../../shared/utils/storybook";

export default {
  title: makeComponentStoryTitle(Controller.name, "MetaList"),
  component: Controller,
  decorators: [
    (Story) => (
      <StanzaWrapper>
        <Story />
      </StanzaWrapper>
    ),
  ],
} as ComponentMeta<typeof Controller>;

const Template: ComponentStory<typeof Controller> = (args) => <Controller {...args} />;

const defaultArgs: ComponentProps<typeof Controller> = {
  total: 100,
  offset: 0,
  limit: 10,
  setOffset: () => {},
  setLimit: () => {},
};

export const Primary = Template.bind({});
Primary.args = { ...defaultArgs };
