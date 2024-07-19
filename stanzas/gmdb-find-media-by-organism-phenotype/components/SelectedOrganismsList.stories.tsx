import { Meta, StoryObj } from "@storybook/react";
import { SelectedOrganismsList } from "./SelectedOrganismsList";

const meta: Meta<typeof SelectedOrganismsList> = {
  component: SelectedOrganismsList,
};
export default meta;

type Story = StoryObj<typeof SelectedOrganismsList>;
export const Primary: Story = {};
