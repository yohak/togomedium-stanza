export const data: any = {
  result: {
    head: {
      link: [],
      vars: ["gm", "gm_id", "label", "org", "t", "name"],
    },
    results: {
      distinct: false,
      ordered: true,
      bindings: [
        {
          gm: {
            type: "uri",
            value: "http://purl.jp/bio/10/gm/JCM_M129",
          },
          gm_id: {
            type: "literal",
            value: "JCM_M129",
          },
          label: {
            type: "literal",
            value: "ACIDIPHILIUM MEDIUM",
          },
          org: {
            type: "bnode",
            value: "nodeID://b12289",
          },
          t: {
            type: "uri",
            value: "http://identifiers.org/taxonomy/524",
          },
          name: {
            type: "literal",
            value: "Acidiphilium cryptum",
          },
        },
        {
          gm: {
            type: "uri",
            value: "http://purl.jp/bio/10/gm/NBRC_M234",
          },
          gm_id: {
            type: "literal",
            value: "NBRC_M234",
          },
          org: {
            type: "bnode",
            value: "nodeID://b26038",
          },
          t: {
            type: "uri",
            value: "http://identifiers.org/taxonomy/524",
          },
          name: {
            type: "literal",
            value: "Acidiphilium cryptum",
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
            value: "2",
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

export const emptyData: any = {
  result: {
    head: {
      link: [],
      vars: ["gm", "gm_id", "label", "org", "t", "name"],
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
