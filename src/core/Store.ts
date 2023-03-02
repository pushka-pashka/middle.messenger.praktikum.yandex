import EventBus from "./EventBus";
import { cloneDeep } from "utils/cloneDeep";
import { merge } from "utils/merge";

export type Dispatch<State> = (
  nextStateOrAction: Partial<State> | Action<State>,
  payload?: any
) => void;

export type Action<State> = (
  dispatch: Dispatch<State>,
  state: State,
  payload: any
) => void;

export class Store<State extends Record<string, any>> extends EventBus {
  static EVENTS = {
    Update: "update"
  } as const;

  private state: State = {} as State;

  constructor(defaultState: State) {
    super();

    this.state = defaultState;
    this.set(defaultState);
  }

  public getState() {
    return this.state;
  }

  public set(nextPartialState: Partial<State>) {
    const prevState = cloneDeep(this.getState());
    const nextState = merge(this.getState(), nextPartialState);

    this.state = nextState;

    this.emit(Store.EVENTS.Update, prevState, nextState);
  }

  dispatch(nextStateOrAction: Partial<State> | Action<State>, payload?: any) {
    if (typeof nextStateOrAction === "function") {
      nextStateOrAction(this.dispatch.bind(this), this.state, payload);
    } else {
      this.set(nextStateOrAction);
    }
  }
}
