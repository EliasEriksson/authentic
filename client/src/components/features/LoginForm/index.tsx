import { state } from "../../../state";
import { useRef } from "react";
import { css } from "../../../utils";
import styles from "./style.module.scss";
import { Button } from "../../common/Button";

export function LoginForm() {
  const translator = state.useTranslator();
  const id = useRef(crypto.randomUUID());
  if (!translator.data) return [];
  return (
    <form
      className={css(styles.form)}
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
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
      <div className={styles.actions}>
        <div className={styles.actionGroup}>
          <Button type={"submit"}>{translator.data("words", "login")}</Button>
        </div>
        <div className={styles.actionGroup}>
          <Button to={"/app/create-account"}>
            {translator.data("auth", "createAccount")}
          </Button>
          <Button to={"/app/forgot-password"}>
            {translator.data("auth", "forgotPassword")}
          </Button>
        </div>
      </div>
    </form>
  );
}
export default LoginForm;
