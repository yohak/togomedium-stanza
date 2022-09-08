import { ComponentMeta, ComponentStory } from "@storybook/react";
import App from "./App";

export default {
  title: "Stanzas/MediaAlignmentTable",
  component: App,
  argTypes: { gm_ids: ["aaa"] },
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = (args) => (
  <App gm_ids={args.gm_ids} prioritizedOrganism={args.prioritizedOrganism} />
);

export const Result1 = Template.bind({});
Result1.args = {
  gm_ids: ["HM_D00001a", "HM_D00065"],
};

export const Priority = Template.bind({});
Priority.args = {
  gm_ids: ["HM_D00001a", "HM_D00065"],
  prioritizedOrganism: ["1124983", "446421"],
};

Result1.parameters = {
  // msw: makeMswParameter(mediaAlignmentTableMocks),
};
