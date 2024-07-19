import { css } from "@emotion/react";
import { Meta, StoryObj } from "@storybook/react";
import { ComponentProps } from "react";
import { Pagination } from "./Pagination";

const meta: Meta<typeof Pagination> = {
  component: Pagination,
  decorators: [
    (StoryItem) => {
      return (
        <div
          css={css`
            width: 600px;
            background-color: white;
            padding: 20px;
          `}
        >
          <StoryItem />
        </div>
      );
    },
  ],
};
export default meta;

type Story = StoryObj<typeof Pagination>;
const defaultArgs: ComponentProps<typeof Pagination> = {
  total: 35,
  current: 0,
  displayLength: 10,
  onClickNext: () => {},
  onClickPrev: () => {},
};
export const Primary: Story = {
  args: { ...defaultArgs },
};
export const Type1: Story = {
  args: { ...defaultArgs, current: 10 },
};
export const Type2: Story = {
  args: { ...defaultArgs, current: 25 },
};
