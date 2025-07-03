# TryBotX

**TryBotX** is a customizable Fortnite cosmetic bot that can be used for fun or personal projects. This bot allows you to change skins, backpacks, pickaxes, gliders, emotes, and level using official Fortnite cosmetic IDs. It is designed to run using your own Epic Games account configured as a bot.

---

## 🔧 Features

- Set default cosmetics: skin, pickaxe, emote, backpack, glider, and more
- Custom bot username
- Use your own Epic account credentials securely via `.env`
- Organized cosmetic ID system
- Light-weight and easy to edit
- Future support for community-made mods (planned)

---

## 📁 Folder Structure

```bash
TryBotX/
│
├── .env                          # Editable - contains account credentials and bot owner info
├── index.js                      # Editable - main script for setting default cosmetics
├── Fortnite-Cosmetics-IDs-main/  # Editable - contains all cosmetic IDs and a token generator
│   ├── skins-IDs.txt
│   ├── pickaxes-IDs.txt
│   ├── emotes-IDs.txt
│   ├── backpacks-IDs.txt
│   └── DeadsideAuthGenerator.exe  # Used to extract auth tokens from Epic Games Launcher
│
├── node_modules/                 # ⚠️ DO NOT EDIT
├── package.json                  # ⚠️ DO NOT EDIT
├── package-lock.json             # ⚠️ DO NOT EDIT
└── .venv/ (if exists)            # ⚠️ DO NOT EDIT
```

🧪 Requirements
Node.js installed

Epic Games Launcher installed

Bot account added and logged in to Epic Games Launcher

A .env file correctly filled with:

```env
FORTNITE_EMAIL=your_email@domain.com
FORTNITE_PASSWORD=your_password
OWNER_USERNAME=YourEpicUsername
DEVICE_AUTH_ACCOUNT_ID=xxx
DEVICE_AUTH_DEVICE_ID=xxx
DEVICE_AUTH_SECRET=xxx
```

You can generate the required deadside credentials using the built-in DeadsideAuthGenerator.exe.

🛡️ License
This project is under a custom license:

You are allowed to use, modify, and share this project for personal or educational purposes only.

You are not allowed to upload this project or any modified version to another public repository or website claiming ownership.

You must always credit the original creator: RockyHubDev.

Commercial use is strictly prohibited.

The project is provided “as is”, without any warranty or guarantee.

The license may be updated in the future to allow community contributions or extensions.

🚀 Future Plans
Add mod/plugin support

Support for synchronized emotes

Live cosmetic database sync

Language translation options

❤️ Creator
Created with passion and persistence by RockyHubDev
