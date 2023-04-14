import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { RecipeTable } from "./RecipeTable";

export default {
  title: RecipeTable.name,
  component: RecipeTable,
} as ComponentMeta<typeof RecipeTable>;

const Template: ComponentStory<typeof RecipeTable> = (args) => <RecipeTable {...args} />;

const defaultArgs: ComponentProps<typeof RecipeTable> = {};

export const Primary = Template.bind({});
Primary.args = { ...defaultArgs };
