import { makeComponentTree } from "./makeComponentBranch";
import { MediaAlignmentTableResponse } from "../../../api/media-alignment-table/types";
import { makeRawComponent } from "../../../utils/testing";
import { ROOT_COMPONENT } from "../consts";
import { RawComponent } from "../types";

describe("makeComponentTree", () => {
  it("should work", () => {
    const components: RawComponent[] = [
      makeRawComponent("1"),
      makeRawComponent("2"),
      makeRawComponent("3"),
    ];
    const result = makeComponentTree(components);
    expect(result.length).toBe(3);
    expect(result[0].level).toBe(0);
    expect(result.map((r) => r.isOpen)).toEqual([false, false, false]);
  });

  it("should work with children", () => {
    const components: RawComponent[] = [
      makeRawComponent("1"),
      makeRawComponent("2"),
      makeRawComponent("3"),
      makeRawComponent("1-1", "1"),
      makeRawComponent("1-2", "1"),
      makeRawComponent("3-1", "3"),
    ];
    const result = makeComponentTree(components);
    expect(result.length).toBe(3);
    expect(result[0].children.length).toBe(2);
    expect(result[0].children[1].id).toBe("1-2");
    expect(result[0].children[1].level).toBe(1);
    expect(result[2].children[0].id).toBe("3-1");
  });

  it("should work with grandchildren", () => {
    const components: RawComponent[] = [
      makeRawComponent("1"),
      makeRawComponent("2"),
      makeRawComponent("3"),
      makeRawComponent("1-1", "1"),
      makeRawComponent("1-2", "1"),
      makeRawComponent("3-1", "3"),
      makeRawComponent("1-1-1", "1-1"),
      makeRawComponent("1-1-2", "1-1"),
      makeRawComponent("1-2-1", "1-2"),
      makeRawComponent("1-1-1-1", "1-1-1"),
    ];
    const result = makeComponentTree(components);
    expect(result.length).toBe(3);
    expect(result[0].children.length).toBe(2);
    expect(result[0].children[1].id).toBe("1-2");
    expect(result[2].children[0].id).toBe("3-1");
    expect(result[0].children[1].level).toBe(1);
    expect(result[0].children[0].children.length).toBe(2);
    expect(result[0].children[0].children[0].id).toBe("1-1-1");
    expect(result[0].children[1].children[0].id).toBe("1-2-1");
    expect(result[0].children[0].children[0].level).toBe(2);
    expect(result[0].children[0].children[0].children.length).toBe(1);
    expect(result[0].children[0].children[0].children[0].id).toBe("1-1-1-1");
    expect(result[0].children[0].children[0].children[0].level).toBe(3);
  });

  it("should work with Root Component", () => {
    const components: RawComponent[] = [
      makeRawComponent("1", ROOT_COMPONENT),
      makeRawComponent("2", ROOT_COMPONENT),
      makeRawComponent("3", ROOT_COMPONENT),
      makeRawComponent("1-1", "1"),
      makeRawComponent("1-2", "1"),
      makeRawComponent("3-1", "3"),
    ];
    const result = makeComponentTree(components);
    expect(result.length).toBe(3);
    expect(result[0].children.length).toBe(2);
    expect(result[0].children[1].id).toBe("1-2");
    expect(result[0].children[1].level).toBe(1);
    expect(result[2].children[0].id).toBe("3-1");
  });
});

const dataTemplate: MediaAlignmentTableResponse = {
  media: [],
  organisms: [],
  components: [],
};
