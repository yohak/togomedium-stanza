import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps, FC, useEffect } from "react";
import { MediaList } from "./MediaList";
import { FoundMedia, useFoundMediaMutators } from "../../../shared/state/foundMedia";
import { makeComponentStoryTitle } from "../../../utils/storybook";

type WrapperProps = { media: FoundMedia } & ComponentProps<typeof MediaList>;
const Wrapper: FC<WrapperProps> = (args) => {
  const { setFoundMedia } = useFoundMediaMutators();
  useEffect(() => {
    setFoundMedia(args.media);
  }, [args.media]);
  return <MediaList {...args} />;
};

export default {
  title: makeComponentStoryTitle(MediaList.name, "FindMediaByTaxonomicTree"),
  component: Wrapper,
} as ComponentMeta<typeof Wrapper>;

const Template: ComponentStory<typeof Wrapper> = (args) => <Wrapper {...args} />;

export const Primary = Template.bind({});
Primary.args = {
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
};
