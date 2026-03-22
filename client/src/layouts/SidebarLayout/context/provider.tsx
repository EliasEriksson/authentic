import React, { useState } from "react";
import { Context } from "./context.ts";

export namespace SidebarProvider {
  export type Props = NonNullable<object>;
}
export function Provider(
  props: React.PropsWithChildren<SidebarProvider.Props>,
) {
  const [state, setState] = useState(false);
  const context = {
    state: state,
    open: () => setState(() => true),
    close: () => setState(() => false),
    toggle: () => setState((state) => !state),
  } satisfies Context;
  return <Context value={context}>{props.children}</Context>;
}
