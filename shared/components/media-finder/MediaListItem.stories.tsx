import { Meta, StoryObj } from "@storybook/react";
import { MediaListItem } from "./MediaListItem";

const meta: Meta<typeof MediaListItem> = {
  component: MediaListItem,
};
export default meta;

type Story = StoryObj<typeof MediaListItem>;
export const Primary: Story = {
  args: {
    id: "HM_D00535",
    label: "TRYPTICASE SOY BROTH AGAR",
  },
};
export const Long: Story = {
  args: {
    id: "HM_D00535",
    label:
      "This is very long label, This is very long label, This is very long label, This is very long label, This is very long label, This is very long label, This is very long label, This is very long label, This is very long label, ",
  },
};

export const List: Story = {
  args: {
    id: "HM_D00535",
    label: "TRYPTICASE SOY BROTH AGAR",
  },
  decorators: [
    (StoryItem) => (
      <div>
        <StoryItem />
        <StoryItem />
        <StoryItem />
      </div>
    ),
  ],
};
