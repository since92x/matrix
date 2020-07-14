#! /usr/bin/env node

const lernaBin = require.resolve('lerna/cli.js');
const inquirer = require('inquirer');
const chalk = require('chalk');
const { exec }= require('shelljs');

function main() {
  if ( exec('git status -s').stdout !== '') {
    throw new Error(chalk.red(`Working tree has uncommitted changes!`));
  }
  const currentBranch = exec('git branch --show-current', { silent: true });
  const preid = currentBranch.trim().toLowerCase().replace(/[^a-z]/g, '');
  if (exec(`${lernaBin} publish --canary prepatch --preid ${preid} --yes`).code !== 0) {
    throw new Error(chalk.red(`lerna publish --canary failed!`));
  }
  const { underline,  green } = chalk;
  // const ug = s => green(underline(s));
  // inquirer.prompt([{
  //   type: 'input',
  //   message: chalk.blue(`Append version to commit: ${ug('Y')}es/${ug('N')}o/${ug('E')}xit`),
  //   name: 'commit'
  // }]).then(({ commit })=> {
  //   if (commit.toLowerCase() === 'y') {
  //     if (exec(`${lernaBin} publish --canary prepatch --preid ${preid} --yes --no-git-reset`).code !== 0) {
  //       throw new Error(chalk.red(`lerna publish --canary failed!`));
  //     }
  //     exec('git add .').stdout;
  //     exec('git commit --amend  -C HEAD').stdout;
  //     exec(`git push -f origin ${currentBranch}`).stdout;
  //   } else if (commit.toLowerCase() === 'n') {
  //     if (exec(`${lernaBin} publish --canary prepatch --preid ${preid} --yes --no-git-reset`).code !== 0) {
  //       throw new Error(chalk.red(`lerna publish --canary failed!`));
  //     }
  //     exec('git add .').stdout;
  //     inquirer.prompt([{
  //       type: 'input',
  //       message: 'Input commit message:\n',
  //       name: 'msg'
  //     }]).then(({ msg })=> {
  //       exec(`git commit -m "release(canary): ${msg}"`).stdout;
  //       exec(`git push origin ${currentBranch}`).stdout;
  //     });
  //   } else {
  //     console.log('Exit!');
  //   }
  // });
}

main();