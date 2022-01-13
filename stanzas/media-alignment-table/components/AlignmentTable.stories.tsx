import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AlignmentTable } from "./AlignmentTable";
import { mediaAlignmentTableResponse1 } from "../../../api/media-alignment-table/response1";

export default {
  title: "AlignmentTable",
  component: AlignmentTable,
} as ComponentMeta<typeof AlignmentTable>;

const Template: ComponentStory<typeof AlignmentTable> = (args) => <AlignmentTable {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  data: mediaAlignmentTableResponse1,
};
