import { state } from "../../../state";
import { useRef } from "react";
import { css } from "../../../utils";
import styles from "./style.module.scss";
import { Button } from "../../common/Button";
import { Link } from "../../common/Link";
import { Form } from "../../common/Form";
import { TextInput } from "../../common/inputs/TextInput";

export function LoginForm() {
  const translator = state.useTranslator();
  const id = useRef(crypto.randomUUID());
  if (!translator.data) return [];
  return (
    <Form
      className={css(styles.form)}
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <div className={css(styles.group)}>
        <label htmlFor={`${id.current}-email`}>
          {translator.data("words", "email")}
        </label>
        <TextInput id={`${id.current}-email`} type={"email"} name={"email"} />
      </div>
      <div className={css(styles.group)}>
        <label htmlFor={`${id.current}-password`}>
          {translator.data("words", "password")}
        </label>
        <TextInput
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
          <Link to={"/app/create-account"}>
            {translator.data("auth", "createAccount")}
          </Link>
          <Link to={"/app/forgot-password"}>
            {translator.data("auth", "forgotPassword")}
          </Link>
        </div>
      </div>
    </Form>
  );
}
export default LoginForm;
