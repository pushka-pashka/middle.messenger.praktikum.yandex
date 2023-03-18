import { authAPI } from "api/authApi";
import { chatsAPI } from "api/chatsApi";
import { Dispatch } from "core/Store";
import { apiHasError } from "utils/apiHasError";
import { transformChats, transformUser } from "utils/transformers";
import { sortChats } from "./chatsService";

export async function initApp(dispatch: Dispatch<AppState>) {
  // Ручная задержка для демонстрации загрузочного экрана
  await new Promise((r) => setTimeout(r, 700));

  try {
    const user = await authAPI.me();

    if (apiHasError(user)) {
      return;
    }

    dispatch({ user: transformUser(user) });

    let chatsList = await chatsAPI.getChats();

    if (apiHasError(chatsList)) {
      return;
    }

    chatsList = sortChats(transformChats(chatsList));

    dispatch({ chatsList });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  } finally {
    dispatch({ appIsInited: true });
  }
}
