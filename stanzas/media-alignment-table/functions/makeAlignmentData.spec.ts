import { makeAlignmentData, __TEST__ } from "./makeAlignmentData";
import { makeComponentTree } from "./makeComponentBranch";
import { makeFooterComponents } from "./makeFooterComponents";
import { mediaAlignmentTableResponse1 } from "../../../api/media-alignment-table/response1";
import { MediaAlignmentTableResponse } from "../../../api/media-alignment-table/types";
import { makeRawComponent } from "../../../utils/testing";
import { ComponentTree, RawComponent } from "../types";

describe("makeAlignmentData", () => {
  it("should work", () => {
    const result = makeResult(mediaAlignmentTableResponse1);
    expect(result.length).toBe(2);
    expect(result[0].components.length).toBe(6);
    expect(result[0].components[0].state).toBe("available");
  });
  fit("should work", () => {
    const result = makeResult(mediaAlignmentTableResponse1, (tree) => {
      tree[0].isOpen = true;
    });
    expect(result.length).toBe(2);
    expect(result[0].components.length).toBe(7);
    expect(result[0].components[0].state).toBe("grouped");
    expect(result[0].components[1].state).toBe("available");
  });
});

const makeResult = (data: MediaAlignmentTableResponse, modTree?: (tree: ComponentTree) => void) => {
  const tree = makeComponentTree(data.components);
  modTree ? modTree(tree) : "";
  console.log(tree[0].isOpen);
  const footerProps = makeFooterComponents(tree);
  return makeAlignmentData(data, footerProps);
};

describe("listChildComponents", () => {
  const listChildComponents = __TEST__.listChildComponents;
  it("should work", () => {
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
    const result = listChildComponents("1", components);
    expect(result.length).toBe(6);
  });
});
