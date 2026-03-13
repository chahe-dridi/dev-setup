/**
 * tests/detectOS.test.js
 *
 * Unit tests for the OS detection module.
 * Run with: npm test
 */

const os = require('os');
const fs = require('fs');

// We mock Node's `os` and `fs` modules so tests run on any machine
// regardless of what OS the developer is actually on.
jest.mock('os');
jest.mock('fs');

const detectOS = require('../src/detectOS');

// ─────────────────────────────────────────────────────────────────────────────
//  macOS
// ─────────────────────────────────────────────────────────────────────────────
describe('detectOS — macOS', () => {
  beforeEach(() => {
    os.platform.mockReturnValue('darwin');
  });

  test('returns the correct mac OS descriptor', () => {
    const result = detectOS();
    expect(result).not.toBeNull();
    expect(result.id).toBe('mac');
    expect(result.label).toBe('macOS');
    expect(result.scriptPath).toBe('scripts/mac/install.sh');
    expect(result.packageManager).toBe('Homebrew');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
//  Windows
// ─────────────────────────────────────────────────────────────────────────────
describe('detectOS — Windows', () => {
  beforeEach(() => {
    os.platform.mockReturnValue('win32');
  });

  test('returns the correct Windows OS descriptor', () => {
    const result = detectOS();
    expect(result).not.toBeNull();
    expect(result.id).toBe('windows');
    expect(result.label).toBe('Windows');
    expect(result.scriptPath).toBe('scripts/windows/install.ps1');
    expect(result.packageManager).toMatch(/winget/i);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
//  Linux — Ubuntu
// ─────────────────────────────────────────────────────────────────────────────
describe('detectOS — Linux Ubuntu', () => {
  beforeEach(() => {
    os.platform.mockReturnValue('linux');
    fs.readFileSync.mockReturnValue('ID=ubuntu\nVERSION_ID="22.04"\n');
  });

  test('returns the ubuntu OS descriptor', () => {
    const result = detectOS();
    expect(result).not.toBeNull();
    expect(result.id).toBe('ubuntu');
    expect(result.scriptPath).toBe('scripts/linux/ubuntu.sh');
    expect(result.packageManager).toBe('apt');
  });

  test('label includes the distro name', () => {
    const result = detectOS();
    expect(result.label.toLowerCase()).toContain('ubuntu');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
//  Linux — Debian (should fall back to ubuntu script)
// ─────────────────────────────────────────────────────────────────────────────
describe('detectOS — Linux Debian', () => {
  beforeEach(() => {
    os.platform.mockReturnValue('linux');
    fs.readFileSync.mockReturnValue('ID=debian\n');
  });

  test('uses the ubuntu script for Debian', () => {
    const result = detectOS();
    expect(result).not.toBeNull();
    expect(result.scriptPath).toBe('scripts/linux/ubuntu.sh');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
//  Linux — Kali
// ─────────────────────────────────────────────────────────────────────────────
describe('detectOS — Linux Kali', () => {
  beforeEach(() => {
    os.platform.mockReturnValue('linux');
    fs.readFileSync.mockReturnValue('ID=kali\n');
  });

  test('returns the kali OS descriptor', () => {
    const result = detectOS();
    expect(result).not.toBeNull();
    expect(result.id).toBe('kali');
    expect(result.scriptPath).toBe('scripts/linux/kali.sh');
    expect(result.packageManager).toBe('apt');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
//  Linux — Unknown distro (graceful fallback)
// ─────────────────────────────────────────────────────────────────────────────
describe('detectOS — Linux unknown distro fallback', () => {
  beforeEach(() => {
    os.platform.mockReturnValue('linux');
    fs.readFileSync.mockReturnValue('ID=popos\n');
  });

  test('falls back to ubuntu script for unknown distros', () => {
    const result = detectOS();
    expect(result).not.toBeNull();
    // Should not crash — fall back gracefully
    expect(result.scriptPath).toBe('scripts/linux/ubuntu.sh');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
//  Linux — Missing /etc/os-release
// ─────────────────────────────────────────────────────────────────────────────
describe('detectOS — Linux with missing os-release file', () => {
  beforeEach(() => {
    os.platform.mockReturnValue('linux');
    fs.readFileSync.mockImplementation(() => {
      throw new Error('ENOENT: no such file or directory');
    });
  });

  test('does not throw when /etc/os-release is missing', () => {
    expect(() => detectOS()).not.toThrow();
  });

  test('returns a linux fallback descriptor', () => {
    const result = detectOS();
    expect(result).not.toBeNull();
    expect(result.scriptPath).toBe('scripts/linux/ubuntu.sh');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
//  Unsupported platform
// ─────────────────────────────────────────────────────────────────────────────
describe('detectOS — unsupported platform', () => {
  beforeEach(() => {
    os.platform.mockReturnValue('freebsd');
  });

  test('returns null for unsupported platforms', () => {
    const result = detectOS();
    expect(result).toBeNull();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
//  Return shape validation
// ─────────────────────────────────────────────────────────────────────────────
describe('detectOS — return object shape', () => {
  beforeEach(() => {
    os.platform.mockReturnValue('darwin');
  });

  test('result has all required fields', () => {
    const result = detectOS();
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('label');
    expect(result).toHaveProperty('scriptPath');
    expect(result).toHaveProperty('packageManager');
  });

  test('all string fields are non-empty strings', () => {
    const result = detectOS();
    expect(typeof result.id).toBe('string');
    expect(result.id.length).toBeGreaterThan(0);
    expect(typeof result.label).toBe('string');
    expect(result.label.length).toBeGreaterThan(0);
    expect(typeof result.scriptPath).toBe('string');
    expect(result.scriptPath.length).toBeGreaterThan(0);
  });
});
