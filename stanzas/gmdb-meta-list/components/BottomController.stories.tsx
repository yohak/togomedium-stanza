import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { BottomController } from "./BottomController";
import { StanzaWrapper } from "../../../shared/components/StanzaWrapper";
import { makeComponentStoryTitle } from "../../../shared/utils/storybook";

export default {
  title: makeComponentStoryTitle(BottomController.name, "MetaList"),
  component: BottomController,
  decorators: [
    (Story) => (
      <StanzaWrapper>
        <Story />
      </StanzaWrapper>
    ),
  ],
} as ComponentMeta<typeof BottomController>;

const Template: ComponentStory<typeof BottomController> = (args) => <BottomController {...args} />;

const defaultArgs: ComponentProps<typeof BottomController> = {
  total: 2000,
  offset: 10,
  limit: 10,
  setOffset: () => {},
};

export const Primary = Template.bind({});
Primary.args = { ...defaultArgs };
