#!/usr/bin/env node
const { buildSync } = require('esbuild');
const pkg = require('../package.json');

buildSync({
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: true,
  sourcemap: 'linked',
  platform: 'browser',
  format: 'cjs',
  target: 'es2020',
  outfile: pkg.main
});
