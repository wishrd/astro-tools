import type { ClientDirective } from 'astro';

const clientDirective: ClientDirective = (load, _, el) => {
  ['mouseover', 'focusin'].forEach(event => {
    el.addEventListener(event, async () => {
      const hydrate = await load();
      await hydrate();
    }, { once: true });
  });
}

export default clientDirective;
