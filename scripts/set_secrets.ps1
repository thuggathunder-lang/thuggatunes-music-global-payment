<#
Set repository secrets using gh CLI. Run this locally as the repo admin.
Usage (PowerShell):
$env:GH_TOKEN = "<your-gh-token>" # optional if gh already authenticated
$env:NPM_TOKEN = "<your-npm-token>"
$env:GIT_COMMITTER_NAME = "Wonder Thunder"
$env:GIT_COMMITTER_EMAIL = "you@example.com"
.
.
# Then run:
# .\scripts\set_secrets.ps1 -Repo "thuggathunder-lang/thuggatunes-music-global-payment"
# This will set secrets GH_TOKEN (if provided), NPM_TOKEN, GIT_COMMITTER_NAME and GIT_COMMITTER_EMAIL
#>
param(
    [string]$Repo = "thuggathunder-lang/thuggatunes-music-global-payment"
)

if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
    Write-Error "gh CLI not found. Install GitHub CLI and authenticate first."
    exit 1
}

if ($env:NPM_TOKEN) {
    Write-Host "Setting NPM_TOKEN"
    & gh secret set NPM_TOKEN --repo $Repo --body $env:NPM_TOKEN
} else {
    Write-Host "NPM_TOKEN not set in environment; skipping"
}

if ($env:GIT_COMMITTER_NAME) {
    Write-Host "Setting GIT_COMMITTER_NAME"
    & gh secret set GIT_COMMITTER_NAME --repo $Repo --body $env:GIT_COMMITTER_NAME
} else { Write-Host "GIT_COMMITTER_NAME not set; skipping" }

if ($env:GIT_COMMITTER_EMAIL) {
    Write-Host "Setting GIT_COMMITTER_EMAIL"
    & gh secret set GIT_COMMITTER_EMAIL --repo $Repo --body $env:GIT_COMMITTER_EMAIL
} else { Write-Host "GIT_COMMITTER_EMAIL not set; skipping" }

Write-Host "Note: GH_TOKEN is provided automatically by gh when running as an authenticated user. If you need to set GH_TOKEN as a secret for workflows, set it via the web UI with caution."
