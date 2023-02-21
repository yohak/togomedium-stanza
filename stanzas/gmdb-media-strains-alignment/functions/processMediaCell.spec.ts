import { __TEST__, processDisplayData } from "./processMediaCell";
import { data1 } from "../../../api/media_strains_alignment/data1";
import { data2 } from "../../../api/media_strains_alignment/data2";

const {
  getNodeListOfRankFromTree,
  getStrainsOfMedia,
  makeTaxonTree,
  processMediaCell,
  getSizeOfCell,
  fillNullTaxon,
} = __TEST__;

describe("processMediaCell", () => {
  it("should work", () => {
    const result = processMediaCell(
      data1,
      data1.strains.map((strain) => strain.id)
    );
    expect(result.length).toBe(3);
    expect(result[0].size).toEqual(9);
  });
});

describe("getStrainsOfMedia", () => {
  it("should work", () => {
    const result = getStrainsOfMedia(data1, "HM_D00001");
    expect(result.length).toBe(9);
  });
});

describe("makeStrainTree", () => {
  it("should work", () => {
    const strains = getStrainsOfMedia(data1, "HM_D00001");
    const result = makeTaxonTree(strains);
    expect(result.length).toBe(1);
    expect(result[0].children.length).toBe(2);
  });
  it("should work with null", () => {
    const data = fillNullTaxon(data2);
    const strains = getStrainsOfMedia(data, "HM_D00001");
    const result = makeTaxonTree(strains);
    expect(result[0].children[0].children[0].children[0].children[0].children.length).toBe(1);
  });
});

describe("getNodeListOfRankFromTree", () => {
  it("should work", () => {
    const strains = getStrainsOfMedia(data1, "HM_D00001");
    const tree = makeTaxonTree(strains);
    const result = getNodeListOfRankFromTree(tree, "class");
    expect(result.length).toBe(3);
  });
  it("should work", () => {
    const strains = getStrainsOfMedia(data1, "HM_D00001");
    const tree = makeTaxonTree(strains);
    const result = getNodeListOfRankFromTree(tree, "species");
    expect(result.length).toBe(9);
    expect(result[0].id).toBe("491915");
    expect(result[1].id).toBe("692420");
  });
  it("should work with null", () => {
    const data = fillNullTaxon(data2);
    const strains = getStrainsOfMedia(data, "HM_D00001");
    const tree = makeTaxonTree(strains);
    const result = getNodeListOfRankFromTree(tree, "species");
    expect(result.length).toBe(9);
  });
});

describe("getSizeOfCell", () => {
  it("should work", () => {
    const strains = getStrainsOfMedia(data1, "HM_D00001");
    const tree = makeTaxonTree(strains);
    const target = getNodeListOfRankFromTree(tree, "superkingdom")[0];
    const result = getSizeOfCell(target);
    expect(result).toBe(9);
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
    expect(result.taxon.genus.length).toBe(3);
  });
});
