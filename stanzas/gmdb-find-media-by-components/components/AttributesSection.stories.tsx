import { css } from "@emotion/react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AttributesSection } from "./AttributesSection";
import { allComponentsMocks } from "../../../api/all-components/msw";
import { COLOR_WHITE, SIZE2 } from "../../../shared/styles/variables";
import { makeComponentStoryTitle, makeMswParameter } from "../../../shared/utils/storybook";

export default {
  title: makeComponentStoryTitle(AttributesSection.name, "FindMediaByComponents"),
  component: AttributesSection,
} as ComponentMeta<typeof AttributesSection>;

const Template: ComponentStory<typeof AttributesSection> = (args) => (
  <div css={wrapper}>
    <AttributesSection {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.parameters = {
  msw: makeMswParameter(allComponentsMocks),
};
Primary.args = {};

const wrapper = css`
  background-color: ${COLOR_WHITE};
  padding: ${SIZE2};
`;
