import type { ClientDirective } from 'astro';

import { getClientDirectivesStore } from './client-directives-store.ts';

interface Configuration {
  name: string;
  options: string;
}

type ConfigurationGroup = Array<Array<Configuration>>;

function parseConfiguration(value: string): Array<Configuration> {
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

function parseOptions(value: string): ConfigurationGroup {
  const normalizedValue = value.trim();

  if (!normalizedValue) {
    throw new Error('client:on directive is empty');
  }

  if (!(/\)\s+and\s+\(/.test(value))) {
    return [parseConfiguration(normalizedValue)];
  }

  const groups = [];
  let groupStartIndex: number | null = null;
  let groupStack = 0;

  for (let i = 0; i < normalizedValue.length; i++) {
    if (normalizedValue.charAt(i) === '(') {
      if (groupStartIndex !== null) {
        groupStack++;
      } else {
        groupStartIndex = i;
      }
    } else if (groupStartIndex !== null && normalizedValue.charAt(i) === ')') {
      if (groupStack > 0) {
        groupStack--;
      } else {
        const andPosition = normalizedValue.length - 1 === i ? i : normalizedValue.substring(i + 1).search(/^\s+and\s+/) ;
        if (andPosition >= 0) {
          const configuration = parseConfiguration(normalizedValue.substring(groupStartIndex + 1, i));
          groups.push(configuration);
          groupStartIndex = null;
        }
      }
    }
  }

  return groups;
}

const clientDirective: ClientDirective = async (load, options, el) => {
  const groups = parseOptions(options.value);
  const store = getClientDirectivesStore();

  const loadGroupFns: Array<() => Promise<() => Promise<void>>> = [];
  const loadPromises: Array<Promise<void>> = [];

  for (let i = 0; i < groups.length; i++) {
    const loadPromise = new Promise<void>((resolve) => { loadGroupFns.push(() => Promise.resolve(() => Promise.resolve(resolve()))) });
    loadPromises.push(loadPromise);
  }

  for (let i = 0; i < groups.length; i++) {
    const loadGroup = loadGroupFns[i]!;
    const group = groups[i]!;

    for (const configuration of group) {
      const clientDirectiveLoader = store.get(configuration.name);
      if (!clientDirectiveLoader) {
        throw new Error(`Directive with name "${configuration.name}" does not exists`);
      }

      const directive = await clientDirectiveLoader();
      directive(loadGroup, { name: configuration.name, value: configuration.options }, el);
    }
  }

  await Promise.all(loadPromises);
  const hydrate = await load();
  await hydrate();
}

export default clientDirective;
