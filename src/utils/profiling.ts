import { execSync } from 'child_process';

export function profileCPU() {
  execSync('clinic cpu --autopsy -- node dist/server.js', { stdio: 'inherit' });
}

export function profileMemory() {
  execSync('clinic memory --autopsy -- node dist/server.js', { stdio: 'inherit' });
}
