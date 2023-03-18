import { registerComponent, renderDOM, Store, Router, CoreRouter } from "core";
import * as components from "./components";
import { defaultState } from "./store";
import LoadingPage from "pages/loading/LoadingPage";
import { initApp } from "services/initApp";
import { initRouter } from "./route";
import { deepDiff } from "utils/deepDiff";
import { cloneDeep } from "utils/cloneDeep";

import "./style.css";

//расширяем интерфейс window
declare global {
  interface Window {
    router: CoreRouter;
    store: Store<AppState>;
  }
}

Object.values(components).forEach((Component: any) =>
  registerComponent(Component)
);

document.addEventListener("DOMContentLoaded", () => {
  const store = new Store<AppState>(defaultState);
  const router = new Router();

  window.router = router;
  window.store = store;

  renderDOM(new LoadingPage());

  store.on(Store.EVENTS.Update, (prevState, nextState) => {
    const diffObj = deepDiff(cloneDeep(prevState), cloneDeep(nextState));

    if (process.env.DEBUG) {
      // eslint-disable-next-line no-console
      console.log(
        "%cstore updated",
        "background: #222; color: #bada55",
        // prevState,
        // nextState,
        diffObj
      );
    }
  });

  store.dispatch(initApp);

  initRouter(router, store);
});
