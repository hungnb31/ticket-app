import { CustomError } from "./custom-error";
export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = "Error while connecting to database";
  constructor() {
    super("Error while connecting to database");

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
