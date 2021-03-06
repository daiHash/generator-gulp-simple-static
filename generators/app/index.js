'use strict';
// Require dependencies
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');
const ROOT_DIRECTORY = process
  .cwd()
  .split(path.sep)
  .pop();

module.exports = class extends Generator {
  // Configurations will be loaded here.

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `${chalk.hex('#1395ba')(
          `Welcome to the fucking amazing and awesome \n${chalk.hex('#EFD460')(
            'gulp-simple static'
          )} generator!`
        )}`
      )
    );

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        // Defaults to the project's folder name if the input is skipped
        default: ROOT_DIRECTORY
      }
    ];
    return this.prompt(prompts).then(answer => {
      // To access props later use this.props.someAnswer;
      this.props = answer;
      if (answer.name === this.appname) {
        this.destinationRoot(answer.default);
      } else {
        this.destinationRoot(answer.name);
      }
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      {
        name: this.props.name
      }
    );
    this.fs.copy(this.templatePath('_babelrc'), this.destinationPath('.babelrc'));
    this.fs.copy(this.templatePath('gulpfile.js'), this.destinationPath('gulpfile.js'));
    this.fs.copy(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js')
    );
    this.fs.copy(this.templatePath('src'), this.destinationPath('src'));
  }

  install() {
    this.npmInstall().then(() => {
      if (this.props.name === ROOT_DIRECTORY) {
        this.log(
          yosay(
            `${chalk.hex('#1395ba')(
              `Thank you for using ${chalk.hex('#EFD460')(
                'gulp-simple static'
              )} generator template!`
            )}`
          ),
          `\n - ${chalk.hex('##f16c20')('npm run dev')} to start the local server`
        );
      } else {
        this.log(
          yosay(
            `${chalk.hex('#1395ba')(
              `Thank you for using ${chalk.hex('#EFD460')(
                'gulp-simple static'
              )} generator template!`
            )}`
          ),
          `\n - cd ${chalk.hex('##f16c20')(`${this.props.name}`)}`,
          `\n - run ${chalk.hex('##f16c20')('npm run dev')} to start the local server`
        );
      }
    });
  }
};
