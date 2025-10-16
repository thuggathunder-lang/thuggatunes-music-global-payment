<#
PowerShell helper to run post-transfer setup via the GitHub CLI.
Run this as an org owner (authenticated with gh) after the repository has been transferred to the `thuggatunes` org.
#>

param(
    [string]$Repo = "thuggatunes/thuggatunes-music-global-payment",
    [string]$MainBranch = "main"
)

Write-Host "Running post-transfer setup for $Repo"

# 1) Branch protection rules
Write-Host "Applying branch protection rules to $MainBranch"
& "C:\Program Files\GitHub CLI\gh.exe" api -X PUT "/repos/$Repo/branches/$MainBranch/protection" -f required_pull_request_reviews.dismiss_stale_reviews=true -f required_status_checks.strict=true -f required_status_checks.contexts='[]' -f enforce_admins=true -f restrictions.users='[]' -f restrictions.teams='[]' | ConvertFrom-Json

# Note: The GH API branch protection fields are complex; this is a starter implementation.
# For signed commits requirement, organization-level settings or branch_protection setting via API must be used with proper fields.

Write-Host "Branch protection request submitted. Please verify in the repository settings UI."

# 2) Create teams
Write-Host "Creating/ensuring teams: @thuggatunes-devs (write) and @thuggatunes-artists (read)"
& "C:\Program Files\GitHub CLI\gh.exe" api orgs/thuggatunes/teams -f name=thuggatunes-devs -f permission=push
& "C:\Program Files\GitHub CLI\gh.exe" api orgs/thuggatunes/teams -f name=thuggatunes-artists -f permission=pull

Write-Host "Teams create/update requested. Please add members and verify permissions in the org's Teams UI."

# 3) Add CODEOWNERS already committed — ensure file exists
Write-Host "CODEOWNERS file should be present under .github/CODEOWNERS in the default branch."

Write-Host "Post-transfer setup finished. Review repository settings in the GitHub UI to confirm all required protections and team access."
