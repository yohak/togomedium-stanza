import { RestHandler } from "msw";

export const makeMswParameter = (handlers: RestHandler[]) => {
  return { handlers };
};
