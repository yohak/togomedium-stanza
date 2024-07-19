import { Meta, StoryObj } from "@storybook/react";
import { DoubleAngleRightIcon } from "./DoubleAngleRightIcon";

const meta: Meta<typeof DoubleAngleRightIcon> = {
  component: DoubleAngleRightIcon,
  decorators: [
    (StoryItem) => {
      return (
        <div style={{ width: 64 }}>
          <StoryItem />
        </div>
      );
    },
  ],
};
export default meta;

type Story = StoryObj<typeof DoubleAngleRightIcon>;
export const Primary: Story = {};
