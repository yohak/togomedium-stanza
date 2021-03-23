export const data: { result: SPARQLResponse; count: SPARQLResponse } = {
  result: {
    head: {
      link: [],
      vars: ["tax", "name", "rank"],
    },
    results: {
      distinct: false,
      ordered: true,
      bindings: [
        {
          tax: {
            type: "uri",
            value: "http://identifiers.org/taxonomy/1221450",
          },
          name: {
            type: "literal",
            value: "Bacillus abyssalis",
          },
          rank: {
            type: "literal",
            value: "species",
          },
        },
        {
          tax: {
            type: "uri",
            value: "http://identifiers.org/taxonomy/1121084",
          },
          name: {
            type: "literal",
            value: "Bacillus acidiproducens",
          },
          rank: {
            type: "literal",
            value: "species",
          },
        },
        {
          tax: {
            type: "uri",
            value: "http://identifiers.org/taxonomy/72581",
          },
          name: {
            type: "literal",
            value: "Bacillus aciditolerans",
          },
          rank: {
            type: "literal",
            value: "species",
          },
        },
        {
          tax: {
            type: "uri",
            value: "http://identifiers.org/taxonomy/161919",
          },
          name: {
            type: "literal",
            value: "Bacillus aestuarii",
          },
          rank: {
            type: "literal",
            value: "species",
          },
        },
        {
          tax: {
            type: "uri",
            value: "http://identifiers.org/taxonomy/1411",
          },
          name: {
            type: "literal",
            value: "Bacillus akibai",
          },
          rank: {
            type: "literal",
            value: "species",
          },
        },
        {
          tax: {
            type: "uri",
            value: "http://identifiers.org/taxonomy/1445",
          },
          name: {
            type: "literal",
            value: "Bacillus alcalophilus",
          },
          rank: {
            type: "literal",
            value: "species",
          },
        },
        {
          tax: {
            type: "uri",
            value: "http://identifiers.org/taxonomy/745819",
          },
          name: {
            type: "literal",
            value: "Bacillus alkalicola",
          },
          rank: {
            type: "literal",
            value: "species",
          },
        },
        {
          tax: {
            type: "uri",
            value: "http://identifiers.org/taxonomy/1983720",
          },
          name: {
            type: "literal",
            value: "Bacillus alkalilacus",
          },
          rank: {
            type: "literal",
            value: "species",
          },
        },
        {
          tax: {
            type: "uri",
            value: "http://identifiers.org/taxonomy/293387",
          },
          name: {
            type: "literal",
            value: "Bacillus altitudinis",
          },
          rank: {
            type: "literal",
            value: "species",
          },
        },
        {
          tax: {
            type: "uri",
            value: "http://identifiers.org/taxonomy/279215",
          },
          name: {
            type: "literal",
            value: "Bacillus alveayuensis",
          },
          rank: {
            type: "literal",
            value: "species",
          },
        },
      ],
    },
  },
  count: {
    head: {
      link: [],
      vars: ["total", "limit", "offset"],
    },
    results: {
      distinct: false,
      ordered: true,
      bindings: [
        {
          total: {
            type: "typed-literal",
            datatype: "http://www.w3.org/2001/XMLSchema#integer",
            value: "136",
          },
          limit: {
            type: "literal",
            value: "10",
          },
          offset: {
            type: "literal",
            value: "0",
          },
        },
      ],
    },
  },
};

export const emptyData: { result: SPARQLResponse; count: SPARQLResponse } = {
  result: {
    head: {
      link: [],
      vars: ["tax", "name", "rank"],
    },
    results: {
      distinct: false,
      ordered: true,
      bindings: [],
    },
  },
  count: {
    head: {
      link: [],
      vars: ["total", "limit", "offset"],
    },
    results: {
      distinct: false,
      ordered: true,
      bindings: [],
    },
  },
};
