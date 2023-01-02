import { css } from "@emotion/react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps, FC, useEffect } from "react";
import { ActionPane } from "./ActionPane";
import { QueryInfo } from "./QueryInfo";
import { COLOR_WHITE, SIZE2 } from "../../../components/styles";
import { QueryData, useQueryDataMutators } from "../../../shared/state/queryData";
import { useSelectedMediaMutators } from "../../../shared/state/selectedMedia";
import { makeComponentStoryTitle } from "../../../utils/storybook";

type WrapperProps = { queryData: QueryData } & ComponentProps<typeof QueryInfo>;
const Wrapper: FC<WrapperProps> = (args) => {
  const { setQueryData } = useQueryDataMutators();
  useEffect(() => {
    setQueryData(args.queryData);
  }, [args.queryData]);
  return (
    <div css={wrapper}>
      <QueryInfo {...args} />
    </div>
  );
};

export default {
  title: makeComponentStoryTitle(QueryInfo.name, "FindMediaByTaxonomicTree"),
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
