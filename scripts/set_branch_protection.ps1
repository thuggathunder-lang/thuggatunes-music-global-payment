<#
PowerShell script to set branch protection on the main branch via gh API.
Run as an org owner.
#>
param(
    [string]$Repo = "thuggathunder-lang/thuggatunes-music-global-payment",
    [string]$Branch = "main"
)

Write-Host "Setting branch protection for $Repo branch $Branch"

$body = @{
    required_status_checks = @{ strict = $true; contexts = @() }
    enforce_admins = $true
    required_pull_request_reviews = @{ dismissal_restrictions = @{ users = @(); teams = @() }; dismiss_stale_reviews = $true; require_code_owner_reviews = $true }
    restrictions = @{ users = @(); teams = @() }
}

$jsonBody = $body | ConvertTo-Json -Depth 10
& gh api -X PUT "/repos/$Repo/branches/$Branch/protection" -f "${jsonBody}" | ConvertFrom-Json

Write-Host "Request submitted. Verify settings in GitHub UI."