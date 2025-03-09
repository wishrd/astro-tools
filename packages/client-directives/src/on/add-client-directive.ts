import type { ClientDirectiveLoader } from './client-directive-loader.ts';
import { getClientDirectivesStore } from './client-directives-store.ts';

export function addClientDirective(
  name: string,
  loader: ClientDirectiveLoader,
): void {
  const store = getClientDirectivesStore();
  if (store.has(name)) {
    throw new Error(
      `client:on custom directive with name "${name}" already registered!`,
    );
  }

  store.set(name, loader);
}
