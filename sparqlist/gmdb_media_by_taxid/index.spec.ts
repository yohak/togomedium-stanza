import { json } from "./index";
import { data, emptyData } from "./data";

describe("media_by_tax_id", () => {
  it("should work", () => {
    const result = json(data.count, data.result);
    expect(result.total).toBe(2);
    expect(result.offset).toBe(0);
  });
  it("should work with empty data", () => {
    const result = json(emptyData.count, emptyData.result);
    expect(result.total).toBe(0);
    expect(result.contents).toEqual([]);
  });
});
