import { rest } from "msw";
import { mediaByAttributesResponse1 } from "./response1";
import { API_MEDIA_BY_ATTRIBUTES } from "../paths";

const post = rest.post(API_MEDIA_BY_ATTRIBUTES, (req, res, ctx) => {
  return res(ctx.delay(2000), ctx.status(200), ctx.json(mediaByAttributesResponse1));
});

export const mediaByAttributesMocks = [post];
