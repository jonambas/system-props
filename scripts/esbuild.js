#!/usr/bin/env node
const { buildSync } = require("esbuild");
const pkg = require("../package.json");

buildSync({
  entryPoints: ["src/index.ts"],
  bundle: false,
  minify: true,
  sourcemap: "linked",
  platform: "browser",
  format: "cjs",
  outfile: pkg.main,
});
