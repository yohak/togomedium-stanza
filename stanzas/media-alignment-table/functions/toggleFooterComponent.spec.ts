import { makeComponentTree } from "./makeComponentBranch";
import { makeRawComponent } from "./makeComponentBranch.spec";
import { toggleFooterComponent } from "./toggleFooterComponent";
import { ComponentTree } from "../types";

describe("toggleFooterComponent", () => {
  it("should work", () => {
    const result = toggleFooterComponent("1-2-1", tree);
    if (!result) return;
    expect(result[1]).not.toBe(tree[1]);
    expect(result[1]).toEqual(tree[1]);
    const target = result[0].children[1].children[0];
    expect(target.id).toBe("1-2-1");
    expect(target.isOpen).toBe(true);
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
