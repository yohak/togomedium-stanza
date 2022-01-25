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
    switch (urlParams.get("gmo_ids")!.split(",").length) {
      case 1:
        result = mediaByAttributesResponse1;
        break;
      case 2:
        result = mediaByAttributesResponse2;
        break;
      case 3:
        result = mediaByAttributesResponse3;
        break;
      case 4:
        result = mediaByAttributesResponse4;
        break;
      default:
        result = [];
    }

    return res(ctx.delay(2000), ctx.status(200), ctx.json(result));
  }
);

export const mediaByAttributesMocks = [post];
