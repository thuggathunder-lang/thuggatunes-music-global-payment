Repository transfer plan

This document describes how to transfer `thuggatunes-music-global-payment` from the current owner (`thuggathunder-lang`) to the `thuggatunes` organization.

Preconditions

- You must be an owner of the `thuggatunes` organization, or the organization admins must accept repository transfers.
- If transferring to a user account, you must be the target user or the target user must accept the transfer.
- Ensure that branch protection rules are compatible with the transfer (they'll move with the repository).

Steps (recommended)

1. Verify your permissions

```powershell
# Check your authenticated GitHub account (requires gh)
& "C:\Program Files\GitHub CLI\gh.exe" auth status
```

2. Open the transfer UI (manual)

- Go to: https://github.com/thuggathunder-lang/thuggatunes-music-global-payment/settings
- Scroll to "Danger Zone" -> "Transfer" -> Enter the new owner: `thuggatunes` and the repository name.
- Follow prompts to confirm.

3. Transfer via GitHub CLI (if you have permissions)

```powershell
# Replace OWNER and REPO with the current owner and name
gh repo transfer thuggathunder-lang/thuggatunes-music-global-payment --new-owner thuggatunes
```

4. Accept transfer (if required)

- Organization admins may need to accept the transfer on the org's repository invitations page.

5. Post-transfer checklist

- Update README badges (if they reference the old owner) — replace `thuggathunder-lang` with `thuggatunes` in badge URLs.
- Verify GitHub Actions workflows and any repository secrets (these do not transfer automatically in all cases).
- Update remote URLs locally:

```powershell
# update origin to new location
git remote set-url origin https://github.com/thuggatunes/thuggatunes-music-global-payment.git
```

6. Troubleshooting

- If `gh repo transfer` fails with a permission error, ask an org owner to perform the transfer or invite the repo owner to the org.

Notes

- Transfers keep Issues, PRs, stars and watchers.
- Releases, packages and GitHub Pages may need minor manual checks.

If you'd like, I can attempt the transfer now, but I will only proceed if you confirm you have the necessary org permissions or want me to request the transfer. If you want me to attempt it, reply "transfer now" and confirm you have the `thuggatunes` org owner permission (or that I should create a transfer request).