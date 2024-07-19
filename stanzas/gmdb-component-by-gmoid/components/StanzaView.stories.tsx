import { Meta, StoryObj } from "@storybook/react";
import { StanzaView } from "./StanzaView";

const meta: Meta<typeof StanzaView> = {
  component: StanzaView,
};
export default meta;

type Story = StoryObj<typeof StanzaView>;
export const Primary: Story = {
  args: {
    prefLabel: "Hexahydro-1H-1,4-diazepine-1,4-bis(2-ethanesulfonic acid) solution",
    gmoId: "GMO_001925",
    altLabels: ["HomoPIPES solution"],
    properties: [
      {
        gmo_id: "GMO_000046",
        uri: "http://purl.jp/bio/10/gmo/GMO_000046",
        label_en: "Defined component",
      },
      {
        gmo_id: "GMO_000041",
        uri: "http://purl.jp/bio/10/gmo/GMO_000041",
        label_en: "Organic compound",
      },
      {
        gmo_id: "GMO_000051",
        uri: "http://purl.jp/bio/10/gmo/GMO_000051",
        label_en: "Solution",
      },
    ],
    roles: [
      {
        gmo_id: "GMO_000038",
        uri: "http://purl.jp/bio/10/gmo/GMO_000038",
        label_en: "Buffer",
      },
    ],
    superClasses: [
      {
        gmo_id: "GMO_001924",
        uri: "http://purl.jp/bio/10/gmo/GMO_001924",
        label_en: "Homo-PIPES",
      },
    ],
    subClasses: [],
    links: [],
  },
};

export const Water: Story = {
  args: {
    prefLabel: "Distilled water",
    gmoId: "GMO_001001",
    altLabels: [],
    properties: [
      {
        gmo_id: "GMO_000046",
        uri: "http://purl.jp/bio/10/gmo/GMO_000046",
        label_en: "Defined component",
      },
      {
        gmo_id: "GMO_000049",
        uri: "http://purl.jp/bio/10/gmo/GMO_000049",
        label_en: "Simple component",
      },
      {
        gmo_id: "GMO_000040",
        uri: "http://purl.jp/bio/10/gmo/GMO_000040",
        label_en: "Inorganic compound",
      },
    ],
    roles: [
      {
        gmo_id: "GMO_000044",
        uri: "http://purl.jp/bio/10/gmo/GMO_000044",
        label_en: "Solvating media",
      },
    ],
    superClasses: [
      {
        gmo_id: "GMO_001890",
        uri: "http://purl.jp/bio/10/gmo/GMO_001890",
        label_en: "Purified water",
      },
    ],
    subClasses: [],
    links: [
      {
        label: "Wikipedia",
        uri: "http://en.wikipedia.org/wiki/Distilled_water",
      },
      {
        label: "NCI Thesaurus",
        uri: "http://ncicb.nci.nih.gov/xml/owl/EVS/Thesaurus.owl#Distilled_Water",
      },
      {
        label: "PubChem",
        uri: "http://www.ncbi.nlm.nih.gov/pccompound/962",
      },
      {
        label: "SNOMED-CT",
        uri: "http://purl.bioontology.org/ontology/SNOMEDCT/444883009",
      },
    ],
  },
};
