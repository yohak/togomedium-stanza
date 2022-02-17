import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { PhenotypeSection } from "./PhenotypeSection";
import { makeComponentStoryTitle } from "../../../utils/storybook";

export default {
  title: makeComponentStoryTitle(PhenotypeSection.name, "MediaFinder"),
  component: PhenotypeSection,
} as ComponentMeta<typeof PhenotypeSection>;

const Template: ComponentStory<typeof PhenotypeSection> = (args) => <PhenotypeSection {...args} />;

const defaultArgs: ComponentProps<typeof PhenotypeSection> = {};

export const Primary = Template.bind({});
Primary.args = { ...defaultArgs };
