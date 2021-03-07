import { unescapeJsonString } from "./string";

describe("unescapeJsonString", () => {
  it("should work", () => {
    const result = unescapeJsonString(
      '\\"Pediococcus lindneri\\" Henneberg 1926'
    );
    // console.log(result);
    expect(result).toBe('"Pediococcus lindneri" Henneberg 1926');
  });
});
