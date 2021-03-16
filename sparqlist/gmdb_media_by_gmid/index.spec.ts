import { data, emptyData } from "./data";
import { json } from "./index";

describe("media-by-gmid", () => {
  it("should work", () => {
    const result = json(data.metadata, data.component_table, data.comment_list);
    expect(result.meta.gm).toBe("http://togomedium.org/NBRC_M249");
    const firstParagraph = result.components[0];
    expect(firstParagraph.paragraph_index).toBe(1);
    expect(firstParagraph.items[1].component_name).toBe("Yeast extract");
    expect(firstParagraph.items.length).toBe(11);
    expect(firstParagraph.items[0].properties[1].id).toBe("GMO_000046");
    expect(firstParagraph.items[0].properties.length).toBe(3);
    expect(firstParagraph.items[0].roles.length).toBe(1);
    expect(firstParagraph.items[0].roles[0].id).toBe("GMO_000044");
    expect(result.components.length).toBe(6);

    expect(result.comments[result.comments.length - 1].paragraph_index).toBe(
      19
    );
    const items = result.components.reduce((a: any, b: any) => {
      return [...a, ...b.items];
    }, []);
    expect(items.find((item: any) => !!item.conc_value)).toBeTruthy();
  });
  it("should work with empty data", () => {
    const result = json(
      emptyData.metadata,
      emptyData.component_table,
      emptyData.comment_list
    );
    console.log(result);
    expect(result.meta).toBe(null);
    expect(result.comments).toEqual([]);
    expect(result.components).toEqual([]);
  });
});
