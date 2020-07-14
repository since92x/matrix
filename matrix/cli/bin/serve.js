#! /usr/bin/env node

const chalk = require('chalk');
const { execSync } = require('child_process');


function main() {
  try {
    const package = process.argv[2];
    if (!package) {
      console.log(chalk.red(`please write a scoped package name!`));
      console.log(chalk.blue(`For example:`));
      console.log(chalk.green(`matrix-dev @matrix/helloworld`));
      return;
    }
    const command = 'dev';
    execSync(`lerna exec --scope ${package} -- npm run ${command}`, {
      stdio: [
        'inherit',
        'inherit',
        'inherit'
      ]
    });
  } catch (e) {
      throw (e);
  }
}

main();