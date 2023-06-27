import { haveSameElements } from "./arr";

describe("haveSameElements", () => {
  it("should return true if the arrays have the same items", () => {
    const arr1 = [1, 2, 3];
    const arr2 = [3, 2, 1];
    expect(haveSameElements(arr1, arr2)).toBe(true);
  });

  it("should return false if the arrays don't have the same items", () => {
    const arr1 = [1, 2, 3];
    const arr2 = [1, 2, 3, 4];
    expect(haveSameElements(arr1, arr2)).toBe(false);
  });
});
