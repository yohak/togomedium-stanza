import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { OrganismListItem } from "./OrganismListItem";
import { makeComponentStoryTitle, makeNoPadding } from "../../../shared/utils/storybook";

export default {
  title: makeComponentStoryTitle(OrganismListItem.name, "FindMediaByOrganismPhenotype"),
  component: OrganismListItem,
} as ComponentMeta<typeof OrganismListItem>;

const Template: ComponentStory<typeof OrganismListItem> = (args) => <OrganismListItem {...args} />;

const defaultArgs: ComponentProps<typeof OrganismListItem> = {
  id: "666685",
  label: "Rhodanobacter denitrificans",
  isChecked: true,
  onClick: () => {},
};

export const Primary = Template.bind({});
Primary.args = { ...defaultArgs };

makeNoPadding(Primary);
