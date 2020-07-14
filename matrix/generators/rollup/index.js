const Generator = require('yeoman-generator');
const yosay = require('yosay');
const path = require('path');
const jsonfile = require('jsonfile');

const cwd = process.cwd();
const pkg = require(path.resolve(cwd, 'package.json'));
const matrixCfg = require(path.resolve(cwd, 'matrix.config.js'));
const lernaBin = require.resolve('lerna/cli.js');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }
  initializing() {
    this.log(yosay(
      'Welcome to the matrix generator!'
    ));
  }
  async prompting() {
    const prompts = [{
      name: 'pkgName',
      message: '输入你的库名称',
      default: 'test',
    }, {
      type: 'list',
      name: 'type',
      choices: matrixCfg.folders,
      message: '请选择你要生成的类型'
    }, {
      type: 'list',
      name: 'scope',
      choices: matrixCfg.scopes
    }, {
      type: 'list',
      name: 'platform',
      choices: matrixCfg.platforms
    }];
    try {
      const props = await this.prompt(prompts);
      this.props = props;
      const rootPath = path.resolve(cwd, props.type, props.pkgName);
      this.destinationRoot(rootPath);
    } catch (e) {
      throw (e);
    }
  }
  default() {
  }
  writing() {
    const normalFiles = [
      'rollup.config.dev.js',
      'rollup.config.prod.js',
      'README.md',
      '.browserslistrc'
    ];
    const normalFolders = [
      'src',
      'examples',
    ];
    const specFiles = [
      ['_package.json', 'package.json'],
    ];
    normalFiles.forEach(file => {
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(file),
        this.props
      );
    });
    specFiles.forEach(file => {
      this.fs.copyTpl(
        this.templatePath(file[0]),
        this.destinationPath(file[1]),
        this.props
      );
    });
    normalFolders.forEach(folder => {
      this.fs.copy(
        this.templatePath(folder),
        this.destinationPath(folder)
      );
    });
  }
  install() {
    const pkgPath = path.resolve(cwd, 'package.json');
    console.debug(this.props);
    const { pkgName, scope, type } = this.props;
    pkg.dependencies[`${scope}/${pkgName}`] = `file:${type}/${pkgName}`;
    jsonfile.writeFileSync(pkgPath, pkg, { spaces: 2 });
    this.spawnCommand('cd', [cwd])
    this.log('installing dependencies...');
    this.spawnCommand(lernaBin, ['link', 'convert'])
    this.spawnCommand(lernaBin, ['bootstrap'])
  }
  end() {
    this.log('Your project ' + this.props.pkgName + ' has been created!')
    this.log('')
  }
};
