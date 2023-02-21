import { scrapeAlignmentData } from "./scrapeAlignmentData";

describe("scrapeAlignmentData", () => {
  it.skip("should work", async () => {
    const result = await scrapeAlignmentData("HM_D00001", "JCM_M54", "JCM_M55");
    console.log(JSON.stringify(result));
  }, 100000);
});
