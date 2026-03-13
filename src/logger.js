/**
 * src/logger.js
 *
 * A simple logger utility for consistent, coloured CLI output.
 *
 * HOW TO EXTEND:
 * - Add a new log level by exporting a new function below
 * - To add file logging, use the 'winston' package and add a file transport
 */

const chalk = require('chalk');

const logger = {
  /** Green checkmark — use for successful steps */
  success: (msg) => console.log(chalk.green('  ✔'), chalk.green(msg)),

  /** Blue info icon — use for general information */
  info: (msg) => console.log(chalk.blue('  ℹ'), chalk.blue(msg)),

  /** Yellow warning — use for non-fatal issues */
  warn: (msg) => console.log(chalk.yellow('  ⚠'), chalk.yellow(msg)),

  /** Red cross — use for fatal errors */
  error: (msg) => console.log(chalk.red('  ✖'), chalk.red(msg)),

  /** Cyan arrow — use for steps in progress */
  step: (msg) => console.log(chalk.cyan('  →'), chalk.cyan(msg)),
};

module.exports = logger;
