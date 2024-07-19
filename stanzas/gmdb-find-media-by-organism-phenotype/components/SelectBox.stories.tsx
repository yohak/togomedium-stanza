import { Meta, StoryObj } from "@storybook/react";
import { SelectBox } from "./SelectBox";

const meta: Meta<typeof SelectBox> = {
  component: SelectBox,
};
export default meta;

type Story = StoryObj<typeof SelectBox>;
export const Primary: Story = {
  args: {
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
  },
};
