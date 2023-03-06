import { __TEST__, processDisplayData } from "./processMediaCell";
import { data1 } from "../../../api/media_strains_alignment/data1";
import { data2 } from "../../../api/media_strains_alignment/data2";

const { getNodeListOfRankFromTree, makeTaxonTree, processMediaCell, getSizeOfCell, fillNullTaxon } =
  __TEST__;

describe("processMediaCell", () => {
  it("should work", () => {
    const result = processMediaCell(data1);
    expect(result.length).toBe(3);
    expect(result[0].size).toEqual(17);
  });
});

describe("makeStrainTree", () => {
  it("should work", () => {
    // const strains = getStrainsOfMedia(data1, "HM_D00001");
    const data = fillNullTaxon(data1);
    const result = makeTaxonTree(data[0].organisms);
    expect(result.length).toBe(1);
    expect(result[0].children.length).toBe(3);
  });
  it("should work with null", () => {
    const data = fillNullTaxon(data2);
    const result = makeTaxonTree(data[0].organisms);
    expect(result[0].children[0].children[0].children[0].children[0].children.length).toBe(2);
  });
});

describe("getNodeListOfRankFromTree", () => {
  it("should work", () => {
    const data = fillNullTaxon(data2);
    const tree = makeTaxonTree(data[0].organisms);
    const result = getNodeListOfRankFromTree(tree, "class");
    expect(result.length).toBe(1);
  });
  it("should work", () => {
    const data = fillNullTaxon(data2);
    const tree = makeTaxonTree(data[0].organisms);
    const result = getNodeListOfRankFromTree(tree, "species");
    expect(result.length).toBe(3);
    expect(result[0].id).toBe("1031537");
    expect(result[1].id).toBe("265606");
  });
  it("should work with null", () => {
    const data = fillNullTaxon(data2);
    const tree = makeTaxonTree(data[0].organisms);
    const result = getNodeListOfRankFromTree(tree, "species");
    expect(result.length).toBe(3);
  });
});

describe("getSizeOfCell", () => {
  it("should work", () => {
    const tree = makeTaxonTree(data1[0].organisms);
    const target = getNodeListOfRankFromTree(tree, "superkingdom")[0];
    const result = getSizeOfCell(target);
    expect(result).toBe(17);
  });
});

describe("processDisplayData", () => {
  it("should work", () => {
    const result = processDisplayData(data1);
    expect(result.taxon.genus.length).toBe(3);
  });
  it("should work with filter", () => {
    const result = processDisplayData(data1, "85012");
    expect(result.media.length).toBe(2);
    expect(result.media[0].size).toBe(1);
    expect(result.taxon.genus.length).toBe(2);
    expect(result.taxon.genus[0].length).toBe(1);
  });
  it("should work with null", () => {
    const result = processDisplayData(data2);
    expect(result.taxon.genus.length).toBe(2);
  });
});
