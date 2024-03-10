import { getPagination } from "./getPagination";

describe("pagination", () => {
  it("should work", () => {
    const total = 95;
    const offset = 0;
    const limit = 10;
    const result = getPagination({ total, offset, limit });
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });
  it("should work", () => {
    const total = 95;
    const offset = 1;
    const limit = 10;
    const result = getPagination({ total, offset, limit });
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });
  it("should work", () => {
    const total = 95;
    const offset = 2;
    const limit = 10;
    const result = getPagination({ total, offset, limit });
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });
  it("should work", () => {
    const total = 95;
    const offset = 3;
    const limit = 10;
    const result = getPagination({ total, offset, limit });
    expect(result).toEqual([2, 3, 4, 5, 6]);
  });
  it("should work", () => {
    const total = 95;
    const offset = 9;
    const limit = 10;
    const result = getPagination({ total, offset, limit });
    expect(result).toEqual([6, 7, 8, 9, 10]);
  });
  it("should work", () => {
    const total = 95;
    const offset = 8;
    const limit = 10;
    const result = getPagination({ total, offset, limit });
    expect(result).toEqual([6, 7, 8, 9, 10]);
  });
  it("should work", () => {
    const total = 95;
    const offset = 7;
    const limit = 10;
    const result = getPagination({ total, offset, limit });
    expect(result).toEqual([6, 7, 8, 9, 10]);
  });
  it("should work", () => {
    const total = 25;
    const offset = 1;
    const limit = 10;
    const result = getPagination({ total, offset, limit });
    expect(result).toEqual([1, 2, 3]);
  });
});
