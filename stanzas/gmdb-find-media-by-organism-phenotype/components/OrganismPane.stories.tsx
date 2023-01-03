import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { OrganismPane } from "./OrganismPane";
import { makeComponentStoryTitle } from "../../../shared/utils/storybook";

export default {
  title: makeComponentStoryTitle(OrganismPane.name, "FindMediaByOrganismPhenotype"),
  component: OrganismPane,
} as ComponentMeta<typeof OrganismPane>;

const Template: ComponentStory<typeof OrganismPane> = (args) => <OrganismPane {...args} />;

const defaultArgs: ComponentProps<typeof OrganismPane> = {};

export const Primary = Template.bind({});
Primary.args = { ...defaultArgs };
