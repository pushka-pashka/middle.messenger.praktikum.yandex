import { BlockClass, Store } from "core";
import isEqual from "./isEqual";

type MapStateToProps = (state: AppState) => Record<string, unknown>;

export function withStore<P extends Record<string, any> = object>(
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
      const prevPartialProps = mapStateToProps(prevState);
      const nextPartialProps = mapStateToProps(nextState);

      if (isEqual(prevPartialProps, nextPartialProps)) {
        return;
      }

      // @ts-expect-error this is not typed
      this.setProps(nextPartialProps);
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
