import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { StanzaView } from "./StanzaView";
import { makeComponentStoryTitle } from "../../../shared/utils/storybook";

export default {
  title: makeComponentStoryTitle(StanzaView.name, "ComponentByGmoid"),
  component: StanzaView,
} as ComponentMeta<typeof StanzaView>;

const Template: ComponentStory<typeof StanzaView> = (args) => <StanzaView {...args} />;

const defaultArgs: ComponentProps<typeof StanzaView> = {
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
};

export const Primary = Template.bind({});
Primary.args = { ...defaultArgs };

export const Water = Template.bind({});
const waterArgs: ComponentProps<typeof StanzaView> = {
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
};
Water.args = waterArgs;
