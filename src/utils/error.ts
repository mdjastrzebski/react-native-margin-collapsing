export class MCError extends Error {
  constructor(message: string | undefined, callsite: Function) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, callsite);
    }
  }
}
