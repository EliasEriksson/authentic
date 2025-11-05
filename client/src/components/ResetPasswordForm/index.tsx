import { state } from "../../state/index.ts";
import { useRef } from "react";
import { css } from "../../utils/index.ts";
import styles from "./style.module.scss";

export function ResetPasswordForm() {
  const translator = state.useTranslator();
  const id = useRef(crypto.randomUUID());
  if (!translator.data) return [];
  return (
    <form className={css(styles.form)}>
      <div className={css(styles.group)}>
        <label htmlFor={`${id.current}-email`}>
          {translator.data("words", "email")}
        </label>
        <input
          id={`${id.current}-email`}
          type={"hidden"}
          name={"email"}
          disabled
        />
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
        <label htmlFor={`${id.current}-confirmation`}>
          {translator.data("words", "password")}
        </label>
        <input
          id={`${id.current}-confirmation`}
          type={"password"}
          name={"confirmation"}
        />
      </div>
      <div>
        <button type={"submit"}>{translator.data("words", "login")}</button>
      </div>
    </form>
  );
}
export default ResetPasswordForm;
