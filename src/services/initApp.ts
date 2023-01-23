import { Dispatch } from "core/Store";

export function initApp(dispatch: Dispatch<AppState>) {
  setTimeout(() => dispatch({ appIsInited: true }), 1000);
}
