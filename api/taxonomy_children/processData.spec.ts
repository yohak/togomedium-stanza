import { processData } from "./processData";

describe("processData", () => {
  it("should find root node", () => {
    const result = processData("0")!;
    expect(result.length).toBe(3);
  });
  it("should find deeply nested node", () => {
    const result = processData("1644055")!;
    expect(result.length).toBe(2);
    expect(result[1].name).toBe("Halorubraceae");
  });
  it("should return an empty array if not found", () => {
    const result = processData("hogehoge");
    expect(result).toEqual([]);
  });
});
