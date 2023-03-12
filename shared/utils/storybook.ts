import { ComponentStory } from "@storybook/react";
import { RestHandler } from "msw";

type StanzaNames =
  | "ComponentByGmoid"
  | "TaxonByTaxid"
  | "StrainByStrainId"
  | "MediaFinder"
  | "MediaAlignmentTable"
  | "FindMediaByTaxonomicTree"
  | "FindMediaByComponents"
  | "FindMediaByOrganismPhenotype"
  | "MediaStrainAlignment"
  | "icons";
export const makeComponentStoryTitle = (name: string, stanza: StanzaNames): string =>
  `Components/${stanza}/${name}`;

export const makeMswParameter = (handlers: RestHandler[]) => {
  return { handlers };
};

export const makeNoPadding = (Story: ComponentStory<any>) => {
  Story.parameters = { ...Story.parameters, paddings: { disable: true } };
};
