<#
High-level post-transfer script for a thuggatunes org owner.
This script will: set secrets (if env vars provided), apply branch protection, create teams, and invite users.
Run as an org owner with gh installed and authenticated.
#>
param(
    [string]$Repo = "thuggatunes/thuggatunes-music-global-payment",
    [string[]]$InviteUsers = @()
)

Write-Host "Starting post-transfer all-in-one helper for $Repo"

# Set secrets if provided in env
if ($env:NPM_TOKEN -or $env:GIT_COMMITTER_NAME -or $env:GIT_COMMITTER_EMAIL) {
    Write-Host "Setting secrets from environment (NPM_TOKEN, GIT_COMMITTER_NAME, GIT_COMMITTER_EMAIL)"
    if ($env:NPM_TOKEN) { gh secret set NPM_TOKEN --repo $Repo --body $env:NPM_TOKEN }
    if ($env:GIT_COMMITTER_NAME) { gh secret set GIT_COMMITTER_NAME --repo $Repo --body $env:GIT_COMMITTER_NAME }
    if ($env:GIT_COMMITTER_EMAIL) { gh secret set GIT_COMMITTER_EMAIL --repo $Repo --body $env:GIT_COMMITTER_EMAIL }
}

# Apply branch protection (uses same JSON as helper)
$tmp=[System.IO.Path]::GetTempFileName()
@'
{
  "required_status_checks": { "strict": true, "contexts": [] },
  "enforce_admins": { "enabled": true },
  "required_pull_request_reviews": {
    "dismissal_restrictions": { "users": [], "teams": [] },
    "dismiss_stale_reviews": true,
    "require_code_owner_reviews": true
  },
  "restrictions": { "users": [], "teams": [] }
}
'@ | Out-File -Encoding UTF8 $tmp
gh api --input $tmp -X PUT "/repos/$Repo/branches/main/protection" -H "Accept: application/vnd.github+json"
Remove-Item $tmp

# Create teams
gh api orgs/thuggatunes/teams -f name=thuggatunes-devs -f permission=push
gh api orgs/thuggatunes/teams -f name=thuggatunes-artists -f permission=pull

# Invite users (if any)
foreach ($u in $InviteUsers) {
    gh api -X PUT "/orgs/thuggatunes/teams/thuggatunes-devs/memberships/$u" -f role=member
}

Write-Host "Post-transfer run completed. Verify in the GitHub UI."
