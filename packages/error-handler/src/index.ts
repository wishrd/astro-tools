import { createResolver, defineIntegration } from 'astro-integration-kit';

export const errorHandler =  defineIntegration({
  name: '@astro-tools/error-handler',
  setup: () => {
    const { resolve } = createResolver(import.meta.url);

    return {
      hooks: {
        'astro:config:setup': (options) => {
          const { addMiddleware } = options;

          addMiddleware({
            order: 'post',
            entrypoint: resolve('./middleware.js'),
          });
        }
      }
    }
  },
});
