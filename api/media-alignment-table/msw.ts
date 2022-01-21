import { rest } from "msw";
import { mediaAlignmentTableResponse1 } from "./response1";
import { PATH_MEDIA_ALIMENT } from "../paths";

const post = rest.post(PATH_MEDIA_ALIMENT, (req, res, ctx) => {
  return res(ctx.delay(2000), ctx.status(200), ctx.json(mediaAlignmentTableResponse1));
});

export const mediaAlignmentTableMocks = [post];
