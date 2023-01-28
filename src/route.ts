import { renderDOM, Store, CoreRouter } from "core";
import { getScreenComponent, Screens } from "utils/ScreenList";

const routes = [
  { path: "/", screen: Screens.Login, shouldAuthorized: false },
  { path: "/login", screen: Screens.Login, shouldAuthorized: false },
  { path: "/signin", screen: Screens.SignIn, shouldAuthorized: false },
  { path: "/profile", screen: Screens.Profile, shouldAuthorized: true },
  { path: "/chats", screen: Screens.Chats, shouldAuthorized: true },
  {
    path: "/edit-profile",
    screen: Screens.EditProfile,
    shouldAuthorized: true
  },
  {
    path: "/edit-password",
    screen: Screens.EditPassword,
    shouldAuthorized: true
  },
  {
    path: "/404",
    screen: Screens.Error,
    shouldAuthorized: false
  },
  { path: "/500", screen: Screens.Error, shouldAuthorized: false },
  { path: "*", screen: Screens.Login, shouldAuthorized: false }
];

export function initRouter(router: CoreRouter, store: Store<AppState>) {
  routes.forEach((route) => {
    router.use(route.path, () => {
      const isAuthorized = Boolean(store.getState().user);
      const currentScreen = Boolean(store.getState().screen);

      if (isAuthorized || !route.shouldAuthorized) {
        store.dispatch({ screen: route.screen });

        return;
      }

      if (!currentScreen) {
        store.dispatch({ screen: Screens.Login });
      }
    });
  });

  /**
   * Глобальный слушатель изменений в сторе
   * для переключения активного экрана
   */
  store.on(Store.EVENTS.Update, (prevState, nextState) => {
    if (!prevState.appIsInited && nextState.appIsInited) {
      router.start();
    }

    if (prevState.screen !== nextState.screen) {
      const Page = getScreenComponent(nextState.screen);
      renderDOM(new Page({}));
      document.title = `Pushka / ${Page.componentName}`;
    }
  });
}
