import { Meta, StoryObj } from "@storybook/react";
import { FoundOrganismsList } from "./FoundOrganismsList";

const meta: Meta<typeof FoundOrganismsList> = {
  component: FoundOrganismsList,
};
export default meta;

type Story = StoryObj<typeof FoundOrganismsList>;
export const Primary: Story = {};
