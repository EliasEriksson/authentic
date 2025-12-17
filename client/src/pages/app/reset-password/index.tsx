import { css } from "../../../utils/index.ts";
import styles from "./style.module.scss";
import ResetPasswordForm from "../../../components/organisms/ResetPasswordForm";

export const ResetPassword = () => {
  return (
    <div {...css(styles.resetPasswordWrapper)}>
      <div {...css(styles.resetPassword)}>
        <ResetPasswordForm />
      </div>
    </div>
  );
};
export default ResetPassword;
