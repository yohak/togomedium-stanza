import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { SelectBox } from "./SelectBox";
import { makeComponentStoryTitle } from "../../../shared/utils/storybook";

export default {
  title: makeComponentStoryTitle(SelectBox.name, "FindMediaByOrganismPhenotype"),
  component: SelectBox,
} as ComponentMeta<typeof SelectBox>;

const Template: ComponentStory<typeof SelectBox> = (args) => <SelectBox {...args} />;

const defaultArgs: ComponentProps<typeof SelectBox> = {
  label: "Oxygen requirement",
  queryKey: "MPO_10002",
  items: [
    ["MPO_04002", "Aerobe"],
    ["MPO_04003", "Anaerobe"],
    ["MPO_04004", "Obligate aerobe"],
    ["MPO_04005", "Facultative aerobe"],
    ["MPO_04006", "Obligate anaerobe"],
    ["MPO_04007", "Facultative anaerobe"],
    ["MPO_04009", "Microaerophilic"],
  ],
  handleEnabledChange: () => {},
  handleValueChange: () => {},
};

export const Primary = Template.bind({});
Primary.args = { ...defaultArgs };
