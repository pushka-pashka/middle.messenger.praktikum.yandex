import { routes } from "./core/Route";
import { registerComponent, Router } from "core";

import * as components from "./components";
import { getScreenComponent } from "utils/ScreenList";

Object.values(components).forEach((Component: any) =>
  registerComponent(Component)
);

//вынести в отдельный файл
function initRouts(router) {
  routes.forEach((route) =>
    router.use(route.path, getScreenComponent(route.screen))
  );

  router.start();
}

document.addEventListener("DOMContentLoaded", () => {
  const router = new Router();
  window.router = router;

  initRouts(router);
});
