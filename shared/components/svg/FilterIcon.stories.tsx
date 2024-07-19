import { Meta, StoryObj } from "@storybook/react";
import { FilterIcon } from "./FilterIcon";

const meta: Meta<typeof FilterIcon> = {
  component: FilterIcon,
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

type Story = StoryObj<typeof FilterIcon>;
export const Primary: Story = {};
