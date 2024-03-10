import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { ListTable } from "./ListTable";
import { data1 } from "../../../api/all-media/data1";
import { StanzaWrapper } from "../../../shared/components/StanzaWrapper";
import { makeComponentStoryTitle } from "../../../shared/utils/storybook";

export default {
  title: makeComponentStoryTitle(ListTable.name, "MetaList"),
  component: ListTable,
  decorators: [
    (Story) => (
      <StanzaWrapper>
        <Story />
      </StanzaWrapper>
    ),
  ],
} as ComponentMeta<typeof ListTable>;

const Template: ComponentStory<typeof ListTable> = (args) => <ListTable {...args} />;

const defaultArgs: ComponentProps<typeof ListTable> = {
  data: data1,
  showColumnNames: true,
  columnSizes: [15, 15, 70],
  limit: 20,
};

export const Primary = Template.bind({});
Primary.args = { ...defaultArgs };

export const EmptyRows = Template.bind({});
EmptyRows.args = { ...defaultArgs, limit: 25 };
