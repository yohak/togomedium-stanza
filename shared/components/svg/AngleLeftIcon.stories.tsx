import { Meta, StoryObj } from "@storybook/react";
import { AngleLeftIcon } from "./AngleLeftIcon";

const meta: Meta<typeof AngleLeftIcon> = {
  component: AngleLeftIcon,
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

type Story = StoryObj<typeof AngleLeftIcon>;
export const Primary: Story = {};
