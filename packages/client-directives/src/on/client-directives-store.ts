import type { ClientDirectiveLoader } from './client-directive-loader.ts';

declare global {
  var astroToolsOnClientDirectiveStore: Map<string, ClientDirectiveLoader>;
}

export function getClientDirectivesStore(): Map<string, ClientDirectiveLoader> {
  if (!globalThis.astroToolsOnClientDirectiveStore) {
    globalThis.astroToolsOnClientDirectiveStore = new Map<
      string,
      ClientDirectiveLoader
    >();
  }

  return globalThis.astroToolsOnClientDirectiveStore;
}
