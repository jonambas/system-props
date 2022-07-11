#!/usr/bin/env node
const pkg = require('../package.json');
const { buildPackage } = require('../../../scripts/buildPackage');

buildPackage(pkg);
