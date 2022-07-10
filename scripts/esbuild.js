#!/usr/bin/env node
const { build } = require('esbuild');
const pkg = require('../package.json');
const fs = require('fs');

build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: true,
  sourcemap: 'linked',
  platform: 'browser',
  format: 'cjs',
  target: 'es2020',
  outfile: pkg.main
})
  .then(() => {
    const stats = fs.statSync(pkg.main);
    const size = (stats.size / 1024).toFixed(2);
    if (size > 8) {
      console.error(`Bundle size too big: ${size} kb. (8 kb max)`);
      process.exit(1);
    }
    console.info(`Bundle size: ${size} kb`);
  })
  .catch(() => process.exit(1));
