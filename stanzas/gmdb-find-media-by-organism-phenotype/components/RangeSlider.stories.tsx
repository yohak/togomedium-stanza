import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { RangeSlider } from "./RangeSlider";
import { makeComponentStoryTitle } from "../../../shared/utils/storybook";

export default {
  title: makeComponentStoryTitle(RangeSlider.name, "FindMediaByOrganismPhenotype"),
  component: RangeSlider,
} as ComponentMeta<typeof RangeSlider>;

const Template: ComponentStory<typeof RangeSlider> = (args) => <RangeSlider {...args} />;

const defaultArgs: ComponentProps<typeof RangeSlider> = {
  min: 0,
  max: 110,
  label: "Growth Temperature",
  marks: [
    { value: 0, label: "0°C" },
    { value: 37, label: "37°C" },
    { value: 110, label: "110°C" },
  ],
};

export const Primary = Template.bind({});
Primary.args = { ...defaultArgs };
