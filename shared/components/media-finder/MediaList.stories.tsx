import { Meta, StoryObj } from "@storybook/react";
import { ComponentProps, useEffect } from "react";
import { FoundMediaList } from "./FoundMediaList";
import { FoundMedia, useFoundMediaMutators } from "../../state/media-finder/foundMedia";

type WithCustomArgs = { media: FoundMedia } & ComponentProps<typeof FoundMediaList>;
const meta: Meta<WithCustomArgs> = {
  component: FoundMediaList,
  decorators: [
    (StoryItem, { args }) => {
      const { media } = args;
      const { setFoundMedia } = useFoundMediaMutators();
      useEffect(() => {
        setFoundMedia(media);
      }, [media]);
      return <StoryItem />;
    },
  ],
};
export default meta;

type Story = StoryObj<WithCustomArgs>;
export const Primary: Story = {
  args: {
    media: {
      contents: [
        {
          gm_id: "abc",
          name: "hogehoge",
        },
        {
          gm_id: "efg",
          name: "mogemoge",
        },
        {
          gm_id: "hij",
          name: "fugafuga",
        },
      ],
      limit: 0,
      offset: 0,
      total: 3,
    },
  },
};
