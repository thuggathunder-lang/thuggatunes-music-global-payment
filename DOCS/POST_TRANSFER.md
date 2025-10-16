Post-transfer checklist and instructions

This document should be used by a `thuggatunes` organization owner to finalize repository setup after a successful transfer.

1. Confirm transfer

- Verify the repo is now under `https://github.com/thuggatunes/thuggatunes-music-global-payment`.

2. Run the post-transfer helper (PowerShell, requires gh and org-owner permission)

```powershell
# from a machine with gh authenticated as a thuggatunes org owner
.\\scripts\\post_transfer_setup.ps1 -Repo "thuggatunes/thuggatunes-music-global-payment" -MainBranch "main"
```

3. Branch protection (manual checks)

- In the repo: Settings -> Branches -> Add rule for `main` with:
  - Require pull request reviews before merging
  - Dismiss stale approvals when new commits are pushed
  - Require status checks to pass before merging (enable CI job checks)
  - Require signed commits

4. Teams & access

- Add members to `@thuggatunes-devs` (write) and `@thuggatunes-artists` (read) via org -> Teams -> select team -> Add member

5. Semantic-release

- Ensure `NPM_TOKEN` and `GH_TOKEN` are present in repository secrets.
- Verify `.github/workflows/release.yml` and `release.config.js` (if present).

6. CODEOWNERS

- Confirm `.github/CODEOWNERS` exists and includes `* @thuggatunes-devs`.

7. Final verification

- Run a test pull request and verify branch protections and required checks work as expected.
- Update README badges and homepage if owner changed.

If you prefer, I can attempt these steps automatically if you confirm I should run the PowerShell helper while authenticated as a `thuggatunes` org owner (do not share tokens here).