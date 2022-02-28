import { ComponentMeta, ComponentStory } from "@storybook/react";
import App from "./App";
import { mediaAlignmentTableMocks } from "../../api/media-alignment-table/msw";
import { makeMswParameter } from "../../utils/storybook";

export default {
  title: "Stanzas/MediaAlignmentTable",
  component: App,
  argTypes: { gm_ids: ["aaa"] },
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = (args) => <App gm_ids={args.gm_ids} />;

export const Result1 = Template.bind({});
Result1.args = {
  gm_ids: ["HM_D00001a", "HM_D00065"],
};

Result1.parameters = {
  // msw: makeMswParameter(mediaAlignmentTableMocks),
};
