import { Meta, StoryObj } from "@storybook/react";
import App from "./App";
import { mediaAlignmentTableMocks } from "../../api/media-alignment-table/msw";
import { makeMswParameter } from "../../shared/utils/storybook";

const meta: Meta<typeof App> = {
  component: App,
  parameters: {
    msw: makeMswParameter(mediaAlignmentTableMocks),
  },
};
export default meta;

type Story = StoryObj<typeof App>;
export const Result1: Story = {
  args: { gm_ids: ["HM_D00001a", "HM_D00065"] },
};
export const Priority: Story = {
  args: {
    gm_ids: ["HM_D00001a", "HM_D00065"],
    prioritizedOrganism: ["1124983", "446421"],
  },
};
