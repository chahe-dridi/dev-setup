/**
 * tests/tools.test.js
 *
 * Unit tests that validate the integrity of config/tools.json.
 *
 * These tests run automatically in CI to catch mistakes made by contributors
 * when adding new tools — such as missing required fields or invalid OS flags.
 */

const toolsConfig = require('../config/tools.json');

const VALID_CATEGORIES = [
  'core', 'runtime', 'editor', 'ide', 'framework',
  'cli', 'devops', 'cloud', 'database', 'testing', 'mobile',
];

const VALID_OS_KEYS = ['windows', 'mac', 'ubuntu', 'kali'];

// ─────────────────────────────────────────────────────────────────────────────
//  Top-level structure
// ─────────────────────────────────────────────────────────────────────────────
describe('tools.json — top-level structure', () => {
  test('has a "tools" array', () => {
    expect(Array.isArray(toolsConfig.tools)).toBe(true);
  });

  test('tools array is not empty', () => {
    expect(toolsConfig.tools.length).toBeGreaterThan(0);
  });

  test('has a "categories" object', () => {
    expect(typeof toolsConfig.categories).toBe('object');
    expect(toolsConfig.categories).not.toBeNull();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
//  Per-tool field validation
// ─────────────────────────────────────────────────────────────────────────────
describe('tools.json — each tool has required fields', () => {

  toolsConfig.tools.forEach((tool) => {
    describe(`tool: "${tool.name}"`, () => {

      test('has a non-empty "name" string (lowercase, no spaces)', () => {
        expect(typeof tool.name).toBe('string');
        expect(tool.name.length).toBeGreaterThan(0);
        expect(tool.name).toBe(tool.name.toLowerCase());
        expect(tool.name).not.toMatch(/\s/);
      });

      test('has a non-empty "label" string', () => {
        expect(typeof tool.label).toBe('string');
        expect(tool.label.length).toBeGreaterThan(0);
      });

      test('has a non-empty "description" string', () => {
        expect(typeof tool.description).toBe('string');
        expect(tool.description.length).toBeGreaterThan(10);
      });

      test('has a non-empty "whyUseIt" string', () => {
        expect(typeof tool.whyUseIt).toBe('string');
        expect(tool.whyUseIt.length).toBeGreaterThan(10);
      });

      test('"defaultSelected" is a boolean', () => {
        expect(typeof tool.defaultSelected).toBe('boolean');
      });

      test('"category" is a valid category string', () => {
        expect(VALID_CATEGORIES).toContain(tool.category);
      });

      test('"tags" is an array of strings', () => {
        expect(Array.isArray(tool.tags)).toBe(true);
        tool.tags.forEach((tag) => {
          expect(typeof tag).toBe('string');
        });
      });

      test('has a non-empty "website" URL string', () => {
        expect(typeof tool.website).toBe('string');
        expect(tool.website).toMatch(/^https?:\/\//);
      });

      test('"os" is an object with only valid OS keys', () => {
        expect(typeof tool.os).toBe('object');
        expect(tool.os).not.toBeNull();
        Object.keys(tool.os).forEach((key) => {
          expect(VALID_OS_KEYS).toContain(key);
          expect(typeof tool.os[key]).toBe('boolean');
        });
      });

      test('is supported on at least one OS', () => {
        const supportedOnAny = Object.values(tool.os).some((v) => v === true);
        expect(supportedOnAny).toBe(true);
      });
    });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
//  Uniqueness
// ─────────────────────────────────────────────────────────────────────────────
describe('tools.json — uniqueness', () => {
  test('all tool "name" values are unique', () => {
    const names = toolsConfig.tools.map((t) => t.name);
    const unique = new Set(names);
    expect(unique.size).toBe(names.length);
  });

  test('all tool "label" values are unique', () => {
    const labels = toolsConfig.tools.map((t) => t.label);
    const unique = new Set(labels);
    expect(unique.size).toBe(labels.length);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
//  Category consistency
// ─────────────────────────────────────────────────────────────────────────────
describe('tools.json — category consistency', () => {
  test('every category used in tools[] is listed in categories{}', () => {
    const usedCategories = [...new Set(toolsConfig.tools.map((t) => t.category))];
    usedCategories.forEach((cat) => {
      expect(toolsConfig.categories).toHaveProperty(cat);
    });
  });
});
