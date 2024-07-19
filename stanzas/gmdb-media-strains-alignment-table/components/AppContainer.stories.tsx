import { Meta, StoryObj } from "@storybook/react";
import { AppContainer } from "./AppContainer";
import { data1 } from "../../../api/media_strains_alignment/data1";
import { data2 } from "../../../api/media_strains_alignment/data2";

const meta: Meta<typeof AppContainer> = {
  component: AppContainer,
};
export default meta;

type Story = StoryObj<typeof AppContainer>;
export const Primary: Story = {
  args: { data: data1 },
};
export const WithNull: Story = {
  args: { data: data2 },
};
