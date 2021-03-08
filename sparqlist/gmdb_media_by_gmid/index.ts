export const json = (
  metadata: any,
  component_table: any,
  comment_list: any
): any => {
  const parseSparqlObject = (obj: any) => {
    const result: any = {};
    Object.entries(obj).forEach(([key, item]: [string, any]) => {
      const isInteger =
        item.datatype === "http://www.w3.org/2001/XMLSchema#integer";
      result[key] = isInteger ? parseInt(item["value"], 10) : item["value"];
    });
    return result;
  };

  const reduceComponents = (accum: any[], current: any): any[] => {
    const index: number = accum.findIndex(
      (item) => item.paragraph_index === current.paragraph_index
    );
    if (index === -1) {
      accum.push({
        paragraph_index: current.paragraph_index,
        subcomponent_name: current.subcomponent_name,
        items: [filterComponentData(current)],
      });
    } else {
      accum[index].items.push(filterComponentData(current));
    }
    return accum;
  };

  const filterComponentData = (obj: any) => {
    const result = { ...obj };
    delete result.paragraph_index;
    delete result.subcomponent_name;
    return result;
  };

  const meta: any = parseSparqlObject(metadata.results.bindings[0]);
  const components: any = component_table.results.bindings
    .map((obj: any) => parseSparqlObject(obj))
    .reduce(
      (accum: any[], current: any) => reduceComponents(accum, current),
      []
    );
  const comments: any = comment_list.results.bindings.map((obj: any) =>
    parseSparqlObject(obj)
  );

  return { meta, components, comments };
};
