<script lang="ts">
  import { onMount } from 'svelte';
  import { Output } from '@astro-tools/docs-utils/components';

  import { httpClient } from '@astro-tools/http-client';

  const publicAPIClient = httpClient({
    baseUrl: () => location.origin + '/public',
    beforeRequest: (request, requestOptions) => {
      console.debug('beforeRequest', request, requestOptions);
    },
    afterResponse: (response) => {
      console.debug('afterResponse', response);
    }
  });

  async function makeRequest(path: string): void {
    const response = await publicAPIClient({
      path,
      requestOptions: {
        headers: {
          'X-Test': 'test',
        }
      }
    });

    console.debug('HttpClientResponse', response);
  }

  onMount(async () => {
    await makeRequest('/example.json');
    await makeRequest('/example-fail.json');
  });
</script>

<Output text={'Take a look to the Developer Tools console!'} />
