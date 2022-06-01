import { rest } from "msw";
import { organismsByAttributesResponse1 } from "./response1";
import { organismsByAttributesResponse2 } from "./response2";
import { organismsByAttributesResponse3 } from "./response3";
import { organismsByAttributesResponse4 } from "./response4";
import { OrganismsByPhenotypesResponse } from "./types";
import { API_MEDIA_BY_TAXON, API_ORGANISMS_BY_PHENOTYPES } from "../paths";

const post = rest.post<string, OrganismsByPhenotypesResponse, never>(
  API_ORGANISMS_BY_PHENOTYPES,
  (req, res, ctx) => {
    const urlParams = new URLSearchParams(req.body);
    let result: OrganismsByPhenotypesResponse;
    switch (parseInt(urlParams.get("offset")!, 10)) {
      case 0:
        result = organismsByAttributesResponse1;
        break;
      case 10:
        result = organismsByAttributesResponse2;
        break;
      case 20:
        result = organismsByAttributesResponse3;
        break;
      case 30:
        result = organismsByAttributesResponse4;
        break;
      default:
        result = {
          total: 0,
          offset: 0,
          limit: 0,
          contents: [],
        };
    }

    return res(ctx.delay(2000), ctx.status(200), ctx.json(result));
  }
);

export const organismsByPhenotypesMocks = [post];
