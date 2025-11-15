import { css } from "../../../utils/index.ts";
import styles from "./style.module.scss";
import ResetPasswordForm from "../../../components/organisms/ResetPasswordForm";

export const ResetPassword = () => {
  return (
    <div className={css(styles.resetPasswordWrapper)}>
      <div className={css(styles.resetPassword)}>
        <ResetPasswordForm />
      </div>
    </div>
  );
};
export default ResetPassword;
