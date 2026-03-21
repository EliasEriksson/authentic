import { css } from "../../../utils/index.ts";
import styles from "./style.module.scss";
import CreateAccountForm from "../../../components/organisms/CreateAccountForm";

export const CreateAccount = () => {
  return (
    <div className={css(styles.createAccountWrapper)}>
      <div className={css(styles.createAccount)}>
        <CreateAccountForm />
      </div>
    </div>
  );
};
export default CreateAccount;
