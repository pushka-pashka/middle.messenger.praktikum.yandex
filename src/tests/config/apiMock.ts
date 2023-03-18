import { setupServer } from "msw/node";
import { rest } from "msw";

const handlers = [
  rest.post(`${process.env.API_ENDPOINT}/auth/logout`, (req, res, ctx) => {
    // eslint-disable-next-line no-console
    console.log("Call logout endpoind", req);

    return res(ctx.status(200));
  })
];

export const server = setupServer(...handlers);
