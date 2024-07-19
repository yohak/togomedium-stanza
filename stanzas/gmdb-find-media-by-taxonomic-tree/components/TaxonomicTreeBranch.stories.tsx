import { Meta, StoryObj } from "@storybook/react";
import { TaxonomicTreeBranch } from "./TaxonomicTreeBranch";

const meta: Meta<typeof TaxonomicTreeBranch> = {
  component: TaxonomicTreeBranch,
};
export default meta;

type Story = StoryObj<typeof TaxonomicTreeBranch>;
export const Primary: Story = {
  args: {
    id: "2157",
  },
};
