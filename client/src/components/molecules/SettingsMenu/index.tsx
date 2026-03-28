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
import { Button } from "../../atoms/Button";
import { Collapse } from "../Collapse";

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
      className={css(styles.menu, props.className, {
        [styles.open]: open,
      })}
    >
      <div className={styles.menu}>
        <Button
          className={styles.button}
          onClick={() => setOpen((open) => !open)}
        >
          <SettingsIcon className={styles.icon} />
        </Button>
        {props.description && (
          <div className={styles.description}>{props.description}</div>
        )}
      </div>
      <div className={styles.dropDown}>
        <Collapse open={open} direction={"top-to-bottom"}>
          <div className={styles.dropDownItems}>{props.children}</div>
        </Collapse>
      </div>
    </div>
  );
};
export default SettingsMenu;
