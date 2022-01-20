import { css } from "@emotion/react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { QueryMethodTab } from "./QueryMethodTab";
import { COLOR_WHITE } from "../../../components/styles";
import { makeComponentStoryTitle } from "../../../utils/storybook";

export default {
  title: makeComponentStoryTitle("QueryMethodTab", "MediaFinder"),
  component: QueryMethodTab,
} as ComponentMeta<typeof QueryMethodTab>;

const Template: ComponentStory<typeof QueryMethodTab> = (args) => (
  <QueryMethodTab css={wrapper} {...args} className={"aaa"} />
);

export const Primary = Template.bind({});
Primary.args = {};

const wrapper = css`
  background-color: ${COLOR_WHITE};
`;
