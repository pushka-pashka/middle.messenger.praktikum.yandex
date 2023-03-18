import { renderDOM, Store, CoreRouter } from "core";
import { getScreenComponent, ScreenPath, Screens } from "utils/ScreenList";

const routes = [
  { path: "/", screen: Screens.Login, shouldAuthorized: false },
  { path: "/login", screen: Screens.Login, shouldAuthorized: false },
  { path: "/signin", screen: Screens.SignIn, shouldAuthorized: false },
  { path: "/settings", screen: Screens.Profile, shouldAuthorized: true },
  { path: "/messenger", screen: Screens.Chats, shouldAuthorized: true },
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

      switch (route.path) {
        case ScreenPath.Default:
        case ScreenPath.Login:
        case ScreenPath.Chats:
          if (isAuthorized) {
            store.dispatch({ screen: Screens.Chats });
            return;
          } else {
            store.dispatch({ screen: Screens.Login });
            return;
          }

        case ScreenPath.SignIn:
          if (isAuthorized) {
            store.dispatch({ screen: Screens.Chats });
            return;
          } else {
            store.dispatch({ screen: Screens.SignIn });
            return;
          }

        case ScreenPath.Profile:
          if (isAuthorized) {
            store.dispatch({ screen: Screens.Profile });
            return;
          } else {
            store.dispatch({ screen: Screens.Login });
            return;
          }

        case ScreenPath.EditProfile:
          if (isAuthorized) {
            store.dispatch({ screen: Screens.EditProfile });
            return;
          } else {
            store.dispatch({ screen: Screens.Login });
            return;
          }

        case ScreenPath.EditPassword:
          if (isAuthorized) {
            store.dispatch({ screen: Screens.EditPassword });
            return;
          } else {
            store.dispatch({ screen: Screens.Login });
            return;
          }

        case ScreenPath.Error:
          store.dispatch({ screen: Screens.Error });
          return;

        default:
          store.dispatch({ screen: Screens.Login });
          return;
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
