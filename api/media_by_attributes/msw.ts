import { rest } from "msw";
import { mediaByAttributesResponse1 } from "./response1";
import { mediaByAttributesResponse2 } from "./response2";
import { mediaByAttributesResponse3 } from "./response3";
import { mediaByAttributesResponse4 } from "./response4";
import { MediaByAttributesResponse } from "./types";
import { API_MEDIA_BY_ATTRIBUTES } from "../paths";

const post = rest.post<string, MediaByAttributesResponse, never>(
  API_MEDIA_BY_ATTRIBUTES,
  (req, res, ctx) => {
    const urlParams = new URLSearchParams(req.body);
    let result: MediaByAttributesResponse;
    switch (parseInt(urlParams.get("offset")!, 10)) {
      case 0:
        result = mediaByAttributesResponse1;
        break;
      case 10:
        result = mediaByAttributesResponse2;
        break;
      case 20:
        result = mediaByAttributesResponse3;
        break;
      case 30:
        result = mediaByAttributesResponse4;
        break;
      default:
        result = { total: 0, offset: 0, limit: 0, contents: [] };
    }

    return res(ctx.delay(2000), ctx.status(200), ctx.json(result));
  }
);

export const mediaByAttributesMocks = [post];
