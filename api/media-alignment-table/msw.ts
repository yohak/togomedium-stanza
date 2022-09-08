import { rest } from "msw";
import { mediaAlignmentTableResponse1 } from "./response1";
import { API_MEDIA_ALIGNMENT } from "../paths";

const post = rest.post(API_MEDIA_ALIGNMENT, (req, res, ctx) => {
  return res(ctx.delay(2000), ctx.status(200), ctx.json(mediaAlignmentTableResponse1));
});

export const mediaAlignmentTableMocks = [post];
