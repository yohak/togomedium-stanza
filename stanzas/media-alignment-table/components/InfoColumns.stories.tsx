import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InfoColumns } from "./InfoColumns";
import { mediaAlignmentTableResponse1 } from "../../../api/media-alignment-table/response1";

export default {
  title: "Components/MediaAlignmentTable/InfoColumns",
  component: InfoColumns,
} as ComponentMeta<typeof InfoColumns>;

const Template: ComponentStory<typeof InfoColumns> = (args) => <InfoColumns {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  data: mediaAlignmentTableResponse1,
};
