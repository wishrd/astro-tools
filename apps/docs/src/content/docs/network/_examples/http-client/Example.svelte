<script lang="ts">
import Output from '@/libs/examples/Output.svelte';
import { onMount } from 'svelte';

import { httpClient } from '@astro-tools/http-client';
import { exampleBodyAdapter } from './example-body-adapter';

const publicAPIClient = httpClient({
  baseUrl: () => `${location.origin}/api`,
  beforeRequest: (request, requestOptions) => {
    console.debug('beforeRequest', request, requestOptions);
  },
  afterResponse: (response) => {
    console.debug('afterResponse', response);
    return response;
  },
});

async function makeRequest(path: string): Promise<void> {
  const response = await publicAPIClient({
    path,
    requestOptions: {
      headers: {
        'X-Test': 'test',
      },
    },
    bodyAdapter: exampleBodyAdapter,
  });

  console.debug('HttpClientResponse', response);
}

onMount(async () => {
  await makeRequest('/example.json');
  await makeRequest('/example-fail.json');
});
</script>

<Output text={'Take a look to the Developer Tools console!'} />
