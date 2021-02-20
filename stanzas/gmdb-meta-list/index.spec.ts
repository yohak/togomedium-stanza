import { __TEST__ } from "./index";

const { separateURL, filterQuery, makeFormBody } = __TEST__;

describe("separateURL", () => {
  test("it should work", () => {
    const result = separateURL(
      "http://growthmedium.org/sparqlist/api/gmdb_list_media_by_keyword?keyword=AGAR"
    );
    expect(result).toEqual([
      "http://growthmedium.org/sparqlist/api/gmdb_list_media_by_keyword",
      "keyword=AGAR",
    ]);
  });
  test("it should work even if no query found", () => {
    const result = separateURL(
      "http://growthmedium.org/sparqlist/api/gmdb_list_media_by_keyword"
    );
    expect(result).toEqual([
      "http://growthmedium.org/sparqlist/api/gmdb_list_media_by_keyword",
      "",
    ]);
  });
});

describe("filterQuery", () => {
  test("it should filter limit and offset parameter", () => {
    const result = filterQuery("keyword=AGAR&limit=10&offset=8");
    expect(result).toBe("keyword=AGAR");
  });
  test("it just pass the parameters", () => {
    const result = filterQuery("keyword=AGAR&taxon=foo");
    expect(result).toBe("keyword=AGAR&taxon=foo");
  });
  test("it return empty text if query is null", () => {
    const result = filterQuery(null);
    expect(result).toBe("");
  });
});

describe("makeFormBody", () => {
  test("it should make form body from object", () => {
    const param: any = {
      limit: 10,
      offset: 5,
      keyword: "培地",
    };
    const result = makeFormBody(param);
    expect(result).toBe("limit=10&offset=5&keyword=%E5%9F%B9%E5%9C%B0");
  });
});
