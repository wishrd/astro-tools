import type { ClientDirective } from 'astro';

const clientDirective: ClientDirective = (load, options, el) => {
  if (options.value) {
    const target = document.querySelector(options.value);
    if (!target) {
      throw new Error(`client:click target ${options.value}`);
    }

    target.addEventListener('click', async () => {
      const hydrate = await load();
      await hydrate();
    }, { once: true });
  } else {
    el.addEventListener('click', async (event) => {
      event.preventDefault();

      const hydrate = await load();
      await hydrate();

      if (event.target && event.target instanceof HTMLElement) {
        event.target.click();
      }
    }, { once: true });
  }
}

export default clientDirective;
