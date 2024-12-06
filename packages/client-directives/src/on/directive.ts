import type { ClientDirective } from 'astro';

import { getClientDirectivesStore } from './client-directives-store.ts';

interface Configuration {
  name: string;
  options: string;
}

function parseOptions(value: string): Array<Configuration> {
  if (!value) {
    throw new Error('client:on directive is empty');
  }

  const directives = value.split(';').map(directive => directive.trim());
  const configurations = directives.map(directive => {
    let name = '', options = '';

    const separatorIndex = directive.indexOf(' ');
    if (separatorIndex > 0) {
      name = directive.substring(0, separatorIndex);
      options = directive.substring(separatorIndex + 1).trim();
    } else {
      name = directive;
    }

    if (!name) {
      throw new Error('client:on missing directive name');
    }

    return { name, options };
  });

  return configurations;
}

const clientDirective: ClientDirective = async (load, options, el) => {
  const configurations = parseOptions(options.value);
  const store = getClientDirectivesStore();

  for (const configuration of configurations) {
    const clientDirectiveLoader = store.get(configuration.name);
    if (!clientDirectiveLoader) {
      throw new Error(`Directive with name "${configuration.name}" does not exists`);
    }

    const directive = await clientDirectiveLoader();
    directive(load, { name: configuration.name, value: configuration.options }, el);
  }
}

export default clientDirective;
