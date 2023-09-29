export default class ErrorDetails {
  StatusCode?: string;
  Message?: string;

  constructor(statusCode: string, message: string) {
    this.StatusCode = statusCode;
    this.Message = message;
  }
}