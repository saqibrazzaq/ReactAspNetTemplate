export default class SendForgotPasswordEmailReq {
  email: string;

  constructor(email: string) {
    this.email = email;
  }
}
