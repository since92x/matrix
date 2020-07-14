#! /usr/bin/env node

const path = require('path');
const shelljs = require('shelljs');
const yargs = require('yargs');
const chalk = require('chalk');
const lernaBin = require.resolve('lerna/cli.js');

const { scopes } = require(path.resolve(process.cwd(), 'matrix.config.js'));

const { scope } = yargs.argv;
const releaseStatus = {};

function getPkg(package) {
  let dep = shelljs.exec(`${lernaBin} ls -p -l --scope=${package}`, { silent: true }).stdout;
  const item = dep.replace('\n', '').split(':');
  return {
    path: item[0],
    name: item[1],
    version: item[2],
  };
}

function getChanges() {
  const changes = shelljs.exec(`${lernaBin} changed -p -l`, { silent: true }).stdout;
  const prettyChanges = changes.split('\n')
    .filter(item => item).map(i => {
      const item = i.split(':');
      return {
        path: item[0],
        name: item[1],
        version: item[2],
      };
    });
  return prettyChanges;
}


function release(dep) {
  const pkgJson = require(path.join(dep.path, 'package.json'));
  const deps = pkgJson.dependencies || {};
  const devDeps = pkgJson.devDependencies || {};
  const depNames = Object.keys(Object.assign(deps, devDeps));
  const validDeps = depNames.reduce((deps, dep) => {
    if (scopes.reduce((res, scope) => res || new RegExp(`^${scope}\\/`).test(dep), false)) {
      deps.push(getPkg(dep));
    }
    return deps;
  }, []);
  validDeps.forEach(dep => release(dep));
  if (!releaseStatus[dep.name] && pkgJson.scripts && pkgJson.scripts.build) {
    if (shelljs.exec('npm run build', { cwd: dep.path }).code !== 0) {
      throw new Error(chalk.red(`${dep.name} release failed`));
    }
    releaseStatus[dep.name] = 1;
  }
}

function main() {
  if (scope) {
    release(getPkg(scope));
  } else {
    getChanges().forEach(dep => release(dep));
  }
}

main();
