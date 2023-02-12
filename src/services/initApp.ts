import { authAPI } from "api/authApi";
import { chatsAPI } from "api/chatsApi";
import { Dispatch } from "core/Store";
import { apiHasError } from "utils/apiHasError";

export async function initApp(dispatch: Dispatch<AppState>) {
  // Ручная задержка для демонстрации загрузочного экрана
  await new Promise((r) => setTimeout(r, 700));

  try {
    const user = await authAPI.me();

    if (apiHasError(user)) {
      return;
    }

    dispatch({ user });

    const chatsList = await chatsAPI.getChats();

    if (apiHasError(chatsList)) {
      return;
    }

    dispatch({ chatsList });

    const currentChatId = chatsList[0]?.id || null;

    if (currentChatId) {
      dispatch({ currentChatId });
    }
  } catch (err) {
    console.error(err);
  } finally {
    dispatch({ appIsInited: true });
  }
}
