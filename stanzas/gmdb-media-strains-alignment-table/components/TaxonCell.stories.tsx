import { Meta, StoryObj } from "@storybook/react";
import { ComponentProps, useEffect } from "react";
import { TaxonCell } from "./TaxonCell";
import { useFilterTaxonMutators } from "../states/filterTaxon";

type WithCustomArgs = ComponentProps<typeof TaxonCell> & { filterId: string };
const meta: Meta<WithCustomArgs> = {
  component: TaxonCell,
  decorators: [
    (StoryItem, { args }) => {
      const { filterId } = args;
      const { setFilterTaxon } = useFilterTaxonMutators();
      useEffect(() => {
        setFilterTaxon(filterId);
      }, [filterId, setFilterTaxon]);
      return <StoryItem />;
    },
  ],
};
export default meta;

const defaultArgs: WithCustomArgs = {
  id: "201224",
  label: "Rhizophydium sp.",
  size: 1,
  rank: "species",
  filterId: "",
  isFolded: false,
};

type Story = StoryObj<WithCustomArgs>;

export const Primary: Story = {
  args: { ...defaultArgs },
};
export const Filtered: Story = {
  args: { ...defaultArgs, filterId: "201224" },
};
