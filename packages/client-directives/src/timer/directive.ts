import type { ClientDirective } from 'astro';

const clientDirective: ClientDirective = (load, options) => {
  if (!options.value) {
    throw new Error('client:timer directive value is empty');
  }

  const timeout = parseInt(options.value);

  setTimeout(async () => {
    const hydrate = await load();
    await hydrate();
  }, timeout);
}

export default clientDirective;
