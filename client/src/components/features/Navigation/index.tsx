import styles from "./styles.module.scss";
import { Link } from "../../common/Link";
import { css } from "../../../utils";
import { Heading } from "../../common/Heading";

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
          <Heading h={2}>Applications</Heading>
          <hr />
          <ul className={styles.list}>
            <li>
              <Link to={"/app"}>Applications</Link>
            </li>
          </ul>
        </li>
        <li>
          <Heading h={2}>Organizations</Heading>
          <hr />
          <ul className={styles.list}>
            <li>
              <Link to={"/app"}>Organizations</Link>
            </li>
          </ul>
        </li>
        <li>
          <Heading h={2}>Users</Heading>
          <hr />
          <ul className={styles.list}>
            <li>
              <Link to={"/app"}>Users</Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}
