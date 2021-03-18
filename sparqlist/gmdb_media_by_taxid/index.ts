import {
  ListApiBody,
  ListColumn,
  ListContent,
} from "../../stanzas/gmdb-meta-list";

export const json = (count: any, result: any): ListApiBody => {
  const parseSparqlObject = (obj: any) => {
    const result: any = {};
    try {
      Object.entries(obj).forEach(([key, item]: [string, any]) => {
        switch (item.datatype) {
          case "http://www.w3.org/2001/XMLSchema#decimal":
            result[key] = parseFloat(item["value"]);
            break;
          case "http://www.w3.org/2001/XMLSchema#integer":
            result[key] = parseInt(item["value"], 10);
            break;
          default:
            result[key] = item["value"];
        }
      });
    } catch (e) {}
    return Object.entries(result).length ? result : null;
  };

  const info = parseSparqlObject(count.results.bindings[0]);
  const total = !!info ? info.total : 0;
  const offset = !!info ? parseInt(info.offset) : 0;

  const KEY_GM_ID = "gm_id";
  const KEY_NAME = "name";
  const columns: ListColumn[] = [
    { key: KEY_GM_ID, label: "GM ID" },
    { key: KEY_NAME, label: "Name" },
  ];
  const contents: ListContent[] = result.results.bindings
    .map((r: any) => parseSparqlObject(r))
    .map((item: any) => ({
      [KEY_NAME]: item.name,
      [KEY_GM_ID]: {
        label: item.gm_id,
        href: `/media/${item.gm_id}`,
      },
    }));

  return { total, offset, contents, columns };
};
