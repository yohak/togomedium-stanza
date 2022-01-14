import { MediaAlignmentTableResponse } from "./types";

export const mediaAlignmentTableResponse1: MediaAlignmentTableResponse = {
  media: [
    {
      gmid: "HM_D00001a",
      name: "REACTIVATION WITH LIQUID MEDIUM 1",
      components: ["GMO_001001", "GMO_001007", "GMO_001003", "GMO_000012"],
      organisms: ["384676", "643561"],
    },
    {
      gmid: "HM_D00065",
      name: "GYM STREPTOMYCES MEDIUM",
      components: [
        "GMO_001001",
        "GMO_001830",
        "GMO_001063",
        "GMO_001007",
        "GMO_001059",
        "GMO_001815",
      ],
      organisms: ["316284", "446462"],
    },
  ],
  organisms: [
    {
      taxid: "384676",
      name: "Pseudomonas entomophila L48",
    },
    {
      taxid: "643561",
      name: "Acidovorax avenae subsp. avenae ATCC 19860",
    },
    {
      taxid: "316284",
      name: "Streptomyces noursei ATCC 11455",
    },
    {
      taxid: "446462",
      name: "Actinosynnema mirum DSM 43827",
    },
  ],
  components: [
    {
      gmoid: "GMO_001001",
      name: "Distilled water",
      parent: "GMO_001890",
      function: "Solvating media",
    },
    {
      gmoid: "GMO_001890",
      name: "Purified water",
      parent: null,
      function: "Solvating media",
    },
    {
      gmoid: "GMO_001007",
      name: "Agar",
      parent: null,
      function: "Solidifying component",
    },
    {
      gmoid: "GMO_000011",
      name: "Extract",
      parent: null,
      function: null,
    },
    {
      gmoid: "GMO_001074",
      name: "Meat extract",
      parent: "GMO_000011",
      function: null,
    },
    {
      gmoid: "GMO_001830",
      name: "Liver extract",
      parent: "GMO_001074",
      function: null,
    },
    {
      gmoid: "GMO_000012",
      name: "Peptone",
      parent: null,
      function: null,
    },
    {
      gmoid: "GMO_001003",
      name: "Yeast extract",
      parent: "GMO_000011",
      function: "Nutrient source",
    },
    {
      gmoid: "GMO_001063",
      name: "Calcium carbonate",
      parent: null,
      function: "Protective agent",
    },
    {
      gmoid: "GMO_001059",
      name: "Malt extract",
      parent: "GMO_000011",
      function: null,
    },
    {
      gmoid: "GMO_001815",
      name: "Glucose",
      parent: null,
      function: null,
    },
  ],
};
