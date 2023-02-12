import { ComponentStory } from "@storybook/react";
import { RestHandler } from "msw";

type StanzaNames =
  | "ComponentByGmoid"
  | "MediaFinder"
  | "MediaAlignmentTable"
  | "FindMediaByTaxonomicTree"
  | "FindMediaByComponents"
  | "FindMediaByOrganismPhenotype";
export const makeComponentStoryTitle = (name: string, stanza: StanzaNames): string =>
  `Components/${stanza}/${name}`;

export const makeMswParameter = (handlers: RestHandler[]) => {
  return { handlers };
};

export const makeNoPadding = (Story: ComponentStory<any>) => {
  Story.parameters = { ...Story.parameters, paddings: { disable: true } };
};
