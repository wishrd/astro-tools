import { defineMiddleware } from 'astro/middleware';

import { withTransferState } from './with-transfer-state.ts';

export const onRequest = defineMiddleware(async (_, next) => {
  const { response, transferState } = await withTransferState(next);
  const contentType = response.headers.get('Content-Type');
  if (!contentType?.includes('text/html')) {
    return response;
  }

  const content = await response.text();
  const bodyCloseIndex = content.indexOf('</body>');

  const newContent = content.slice(0, bodyCloseIndex)
    + `<script id="astro-tools-transfer-state" type="application/json">${JSON.stringify(transferState)}</script>`
    + content.slice(bodyCloseIndex);

  return new Response(newContent, response);
});
