import { Router } from "core";

describe("Router", () => {
  const router = new Router();
  router.start();

  it("isStarted should be true after init Router", () => {
    // @ts-expect-error private property
    expect(router.isStarted).toBeTruthy();
  });

  it("router should be singletone", () => {
    const newRouter = new Router();
    newRouter.start();

    expect(router).toStrictEqual(newRouter);
  });

  it("use should add new routes", () => {
    const mock = jest.fn();

    router.use("/404", mock);
    router.use("/login", mock);

    // @ts-expect-error private property
    expect(Object.keys(router.routes).length).toEqual(2);
  });

  it("go should increment window.histoty.length", () => {
    const currentLength = window.history.length;

    router.go("/some-path");

    expect(window.history.length - currentLength).toEqual(1);
  });
});
