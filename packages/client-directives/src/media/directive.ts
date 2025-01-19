import type { ClientDirective } from 'astro';

const clientDirective: ClientDirective = async (load, options) => {
  if (!options.value) {
    throw new Error('client:media directive value is empty');
  }

  const mql = matchMedia(options.value);
  if (mql.matches) {
    const hydrate = await load();
    await hydrate();
    return;
  }

  mql.addEventListener('change', async () => {
    const hydrate = await load();
    await hydrate();
  }, { once: true });
}

export default clientDirective;
