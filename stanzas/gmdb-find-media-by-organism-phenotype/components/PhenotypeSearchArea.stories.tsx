import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { PhenotypeSearchArea } from "./PhenotypeSearchArea";
import { makeComponentStoryTitle } from "../../../shared/utils/storybook";

export default {
  title: makeComponentStoryTitle(PhenotypeSearchArea.name, "FindMediaByOrganismPhenotype"),
  component: PhenotypeSearchArea,
} as ComponentMeta<typeof PhenotypeSearchArea>;

const Template: ComponentStory<typeof PhenotypeSearchArea> = (args) => (
  <PhenotypeSearchArea {...args} />
);

const defaultArgs: ComponentProps<typeof PhenotypeSearchArea> = {};

export const Primary = Template.bind({});
Primary.args = { ...defaultArgs };
