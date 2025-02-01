import { defineMiddleware } from 'astro/middleware';

import { PageError } from './errors/page-error.ts';

export const onRequest = defineMiddleware(async (_, next) => {
  try {
    return await next();
  } catch (err) {
    if (err instanceof PageError) {
      return err.response;
    }

    throw err;
  }
});
