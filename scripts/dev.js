// npm run dev: vigila game/index.html y arranca Expo a la vez.
// Los argumentos extra se pasan a "expo start" (p. ej. npm run dev -- --tunnel).
const { spawn } = require('child_process');
const path = require('path');

process.argv.push('--watch');
require('./sync-game.js');

const args = ['expo', 'start', ...process.argv.slice(2).filter(a => a !== '--watch')];
const child = spawn('npx', args, {
  cwd: path.join(__dirname, '..'),
  stdio: 'inherit',
  shell: process.platform === 'win32',
});
child.on('exit', code => process.exit(code ?? 0));
