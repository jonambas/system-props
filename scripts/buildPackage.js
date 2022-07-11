#!/usr/bin/env node
const { build } = require('esbuild');
const { limitSizePlugin } = require('esbuild-plugin-limit-size');

const buildPackage = (pkg) => {
  const options = {
    entryPoints: ['src/index.ts'],
    bundle: true,
    minify: true,
    sourcemap: 'linked',
    platform: 'browser',
    target: 'es2020',
    plugins: [limitSizePlugin(8, true)]
  };

  build({
    ...options,
    format: 'cjs',
    outfile: pkg.main
  }).catch(() => process.exit(1));

  build({
    ...options,
    format: 'esm',
    outfile: pkg.module
  }).catch(() => process.exit(1));
};

module.exports = { buildPackage };
