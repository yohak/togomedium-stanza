import { RestHandler } from "msw";

type StanzaNames = "MediaFinder" | "MediaAlignmentTable";
export const makeComponentStoryTitle = (name: string, stanza: StanzaNames): string =>
  `Components/${stanza}/${name}`;

export const makeMswParameter = (handlers: RestHandler[]) => {
  return { handlers };
};
