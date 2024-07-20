import { Meta, StoryObj } from "@storybook/react";
import { StanzaView } from "./StanzaView";

const meta: Meta<typeof StanzaView> = {
  component: StanzaView,
};
export default meta;

type Story = StoryObj<typeof StanzaView>;
export const Primary: Story = {
  args: {
    strainId: "S602",
    strainName: "Streptomyces nodosus Trejo 1961",
    infoSources: [
      {
        url: "https://www.jcm.riken.jp/cgi-bin/jcm/jcm_number?JCM=JCM%204656",
        label: "JCM 4656",
      },
    ],
    taxonomy: {
      name: "Streptomyces nodosus",
      taxId: "40318",
      rank: "Species",
      authorityName: "Streptomyces nodosus Trejo 1961",
      lineage: {
        superkingdom: {
          taxid: "2",
          label: "Bacteria",
        },
        phylum: {
          taxid: "201174",
          label: "Actinobacteria",
        },
        class: {
          taxid: "1760",
          label: "Actinobacteria",
        },
        order: {
          taxid: "85011",
          label: "Streptomycetales",
        },
        family: {
          taxid: "2062",
          label: "Streptomycetaceae",
        },
        genus: {
          taxid: "1883",
          label: "Streptomyces",
        },
        species: {
          taxid: "40318",
          label: "Streptomyces nodosus",
        },
      },
    },
  },
};
