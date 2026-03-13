#!/usr/bin/env node

/**
 * dev-setup — CLI entry point
 *
 * Wires together OS detection, interactive tool selection, and installation.
 *
 * HOW TO EXTEND:
 * - To add a new command:  register it with program.command() below
 * - To add new tools:      update config/tools.json
 * - To support a new OS:   update src/detectOS.js and add a script in scripts/
 */

const { program } = require('commander');
const chalk       = require('chalk');
const inquirer    = require('inquirer');
const detectOS    = require('./src/detectOS');
const { runInstaller } = require('./src/installer');
const logger      = require('./src/logger');
const toolsConfig = require('./config/tools.json');
const VERSION     = require('./src/version');

// ─────────────────────────────────────────────
//  CLI Metadata
// ─────────────────────────────────────────────
program
  .name('dev-setup')
  .description('Quickly install common developer tools on your system')
  .version(VERSION)
  .option('-y, --yes',       'Skip prompts and install all tools automatically')
  .option('--dry-run',       'Show what would be installed without actually installing')
  .option('--list',          'List all available tools grouped by category and exit')
  .option('--category <cat>','Install only tools from a specific category')
  .parse(process.argv);

const options = program.opts();

// ─────────────────────────────────────────────
//  Helpers
// ─────────────────────────────────────────────

/**
 * Groups an array of tools by their category field.
 * @param {object[]} tools
 * @returns {Record<string, object[]>}
 */
function groupByCategory(tools) {
  return tools.reduce((acc, tool) => {
    if (!acc[tool.category]) acc[tool.category] = [];
    acc[tool.category].push(tool);
    return acc;
  }, {});
}

/**
 * Filters the tool list to only include tools supported on the current OS.
 * @param {object[]} tools
 * @param {string} osId  - e.g. 'mac', 'ubuntu', 'windows', 'kali'
 * @returns {object[]}
 */
function filterForOS(tools, osId) {
  return tools.filter((t) => t.os && t.os[osId] !== false);
}

