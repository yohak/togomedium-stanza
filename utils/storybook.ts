type StanzaNames = "MediaFinder" | "MediaAlignmentTable";
export const makeComponentStoryTitle = (name: string, stanza: StanzaNames): string =>
  `Components/${stanza}/${name}`;
