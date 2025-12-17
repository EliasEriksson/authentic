import type { PropsWithChildren, ReactNode } from "react";
import { css } from "../../../utils";
import styles from "./styles.module.scss";
import { SettingsIcon } from "../icons/settings";

export namespace SettingsMenu {
  export interface Props {
    description?: ReactNode;
  }
}
export const SettingsMenu = (props: PropsWithChildren<SettingsMenu.Props>) => {
  return (
    <div {...css(styles.menu)}>
      <div {...css(styles.highlight)}>
        <button {...css(styles.button)}>
          <SettingsIcon {...css(styles.icon)} />
        </button>
        {props.description && (
          <div {...css(styles.description)}>{props.description}</div>
        )}
      </div>
      <div {...css(styles.dropDown)}>
        <div {...css(styles.dropDownHider)}>{props.children}</div>
      </div>
    </div>
  );
};
export default SettingsMenu;
