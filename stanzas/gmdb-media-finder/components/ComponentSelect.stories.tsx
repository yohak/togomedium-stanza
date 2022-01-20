import { css } from "@emotion/react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentSelect } from "./ComponentSelect";
import { COLOR_WHITE, SIZE2 } from "../../../components/styles";
import { makeComponentStoryTitle } from "../../../utils/storybook";

export default {
  title: makeComponentStoryTitle("ComponentSelect", "MediaFinder"),
  component: ComponentSelect,
} as ComponentMeta<typeof ComponentSelect>;

const Template: ComponentStory<typeof ComponentSelect> = (args) => (
  <div css={wrapper}>
    <ComponentSelect {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  onChangeSelection: (ids) => {
    console.log(ids);
  },
};

const wrapper = css`
  background-color: ${COLOR_WHITE};
  padding: ${SIZE2};
`;
