import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { StanzaView } from "./StanzaView";
import { makeComponentStoryTitle } from "../../../shared/utils/storybook";

export default {
  title: makeComponentStoryTitle(StanzaView.name, "TaxonByTaxid"),
  component: StanzaView,
} as ComponentMeta<typeof StanzaView>;

const Template: ComponentStory<typeof StanzaView> = (args) => <StanzaView {...args} />;

const defaultArgs: ComponentProps<typeof StanzaView> = {
  taxid: "315405",
  scientificName: "Streptococcus gallolyticus",
  authorityName: "Streptococcus caprinus Brooker et al. 1996",
  lineage: {
    superkingdom: {
      taxid: "2",
      label: "Bacteria",
    },
    phylum: {
      taxid: "1239",
      label: "Firmicutes",
    },
    class: {
      taxid: "91061",
      label: "Bacilli",
    },
    order: {
      taxid: "186826",
      label: "Lactobacillales",
    },
    family: {
      taxid: "1300",
      label: "Streptococcaceae",
    },
    genus: {
      taxid: "1301",
      label: "Streptococcus",
    },
    species: {
      taxid: "315405",
      label: "Streptococcus gallolyticus",
    },
  },
  typeMaterials: [
    "ACM 3611",
    "CCUG 35224",
    "CIP 105428",
    "DSM 16831",
    "HDP 98035",
    "JCM 10005",
    "LMG 16802",
    "LMG:16802",
    "NCTC 13773",
  ],
  otherTypeMaterials: [
    {
      key: "Streptococcus caprinus",
      labels: ["ACM 3969", "ATCC 700065", "LMG 15572", "LMG:15572", "strain TPC 2.3"],
    },
  ],
};

export const Primary = Template.bind({});
Primary.args = { ...defaultArgs };
