import { findAscendants, findDescendants, makeNewSelection } from "./proessTaxonInfo";
import { TaxonInfo } from "../states/taxonList";

expect.extend({
  toIncludeSameMembers(received: any[], expected: any[]) {
    const { isNot } = this;
    const pass =
      received.length === expected.length && received.every((item: any) => expected.includes(item));
    return {
      pass,
      message: () => `${received} is${isNot ? " not" : ""} equal to ${expected}`,
    };
  },
});

describe("findAscendants", () => {
  it("should work", () => {
    const result = findAscendants(list, "C");
    expect(result).toIncludeSameMembers([]);
  });
  it("should work", () => {
    const result = findAscendants(list, "A");
    expect(result).toIncludeSameMembers([]);
  });
  it("should work", () => {
    const result = findAscendants(list, "A-A-A-A");
    expect(result).toIncludeSameMembers(["A", "A-A", "A-A-A"]);
  });
});
describe("findDescendants", () => {
  it("should work", () => {
    const result = findDescendants(list, "C");
    expect(result).toIncludeSameMembers([]);
  });
  it("should work", () => {
    const result = findDescendants(list, "B");
    expect(result).toIncludeSameMembers([]);
  });
  it("should work", () => {
    const result = findDescendants(list, "A-A");
    expect(result).toIncludeSameMembers(["A-A-A", "A-A-B", "A-A-A-A", "A-A-B-A", "A-A-B-B"]);
  });
});

describe("makeNewSelection", () => {
  it("should simply toggle", () => {
    const result = makeNewSelection(list, "A", []);
    expect(result).toIncludeSameMembers(["A"]);
  });
  it("should simply toggle", () => {
    const result = makeNewSelection(list, "A", ["C", "A", "B"]);
    expect(result).toIncludeSameMembers(["B", "C"]);
  });
  it("should select the parent when all siblings are checked", () => {
    const result = makeNewSelection(list, "A-A", ["A-B"]);
    expect(result).toIncludeSameMembers(["A"]);
  });

  it("should recursively select the parent when all siblings are checked", () => {
    const result = makeNewSelection(list, "A-A-A-A", ["A-A-B"]);
    expect(result).toIncludeSameMembers(["A-A"]);
  });

  it("should deselect descendants when parent is checked", () => {
    const result = makeNewSelection(list, "A-A", ["A-A-B"]);
    expect(result).toIncludeSameMembers(["A-A"]);
  });
  it("should deselect target and select other siblings when parent is checked", () => {
    const result = makeNewSelection(list, "A-B-A-A", ["A-B-A"]);
    expect(result).toIncludeSameMembers(["A-B-A-B", "A-B-A-C"]);
    /**
     * [-]A          [-]A
     * [-]-AB        [-]-AB
     * [*]--ABA      [-]--ABA
     * [@]---ABAA    [ ]---ABAA
     * [@]---ABAB    [*]---ABAB
     * [@]---ABAC    [*]---ABAC
     */
  });
  it("should deselect target and select other siblings when parent is checked", () => {
    const result = makeNewSelection(list, "A-A-A", ["A"]);
    expect(result).toIncludeSameMembers(["A-B", "A-A-B"]);
    /**
     * [*] A        [-]A
     * [@] -AA      [-]-AA
     * [@] --AAA    [ ]--AAA
     * [@] --AAB    [*]--AAB
     * [@] -AB      [*]-AB
     * [@] --AAB    [@]--AAB
     **/
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
