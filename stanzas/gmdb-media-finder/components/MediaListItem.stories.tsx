import { ComponentMeta, ComponentStory } from "@storybook/react";
import { MediaListItem } from "./MediaListItem";
import { makeComponentStoryTitle } from "../../../utils/storybook";

export default {
  title: makeComponentStoryTitle("MediaListItem", "MediaFinder"),
  component: MediaListItem,
} as ComponentMeta<typeof MediaListItem>;

const Template: ComponentStory<typeof MediaListItem> = (args) => <MediaListItem {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  id: "HM_D00535",
  label: "TRYPTICASE SOY BROTH AGAR",
};

export const Long = Template.bind({});
Long.args = {
  id: "HM_D00535",
  label:
    "This is very long label, This is very long label, This is very long label, This is very long label, This is very long label, This is very long label, This is very long label, This is very long label, This is very long label, ",
};

const ListTemplate: ComponentStory<typeof MediaListItem> = (args) => (
  <div>
    <MediaListItem {...args} />
    <MediaListItem {...args} />
    <MediaListItem {...args} />
  </div>
);
export const List = ListTemplate.bind({});
List.args = {
  id: "HM_D00535",
  label: "TRYPTICASE SOY BROTH AGAR",
};
