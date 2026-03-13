#!/bin/bash
# =============================================================================
# scripts/linux/ubuntu.sh — Ubuntu/Debian installer using apt
#
# Usage: bash ubuntu.sh <tool_name>
# Example: bash ubuntu.sh docker
#
# HOW TO ADD A NEW TOOL:
# 1. Add a new case block below following the existing pattern
# 2. Always run `apt-get update` before installing if needed
# 3. Use apt, snap, or curl-based installers depending on the tool
# 4. Add the tool to config/tools.json so it appears in the CLI menu
# =============================================================================

set -e  # Exit immediately on error
TOOL=$1

# ── Helper: ensure apt is up to date (called lazily, not every time) ────────
apt_updated=false
ensure_apt_updated() {
  if [ "$apt_updated" = false ]; then
    sudo apt-get update -qq
    apt_updated=true
  fi
}

# ── Tool Installation ───────────────────────────────────────────────────────
case "$TOOL" in

  git)
    ensure_apt_updated
    sudo apt-get install -y git
    ;;

  nodejs)
    # Install Node.js via NodeSource (latest LTS)
    curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
    sudo apt-get install -y nodejs
    ;;

  docker)
    # Official Docker install from get.docker.com
    curl -fsSL https://get.docker.com -o /tmp/get-docker.sh
    sudo sh /tmp/get-docker.sh
    # Allow running docker without sudo
    sudo usermod -aG docker "$USER"
    echo "Note: Log out and back in for Docker group changes to take effect."
    ;;

  vscode)
    # Install VS Code via Microsoft's official repo
    wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > /tmp/packages.microsoft.gpg
    sudo install -D -o root -g root -m 644 /tmp/packages.microsoft.gpg /etc/apt/keyrings/packages.microsoft.gpg
    echo "deb [arch=amd64,arm64,armhf signed-by=/etc/apt/keyrings/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main" | \
      sudo tee /etc/apt/sources.list.d/vscode.list > /dev/null
    ensure_apt_updated
    sudo apt-get install -y code
    ;;

  curl)
    ensure_apt_updated
    sudo apt-get install -y curl
    ;;

  wget)
    ensure_apt_updated
    sudo apt-get install -y wget
    ;;

  python3)
    ensure_apt_updated
    sudo apt-get install -y python3 python3-pip python3-venv
    ;;

  nvm)
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    echo "nvm installed. Restart your terminal or run: source ~/.bashrc"
    ;;

  zsh)
    ensure_apt_updated
    sudo apt-get install -y zsh
    chsh -s "$(which zsh)"
    ;;

  ohmyzsh)
    sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended
    ;;

  vim)
    ensure_apt_updated
    sudo apt-get install -y vim
    ;;

  neovim)
    ensure_apt_updated
    sudo apt-get install -y neovim
    ;;

  tmux)
    ensure_apt_updated
    sudo apt-get install -y tmux
    ;;

  htop)
    ensure_apt_updated
    sudo apt-get install -y htop
    ;;

  jq)
    ensure_apt_updated
    sudo apt-get install -y jq
    ;;

  gh)
    # GitHub CLI via official repo
    curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | \
      sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | \
      sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
    ensure_apt_updated
    sudo apt-get install -y gh
    ;;

  terraform)
    wget -O- https://apt.releases.hashicorp.com/gpg | \
      sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
    echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | \
      sudo tee /etc/apt/sources.list.d/hashicorp.list
    ensure_apt_updated
    sudo apt-get install -y terraform
    ;;

  kubectl)
    curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.29/deb/Release.key | \
      sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
    echo "deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.29/deb/ /" | \
      sudo tee /etc/apt/sources.list.d/kubernetes.list
    ensure_apt_updated
    sudo apt-get install -y kubectl
    ;;

  awscli)
    curl -fsSL "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o /tmp/awscliv2.zip
    unzip /tmp/awscliv2.zip -d /tmp/
    sudo /tmp/aws/install
    ;;

  gcloud)
    curl https://sdk.cloud.google.com | bash -s -- --disable-prompts
    echo "Run: exec -l $SHELL && gcloud init"
    ;;

  *)
    echo "⚠  Tool '$TOOL' is not yet supported on Ubuntu. Please open an issue or PR!"
    exit 1
    ;;
esac

echo "✔ $TOOL installed successfully."
