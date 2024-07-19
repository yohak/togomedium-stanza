import { Meta, StoryObj } from "@storybook/react";
import { BottomController } from "./BottomController";
import { StanzaWrapper } from "../../../shared/components/StanzaWrapper";

const meta: Meta<typeof BottomController> = {
  component: BottomController,
  decorators: [
    (Story) => (
      <StanzaWrapper>
        <Story />
      </StanzaWrapper>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof BottomController>;
export const Primary: Story = {
  args: {
    total: 2000,
    offset: 10,
    limit: 10,
    setOffset: () => {},
  },
};
