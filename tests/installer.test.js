/**
 * tests/installer.test.js
 *
 * Unit tests for the installer module.
 * We mock `execa` and `ora` so no real commands are ever executed.
 */

// ── Mock execa so no real shell commands run ─────────────────────────────────
jest.mock('execa', () => ({
  execa: jest.fn().mockResolvedValue({ stdout: '', stderr: '' }),
}));

// ── Mock ora (spinner) so it doesn't print to the console ───────────────────
jest.mock('ora', () =>
  jest.fn().mockReturnValue({
    start: jest.fn().mockReturnThis(),
    succeed: jest.fn().mockReturnThis(),
    fail: jest.fn().mockReturnThis(),
  })
);

// ── Mock logger to silence output during tests ──────────────────────────────
jest.mock('../src/logger', () => ({
  success: jest.fn(),
  info:    jest.fn(),
  warn:    jest.fn(),
  error:   jest.fn(),
  step:    jest.fn(),
}));

const { execa }         = require('execa');
const { runInstaller }  = require('../src/installer');

beforeEach(() => {
  jest.clearAllMocks();
});

// ─────────────────────────────────────────────────────────────────────────────
describe('runInstaller — macOS', () => {
  const macOS = {
    id: 'mac',
    label: 'macOS',
    scriptPath: 'scripts/mac/install.sh',
    packageManager: 'Homebrew',
  };

  test('calls chmod and then bash for each tool', async () => {
    await runInstaller(macOS, ['git', 'nodejs']);
    // chmod + bash called once per tool = 4 total
    expect(execa).toHaveBeenCalledTimes(4);
  });

  test('calls bash with the correct script path and tool name', async () => {
    await runInstaller(macOS, ['docker']);
    const bashCalls = execa.mock.calls.filter((c) => c[0] === 'bash');
    expect(bashCalls.length).toBe(1);
    expect(bashCalls[0][1]).toContain('install.sh');
    expect(bashCalls[0][1]).toContain('docker');
  });

  test('does not throw when installing multiple tools', async () => {
    await expect(
      runInstaller(macOS, ['git', 'vscode', 'docker'])
    ).resolves.not.toThrow();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
describe('runInstaller — Windows', () => {
  const windowsOS = {
    id: 'windows',
    label: 'Windows',
    scriptPath: 'scripts/windows/install.ps1',
    packageManager: 'winget',
  };

  test('calls powershell for Windows installs', async () => {
    await runInstaller(windowsOS, ['git']);
    const psCalls = execa.mock.calls.filter((c) => c[0] === 'powershell');
    expect(psCalls.length).toBeGreaterThan(0);
  });

  test('passes -File and -Tool flags to PowerShell', async () => {
    await runInstaller(windowsOS, ['nodejs']);
    const psCalls = execa.mock.calls.filter((c) => c[0] === 'powershell');
    const args = psCalls[0][1];
    expect(args).toContain('-File');
    expect(args).toContain('-Tool');
    expect(args).toContain('nodejs');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
describe('runInstaller — error handling', () => {
  const macOS = {
    id: 'mac',
    label: 'macOS',
    scriptPath: 'scripts/mac/install.sh',
    packageManager: 'Homebrew',
  };

  test('does not crash if one tool fails — continues to next tool', async () => {
    // Make the bash call fail for the first tool, succeed for the second
    execa
      .mockResolvedValueOnce({})    // chmod succeeds
      .mockRejectedValueOnce(new Error('install failed'))  // bash fails
      .mockResolvedValueOnce({})    // chmod succeeds for next tool
      .mockResolvedValueOnce({});   // bash succeeds for next tool

    await expect(
      runInstaller(macOS, ['bad-tool', 'git'])
    ).resolves.not.toThrow();
  });

  test('calls execa 0 times when tool list is empty', async () => {
    await runInstaller(macOS, []);
    expect(execa).not.toHaveBeenCalled();
  });
});
