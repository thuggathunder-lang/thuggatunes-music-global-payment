Repository follow-up checklist

- [ ] Add required repository secrets (Settings → Secrets → Actions):
  - `FLY_API_TOKEN` — Fly.io API token
  - (Optional) `CR_PAT` — Personal access token for pushing to GHCR if needed

- [ ] Enable branch protection on `main` and require status checks (CI).
- [ ] Review CODEOWNERS and add maintainers.
- [ ] Rotate any previously exposed secrets and confirm they are revoked.
- [ ] Validate GitHub Actions runs on `main` after adding secrets.

Notes:

- Railway deployment was attempted but blocked by the user's Railway account plan. To deploy with Railway, upgrade or change plan and re-run `railway up`.
