import { css } from "../../../utils/index.ts";
import styles from "./style.module.scss";
import CreateAccountForm from "../../../components/organisms/CreateAccountForm";

export const CreateAccount = () => {
  return (
    <div {...css(styles.createAccountWrapper)}>
      <div {...css(styles.createAccount)}>
        <CreateAccountForm />
      </div>
    </div>
  );
};
export default CreateAccount;
