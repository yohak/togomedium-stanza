import { Meta, StoryObj } from "@storybook/react";
import { TaxonomicTree } from "./TaxonomicTree";

const meta: Meta<typeof TaxonomicTree> = {
  component: TaxonomicTree,
};
export default meta;

type Story = StoryObj<typeof TaxonomicTree>;
export const Primary: Story = {};
