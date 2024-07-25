import { Meta, StoryObj } from "@storybook/react";
import { ListTable } from "./ListTable";
import { LoadingCover } from "./LoadingCover";
import { data1 } from "../../../api/all-media/data1";
import { StanzaWrapper } from "../../../shared/components/StanzaWrapper";

const meta: Meta<typeof LoadingCover> = {
  component: LoadingCover,
  decorators: [
    (Story) => (
      <StanzaWrapper>
        <div style={{ position: "relative" }}>
          <ListTable data={data1} showColumnNames={true} columnSizes={[]} limit={20} />
          <Story />
        </div>
      </StanzaWrapper>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof LoadingCover>;
const defaultArgs: Story["args"] = {
  showLoading: true,
  errorMessage: "",
};
export const Primary: Story = {
  args: {
    ...defaultArgs,
  },
};
export const ErrorMessage: Story = {
  args: {
    ...defaultArgs,
    errorMessage: "Internal Server Error",
  },
};
export const Hidden: Story = {
  args: {
    ...defaultArgs,
    showLoading: false,
  },
};
