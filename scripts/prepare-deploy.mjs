import { cpSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = join(root, 'public');

// public is generated exclusively from the website sources in the project root.
if (dirname(output) !== root || output === root) {
  throw new Error('Invalid deployment output directory');
}
rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });

for (const source of ['index.html', 'wishlist.html', 'css', 'js', 'assets']) {
  cpSync(join(root, source), join(output, source), { recursive: true });
}

console.log('Deploy prepared from the root index.html and website assets.');
