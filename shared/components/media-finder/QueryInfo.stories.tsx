import { css } from "@emotion/react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps, FC, useEffect } from "react";
import { QueryInfo } from "./QueryInfo";
import { QueryData, useQueryDataMutators } from "../../state/media-finder/queryData";
import { COLOR_WHITE, SIZE2 } from "../../styles/variables";
import { makeComponentStoryTitle } from "../../utils/storybook";

type WrapperProps = { queryData: QueryData } & ComponentProps<typeof QueryInfo>;
const Wrapper: FC<WrapperProps> = (args) => {
  const { setQueryData } = useQueryDataMutators();
  useEffect(() => {
    setQueryData(args.queryData);
  }, [args.queryData]);
  return (
    <div css={wrapper}>
      <QueryInfo />
    </div>
  );
};

export default {
  title: makeComponentStoryTitle(QueryInfo.name, "MediaFinder"),
  component: Wrapper,
} as ComponentMeta<typeof Wrapper>;

const Template: ComponentStory<typeof Wrapper> = (args) => <Wrapper {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  queryData: {
    "tax-id": ["123456", "725851", "447413"],
  },
};

const wrapper = css`
  background-color: ${COLOR_WHITE};
  padding: ${SIZE2};
`;
