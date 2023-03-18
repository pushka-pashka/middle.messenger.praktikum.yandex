import { CoreRouter } from "./CoreRouter";

export class Router implements CoreRouter {
  // eslint-disable-next-line @typescript-eslint/ban-types
  private routes: Record<string, Function> = {};
  private isStarted = false;

  start() {
    if (!this.isStarted) {
      this.isStarted = true;

      // Реагируем на изменения в адресной строке и вызываем перерисовку
      window.onpopstate = () => {
        this.onRouteChange.call(this);
      };

      this.onRouteChange();
    }
  }

  private onRouteChange(pathname: string = window.location.pathname) {
    const foundPath = pathname in this.routes;

    if (foundPath) {
      this.routes[`${pathname}`]();
    }

    //TODO: переделать эту логику под мой роутер
    if (!foundPath && this.routes["*"]) {
      this.routes["*"]();
    }
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  use(path: string, callback: Function) {
    this.routes[path] = callback;

    return this;
  }

  go(pathname: string) {
    // TODO: унести в route и проверить, что будет правильно работать
    window.history.pushState({}, "", pathname);
    this.onRouteChange(pathname);
  }

  back() {
    window.history.back();
  }

  forward() {
    window.history.forward();
  }
}
