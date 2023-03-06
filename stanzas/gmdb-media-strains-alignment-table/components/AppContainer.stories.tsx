import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AppContainer } from "./AppContainer";
import { data1 } from "../../../api/media_strains_alignment/data1";
import { data2 } from "../../../api/media_strains_alignment/data2";
import { data3 } from "../../../api/media_strains_alignment/data3";
import { makeComponentStoryTitle, makeMswParameter } from "../../../shared/utils/storybook";

export default {
  title: makeComponentStoryTitle(AppContainer.name, "MediaStrainAlignment"),
  component: AppContainer,
} as ComponentMeta<typeof AppContainer>;

const Template: ComponentStory<typeof AppContainer> = (args) => <AppContainer {...args} />;

export const Primary = Template.bind({});
Primary.parameters = {
  msw: makeMswParameter([
    // ...mediaByAttributesMocks,
    // ...mediaByTaxonMocks,
    // ...organismsByPhenotypesMocks,
  ]),
};
Primary.args = { data: data1 };
export const WithNull = Template.bind({});
WithNull.args = { data: data2 };

export const NoOrganisms = Template.bind({});
NoOrganisms.args = { data: data3 };
