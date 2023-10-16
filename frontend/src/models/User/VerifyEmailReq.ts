export default class VerifyEmailReq {
  pinCode: string;

  constructor(pinCode: string) {
    this.pinCode = pinCode;
  }
}
