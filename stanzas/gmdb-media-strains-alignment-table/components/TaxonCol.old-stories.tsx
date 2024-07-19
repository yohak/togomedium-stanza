import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { TaxonCol } from "./TaxonCol";
import { data1 } from "../../../api/media_strains_alignment/data1";
import { makeComponentStoryTitle } from "../../../shared/utils/storybook";
import { __SB_TEST__ } from "../functions/processMediaCell";

const { processTaxonCol, makeTaxonTreesFromData } = __SB_TEST__;

export default {
  title: makeComponentStoryTitle(TaxonCol.name, "MediaStrainAlignment"),
  component: TaxonCol,
} as ComponentMeta<typeof TaxonCol>;

const Template: ComponentStory<typeof TaxonCol> = (args) => <TaxonCol {...args} />;

const data = makeTaxonTreesFromData(data1);
const defaultArgs: ComponentProps<typeof TaxonCol> = {
  rank: "species",
  taxonList: processTaxonCol(data, "species", "strain"),
};

export const Species = Template.bind({});
Species.args = { ...defaultArgs };

export const Order = Template.bind({});
Order.args = { rank: "order", taxonList: processTaxonCol(data, "order", "strain") };

export const Superkingdom = Template.bind({});
Superkingdom.args = {
  rank: "superkingdom",
  taxonList: processTaxonCol(data, "superkingdom", "strain"),
};
