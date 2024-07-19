import { css } from "@emotion/react";
import { Meta, StoryObj } from "@storybook/react";
import { ComponentSelect } from "./ComponentSelect";
import { COLOR_WHITE, SIZE2 } from "../../../shared/styles/variables";

const meta: Meta<typeof ComponentSelect> = {
  component: ComponentSelect,
  decorators: [
    (Story) => (
      <div css={wrapper}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof ComponentSelect>;
export const Primary: Story = {
  args: {
    onChangeSelection: (ids) => {
      console.log(ids);
    },
  },
};

const wrapper = css`
  background-color: ${COLOR_WHITE};
  padding: ${SIZE2};
`;
