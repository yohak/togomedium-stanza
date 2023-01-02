import { ComponentMeta, ComponentStory } from "@storybook/react";
import App from "./App";
import { mediaByAttributesMocks } from "../../api/media_by_attributes/msw";
import { mediaByTaxonMocks } from "../../api/media_by_taxon/msw";
import { taxonomyChildrenMocks } from "../../api/taxonomy_children/msw";
import { makeMswParameter } from "../../utils/storybook";

export default {
  title: "Stanzas/FindMediaByTaxonomicTree",
  component: App,
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = (args) => <App />;

export const Result1 = Template.bind({});

Result1.parameters = {
  msw: makeMswParameter([
    // ...mediaByAttributesMocks,
    // ...mediaByTaxonMocks,
    // ...taxonomyChildrenMocks,
  ]),
};
