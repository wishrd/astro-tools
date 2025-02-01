import { PageError } from './page-error.ts';

export class PageNotFoundError extends PageError {
  constructor(originalError?: Error) {
    super(new Response(null, { status: 404 }), originalError);
  }
}
