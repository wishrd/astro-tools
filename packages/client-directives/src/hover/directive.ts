import type { ClientDirective } from 'astro';

const clientDirective: ClientDirective = (load, _, el) => {
  for (const event of ['mouseover', 'focusin']) {
    el.addEventListener(
      event,
      async () => {
        const hydrate = await load();
        await hydrate();
      },
      { once: true },
    );
  }
};

export default clientDirective;
