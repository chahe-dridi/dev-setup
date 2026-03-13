/**
 * src/installer.js
 *
 * Executes the OS-specific installation script and passes selected tools as arguments.
 *
 * HOW TO EXTEND:
 * - To add a new OS, add a case in detectOS.js and create a corresponding script
 * - Each script receives the selected tool names as arguments: install.sh git nodejs docker
 * - Scripts should handle unknown tool names gracefully (just skip them)
 */

const path = require('path');
const { execa } = require('execa');
const ora = require('ora');
const chalk = require('chalk');
const logger = require('./logger');

/**
 * Runs the appropriate installation script for the detected OS.
 *
 * @param {{ id: string, label: string, scriptPath: string }} osInfo - OS descriptor from detectOS()
 * @param {string[]} selectedTools - Array of tool names to install (e.g. ['git', 'nodejs'])
 */
async function runInstaller(osInfo, selectedTools) {
  const scriptPath = path.join(__dirname, '..', osInfo.scriptPath);

  logger.info(`Running installer for ${chalk.bold(osInfo.label)}`);
  logger.info(`Package manager: ${chalk.bold(osInfo.packageManager)}\n`);

  // Install each tool one at a time so we can show per-tool progress
  for (const tool of selectedTools) {
    const spinner = ora({
      text: `Installing ${chalk.bold(tool)}...`,
      color: 'cyan',
    }).start();

    try {
      if (osInfo.id === 'windows') {
        // Windows: run PowerShell script
        await execa('powershell', [
          '-ExecutionPolicy', 'Bypass',
          '-File', scriptPath,
          '-Tool', tool,
        ], { stdio: 'pipe' });
      } else {
        // macOS / Linux: run shell script
        // Ensure the script is executable first
        await execa('chmod', ['+x', scriptPath]);
        await execa('bash', [scriptPath, tool], { stdio: 'pipe' });
      }

      spinner.succeed(chalk.green(`Installed: ${chalk.bold(tool)}`));

    } catch (err) {
      spinner.fail(chalk.red(`Failed to install: ${chalk.bold(tool)}`));

      // Show a helpful error message but don't crash the whole installer
      logger.warn(`Error details: ${err.stderr || err.message}`);
      logger.warn(`Skipping ${tool} and continuing...\n`);
    }
  }
}

module.exports = { runInstaller };
