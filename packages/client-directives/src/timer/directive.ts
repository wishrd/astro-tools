import type { ClientDirective } from 'astro';

const clientDirective: ClientDirective = (load, options) => {
  if (!options.value) {
    throw new Error('client:timer directive value is empty');
  }

  const timeout = Number.parseInt(options.value, 10);

  setTimeout(async () => {
    const hydrate = await load();
    await hydrate();
  }, timeout);
};

export default clientDirective;
