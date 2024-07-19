import { css } from "@emotion/react";
import { Meta, StoryObj } from "@storybook/react";
import { ComponentProps, useEffect } from "react";
import { QueryInfo } from "./QueryInfo";
import { QueryData, useQueryDataMutators } from "../../state/media-finder/queryData";
import { COLOR_WHITE, SIZE2 } from "../../styles/variables";

const wrapper = css`
  background-color: ${COLOR_WHITE};
  padding: ${SIZE2};
`;

type WithCustomArgs = { queryData: QueryData } & ComponentProps<typeof QueryInfo>;
const meta: Meta<WithCustomArgs> = {
  component: QueryInfo,
  decorators: [
    (StoryItem, { args }) => {
      const { queryData } = args;
      const { setQueryData } = useQueryDataMutators();
      useEffect(() => {
        setQueryData(queryData);
      }, [queryData]);
      return (
        <div css={wrapper}>
          <StoryItem />
        </div>
      );
    },
  ],
};
export default meta;

type Story = StoryObj<WithCustomArgs>;
export const Primary: Story = {
  args: {
    queryData: {
      "tax-id": ["123456", "725851", "447413"],
    },
  },
};
