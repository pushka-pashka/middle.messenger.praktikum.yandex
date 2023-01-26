import { routes } from "./core/Route";
import { registerComponent, renderDOM, Router, Store } from "core";
import * as components from "./components";
import { getScreenComponent } from "utils/ScreenList";
import { defaultState } from "./store";
import { LoadingPage } from "pages/loading/LoadingPage";
import { initApp } from "services/initApp";

//расширяем интерфейс window
declare global {
  interface Window {
    router: Router;
    store: Store<AppState>;
  }
}

Object.values(components).forEach((Component: any) =>
  registerComponent(Component)
);

//TODO: вынести в отдельный файл
function initRouts(router: Router, store: Store<AppState>) {
  routes.forEach((route) =>
    router.use(route.path, getScreenComponent(route.screen))
  );

  store.on(Store.EVENTS.Update, (prevState: AppState, nextState: AppState) => {
    if (!prevState.appIsInited && nextState.appIsInited) {
      router.start();
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const store = new Store<AppState>(defaultState);
  const router = new Router();

  window.router = router;
  window.store = store;

  renderDOM(new LoadingPage());

  store.on(Store.EVENTS.Update, (prevState, nextState) => {
    if (process.env.DEBUG) {
      console.log(
        "%cstore updated",
        "background: #222; color: #bada55",
        prevState,
        nextState
      );
    }
  });

  initRouts(router, store);

  store.dispatch(initApp);
});
