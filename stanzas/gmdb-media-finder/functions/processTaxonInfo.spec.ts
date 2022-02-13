import { findAscendants, findDescendants, findSiblings } from "./proessTaxonInfo";
import { TaxonInfo } from "../states/taxonList";

describe("findAscendants", () => {
  it("should work", () => {
    const result = findAscendants(list, "C");
    expect(result).toEqual([]);
  });
  it("should work", () => {
    const result = findAscendants(list, "A");
    expect(result).toEqual([]);
  });
  it("should work", () => {
    const result = findAscendants(list, "A-A-A-A");
    expect(result).toEqual(["A", "A-A", "A-A-A"]);
  });
});
describe("findDescendants", () => {
  it("should work", () => {
    const result = findDescendants(list, "C");
    expect(result).toEqual([]);
  });
  it("should work", () => {
    const result = findDescendants(list, "B");
    expect(result).toEqual([]);
  });
  it("should work", () => {
    const result = findDescendants(list, "A-A");
    expect(result).toEqual(["A-A-A", "A-A-B", "A-A-A-A", "A-A-B-A", "A-A-B-B"]);
  });
});

describe("findSiblings", () => {
  it("should work", () => {
    const result = findSiblings(list, "C");
    expect(result).toEqual([]);
  });
  it("should work", () => {
    const result = findSiblings(list, "B");
    expect(result).toEqual([]);
  });
  it("should work", () => {
    const result = findSiblings(list, "A-B-A-B");
    expect(result).toEqual(["A-B-A-A", "A-B-A-C"]);
  });
});

const list: Pick<TaxonInfo, "id" | "children">[] = [
  { id: "A", children: ["A-A", "A-B"] },
  { id: "A-A", children: ["A-A-A", "A-A-B"] },
  { id: "A-B", children: ["A-B-A"] },
  { id: "A-A-A", children: ["A-A-A-A"] },
  { id: "A-A-B", children: ["A-A-B-A", "A-A-B-B"] },
  { id: "A-B-A", children: ["A-B-A-A", "A-B-A-B", "A-B-A-C"] },
  { id: "A-A-A-A", children: [] },
  { id: "A-A-B-A", children: [] },
  { id: "A-A-B-B", children: [] },
  { id: "A-B-A-A", children: [] },
  { id: "A-B-A-B", children: [] },
  { id: "A-B-A-C", children: [] },
  { id: "B", children: [] },
];
