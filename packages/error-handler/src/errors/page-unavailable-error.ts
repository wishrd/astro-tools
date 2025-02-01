import { PageError } from './page-error.ts';

export class PageUnavailableError extends PageError {
  constructor(originalError?: Error) {
    super(new Response(null, { status: 500 }), originalError);
  }
}
