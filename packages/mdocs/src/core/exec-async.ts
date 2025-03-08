import { exec, type ExecOptions } from 'node:child_process';

export function execAsync(command: string, options?: ExecOptions): Promise<void> {
  return new Promise((resolve, reject) => {
    const childProcess = exec(command, options, (error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });

    childProcess.stdout?.on('data', (data) => process.stdout.write(data));
    childProcess.stderr?.on('data', (data) => process.stderr.write(data));
  });
}
