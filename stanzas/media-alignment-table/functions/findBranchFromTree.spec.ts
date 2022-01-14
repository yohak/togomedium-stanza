import { findBranchFromTree } from "./findBranchFromTree";
import { makeComponentTree } from "./makeComponentBranch";
import { makeRawComponent } from "../../../utils/testing";
import { ComponentTree } from "../types";

describe("findBranchFromTree", () => {
  it("should find branch", () => {
    const result = findBranchFromTree("2", tree);
    if (!result) return;
    expect(result.id).toBe("2");
    expect(result.level).toBe(0);
  });

  it("should find nested branch", () => {
    const result = findBranchFromTree("1-2-1", tree);
    if (!result) return;
    expect(result.id).toBe("1-2-1");
    expect(result.level).toBe(2);
  });
});

const tree: ComponentTree = makeComponentTree([
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
]);
