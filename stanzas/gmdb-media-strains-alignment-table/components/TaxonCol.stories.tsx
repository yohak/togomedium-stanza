import { Meta, StoryObj } from "@storybook/react";
import { TaxonCol } from "./TaxonCol";
import { data1 } from "../../../api/media_strains_alignment/data1";
import { __SB_TEST__ } from "../functions/processMediaCell";

const { processTaxonCol, makeTaxonTreesFromData } = __SB_TEST__;
const data = makeTaxonTreesFromData(data1);

const meta: Meta<typeof TaxonCol> = {
  component: TaxonCol,
};
export default meta;

type Story = StoryObj<typeof TaxonCol>;
export const Species: Story = {
  args: {
    rank: "species",
    taxonList: processTaxonCol(data, "species", "strain"),
  },
};
export const Order: Story = {
  args: {
    rank: "order",
    taxonList: processTaxonCol(data, "order", "strain"),
  },
};
export const Superkingdom: Story = {
  args: {
    rank: "superkingdom",
    taxonList: processTaxonCol(data, "superkingdom", "strain"),
  },
};
