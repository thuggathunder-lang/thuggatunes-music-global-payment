# 🎵 Thuggatunes Music & Global Payment

**Author:** Awosiji Wonderful Isaac (Wonder Thunder)  
**Company:** Thuggatunes Records  
**Status:** ✅ Production-ready | All tests passing  
**License:** MIT  
**Website:** [@thuggatunes](https://instagram.com/thuggatunes)

---

## 🌍 Overview
**Thuggatunes Music & Global Payment** is a secure Node.js-based platform built to power the Thuggatunes ecosystem — connecting music, payments, and digital freedom for creators and fans worldwide.

This repo represents the backbone of Thuggatunes’ digital service infrastructure: integrating artist tools, label management, and global payment processing under one smart system.

---

## ⚙️ Tech Stack
- **Node.js 22+**
- **Express.js**
- **dotenv** for environment configuration
- **Jest** for automated testing
- **ESLint + Prettier** for code consistency
- **GitHub Actions CI** for continuous integration

---

## 🧱 Project Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/thuggatunes-music-global-payment.git
cd thuggatunes-music-global-payment
```

### 2️⃣ Install
```powershell
npm install
```

### 3️⃣ Create `.env`
Create a `.env` in the project root with required keys (example included):
```
TEST_KEY=WonderThunder
```

### 4️⃣ Run
```powershell
npm start
```

---

## Docker

Build image:

```powershell
docker build -t thuggatunes-app .
```

Run container (map port if your app exposes one):

```powershell
docker run --env-file .env -p 3000:3000 thuggatunes-app
```

---

## Release

This project supports automated releases via `semantic-release`. To create a release locally:

```powershell
npm version patch  # or minor/major
git push --follow-tags
```

### CI release notes

The repository includes a GitHub Actions workflow that runs `semantic-release` on merges to `main`. To enable automated releases you must add the following repository secrets:

- `GITHUB_TOKEN` (automatically provided in Actions) — used by semantic-release to create releases and tags.
- `NPM_TOKEN` — required if you publish packages to npm.
- `GHCR_TOKEN` — required if you want GitHub Actions to push Docker images to GitHub Container Registry (used by `docker-publish.yml`).

Set these under your repository Settings → Secrets and variables → Actions.

---

## Test

Run tests:

```powershell
npm test
```

---

## Notes

- Don't commit `.env` to source control. `.gitignore` already excludes `.env` and `node_modules/`.
- For production, prefer host-provided environment variables or a secrets manager instead of `.env` files.
