import { ComponentMeta, ComponentStory } from "@storybook/react";
import App from "./App";
import { makeMswParameter } from "../../shared/utils/storybook";

export default {
  title: "Stanzas/StrainAlignment",
  component: App,
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = (args) => <App {...args} />;

export const Result1 = Template.bind({});
Result1.args = { gm_ids: ["JCM_M900", "HM_D00067"] };
Result1.parameters = {
  msw: makeMswParameter([
    // ...mediaByAttributesMocks,
    // ...mediaByTaxonMocks,
    // ...taxonomyChildrenMocks,
  ]),
};
