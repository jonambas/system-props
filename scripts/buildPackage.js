#!/usr/bin/env node
const { build } = require('esbuild');
const fs = require('fs');

const stats = (file) => {
  const stats = fs.statSync(file);
  const size = (stats.size / 1024).toFixed(2);
  if (size > 8) {
    console.error(`${file} - too big: ${size} kb. (8 kb max)`);
    process.exit(1);
  }
  console.info(`${file} - ${size} kb`);
};

const buildPackage = (pkg) => {
  const options = {
    entryPoints: ['src/index.ts'],
    bundle: true,
    minify: true,
    sourcemap: 'linked',
    platform: 'browser',
    target: 'es2020'
  };

  build({
    ...options,
    format: 'cjs',
    outfile: pkg.main
  })
    .then(() => {
      stats(pkg.main);
    })
    .catch(() => process.exit(1));

  build({
    ...options,
    format: 'esm',
    outfile: pkg.module
  })
    .then(() => {
      stats(pkg.module);
    })
    .catch(() => process.exit(1));
};

module.exports = { buildPackage };
