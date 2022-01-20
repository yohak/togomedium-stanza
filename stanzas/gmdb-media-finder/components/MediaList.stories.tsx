import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps, FC, useEffect } from "react";
import { MediaList } from "./MediaList";
import { LabelInfo } from "../../../components/types";
import { makeComponentStoryTitle } from "../../../utils/storybook";
import { useFoundMediaMutators } from "../states/foundMedia";

type WrapperProps = { media: LabelInfo[] } & ComponentProps<typeof MediaList>;
const Wrapper: FC<WrapperProps> = (args) => {
  const { setFoundMedia } = useFoundMediaMutators();
  useEffect(() => {
    setFoundMedia(args.media);
  }, [args.media]);
  return <MediaList {...args} />;
};

export default {
  title: makeComponentStoryTitle("MediaList", "MediaFinder"),
  component: Wrapper,
} as ComponentMeta<typeof Wrapper>;

const Template: ComponentStory<typeof Wrapper> = (args) => <Wrapper {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  media: [
    {
      id: "abc",
      label: "hogehoge",
    },
    {
      id: "efg",
      label: "mogemoge",
    },
    {
      id: "hij",
      label: "fugafuga",
    },
  ],
};
