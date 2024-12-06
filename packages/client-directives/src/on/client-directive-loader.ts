import type { ClientDirective } from 'astro';

export type ClientDirectiveLoader = () => Promise<ClientDirective>;
