# 🎵 Quick Start Guide

## New to Thuggatunes Music & Global Payment?

Welcome! This guide will get you up and running in minutes.

## One-Command Setup

### Linux/Mac
```bash
./setup.sh
```

### Windows (PowerShell)
```powershell
.\setup.ps1
```

That's it! The script will:
- ✅ Install all dependencies
- ✅ Create your `.env` configuration file
- ✅ Run tests to verify everything works
- ✅ Show you next steps

## Manual Setup (3 Steps)

If you prefer manual setup:

```bash
# 1. Install dependencies
npm install

# 2. Create environment file
cp .env.example .env

# 3. Start the server
npm start
```

## Verify It's Working

Visit: http://localhost:5050/health

You should see:
```json
{"status":"ok","dbConnected":false}
```

## Common Issues

**Q: MongoDB connection error?**  
A: This is normal if you don't have MongoDB installed. The app works fine without it for development.

**Q: Port 5050 already in use?**  
A: Edit `.env` and change `PORT=5050` to another port like `PORT=3000`

## What's Next?

1. ✏️ Edit `.env` with your API keys (optional)
2. 📚 Read [DOCS/SETUP.md](DOCS/SETUP.md) for detailed instructions
3. 🚀 Start building your music payment platform!

## Need Help?

- 📖 Full setup guide: [DOCS/SETUP.md](DOCS/SETUP.md)
- 🐛 Found a bug? Open an issue on GitHub
- 💬 Questions? Contact on Instagram: @thuggatunes

---

**Ready to start?** Run the setup script and you'll be up and running in less than 2 minutes! 🎉
