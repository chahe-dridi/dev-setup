# Changelog

All notable changes to **dev-setup** are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versioning follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]
> Changes staged for the next release go here while in development.

---

## [1.0.0] — Initial Release

### Added
- Interactive checkbox CLI menu with tools grouped by category
- Auto OS detection — Windows, macOS, Ubuntu, Debian, Kali Linux
- 40+ installable developer tools across 11 categories:
  - **Core** — Git, GitHub CLI, curl, wget
  - **Runtimes** — Node.js, NVM, Python 3, Java JDK 21, .NET SDK, Go, Rust, Ruby, PHP
  - **IDEs** — VS Code, IntelliJ IDEA, PyCharm, WebStorm
  - **Editors** — Vim, Neovim
  - **Frameworks** — Angular CLI, React, Vite, Next.js, Express, Spring Boot CLI, Maven, Gradle
  - **DevOps** — Docker, kubectl, Terraform, Ansible
  - **Cloud** — AWS CLI, Google Cloud CLI, Azure CLI
  - **Databases** — MongoDB, PostgreSQL, MySQL, Redis
  - **CLI tools** — Zsh, Oh My Zsh, tmux, htop, jq, Make
  - **Testing** — Jest, pytest, Postman
  - **Mobile** — Flutter SDK, Android Studio
- `--yes` flag to install all tools without prompts
- `--dry-run` flag to preview installs without executing them
- `--list` flag to display all available tools by category
- `--category <name>` flag to filter to one category
- `whyUseIt` descriptions shown after tool selection
- OS-specific install scripts: PowerShell (Windows), Homebrew (macOS), apt (Ubuntu/Kali)
- Full unit test suite with Jest — detectOS, installer, logger, tools.json integrity
- GitHub Actions CI workflow across Node.js 18, 20, and 22
- GitHub issue templates — bug reports, new tool requests, new OS requests
- Single version source of truth in `src/version.js`

---

## How to read this file

| Tag | Meaning |
|---|---|
| `Added` | New features |
| `Changed` | Changes to existing functionality |
| `Deprecated` | Features to be removed in a future release |
| `Removed` | Features removed in this release |
| `Fixed` | Bug fixes |
| `Security` | Security vulnerability fixes |

[Unreleased]: https://github.com/YOUR_USERNAME/dev-setup/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/YOUR_USERNAME/dev-setup/releases/tag/v1.0.0
