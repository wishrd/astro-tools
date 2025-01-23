import type { ExampleResponse } from './example-response';
import type { Example } from './example';

export function exampleBodyAdapter(body: ExampleResponse): Example {
  return body;
}
