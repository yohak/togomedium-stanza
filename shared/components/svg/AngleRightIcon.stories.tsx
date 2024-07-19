import { Meta, StoryObj } from "@storybook/react";
import { AngleRightIcon } from "./AngleRightIcon";

const meta: Meta<typeof AngleRightIcon> = {
  component: AngleRightIcon,
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

type Story = StoryObj<typeof AngleRightIcon>;
export const Primary: Story = {};
