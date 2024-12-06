import type { ClientDirective } from 'astro';

const clientDirective: ClientDirective = (load, _, el) => {
  if (!el.firstElementChild || !(el.firstElementChild instanceof HTMLElement)) {
    throw new Error('Missing HTMLElement for client:viewport directive');
  }

  const observer = new IntersectionObserver(async ([entry]) => {
    if (!entry?.isIntersecting) {
      return;
    }

    observer.disconnect();
    const hydrate = await load();
    await hydrate();
  });

  observer.observe(el.firstElementChild);
}

export default clientDirective;
