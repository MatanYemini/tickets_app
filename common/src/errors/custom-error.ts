export abstract class CustomError extends Error {
  abstract statusCode: number;
  constructor(message: string) {
    super();
    // Only because we are extending a built in class
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): { message: string; field?: string }[];
}
