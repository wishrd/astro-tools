import { exec } from 'node:child_process';

export function execAsync(...args) {
  return new Promise((resolve, reject) => {
    const childProcess = exec(...args, (error) => {
      if (error) {
        reject(error);
        return;
      };

      resolve();
    });

    childProcess.stdout.on('data', (data) => process.stdout.write(data));
    childProcess.stderr.on('data', (data) => process.stderr.write(data));
  });
}
