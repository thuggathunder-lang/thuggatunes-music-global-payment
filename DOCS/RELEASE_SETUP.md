Release setup & semantic-release guide

This document explains how to configure semantic-release and GitHub Actions to run automated releases.

Prerequisites

- `NPM_TOKEN` in repository secrets (for publishing to npm)
- `GHCR_TOKEN` or PAT with packages write access if publishing Docker images
- `GITHUB_TOKEN` is automatically available in workflows; do not overwrite unless needed

1. Verify secrets (PowerShell + gh)

```powershell
# Verify NPM_TOKEN exists
& "C:\Program Files\GitHub CLI\gh.exe" secret list --repo thuggathunder-lang/thuggatunes-music-global-payment
```

2. Setup semantic-release (workflow example)

Below is a minimal job for GitHub Actions that runs semantic-release. Place this in `.github/workflows/release.yml` (if not present).

```yaml
name: Release
on:
  push:
    branches:
      - main

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: npm ci
      - run: npx semantic-release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

3. semantic-release configuration

- Add `release.config.js` or configure in `package.json` under `release` key.
- Use plugins like `@semantic-release/changelog`, `@semantic-release/npm`, `@semantic-release/github` as needed.

4. Publishing Docker images on release

- Add a separate job triggered on `release` events that builds and pushes Docker images using `GHCR_TOKEN`.
- Example actions: `docker/build-push-action@v4`.

5. Troubleshooting

- If semantic-release fails with authentication errors, confirm `NPM_TOKEN` and `GITHUB_TOKEN` are present and valid.
- Check workflow logs for the exact error and try running the release job locally using `act` or a test branch.

If you want, I can add or verify the repository's `release.yml` workflow and ensure it references the correct secrets. Reply "add release workflow" and I'll add a tested example.