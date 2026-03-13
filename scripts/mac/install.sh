#!/bin/bash
# =============================================================================
# scripts/mac/install.sh — macOS installer using Homebrew
#
# Usage: bash install.sh <tool_name>
# Example: bash install.sh git
#
# HOW TO ADD A NEW TOOL:
# 1. Add a new case block below following the existing pattern
# 2. Use `brew install` for CLI tools
# 3. Use `brew install --cask` for GUI apps (VS Code, Docker Desktop, etc.)
# 4. Add the tool to config/tools.json so it appears in the CLI menu
# =============================================================================

set -e  # Exit immediately on error
TOOL=$1

# ── Install Homebrew if not present ────────────────────────────────────────
if ! command -v brew &>/dev/null; then
  echo "→ Homebrew not found. Installing Homebrew first..."
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi

# ── Tool Installation ───────────────────────────────────────────────────────
case "$TOOL" in

  git)
    brew install git
    ;;

  nodejs)
    brew install node
    ;;

  docker)
    brew install --cask docker
    ;;

  vscode)
    brew install --cask visual-studio-code
    ;;

  curl)
    # curl is pre-installed on macOS — just confirm it
    echo "curl is already available on macOS."
    ;;

  wget)
    brew install wget
    ;;

  python3)
    brew install python3
    ;;

  nvm)
    brew install nvm
    mkdir -p ~/.nvm
    echo 'export NVM_DIR="$HOME/.nvm"' >> ~/.zshrc
    echo '[ -s "$(brew --prefix)/opt/nvm/nvm.sh" ] && \. "$(brew --prefix)/opt/nvm/nvm.sh"' >> ~/.zshrc
    ;;

  zsh)
    brew install zsh
    ;;

  ohmyzsh)
    sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended
    ;;

  vim)
    brew install vim
    ;;

  neovim)
    brew install neovim
    ;;

  tmux)
    brew install tmux
    ;;

  htop)
    brew install htop
    ;;

  jq)
    brew install jq
    ;;

  gh)
    brew install gh
    ;;

  terraform)
    brew tap hashicorp/tap
    brew install hashicorp/tap/terraform
    ;;

  kubectl)
    brew install kubectl
    ;;

  awscli)
    brew install awscli
    ;;

  gcloud)
    brew install --cask google-cloud-sdk
    ;;

  *)
    # Unknown tool — print a message but don't fail
    # This allows contributors to test new tools before adding them to this script
    echo "⚠  Tool '$TOOL' is not yet supported on macOS. Please open an issue or PR!"
    exit 1
    ;;
esac

echo "✔ $TOOL installed successfully."
