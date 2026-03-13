/**
 * tests/logger.test.js
 *
 * Unit tests for the logger utility.
 * Verifies that each log method calls console.log and outputs the right content.
 */

// Spy on console.log before requiring the module
const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

const logger = require('../src/logger');

afterEach(() => {
  consoleSpy.mockClear();
});

afterAll(() => {
  consoleSpy.mockRestore();
});

// ─────────────────────────────────────────────────────────────────────────────
describe('logger', () => {

  test('logger.success calls console.log once', () => {
    logger.success('All good');
    expect(consoleSpy).toHaveBeenCalledTimes(1);
  });

  test('logger.info calls console.log once', () => {
    logger.info('Some info');
    expect(consoleSpy).toHaveBeenCalledTimes(1);
  });

  test('logger.warn calls console.log once', () => {
    logger.warn('A warning');
    expect(consoleSpy).toHaveBeenCalledTimes(1);
  });

  test('logger.error calls console.log once', () => {
    logger.error('An error');
    expect(consoleSpy).toHaveBeenCalledTimes(1);
  });

  test('logger.step calls console.log once', () => {
    logger.step('A step');
    expect(consoleSpy).toHaveBeenCalledTimes(1);
  });

  test('logger output contains the message text', () => {
    const msg = 'hello-unique-message';
    logger.info(msg);
    // The combined arguments to console.log should include the message somewhere
    const allArgs = consoleSpy.mock.calls[0].join(' ');
    expect(allArgs).toContain(msg);
  });

  test('all logger methods are functions', () => {
    expect(typeof logger.success).toBe('function');
    expect(typeof logger.info).toBe('function');
    expect(typeof logger.warn).toBe('function');
    expect(typeof logger.error).toBe('function');
    expect(typeof logger.step).toBe('function');
  });
});
