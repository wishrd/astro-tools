import { defineMiddleware } from 'astro/middleware';
import { escapeString } from './utils/sanitize-string.ts';
import { withTransferState } from './with-transfer-state.ts';

export const onRequest = defineMiddleware(async (_, next) => {
  const { response, getTransferState } = await withTransferState(next);
  const contentType = response.headers.get('Content-Type');
  if (!contentType?.includes('text/html')) {
    return response;
  }

  const content = await response.text();
  const headCloseIndex = content.indexOf('</head>');

  const serializedTransferState = JSON.stringify(
    getTransferState(),
    (_, value) => (typeof value === 'string' ? escapeString(value) : value),
  );
  const newContent = `${content.slice(0, headCloseIndex)}<script id="astro-tools-transfer-state" type="application/json">${serializedTransferState}</script>${content.slice(headCloseIndex)}`;

  return new Response(newContent, response);
});
