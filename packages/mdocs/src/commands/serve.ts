import express from 'express';

import { workDir } from '../core/paths.js';

export function serveCommand(port?: number) {
  const destDir = workDir.destination();
  const app = express();

  app.use(express.static(destDir));

  const p = port || 8888;
  app.listen(p, () => console.info(`Serving documentation on http://localhost:${p}`));
}