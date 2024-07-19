import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { OrganismTab } from "./OrganismTab";
import { makeComponentStoryTitle } from "../../../shared/utils/storybook";

export default {
  title: makeComponentStoryTitle(OrganismTab.name, "FindMediaByOrganismPhenotype"),
  component: OrganismTab,
} as ComponentMeta<typeof OrganismTab>;

const Template: ComponentStory<typeof OrganismTab> = (args) => <OrganismTab {...args} />;

const defaultArgs: ComponentProps<typeof OrganismTab> = {};

export const Primary = Template.bind({});
Primary.args = { ...defaultArgs };
