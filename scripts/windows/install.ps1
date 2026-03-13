# =============================================================================
# scripts/windows/install.ps1 — Windows installer using winget
#
# Usage: powershell -ExecutionPolicy Bypass -File install.ps1 -Tool git
#
# HOW TO ADD A NEW TOOL:
# 1. Find the winget package ID: run `winget search <tool>` in PowerShell
# 2. Add a new case block below with winget install command
# 3. Add the tool to config/tools.json
# =============================================================================

param(
  [Parameter(Mandatory=$true)]
  [string]$Tool
)

# ── Helper: check if winget is available ────────────────────────────────────
function Ensure-Winget {
  if (-not (Get-Command winget -ErrorAction SilentlyContinue)) {
    Write-Host "winget not found. Please install the App Installer from the Microsoft Store." -ForegroundColor Red
    Write-Host "https://www.microsoft.com/store/productId/9NBLGGH4NNS1"
    exit 1
  }
}

# ── Helper: run winget install ───────────────────────────────────────────────
function Install-WithWinget {
  param([string]$PackageId)
  winget install --id $PackageId --silent --accept-package-agreements --accept-source-agreements
}

Ensure-Winget

# ── Tool Installation ────────────────────────────────────────────────────────
switch ($Tool) {

  "git" {
    Install-WithWinget "Git.Git"
  }

  "nodejs" {
    Install-WithWinget "OpenJS.NodeJS.LTS"
  }

  "docker" {
    Install-WithWinget "Docker.DockerDesktop"
  }

  "vscode" {
    Install-WithWinget "Microsoft.VisualStudioCode"
  }

  "curl" {
    # curl ships with Windows 10+ — confirm it
    Write-Host "curl is pre-installed on Windows 10 and later."
  }

  "wget" {
    Install-WithWinget "GnuWin32.Wget"
  }

  "python3" {
    Install-WithWinget "Python.Python.3.11"
  }

  "nvm" {
    # Windows uses nvm-windows, a separate project
    Install-WithWinget "CoreyButler.NVMforWindows"
  }

  "vim" {
    Install-WithWinget "vim.vim"
  }

  "neovim" {
    Install-WithWinget "Neovim.Neovim"
  }

  "jq" {
    Install-WithWinget "jqlang.jq"
  }

  "gh" {
    Install-WithWinget "GitHub.cli"
  }

  "terraform" {
    Install-WithWinget "Hashicorp.Terraform"
  }

  "kubectl" {
    Install-WithWinget "Kubernetes.kubectl"
  }

  "awscli" {
    Install-WithWinget "Amazon.AWSCLI"
  }

  "gcloud" {
    Install-WithWinget "Google.CloudSDK"
  }

  "htop" {
    # htop is Linux-only — suggest Windows Task Manager or alternatives
    Write-Host "htop is not available on Windows. Consider using Task Manager or 'btop' (btop4win)." -ForegroundColor Yellow
  }

  default {
    Write-Host "⚠  Tool '$Tool' is not yet supported on Windows. Please open an issue or PR!" -ForegroundColor Yellow
    exit 1
  }
}

Write-Host "✔ $Tool installed successfully." -ForegroundColor Green
