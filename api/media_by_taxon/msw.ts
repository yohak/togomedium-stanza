import { rest } from "msw";
import { mediaByTaxonResponse1 } from "./response1";
import { mediaByTaxonResponse2 } from "./response2";
import { mediaByTaxonResponse3 } from "./response3";
import { mediaByTaxonResponse4 } from "./response4";
import { MediaByTaxonResponse } from "./types";
import { API_MEDIA_BY_TAXON } from "../paths";

const post = rest.post<string, MediaByTaxonResponse, never>(API_MEDIA_BY_TAXON, (req, res, ctx) => {
  const urlParams = new URLSearchParams(req.body);
  let result: MediaByTaxonResponse;
  switch (parseInt(urlParams.get("offset")!, 10)) {
    case 0:
      result = mediaByTaxonResponse1;
      break;
    case 10:
      result = mediaByTaxonResponse2;
      break;
    case 20:
      result = mediaByTaxonResponse3;
      break;
    case 30:
      result = mediaByTaxonResponse4;
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
});

export const mediaByTaxonMocks = [post];
