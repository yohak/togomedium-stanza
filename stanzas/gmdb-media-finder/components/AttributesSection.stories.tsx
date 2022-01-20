import { css } from "@emotion/react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AttributesSection } from "./AttributesSection";
import { COLOR_WHITE, SIZE2 } from "../../../components/styles";
import { makeComponentStoryTitle } from "../../../utils/storybook";

export default {
  title: makeComponentStoryTitle("AttributesSection", "MediaFinder"),
  component: AttributesSection,
} as ComponentMeta<typeof AttributesSection>;

const Template: ComponentStory<typeof AttributesSection> = (args) => (
  <div css={wrapper}>
    <AttributesSection {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {};

const wrapper = css`
  background-color: ${COLOR_WHITE};
  padding: ${SIZE2};
`;
