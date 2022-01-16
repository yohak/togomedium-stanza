import { __TEST__ } from "./index";

describe("parseOtherTypeMaterial", () => {
  const parseOtherTypeMaterial = __TEST__.parseOtherTypeMaterial;
  it("should work", () => {
    const result = parseOtherTypeMaterial([
      { name: "hoge", label: "foo" },
      { name: "hoge", label: "boo" },
      { name: "hoge", label: "hoo" },
      { name: "moge", label: "koo" },
      { name: "moge", label: "poo" },
    ]);
    // console.log(result);
    expect(result).toEqual([
      { key: "hoge", labels: ["foo", "boo", "hoo"] },
      { key: "moge", labels: ["koo", "poo"] },
    ]);
  });
});
