import { rest } from "msw";
import { allComponentsResponse } from "./response";
import { API_ALL_COMPONENTS } from "../paths";

const post = rest.post(API_ALL_COMPONENTS, (req, res, ctx) => {
  return res(ctx.delay(2000), ctx.status(200), ctx.json(allComponentsResponse));
});

export const allComponentsMocks = [post];
