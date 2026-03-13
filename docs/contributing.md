# Contributing to dev-setup

Thank you for helping make **dev-setup** better for developers everywhere! 🎉

This guide will walk you through how to contribute — whether you're adding a new tool, supporting a new operating system, or fixing a bug.

---

## 🚀 Quick Start

```bash
# 1. Fork the repo on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/dev-setup.git
cd dev-setup

# 2. Install dependencies
npm install

# 3. Test the CLI locally
node index.js

# 4. Try the --dry-run flag to test without installing anything
node index.js --dry-run

# 5. List all available tools
node index.js --list
```

---

## 📦 How to Add a New Tool

Adding a tool takes **3 steps**:

### Step 1 — Add it to `config/tools.json`

```json
{
  "name": "mytool",
  "description": "A short description of what it does",
  "defaultSelected": false,
  "category": "cli",
  "website": "https://mytool.dev"
}
```

**Categories:** `core`, `runtime`, `editor`, `cli`, `devops`, `cloud`

---

### Step 2 — Add install commands in each OS script

**macOS** (`scripts/mac/install.sh`):
```bash
mytool)
  brew install mytool
  ;;
```

**Ubuntu/Debian** (`scripts/linux/ubuntu.sh`):
```bash
mytool)
  ensure_apt_updated
  sudo apt-get install -y mytool
  ;;
```

**Kali** (`scripts/linux/kali.sh`):
```bash
mytool)
  ensure_apt_updated
  sudo apt-get install -y mytool
  ;;
```

**Windows** (`scripts/windows/install.ps1`):
```powershell
"mytool" {
  Install-WithWinget "Publisher.mytool"
}
```
> Tip: Find the winget package ID by running `winget search mytool` in PowerShell.

---

### Step 3 — Submit a Pull Request

```bash
git checkout -b add-mytool
git add .
git commit -m "feat: add mytool support"
git push origin add-mytool
```

Then open a PR on GitHub with:
- What the tool does
- Why developers would want it
- Any OS limitations (e.g. "htop is Linux/macOS only")

---

## 🖥 How to Add a New Operating System

1. **Update `src/detectOS.js`** — add a new case returning an OS descriptor:
```js
case 'fedora':
  return {
    id: 'fedora',
    label: 'Linux (Fedora)',
    scriptPath: 'scripts/linux/fedora.sh',
    packageManager: 'dnf',
  };
```

2. **Create a new script** in `scripts/linux/fedora.sh` following the pattern of `ubuntu.sh`.

3. **Test it** on the target OS and submit a PR.

---

## 🏷 Issue Labels

| Label | Meaning |
|---|---|
| `good first issue` | Beginner-friendly task |
| `new-tool` | Request to add a new tool |
| `new-os` | Request to support a new OS |
| `bug` | Something is broken |
| `enhancement` | Improvement to existing functionality |
| `help wanted` | Maintainers need community help |
| `documentation` | Docs need updating |

---

## 🧪 Testing

Before submitting a PR, please test your changes with:

```bash
# Dry run (no real installs)
node index.js --dry-run

# List mode
node index.js --list

# Install all (on a VM or test machine)
node index.js --yes
```

---

## 📋 Commit Message Format

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add rust support on macOS
fix: handle missing /etc/os-release on Linux
docs: update contributing guide
chore: bump dependencies
```

---

## 💬 Questions?

Open a [GitHub Discussion](https://github.com/YOUR_USERNAME/dev-setup/discussions) or ping us in the Issues tab.

We review PRs within a few days. Thank you for contributing! 🙌