// ─────────────────────────────────────────────
//  Main
// ─────────────────────────────────────────────
async function main() {
  // ── Banner ───────────────────────────────────
  console.log(chalk.bold.cyan('\n╔══════════════════════════════════╗'));
  console.log(chalk.bold.cyan('║         🛠  dev-setup  🛠         ║'));
  console.log(chalk.bold.cyan('║  Developer Environment Installer  ║'));
  console.log(chalk.bold.cyan('╚══════════════════════════════════╝'));
  console.log(chalk.gray(`  v${VERSION}  ·  https://github.com/YOUR_USERNAME/dev-setup\n`));

  // ── --list flag ──────────────────────────────
  if (options.list) {
    const grouped = groupByCategory(toolsConfig.tools);
    logger.info('All available tools:\n');

    for (const [cat, tools] of Object.entries(grouped)) {
      const catLabel = toolsConfig.categories[cat] || cat;
      console.log(chalk.bold.yellow(`\n  📦 ${cat.toUpperCase()} — ${catLabel}`));
      tools.forEach((t) => {
        const osFlags = Object.entries(t.os || {})
          .filter(([, v]) => v)
          .map(([k]) => chalk.gray(k))
          .join(', ');
        console.log(
          chalk.green('    ✔'),
          chalk.bold(t.label.padEnd(30)),
          chalk.gray(`[${osFlags}]`)
        );
        console.log(chalk.gray(`       ${t.description}`));
      });
    }
    console.log('');
    process.exit(0);
  }

  // ── Step 1: Detect OS ────────────────────────
  logger.step('Detecting operating system...');
  const os = detectOS();

  if (!os) {
    logger.error('Unsupported operating system.');
    logger.error('Please open an issue: https://github.com/YOUR_USERNAME/dev-setup/issues');
    process.exit(1);
  }
  logger.success(`Detected OS: ${chalk.bold(os.label)}   Package manager: ${chalk.bold(os.packageManager)}`);
  console.log('');

  // ── Step 2: Filter tools for this OS ─────────
  const availableTools = filterForOS(toolsConfig.tools, os.id);

  // If --category flag was passed, further narrow the list
  const filteredTools = options.category
    ? availableTools.filter((t) => t.category === options.category)
    : availableTools;

  if (filteredTools.length === 0) {
    logger.error(`No tools found for category "${options.category}". Try --list to see available categories.`);
    process.exit(1);
  }

  // ── Step 3: Select Tools ─────────────────────
  let selectedToolNames;

  if (options.yes) {
    selectedToolNames = filteredTools.map((t) => t.name);
    logger.info(`Installing all ${selectedToolNames.length} tools (--yes flag)\n`);
  } else {
    // Build grouped checkbox choices with category separators
    const grouped = groupByCategory(filteredTools);
    const choices = [];

    for (const [cat, tools] of Object.entries(grouped)) {
      const catLabel = toolsConfig.categories[cat] || cat;
      // Separator acts as a visual group header
      choices.push(new inquirer.Separator(
        chalk.bold.yellow(`\n  ── ${cat.toUpperCase()} · ${catLabel} ──`)
      ));
      tools.forEach((tool) => {
        choices.push({
          name: [
            chalk.bold(tool.label.padEnd(28)),
            chalk.gray(tool.description.slice(0, 60) + (tool.description.length > 60 ? '…' : '')),
          ].join(' '),
          value: tool.name,
          checked: tool.defaultSelected,
        });
      });
    }

    const { selectedTools } = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'selectedTools',
        message: chalk.bold('Select the tools you want to install') +
          chalk.gray(' (Space to toggle, Enter to confirm):'),
        choices,
        pageSize: 20,
        validate(answer) {
          if (answer.length === 0) return 'Please select at least one tool.';
          return true;
        },
      },
    ]);

    selectedToolNames = selectedTools;

    // ── Show whyUseIt info for selected tools ──
    console.log('');
    console.log(chalk.bold.white('  You selected:'));
    selectedToolNames.forEach((name) => {
      const tool = toolsConfig.tools.find((t) => t.name === name);
      if (tool) {
        console.log(chalk.green('    ✔'), chalk.bold(tool.label));
        console.log(chalk.gray(`       ${tool.whyUseIt}`));
      }
    });
    console.log('');
  }

  // ── Step 4: Confirm ───────────────────────────
  if (!options.yes && !options.dryRun) {
    const { confirm } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: `Install ${chalk.bold(selectedToolNames.length)} tool(s) on ${chalk.bold(os.label)}?`,
        default: true,
      },
    ]);
    if (!confirm) {
      logger.warn('Installation cancelled.');
      process.exit(0);
    }
    console.log('');
  }

  // ── Step 5: Dry run ───────────────────────────
  if (options.dryRun) {
    logger.warn('DRY RUN MODE — nothing will actually be installed.\n');
    selectedToolNames.forEach((name) => {
      const tool = toolsConfig.tools.find((t) => t.name === name);
      console.log(chalk.blue('  [dry-run]'), chalk.bold(`Would install: ${tool ? tool.label : name}`));
    });
    console.log('');
    logger.success('Dry run complete!');
    return;
  }

  // ── Step 6: Install ───────────────────────────
  await runInstaller(os, selectedToolNames);

  // ── Step 7: Done ──────────────────────────────
  console.log('');
  console.log(chalk.bold.green('╔══════════════════════════════════╗'));
  console.log(chalk.bold.green('║      ✅  Setup Complete!          ║'));
  console.log(chalk.bold.green('╚══════════════════════════════════╝'));
  console.log('');
  logger.info('You may need to restart your terminal for PATH changes to take effect.');
  console.log(
    chalk.gray('\n  Have a tool to suggest? Open an issue:'),
    chalk.underline('https://github.com/YOUR_USERNAME/dev-setup/issues\n')
  );
}

main().catch((err) => {
  logger.error(`Unexpected error: ${err.message}`);
  if (process.env.DEBUG) console.error(err);
  process.exit(1);
});
