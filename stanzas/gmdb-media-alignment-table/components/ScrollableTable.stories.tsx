import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ScrollableTable } from "./ScrollableTable";
import { mediaAlignmentTableResponse2 } from "../../../api/media-alignment-table/response2";
import { makeComponentStoryTitle } from "../../../utils/storybook";

export default {
  title: makeComponentStoryTitle("ScrollableTable", "MediaAlignmentTable"),
  component: ScrollableTable,
} as ComponentMeta<typeof ScrollableTable>;

const Template: ComponentStory<typeof ScrollableTable> = (args) => <ScrollableTable {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  data: mediaAlignmentTableResponse2,
};
