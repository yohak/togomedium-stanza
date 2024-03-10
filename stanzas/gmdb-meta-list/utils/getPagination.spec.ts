import { getPagination } from "./getPagination";

describe("pagination", () => {
  it("should work", () => {
    const totalPages = 10;
    const currentPage = 1;
    const result = getPagination({ totalPages, currentPage });
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });
  it("should work", () => {
    const totalPages = 10;
    const currentPage = 2;
    const result = getPagination({ totalPages, currentPage });
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });
  it("should work", () => {
    const totalPages = 10;
    const currentPage = 3;
    const result = getPagination({ totalPages, currentPage });
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });
  it("should work", () => {
    const totalPages = 10;
    const currentPage = 4;
    const result = getPagination({ totalPages, currentPage });
    expect(result).toEqual([2, 3, 4, 5, 6]);
  });
  it("should work", () => {
    const totalPages = 10;
    const currentPage = 10;
    const result = getPagination({ totalPages, currentPage });
    expect(result).toEqual([6, 7, 8, 9, 10]);
  });
  it("should work", () => {
    const totalPages = 10;
    const currentPage = 9;
    const result = getPagination({ totalPages, currentPage });
    expect(result).toEqual([6, 7, 8, 9, 10]);
  });
  it("should work", () => {
    const totalPages = 10;
    const currentPage = 8;
    const result = getPagination({ totalPages, currentPage });
    expect(result).toEqual([6, 7, 8, 9, 10]);
  });
  it("should work", () => {
    const totalPages = 3;
    const currentPage = 2;
    const result = getPagination({ totalPages, currentPage });
    expect(result).toEqual([1, 2, 3]);
  });
});
