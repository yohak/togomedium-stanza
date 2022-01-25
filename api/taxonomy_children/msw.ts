import { rest } from "msw";
import { processData } from "./processData";
import { TaxonomyChildrenResponse } from "./types";
import { API_TAXONOMY_CHILDREN } from "../paths";

const post = rest.post<string, TaxonomyChildrenResponse, never>(
  API_TAXONOMY_CHILDREN,
  (req, res, ctx) => {
    const urlParams = new URLSearchParams(req.body);
    const id = urlParams.get("tax_id");
    const result = id ? processData(id) : [];
    return res(ctx.delay(1000), ctx.status(200), ctx.json(result));
  }
);

export const taxonomyChildrenMocks = [post];
