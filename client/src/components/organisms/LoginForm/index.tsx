import { state } from "../../../state";
import { useRef } from "react";
import { css } from "../../../utils";
import styles from "./style.module.scss";
import { Link } from "../../atoms/Link";

export function LoginForm() {
  const translator = state.useTranslator();
  const id = useRef(crypto.randomUUID());
  if (!translator.data) return [];
  return (
    <form className={css(styles.form)}>
      <div className={css(styles.group)}>
        <label htmlFor={`${id.current}-email`}>
          {translator.data("words", "email")}
        </label>
        <input id={`${id.current}-email`} type={"email"} name={"email"} />
      </div>
      <div className={css(styles.group)}>
        <label htmlFor={`${id.current}-password`}>
          {translator.data("words", "password")}
        </label>
        <input
          id={`${id.current}-password`}
          type={"password"}
          name={"password"}
        />
      </div>
      <div>
        <Link to={"/app/create-account"}>
          {translator.data("auth", "createAccount")}
        </Link>
        <Link to={"/app/forgot-password"}>
          {translator.data("auth", "forgotPassword")}
        </Link>
        <button type={"submit"}>{translator.data("words", "login")}</button>
      </div>
    </form>
  );
}
export default LoginForm;
