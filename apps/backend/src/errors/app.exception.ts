export class AppException extends Error {
  constructor() {
    super();
    this.name = this.constructor.name;
  }
}
