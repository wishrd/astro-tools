import type { Example } from './example';
import type { ExampleResponse } from './example-response';

export function exampleBodyAdapter(body: ExampleResponse): Example {
  return body;
}
