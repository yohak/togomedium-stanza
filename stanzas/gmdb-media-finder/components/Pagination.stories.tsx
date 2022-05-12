import { css } from "@emotion/react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { Pagination } from "./Pagination";
import { makeComponentStoryTitle } from "../../../utils/storybook";

export default {
  title: makeComponentStoryTitle(Pagination.name, "MediaFinder"),
  component: Pagination,
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = (args) => (
  <div
    css={css`
      width: 600px;
      background-color: white;
      padding: 20px;
    `}
  >
    <Pagination {...args} />
  </div>
);

const defaultArgs: ComponentProps<typeof Pagination> = {
  total: 35,
  current: 0,
  displayLength: 10,
  onClickNext: () => {},
  onClickPrev: () => {},
};
export const Primary = Template.bind({});
Primary.args = { ...defaultArgs };

export const Type1 = Template.bind({});
Type1.args = { ...defaultArgs, current: 10 };

export const Type2 = Template.bind({});
Type2.args = { ...defaultArgs, current: 25 };
