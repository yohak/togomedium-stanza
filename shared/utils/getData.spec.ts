import { makeFormBody } from "./getData";

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
