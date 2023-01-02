import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AppContainer } from "./AppContainer";
import { mediaByAttributesMocks } from "../../../api/media_by_attributes/msw";
import { mediaByTaxonMocks } from "../../../api/media_by_taxon/msw";
import { organismsByPhenotypesMocks } from "../../../api/organisms_by_phenotypes/msw";
import { makeComponentStoryTitle, makeMswParameter } from "../../../utils/storybook";

export default {
  title: makeComponentStoryTitle(AppContainer.name, "FindMediaByTaxonomicTree"),
  component: AppContainer,
} as ComponentMeta<typeof AppContainer>;

const Template: ComponentStory<typeof AppContainer> = (args) => <AppContainer {...args} />;

export const Primary = Template.bind({});
Primary.parameters = {
  msw: makeMswParameter([
    ...mediaByAttributesMocks,
    ...mediaByTaxonMocks,
    ...organismsByPhenotypesMocks,
  ]),
};
Primary.args = {};
