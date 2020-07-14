#! /usr/bin/env node

const path = require('path');
const inquirer = require('inquirer');
const { execSync } = require('child_process');
const yo = require.resolve('yo/lib/cli');

const { templates } = require(path.resolve(process.cwd(), 'matrix.config.js'));

function start() {
  const prompts = [
    {
      type: 'list',
      name: 'template',
      message: '选择模板',
      choices: templates,
    }
  ];
  inquirer.prompt(prompts).then(({ template }) => {
    const templatePath = require.resolve(template);
    execSync(`${yo} ${templatePath}`, {
      stdio: [
        'inherit',
        'inherit',
        'inherit'
      ]
    });
  });
}

start();

