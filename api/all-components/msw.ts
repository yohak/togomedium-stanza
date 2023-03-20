import { rest } from "msw";
import { allComponentsResponse } from "./response";
import { API_COMPONENTS_WITH_COMPONENTS } from "../paths";

const post = rest.post(API_COMPONENTS_WITH_COMPONENTS, (req, res, ctx) => {
  return res(ctx.delay(1000), ctx.status(200), ctx.json(allComponentsResponse));
});

export const allComponentsMocks = [post];
