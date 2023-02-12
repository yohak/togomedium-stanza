import { css } from "@emotion/react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentSelect } from "./ComponentSelect";
import { COLOR_WHITE, SIZE2 } from "../../../shared/styles/variables";
import { makeComponentStoryTitle } from "../../../shared/utils/storybook";

export default {
  title: makeComponentStoryTitle(ComponentSelect.name, "FindMediaByComponents"),
  component: ComponentSelect,
} as ComponentMeta<typeof ComponentSelect>;

const Template: ComponentStory<typeof ComponentSelect> = (args) => (
  <div css={wrapper}>
    <ComponentSelect {...args} />
  </div>
);

export const Primary = Template.bind({});
// Primary.parameters = {
//   msw: makeMswParameter(allComponentsMocks),
// };
Primary.args = {
  onChangeSelection: (ids) => {
    console.log(ids);
  },
};

const wrapper = css`
  background-color: ${COLOR_WHITE};
  padding: ${SIZE2};
`;
