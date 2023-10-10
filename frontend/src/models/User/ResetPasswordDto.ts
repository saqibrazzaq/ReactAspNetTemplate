export default class ResetPasswordDto {
  forgotPasswordToken: string;
  email: string;
  password: string;
  confirmPassword: string;

  constructor(forgotPasswordToken: string, email: string,
    password: string, confirmPassword: string) {
      this.forgotPasswordToken = forgotPasswordToken;
      this.email = email;
      this.password = password;
      this.confirmPassword = confirmPassword;
    }
}