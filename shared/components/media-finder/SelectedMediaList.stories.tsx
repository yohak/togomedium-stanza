import { css } from "@emotion/react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps, FC, useEffect } from "react";
import { SelectedMediaList } from "./SelectedMediaList";
import { useSelectedMediaMutators } from "../../state/selectedMedia";
import { makeComponentStoryTitle } from "../../utils/storybook";
import { LabelInfo } from "../../utils/types";

type WrapperProps = { media: LabelInfo[] } & ComponentProps<typeof SelectedMediaList>;
const Wrapper: FC<WrapperProps> = (args) => {
  const { setSelectedMedia } = useSelectedMediaMutators();
  useEffect(() => {
    setSelectedMedia(args.media);
  }, [args.media]);
  return <SelectedMediaList {...args} />;
};

export default {
  title: makeComponentStoryTitle(SelectedMediaList.name, "MediaFinder"),
  component: Wrapper,
} as ComponentMeta<typeof Wrapper>;

const Template: ComponentStory<typeof Wrapper> = (args) => <Wrapper {...args} css={wrapper} />;

const defaultArgs: ComponentProps<typeof Wrapper> = {
  media: [
    { label: "AAA", id: "AAA" },
    { label: "BBB", id: "BBB" },
    { label: "CCC", id: "CCC" },
    { label: "DDD", id: "DDD" },
    { label: "EEE", id: "EEE" },
    { label: "FFF", id: "FFF" },
    { label: "GGG", id: "GGG" },
    { label: "HHH", id: "HHH" },
    { label: "III", id: "III" },
    { label: "JJJ", id: "JJJ" },
    { label: "KKK", id: "KKK" },
    { label: "LLL", id: "LLL" },
    { label: "MMM", id: "MMM" },
    { label: "NNN", id: "NNN" },
    { label: "OOO", id: "OOO" },
    { label: "PPP", id: "PPP" },
    { label: "QQQ", id: "QQQ" },
    { label: "RRR", id: "RRR" },
    { label: "SSS", id: "SSS" },
    { label: "TTT", id: "TTT" },
    { label: "UUU", id: "UUU" },
    { label: "VVV", id: "VVV" },
  ],
};

export const Primary = Template.bind({});
Primary.args = { ...defaultArgs };

const wrapper = css`
  padding: 1vw 15vw;
`;
