CI secrets required for this repository

This document lists the GitHub repository secrets needed to run CI, releases and Docker publishing for the project.

Required secrets

1. NPM_TOKEN
   - Purpose: Used by semantic-release (or other workflows) to publish packages to npm.
   - Value: A scoped npm automation token (generated at https://www.npmjs.com/settings/<your-username>/tokens).
   - Permissions: publish access for the target package. Use the "Automation" token type when possible.
   - Environment variable name used in workflows: `NPM_TOKEN`

2. GHCR_TOKEN (or PAT with packages:write)
   - Purpose: Push Docker images to GitHub Container Registry (ghcr.io) or GitHub Packages.
   - Value: A Personal Access Token (PAT) with `write:packages, delete:packages` if using PAT, or a GitHub Actions workflow can use the default GITHUB_TOKEN (but for cross-repo or organization publishing a PAT is safer).
   - Permissions if using PAT: Packages: write, read; repo: if publishing from private repos.
   - Environment variable name used in workflows: `GHCR_TOKEN`

3. GITHUB_TOKEN (default)
   - Purpose: GitHub Actions provides this token automatically for workflow runs. Keep it available and don't overwrite unless you have a reason.
   - Note: This token is available as `secrets.GITHUB_TOKEN` in Actions automatically. You do NOT normally add this manually.

Optional secrets

4. DOCKERHUB_USERNAME, DOCKERHUB_TOKEN
   - Purpose: If you want to push images to Docker Hub instead of GHCR.
   - Value: Docker Hub username and an access token (not your password).

5. SLACK_WEBHOOK
   - Purpose: Post release/CI notifications to Slack.

6. SENTRY_DSN
   - Purpose: Error reporting integration.

How to add secrets (PowerShell + gh)

1. Using the GitHub web UI
   - Go to your repository on GitHub -> Settings -> Secrets and variables -> Actions -> New repository secret.
   - Add the secret name (e.g., `NPM_TOKEN`) and the value.

2. Using the GitHub CLI (PowerShell example)

```powershell
# set one secret interactively
gh secret set NPM_TOKEN --body "<your-npm-token>"

# or from an environment variable
$env:NPM_TOKEN = "<your-npm-token>"
gh secret set NPM_TOKEN --body $env:NPM_TOKEN
```

Verification checklist

- [ ] `NPM_TOKEN` exists in repository secrets and has a valid value.
- [ ] `GHCR_TOKEN` (or equivalent) exists if you plan to publish containers to GHCR.
- [ ] `GITHUB_TOKEN` is used by workflows (provided by Actions).
- [ ] Optional secrets (Docker Hub, Sentry, Slack) added if you're using those integrations.

Notes & security

- Never commit secrets into source control or paste them in public chats.
- Rotate tokens if you suspect they were leaked.
- Prefer repository-level secrets for CI unless you need organizational secrets.

If you want, I can add a short GitHub Actions workflow snippet into `DOCS/RELEASE_SETUP.md` showing how to reference these secrets in a release job.
