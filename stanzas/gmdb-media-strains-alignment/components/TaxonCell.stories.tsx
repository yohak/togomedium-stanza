import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps, FC, useEffect } from "react";
import { TaxonCell } from "./TaxonCell";
import { makeComponentStoryTitle } from "../../../shared/utils/storybook";
import { useFilterIdMutators } from "../states/filterId";

type WrapperProps = {
  filterId: string;
} & ComponentProps<typeof TaxonCell>;
const Wrapper: FC<WrapperProps> = (args) => {
  const { setFilterId } = useFilterIdMutators();
  setFilterId(args.filterId);
  useEffect(() => {
    setFilterId(args.filterId);
  }, [args.filterId]);
  return <TaxonCell {...args} />;
};

export default {
  title: makeComponentStoryTitle(TaxonCell.name, "MediaStrainAlignment"),
  component: TaxonCell,
} as ComponentMeta<typeof Wrapper>;

const Template: ComponentStory<typeof Wrapper> = (args) => <TaxonCell {...args} />;

const defaultArgs: ComponentProps<typeof Wrapper> = {
  id: "201224",
  label: "Rhizophydium sp.",
  size: 1,
  rank: "species",
  filterId: "",
};

export const Primary = Template.bind({});
Primary.args = { ...defaultArgs };

export const Filtered = Template.bind({});
Filtered.args = { ...defaultArgs, filterId: "201224" };
