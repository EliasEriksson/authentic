import styles from "./styles.module.scss";
import { Link } from "../../common/Link";
import { Button } from "../../common/Button";
import { css } from "../../../utils";
import { Accordion } from "../../common/Accordion";

export namespace Navigation {
  export interface Props {
    className?: string;
  }
}

export function Navigation(props: Navigation.Props) {
  return (
    <nav className={css(styles.navigation, props.className)}>
      <ul className={styles.list}>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Accordion summary={"Applications"}>
            <Link to={"/app"}>App</Link>
          </Accordion>
        </li>
        <li>
          <Accordion summary={"Organizations"}>
            <Link to={"/testing"}>Testing</Link>
          </Accordion>
        </li>
        <li>
          <Accordion summary={"Users"}>
            <Button to={"/testing"}>Testing</Button>
          </Accordion>
        </li>
      </ul>
    </nav>
  );
}
