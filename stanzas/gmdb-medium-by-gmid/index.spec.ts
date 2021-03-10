import { __TEST__ } from "./index";
const getSrcLabel = __TEST__.getSrcLabel;

describe("getSrcLabel", () => {
  it("should work with JCM", () => {
    const result = getSrcLabel(
      "https://www.jcm.riken.jp/cgi-bin/jcm/jcm_grmd?GRMD=15"
    );
    expect(result).toBe("JCM");
  });
  it("should work with NBRC", () => {
    const result = getSrcLabel(
      "https://www.nite.go.jp/nbrc/catalogue/NBRCMediumDetailServlet?NO=249"
    );
    expect(result).toBe("NBRC");
  });
  it("should work with DSMZ", () => {
    const result = getSrcLabel(
      "https://www.dsmz.de/microorganisms/medium/pdf/DSMZ_Medium756a.pdf"
    );
    expect(result).toBe("DSMZ");
  });
  it("should work with ATCC", () => {
    const result = getSrcLabel(
      "https://www.atcc.org/~/media/983F7B4AC3424F87840FD6A09934462E.ashx"
    );
    expect(result).toBe("ATCC");
  });
});
