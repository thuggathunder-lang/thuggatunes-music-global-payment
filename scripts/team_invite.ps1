<#
PowerShell helper to invite users to teams in the thuggatunes org.
Usage: .\team_invite.ps1 -usernames 'user1','user2' -team 'thuggatunes-devs' -role 'member'
Requires gh CLI and org-owner or team-maintainer permission.
#>
param(
    [string[]]$Usernames,
    [string]$Team = "thuggatunes-devs",
    [ValidateSet('member','maintainer')]
    [string]$Role = 'member'
)

if (-not $Usernames) { Write-Host "Provide -Usernames array"; exit 1 }

foreach ($u in $Usernames) {
    Write-Host "Inviting $u to team $Team with role $Role"
    & "C:\Program Files\GitHub CLI\gh.exe" api -X PUT "/orgs/thuggatunes/teams/$Team/memberships/$u" -f role=$Role | ConvertFrom-Json
}

Write-Host "Invites submitted. Verify invites in org -> Teams -> $Team."
