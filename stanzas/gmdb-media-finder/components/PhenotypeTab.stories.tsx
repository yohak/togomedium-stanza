import { ComponentMeta, ComponentStory } from "@storybook/react";
import { PhenotypeTab } from "./PhenotypeTab";
import { makeComponentStoryTitle } from "../../../utils/storybook";

export default {
  title: makeComponentStoryTitle("PhenotypeTab", "MediaFinder"),
  component: PhenotypeTab,
} as ComponentMeta<typeof PhenotypeTab>;

const Template: ComponentStory<typeof PhenotypeTab> = (args) => <PhenotypeTab {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
