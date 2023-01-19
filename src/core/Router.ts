import Route from "./Route";

class Router {
  constructor() {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.currentRoute = null;
    this.history = window.history;

    Router.__instance = this;
  }

  use(pathname, block) {
    // переделать эту логику, унести создание роут отсюда
    const route = new Route(pathname, block);

    this.routes.push(route);

    return this;
  }

  start() {
    // Реагируем на изменения в адресной строке и вызываем перерисовку
    window.onpopstate = (event) => {
      this._onRoute(event.currentTarget.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render(route, pathname);
  }

  getRoute(pathname) {
    return this.routes.find((route) => route.match(pathname));
  }

  go(pathname) {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }
}

export default Router;
