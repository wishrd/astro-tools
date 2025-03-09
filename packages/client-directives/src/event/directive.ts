import type { ClientDirective } from 'astro';

const clientDirective: ClientDirective = (load, options) => {
  if (!options.value) {
    throw new Error('client:event directive value is empty');
  }

  window.addEventListener(
    options.value,
    async () => {
      const hydrate = await load();
      await hydrate();
    },
    { once: true },
  );
};

export default clientDirective;
