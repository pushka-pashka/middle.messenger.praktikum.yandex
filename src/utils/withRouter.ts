import { BlockClass } from "core";
import { IRouter } from "core/Router";

type WithRouterProps = { router: IRouter };

export function withRouter<P extends WithRouterProps>(
  WrappedBlock: BlockClass<P>
) {
  return class extends WrappedBlock<P> {
    public static componentName =
      WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: P) {
      super({ ...props, router: window.router });
    }
  } as BlockClass<Omit<P, "router">>;
}
