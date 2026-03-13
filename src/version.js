/**
 * src/version.js
 *
 * Single source of truth for the version number.
 *
 * HOW TO BUMP THE VERSION:
 * 1. Change the number here
 * 2. Change it in package.json to match
 * 3. Add a new entry to CHANGELOG.md
 * 4. Commit: git commit -m "chore: bump version to vX.X.X"
 * 5. Tag:    git tag -a vX.X.X -m "Release vX.X.X"
 * 6. Push:   git push origin main --tags
 *
 * VERSIONING RULES (Semantic Versioning — semver.org):
 *
 *   MAJOR (1.x.x) — breaking changes, e.g. total CLI redesign
 *   MINOR (x.1.x) — new features added, e.g. new --profile flag, new OS support
 *   PATCH (x.x.1) — bug fixes only, e.g. fixing a broken install script
 *
 * Examples:
 *   Adding 10 new tools       → bump MINOR  (1.0.0 → 1.1.0)
 *   Fixing a broken script    → bump PATCH   (1.0.0 → 1.0.1)
 *   Redesigning the CLI       → bump MAJOR   (1.0.0 → 2.0.0)
 */

const VERSION = '1.0.0';

module.exports = VERSION;
