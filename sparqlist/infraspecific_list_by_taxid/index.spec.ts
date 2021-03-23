import { json } from "./index";
import { data, emptyData } from "./data";

describe("infraspecific_list_by_taxid", () => {
  it("should work", () => {
    const result = json(data.result, data.count);
    expect(result.total).toBe(136);
    expect(result.offset).toBe(0);
    expect(result.limit).toBe(10);

    expect(result.contents.length).toBe(10);
    expect((result.contents[0].id as any).label).toBe("1221450");
  });
  it("should work with empty data", () => {
    const result = json(emptyData.result, emptyData.count);
    expect(result.total).toBe(0);
  });
});
