<p align="left">
  <img src="assets/Logo-L.png" alt="TryBotX" width="500">
</p>

---

# TryBotX

**TryBotX** is a customizable Fortnite cosmetic bot for personal use and fun experiments. It allows you to change your cosmetics (skin, back bling, pickaxe, glider, emote, and level) using official Fortnite cosmetic IDs. The bot runs locally on your machine and uses your own Epic Games account.

> ⚠️ We are **not affiliated with Epic Games**. This is a **community-made bot** for private use only. Use responsibly.

---

## 🔧 Features

- Change cosmetics in real-time using chat commands  
- Set default configuration for all cosmetics  
- Editable `.env` file for personal setup  
- Lightweight and easy to configure  
- Works locally with your Epic account  
- Owner-only control (only one person can send commands)

---

## 📁 Folder Structure

```bash
TryBotX/
│
├── .env                          # Editable – your bot credentials and owner info
├── index.js                      # Editable – main bot script
├── Fortnite-Cosmetics-IDs-main/  # Editable – cosmetic IDs and auth tool
│   ├── skins-IDs.txt
│   ├── pickaxes-IDs.txt
│   ├── emotes-IDs.txt
│   ├── backpacks-IDs.txt
│   └── DeviceAuthGenerator.exe  # Tool to generate Epic Games device auth
│
├── node_modules/                 # ⚠️ Do not edit
├── package.json                  # ⚠️ Do not edit
├── package-lock.json             # ⚠️ Do not edit
└── .venv/ (if present)           # ⚠️ Do not edit
````

---

## 🧪 Requirements

* [Node.js](https://nodejs.org/) installed
* Epic Games Launcher installed
* A secondary Epic Games account for the bot (logged in)
* `.env` file filled like this:

```env
FORTNITE_EMAIL=your_email@domain.com
FORTNITE_PASSWORD=your_password
OWNER_USERNAME=YourEpicGamesUsername
DEVICE_AUTH_ACCOUNT_ID=xxxxxxxx
DEVICE_AUTH_DEVICE_ID=xxxxxxxx
DEVICE_AUTH_SECRET=xxxxxxxx
```

* Use `DeviceAuthGenerator.exe` from the `Fortnite-Cosmetics-IDs-main/` folder to get these values.

* `OWNER_USERNAME` should be your Epic Games username. Only this user can control the bot using commands.

---

## 🚀 Getting Started

1. Clone this repository:

```bash
git clone https://github.com/RockyHubDev/TryBotX.git
```

2. Install required modules:

```bash
npm install
```

3. Run the `DeviceAuthGenerator.exe` and copy the generated values into `.env`.

4. Launch the bot:

```bash
node index.js
```

---

## 🤖 Commands

You can send these commands **only from the account defined in `OWNER_USERNAME`** inside your `.env` file:

| Command          | Description              |
| ---------------- | ------------------------ |
| `/skin ID`       | Change skin              |
| `/backpack ID`   | Change back bling        |
| `/pickaxe ID`    | Change pickaxe           |
| `/glider ID`     | Change glider            |
| `/emote ID`      | Perform emote            |
| `/level NUMBER`  | Change level             |
| `/dance ID`      | Makes the emote you selected  |
| `/default`       | Reset to default loadout |

---

## ⚙️ Default Configuration

The `/default` command applies a preset defined in the code.

To change it, open `index.js` and look for this block:

```js
const DEFAULTS = {
  skin: 'M_MED_DarkStance_Pater',
  backpack: 'BID_270_StreetDemon',
  pickaxe: 'HalloweenScythe',
  glider: 'Umbrella_Season_09',
  emote: 'EID_TakeTheL',
  level: 9999
};
```

* `OWNER_USERNAME` should be your Epic Games username. Only this user can control the bot using commands.

---

## ⚠️ Precautions and Disclaimers

* ❗ This bot is **not safe for public matches**. Use it **only in private or creative lobbies**.
* ❗ **Do not use your main Epic Games account.** Always use a secondary one.
* ❗ TryBotX is for **personal, educational, and entertainment purposes** only.
* ❗ You are responsible for how you use this bot. Misuse may result in account suspension.

> ⚠️ **We are not affiliated with Epic Games, Fortnite, or any official platform.**
> This project is made by fans for non-commercial use only.

---

## 📜 Credits

**DeviceAuthGenerator** by [xMistt](https://github.com/xMistt/DeviceAuthGenerator)

* License: Apache 2.0 with Commons Clause
* Author: Oli (xMistt)
* Years: 2019–2021
* No resale or commercial repackaging allowed

---

## 🛡️ License

* Free for personal and non-commercial use
* Attribution required: **RockyHubDev**
* Commercial resale or redistribution is prohibited
* Provided “as-is” with no guarantees
* Future versions may allow plugins/mods

---

## 🔮 Coming Soon

* Cosmetic sync with updated databases
* Plugin/mod system
* Emote sync across multiple clients
* Language support (Spanish, English, etc.)

---

## ❤️ Creator

Made with dedication by **RockyHubDev**

---

## ⭐ Support

If this helped you or you like the project, give it a ⭐ to support its development!
