export class PageError extends Error {
  constructor(public readonly response: Response, public readonly originalError?: Error) {
    super();
  }
}
