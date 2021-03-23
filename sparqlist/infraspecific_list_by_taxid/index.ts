import {
  ListApiBody,
  ListColumn,
  ListContent,
} from "../../stanzas/gmdb-meta-list";

export const json = (
  result: SPARQLResponse,
  count: SPARQLResponse
): ListApiBody => {
  const parseSparqlObject = (obj: any) => {
    const result: any = {};
    try {
      Object.entries(obj).forEach(([key, item]: [string, any]) => {
        result[key] = item["value"];
      });
    } catch (e) {}
    return Object.entries(result).length ? result : null;
  };

  const getIdFromUri = (str: string): string => {
    return str.split("/").pop();
  };

  const info = parseSparqlObject(count.results.bindings[0]);
  const total: number = !!info ? parseInt(info.total) : 0;
  const offset: number = !!info ? parseInt(info.offset) : 0;
  const limit: number = !!info ? parseInt(info.limit) : 0;
  //
  const KEY_ID: string = "id";
  const KEY_RANK: string = "rank";
  const KEY_NAME: string = "name";

  const columns: ListColumn[] = [
    { key: KEY_ID, label: "TAX ID" },
    { key: KEY_RANK, label: "Rank" },
    { key: KEY_NAME, label: "Name" },
  ];
  const contents: ListContent[] = result.results.bindings
    .map((r: any) => parseSparqlObject(r))
    .map((r: any) => ({ ...r, id: getIdFromUri(r.tax) }))
    .map((r: any) => ({
      [KEY_ID]: {
        label: r.id,
        href: `/organism/${r.id}`,
      },
      [KEY_RANK]: r.rank,
      [KEY_NAME]: r.name,
    }));

  return { total, offset, limit, contents, columns };
};
