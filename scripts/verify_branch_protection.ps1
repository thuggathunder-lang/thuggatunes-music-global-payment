<#
PowerShell script to verify branch protection rules on a repository branch.
Requires gh CLI and that the user is authenticated with sufficient permissions.
#>
param(
    [string]$Repo = "thuggatunes/thuggatunes-music-global-payment",
    [string]$Branch = "main"
)

Write-Host "Checking branch protection for $Repo branch $Branch"
$json = & "C:\Program Files\GitHub CLI\gh.exe" api "/repos/$Repo/branches/$Branch/protection" --jq '.' 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to retrieve branch protection. Are you an org owner or does the branch exist?" -ForegroundColor Red
    exit 1
}

$data = $json | ConvertFrom-Json
Write-Host "Protection rules for $Branch:`n"
$data | ConvertTo-Json -Depth 4

# Simple checks
if ($data.required_pull_request_reviews) { Write-Host "PR reviews required: true" } else { Write-Host "PR reviews required: false" }
if ($data.dismiss_stale_reviews) { Write-Host "Dismiss stale reviews: true" } else { Write-Host "Dismiss stale reviews: false" }
if ($data.required_status_checks) { Write-Host "Status checks required: $($data.required_status_checks.strict)" } else { Write-Host "Status checks required: false" }
