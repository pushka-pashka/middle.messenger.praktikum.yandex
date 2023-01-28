import { authAPI } from "api/authApi";
import { Dispatch } from "core/Store";
import { apiHasError } from "utils/apiHasError";

export async function initApp(dispatch: Dispatch<AppState>) {
  // Ручная задержка для демонстрации загрузочного экрана
  await new Promise((r) => setTimeout(r, 700));

  try {
    const response = await authAPI.me();

    if (apiHasError(response)) {
      return;
    }

    dispatch({ user: response });
  } catch (err) {
    console.error(err);
  } finally {
    dispatch({ appIsInited: true });
  }
}
