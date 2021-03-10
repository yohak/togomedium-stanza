export const json = (
  metadata: any,
  component_table: any,
  comment_list: any
): any => {
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

  const reduceComponentParagraphs = (accum: any[], current: any): any[] => {
    const index: number = accum.findIndex(
      (item) => item.paragraph_index === current.paragraph_index
    );
    if (index === -1) {
      accum.push({
        paragraph_index: current.paragraph_index,
        subcomponent_name: current.subcomponent_name,
        items: [processComponentItem(current)],
      });
    } else {
      accum[index].items.push(processComponentItem(current));
    }
    return accum;
  };

  const processComponentItem = (item: any) => {
    const result = {
      ...item,
      properties: item.property_id
        ? [
            {
              id: item.property_id,
              uri: item.property,
              label: item.property_label,
            },
          ]
        : [],
      roles: item.role_id
        ? [{ id: item.role_id, uri: item.role, label: item.role_label }]
        : [],
    };
    delete result.paragraph_index;
    delete result.subcomponent_name;
    delete result.property;
    delete result.property_id;
    delete result.property_label;
    delete result.role;
    delete result.role_id;
    delete result.role_label;
    return result;
  };

  const reduceComponentItems = (accum: any, current: any): any[] => {
    const hasGmoId: boolean = !!current.gmo_id;
    const index = hasGmoId
      ? accum.findIndex((item: any) => item.gmo_id === current.gmo_id)
      : -1;
    if (index === -1) {
      accum.push(current);
    } else {
      const target = accum[index];
      if (current.properties.length) {
        const currentPropId = current.properties[0].id;
        if (
          target.properties.findIndex(
            (prop: any) => prop.id === currentPropId
          ) === -1
        ) {
          target.properties = [...target.properties, ...current.properties];
        }
      }
      if (current.roles.length) {
        const currentRoleId = current.roles[0].id;
        //
        if (
          target.roles.findIndex((role: any) => role.id === currentRoleId) ===
          -1
        ) {
          target.roles = [...target.roles, ...current.roles];
        }
      }
    }
    return accum;
  };

  const meta: any = parseSparqlObject(metadata.results.bindings[0]);
  const components: any = component_table.results.bindings
    .map((obj: any) => parseSparqlObject(obj))
    .reduce(
      (accum: any[], current: any) => reduceComponentParagraphs(accum, current),
      []
    )
    .map((obj: any) => ({
      ...obj,
      items: obj.items.reduce(
        (accum: any[], current: any) => reduceComponentItems(accum, current),
        []
      ),
    }));
  const comments: any = comment_list.results.bindings.map((obj: any) =>
    parseSparqlObject(obj)
  );

  return { meta, components, comments };
};
