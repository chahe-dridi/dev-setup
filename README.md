<div align="center">

# 🛠 dev-setup

**One command to set up your entire developer environment.**

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/YOUR_USERNAME/dev-setup/releases/tag/v1.0.0)
[![npm](https://img.shields.io/npm/v/dev-setup.svg)](https://www.npmjs.com/package/dev-setup)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)](https://nodejs.org)
[![Tests](https://img.shields.io/badge/tests-passing-brightgreen.svg)](https://github.com/YOUR_USERNAME/dev-setup/actions)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/YOUR_USERNAME/dev-setup/blob/main/docs/contributing.md)
[![Made with ❤️](https://img.shields.io/badge/made%20with-%E2%9D%A4%EF%B8%8F-red.svg)](https://github.com/YOUR_USERNAME/dev-setup)

```bash
npx dev-setup
```

*Works on Windows · macOS · Ubuntu · Kali Linux*

</div>

---

## ✨ Features

- 🖥 **Cross-platform** — Windows, macOS, Ubuntu, Kali Linux
- ☑️ **Interactive tool selection** — checkbox menu grouped by category
- 💡 **Tool descriptions** — know exactly what you're installing and why
- 🔍 **Auto OS detection** — no manual configuration needed
- 🧪 **Dry-run mode** — preview installs without touching your system
- 🧩 **Modular & extensible** — easy to add new tools or OS support
- 🎨 **Beautiful CLI output** — coloured messages and progress spinners
- 📦 **40+ tools** across 11 categories: runtimes, IDEs, DevOps, cloud, databases, mobile, and more

---

## 📸 Preview

```
╔══════════════════════════════════╗
║         🛠  dev-setup  🛠         ║
║  Developer Environment Installer  ║
╚══════════════════════════════════╝

  → Detecting operating system...
  ✔ Detected OS: macOS   Package manager: Homebrew

  ── CORE · Essential tools every developer needs ──
  ◉ Git                          The world's most widely used version control system…
  ◉ curl                         A command-line HTTP client for testing APIs…

  ── RUNTIME · Language runtimes and version managers ──
  ◉ Node.js (LTS)                A JavaScript runtime — comes bundled with npm…
  ◯ Python 3                     Versatile language for web, ML, and scripting…

  ── IDE · Full-featured Integrated Development Environments ──
  ◉ Visual Studio Code           Microsoft's free, popular code editor…
  ◯ IntelliJ IDEA Community      JetBrains' powerful Java and Kotlin IDE…

  You selected:
  ✔ Git           Without Git you cannot collaborate or roll back mistakes.
  ✔ Node.js       Required for any JavaScript or TypeScript project.
  ✔ VS Code       The #1 editor used by developers worldwide.

  ✔ Installed: Git
  ✔ Installed: Node.js (LTS)
  ✔ Installed: Visual Studio Code

╔══════════════════════════════════╗
║      ✅  Setup Complete!          ║
╚══════════════════════════════════╝
```

---

## 🚀 Usage

### Run instantly with npx (no install required)

```bash
npx dev-setup
```

### Or install globally

```bash
npm install -g dev-setup
dev-setup
```

### All flags

| Flag | Description |
|---|---|
| *(no flags)* | Launch interactive menu |
| `-y, --yes` | Skip prompts, install all tools |
| `--dry-run` | Preview what would be installed without installing |
| `--list` | List all available tools grouped by category |
| `--category <name>` | Only show tools from one category |
| `--version` | Show current version |
| `--help` | Show help |

### Examples

```bash
# Interactive mode (recommended)
npx dev-setup

# Install everything without prompts
npx dev-setup --yes

# Preview without installing anything
npx dev-setup --dry-run

# See all available tools
npx dev-setup --list

# Install only DevOps tools
npx dev-setup --category devops
```

---

## 🖥 Supported Operating Systems

| OS | Package Manager | Status |
|---|---|---|
| macOS | Homebrew | ✅ Supported |
| Ubuntu / Debian | apt | ✅ Supported |
| Kali Linux | apt | ✅ Supported |
| Windows 10/11 | winget | ✅ Supported |
| Fedora / RHEL | dnf | 🚧 Planned — [contribute!](https://github.com/YOUR_USERNAME/dev-setup/issues) |
| Arch / Manjaro | pacman | 🚧 Planned — [contribute!](https://github.com/YOUR_USERNAME/dev-setup/issues) |

---

## 📦 Available Tools (40+)

| Tool | Category | macOS | Ubuntu | Kali | Windows |
|---|---|:---:|:---:|:---:|:---:|
| Git | Core | ✅ | ✅ | ✅ | ✅ |
| GitHub CLI | Core | ✅ | ✅ | ✅ | ✅ |
| curl | Core | ✅ | ✅ | ✅ | ✅ |
| wget | Core | ✅ | ✅ | ✅ | ✅ |
| Node.js LTS | Runtime | ✅ | ✅ | ✅ | ✅ |
| NVM | Runtime | ✅ | ✅ | ✅ | ✅ |
| Python 3 | Runtime | ✅ | ✅ | ✅ | ✅ |
| Java JDK 21 | Runtime | ✅ | ✅ | ✅ | ✅ |
| .NET SDK | Runtime | ✅ | ✅ | ✅ | ✅ |
| Go | Runtime | ✅ | ✅ | ✅ | ✅ |
| Rust | Runtime | ✅ | ✅ | ✅ | ✅ |
| Ruby | Runtime | ✅ | ✅ | ✅ | ✅ |
| PHP 8 | Runtime | ✅ | ✅ | ✅ | ✅ |
| VS Code | IDE | ✅ | ✅ | ✅ | ✅ |
| IntelliJ IDEA | IDE | ✅ | ✅ | ✅ | ❌ |
| PyCharm | IDE | ✅ | ✅ | ✅ | ❌ |
| WebStorm | IDE | ✅ | ✅ | ✅ | ❌ |
| Vim | Editor | ✅ | ✅ | ✅ | ✅ |
| Neovim | Editor | ✅ | ✅ | ✅ | ✅ |
| Docker | DevOps | ✅ | ✅ | ✅ | ✅ |
| kubectl | DevOps | ✅ | ✅ | ✅ | ✅ |
| Terraform | DevOps | ✅ | ✅ | ✅ | ✅ |
| Ansible | DevOps | ❌ | ✅ | ✅ | ✅ |
| AWS CLI | Cloud | ✅ | ✅ | ✅ | ✅ |
| Google Cloud CLI | Cloud | ✅ | ✅ | ✅ | ✅ |
| Azure CLI | Cloud | ✅ | ✅ | ✅ | ✅ |
| MongoDB | Database | ✅ | ✅ | ✅ | ✅ |
| PostgreSQL | Database | ✅ | ✅ | ✅ | ✅ |
| MySQL | Database | ✅ | ✅ | ✅ | ✅ |
| Redis | Database | ✅ | ✅ | ✅ | ❌ |
| Angular CLI | Framework | ✅ | ✅ | ✅ | ✅ |
| Create React App | Framework | ✅ | ✅ | ✅ | ✅ |
| Vite | Framework | ✅ | ✅ | ✅ | ✅ |
| Next.js | Framework | ✅ | ✅ | ✅ | ✅ |
| Express.js | Framework | ✅ | ✅ | ✅ | ✅ |
| Spring Boot CLI | Framework | ✅ | ✅ | ✅ | ✅ |
| Maven | Framework | ✅ | ✅ | ✅ | ✅ |
| Gradle | Framework | ✅ | ✅ | ✅ | ✅ |
| Flutter SDK | Mobile | ✅ | ✅ | ❌ | ✅ |
| Android Studio | Mobile | ✅ | ✅ | ❌ | ✅ |
| Zsh | CLI | ✅ | ✅ | ✅ | ❌ |
| Oh My Zsh | CLI | ✅ | ✅ | ✅ | ❌ |
| tmux | CLI | ✅ | ✅ | ✅ | ❌ |
| htop | CLI | ✅ | ✅ | ✅ | ❌ |
| jq | CLI | ✅ | ✅ | ✅ | ✅ |
| Make | CLI | ✅ | ✅ | ✅ | ❌ |
| Jest | Testing | ✅ | ✅ | ✅ | ✅ |
| pytest | Testing | ✅ | ✅ | ✅ | ✅ |
| Postman | Testing | ✅ | ✅ | ✅ | ❌ |

> Missing a tool? [Open an issue →](https://github.com/YOUR_USERNAME/dev-setup/issues/new/choose)

---

## 🏗 Project Structure

```
dev-setup/
├── index.js                    # CLI entry point
├── package.json
├── README.md
├── src/
│   ├── detectOS.js             # OS detection logic
│   ├── installer.js            # Runs the OS-specific scripts
│   └── logger.js               # Coloured CLI output utilities
├── scripts/
│   ├── windows/install.ps1     # PowerShell installer (winget)
│   ├── mac/install.sh          # Homebrew installer
│   └── linux/
│       ├── ubuntu.sh           # apt installer for Ubuntu/Debian
│       └── kali.sh             # apt installer for Kali
├── config/
│   └── tools.json              # Master list of all tools
├── tests/
│   ├── detectOS.test.js        # OS detection unit tests
│   ├── installer.test.js       # Installer unit tests
│   ├── logger.test.js          # Logger unit tests
│   └── tools.test.js           # tools.json integrity tests
├── .github/
│   ├── ISSUE_TEMPLATE/         # Bug / new tool / new OS templates
│   └── workflows/ci.yml        # GitHub Actions CI
└── docs/
    └── contributing.md         # How to contribute
```

---

## 🧪 Running Tests

```bash
npm test              # run all tests + coverage report
npm run test:watch    # watch mode during development
npm run test:verbose  # detailed output per test
```

---

## 🤝 Contributing

All contributions are welcome — from adding a new tool to supporting a whole new OS!

The quickest ways to contribute:
- ➕ **Add a new tool** — add it to `tools.json` + the install scripts
- 🖥 **Add OS support** — Fedora, Arch, Alpine...
- 🐛 **Fix a bug** — especially OS-specific install edge cases
- 📖 **Improve docs** — always needed

Read the full guide: [docs/contributing.md](./docs/contributing.md)

---

## 📋 Changelog

### v1.0.0 — Initial Release
- ✅ Interactive CLI with checkbox tool selection grouped by category
- ✅ Auto OS detection (Windows, macOS, Ubuntu, Debian, Kali)
- ✅ 40+ tools across 11 categories with full descriptions
- ✅ `--yes`, `--dry-run`, `--list`, `--category` flags
- ✅ Full unit test suite with Jest
- ✅ GitHub Actions CI across Node 18, 20, 22
- ✅ Issue templates for bugs, new tools, and new OS requests

---

## 📄 License

MIT — free to use, modify, and distribute.

---

<div align="center">

**If dev-setup saved you time, please ⭐ star the repo — it helps others find it!**

[⭐ Star on GitHub](https://github.com/YOUR_USERNAME/dev-setup) · [🐛 Report a Bug](https://github.com/YOUR_USERNAME/dev-setup/issues/new?template=bug_report.md) · [💡 Request a Tool](https://github.com/YOUR_USERNAME/dev-setup/issues/new?template=new_tool.md)

</div>
