import { defineMiddleware } from 'astro/middleware';

import { withTransferState } from './with-transfer-state.ts';

export const onRequest = defineMiddleware(async (_, next) => {
  const { response, getTransferState } = await withTransferState(next);
  const contentType = response.headers.get('Content-Type');
  if (!contentType?.includes('text/html')) {
    return response;
  }

  const content = await response.text();
  const headCloseIndex = content.indexOf('</head>');

  const newContent = `${content.slice(0, headCloseIndex)}<script id="astro-tools-transfer-state" type="application/json">${JSON.stringify(getTransferState())}</script>${content.slice(headCloseIndex)}`;

  return new Response(newContent, response);
});
