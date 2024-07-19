import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { FoundOrganismsList } from "./FoundOrganismsList";
import { makeComponentStoryTitle } from "../../../shared/utils/storybook";

export default {
  title: makeComponentStoryTitle(FoundOrganismsList.name, "FindMediaByOrganismPhenotype"),
  component: FoundOrganismsList,
} as ComponentMeta<typeof FoundOrganismsList>;

const Template: ComponentStory<typeof FoundOrganismsList> = (args) => (
  <FoundOrganismsList {...args} />
);

const defaultArgs: ComponentProps<typeof FoundOrganismsList> = {};

export const Primary = Template.bind({});
Primary.args = { ...defaultArgs };
