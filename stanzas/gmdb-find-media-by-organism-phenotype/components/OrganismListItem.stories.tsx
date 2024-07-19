import { Meta, StoryObj } from "@storybook/react";
import { OrganismListItem } from "./OrganismListItem";

const meta: Meta<typeof OrganismListItem> = {
  component: OrganismListItem,
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;

type Story = StoryObj<typeof OrganismListItem>;
export const Primary: Story = {
  args: {
    id: "666685",
    label: "Rhodanobacter denitrificans",
    isChecked: true,
    onClick: () => {},
  },
};
