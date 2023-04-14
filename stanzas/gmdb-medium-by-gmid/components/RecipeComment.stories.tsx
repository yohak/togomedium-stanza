import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { RecipeComment } from "./RecipeComment";

export default {
  title: RecipeComment.name,
  component: RecipeComment,
} as ComponentMeta<typeof RecipeComment>;

const Template: ComponentStory<typeof RecipeComment> = (args) => <RecipeComment {...args} />;

const defaultArgs: ComponentProps<typeof RecipeComment> = {};

export const Primary = Template.bind({});
Primary.args = { ...defaultArgs };
