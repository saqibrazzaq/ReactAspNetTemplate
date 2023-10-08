export default class VerifyEmailDto {
  pinCode: string;

  constructor(pinCode: string) {
    this.pinCode = pinCode;
  }
}
