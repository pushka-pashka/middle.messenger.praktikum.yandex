import { BlockClass, Store } from "core";
import isEqual from "./isEqual";

type WithStateProps = { store: Store<AppState> };
type MapStateToProps = (state: AppState) => Partial<AppState>;

export function withStore<P extends WithStateProps>(
  WrappedBlock: BlockClass<P>,
  mapStateToProps: MapStateToProps
) {
  // @ts-expect-error No base constructor has the specified
  return class extends WrappedBlock<P> {
    public static componentName =
      WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: P) {
      super({ ...props, ...mapStateToProps(window.store.getState()) });
    }

    __onChangeStoreCallback = (prevState: AppState, nextState: AppState) => {
      const prevProps = mapStateToProps(prevState);
      const nextProps = mapStateToProps(nextState);

      if (isEqual(prevProps, nextProps)) {
        return;
      }

      // @ts-expect-error this is not typed
      this.setProps(nextProps);
    };

    componentDidMount(props: P) {
      super.componentDidMount(props);
      window.store.on(Store.EVENTS.Update, this.__onChangeStoreCallback);
    }

    componentWillUnmount() {
      super.componentWillUnmount();
      window.store.off(Store.EVENTS.Update, this.__onChangeStoreCallback);
    }
  } as BlockClass<Omit<P, "store">>;
}
