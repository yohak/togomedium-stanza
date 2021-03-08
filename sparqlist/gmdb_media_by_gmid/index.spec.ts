import { data } from "./data";
import { json } from "./index";

describe("media-by-gmid", () => {
  it("should work", () => {
    const result = json(data.metadata, data.component_table, data.comment_list);
    expect(result.meta.gm).toBe("http://togomedium.org/NBRC_M249");
    expect(result.components[0].paragraph_index).toBe(1);
    expect(result.components[0].items[1].component_name).toBe(
      "Distilled water"
    );
    expect(result.components[0].items.length).toBe(25);
    expect(result.components.length).toBe(6);
    expect(result.comments.pop().paragraph_index).toBe(19);
  });
});
