import { css } from "@emotion/react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { QueryPane } from "./QueryPane";
import { allComponentsMocks } from "../../../api/all-components/msw";
import { makeComponentStoryTitle, makeMswParameter } from "../../../utils/storybook";

export default {
  title: makeComponentStoryTitle("QueryPane", "MediaFinder"),
  component: QueryPane,
} as ComponentMeta<typeof QueryPane>;

const Template: ComponentStory<typeof QueryPane> = (args) => <QueryPane css={extraCSS} {...args} />;

export const Primary = Template.bind({});
Primary.parameters = {
  msw: makeMswParameter(allComponentsMocks),
};
Primary.args = {};

const extraCSS = css`
  height: 500px;
`;
