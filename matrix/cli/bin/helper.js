#! /usr/bin/env node

const path = require('path');
const shelljs = require('shelljs');
const chalk = require('chalk');

const cwd = process.cwd();
const rootPkg = require(path.resolve(cwd, './package.json'));

function checkMaster() {
  const branchName = shelljs.exec('git branch --show-current').stdout.trim();
  if (branchName !== 'master') {
    throw new Error(chalk.red('You must operate in master branch!'));
  }
}

function checkMaintainers() {
  const me = shelljs.exec('npm whoami').stdout.trim();
  if (!rootPkg.maintainers.some(p => p === me)) {
    throw new Error(chalk.red('You have no permission to releasein master branch !'));
  }
}

function main() {
  checkMaster();
  checkMaintainers();
}

main();
