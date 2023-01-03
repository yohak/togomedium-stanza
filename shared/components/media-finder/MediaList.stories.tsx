import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps, FC, useEffect } from "react";
import { FoundMediaList } from "./FoundMediaList";
import { FoundMedia, useFoundMediaMutators } from "../../state/media-finder/foundMedia";
import { makeComponentStoryTitle } from "../../utils/storybook";

type WrapperProps = { media: FoundMedia } & ComponentProps<typeof FoundMediaList>;
const Wrapper: FC<WrapperProps> = (args) => {
  const { setFoundMedia } = useFoundMediaMutators();
  useEffect(() => {
    setFoundMedia(args.media);
  }, [args.media]);
  return <FoundMediaList {...args} />;
};

export default {
  title: makeComponentStoryTitle(FoundMediaList.name, "MediaFinder"),
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
