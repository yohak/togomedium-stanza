import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { SelectedOrganismsList } from "./SelectedOrganismsList";
import { makeComponentStoryTitle } from "../../../shared/utils/storybook";

export default {
  title: makeComponentStoryTitle(SelectedOrganismsList.name, "FindMediaByOrganismPhenotype"),
  component: SelectedOrganismsList,
} as ComponentMeta<typeof SelectedOrganismsList>;

const Template: ComponentStory<typeof SelectedOrganismsList> = (args) => (
  <SelectedOrganismsList {...args} />
);

const defaultArgs: ComponentProps<typeof SelectedOrganismsList> = {};

export const Primary = Template.bind({});
Primary.args = { ...defaultArgs };
