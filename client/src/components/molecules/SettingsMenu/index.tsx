import {
  type PropsWithChildren,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { css } from "../../../utils";
import styles from "./styles.module.scss";
import { SettingsIcon } from "../../atoms/icons/settings";

export namespace SettingsMenu {
  export interface Props {
    description?: ReactNode;
    className?: string;
  }
}
export const SettingsMenu = (props: PropsWithChildren<SettingsMenu.Props>) => {
  const rootElement = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    console.log("activated");
    const listener = (event: PointerEvent) => {
      if (!rootElement.current) return;
      if (event.composedPath().includes(rootElement.current)) return;
      setOpen(() => false);
    };
    window.addEventListener("click", listener);
    return () => {
      window.removeEventListener("click", listener);
    };
  }, []);
  return (
    <div
      ref={rootElement}
      {...css(styles.menuWrapper, props.className, "settings-menu", {
        [styles.open]: open,
      })}
    >
      <div {...css(styles.menu, "settings-menu__menu")}>
        <div {...css(styles.highlight)}>
          <button
            {...css(styles.button)}
            onClick={() => setOpen((open) => !open)}
          >
            <SettingsIcon {...css(styles.icon)} />
          </button>
          {props.description && (
            <div {...css(styles.description)}>{props.description}</div>
          )}
        </div>
      </div>
      <div {...css(styles.dropDown, "settings-menu__drop-down")}>
        <div {...css(styles.dropDownHider, "settings-menu__drop-down-hider")}>
          <div {...css(styles.dropDownItems, "settings-menu__drop_down-items")}>
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SettingsMenu;
