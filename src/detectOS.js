/**
 * src/detectOS.js
 *
 * Detects the current operating system and returns a normalized OS object.
 *
 * HOW TO EXTEND:
 * - To support a new Linux distro, add a new case in the linux detection block
 * - To support a new OS entirely, add a new case in the switch statement
 * - Each OS object must have: { id, label, scriptPath, packageManager }
 */

const os = require('os');
const fs = require('fs');

/**
 * Reads /etc/os-release on Linux to determine the specific distro.
 * @returns {string} - distro name in lowercase (e.g. 'ubuntu', 'kali')
 */
function getLinuxDistro() {
  try {
    const releaseFile = fs.readFileSync('/etc/os-release', 'utf-8');
    const lines = releaseFile.split('\n');

    for (const line of lines) {
      if (line.startsWith('ID=')) {
        // Strip quotes and whitespace (e.g. ID="ubuntu" → ubuntu)
        return line.replace('ID=', '').replace(/"/g, '').trim().toLowerCase();
      }
    }
  } catch {
    // /etc/os-release not found — fall back to generic linux
    return 'linux';
  }

  return 'linux';
}

/**
 * Main OS detection function.
 *
 * Returns an OS descriptor object used by the installer, or null if unsupported.
 *
 * @returns {{ id: string, label: string, scriptPath: string, packageManager: string } | null}
 */
function detectOS() {
  const platform = os.platform(); // 'win32', 'darwin', 'linux'

  switch (platform) {

    // ── Windows ───────────────────────────────
    case 'win32':
      return {
        id: 'windows',
        label: 'Windows',
        scriptPath: 'scripts/windows/install.ps1',
        packageManager: 'winget / Chocolatey',
      };

    // ── macOS ─────────────────────────────────
    case 'darwin':
      return {
        id: 'mac',
        label: 'macOS',
        scriptPath: 'scripts/mac/install.sh',
        packageManager: 'Homebrew',
      };

    // ── Linux ─────────────────────────────────
    case 'linux': {
      const distro = getLinuxDistro();

      switch (distro) {
        case 'ubuntu':
        case 'debian':  // Debian works the same as Ubuntu for our scripts
          return {
            id: 'ubuntu',
            label: `Linux (${distro.charAt(0).toUpperCase() + distro.slice(1)})`,
            scriptPath: 'scripts/linux/ubuntu.sh',
            packageManager: 'apt',
          };

        case 'kali':
          return {
            id: 'kali',
            label: 'Linux (Kali)',
            scriptPath: 'scripts/linux/kali.sh',
            packageManager: 'apt',
          };

        case 'fedora':
          // ── EXAMPLE: How to add a new distro ──
          // 1. Return a new OS object pointing to your script
          // 2. Create scripts/linux/fedora.sh
          // 3. Add the distro's tools to config/tools.json if needed
          return {
            id: 'fedora',
            label: 'Linux (Fedora)',
            scriptPath: 'scripts/linux/fedora.sh',
            packageManager: 'dnf',
          };

        case 'arch':
        case 'manjaro':
          return {
            id: 'arch',
            label: `Linux (${distro.charAt(0).toUpperCase() + distro.slice(1)})`,
            scriptPath: 'scripts/linux/arch.sh',
            packageManager: 'pacman',
          };

        default:
          // Unknown Linux distro — try Ubuntu script as fallback
          console.warn(`⚠  Unknown Linux distro "${distro}". Falling back to Ubuntu script.`);
          return {
            id: 'ubuntu',
            label: `Linux (${distro} — using Ubuntu fallback)`,
            scriptPath: 'scripts/linux/ubuntu.sh',
            packageManager: 'apt',
          };
      }
    }

    // ── Unsupported ───────────────────────────
    default:
      return null;
  }
}

module.exports = detectOS;
