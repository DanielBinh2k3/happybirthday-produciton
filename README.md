# 💖 Happy Birthday Interactive Surprise Web App

A modern, responsive, and romantic interactive web application crafted for birthday surprises, featuring customized 3D animation, ambient lofi/anime music, interactive mini-games, and gift redemption.

---

## ✨ Features Showcase

### 🔐 1. Secret Passcode Gate
- **Typewriter introduction** guiding the recipient through a personal verification ritual.
- **Demo Passcode**: `18102022` *(Supports flexible formats: `18.10.2022`, `18/10/2022`, `18-10-2022`, or `18102022`)*.
- **Demo Hint**: *"Hint: Our special anniversary date (DDMMYYYY) 💕"*.

### 📸 2. Polaroid Memories Gallery
- **Solo Gallery**: Beautiful Polaroid-styled photos with smooth hover tilt and full-screen lightbox zoom.
- **Together Gallery**: Chronological milestone moments of your love journey.

### 🎂 3. Spring-Loaded Birthday Cake & Candle Blowing
- Interactive **tap-frenzy wind mechanic**: Tap rapidly to build wind power to blow out candles.
- Plays an authentic chime, blows out smoke particle animations, and triggers festive confetti & balloons.

### 💌 4. 3D Flipping Greeting Card
- A realistic **3D double-page flip book card** with perspective depth, custom wax seal aesthetic, and responsive single-page mode optimized for mobile phones.

### 🎩 5. Magic 3 Shell Cups Mini-Game (Prize Redemption)
- **High-speed cup shuffle challenge** with two stages: Practice mode (slow) and Real speed mode (hyper shuffle).
- **Randomized Prize Algorithm**: Picks one of three surprise gifts upon selection.
- Generates a **unique 16-character hex coupon code** (e.g. `LOVE-7C3A-DF91-88E4`) and provides a single-tap button to copy the code and directly open Messenger.

---

## 🛠️ Quick Start & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18+ recommended)
- `npm` or `pnpm`

### 1. Clone the repository
```bash
git clone https://github.com/DanielBinh2k3/happybirthday-produciton.git
cd happybirthday-produciton
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```
Open your browser at `http://localhost:1810/` to test.

### 4. Build for Production
```bash
npm run build
```
Production assets will be generated in the `dist/` directory.

---

## ⚙️ Customization Guide

All personal configuration is organized at the top of [`app.jsx`](./app.jsx) in the `CONFIG` object:

```javascript
const CONFIG = {
    passcodeDigits: "18102022",              // Change to your date/passcode
    passcodeHint: "Your custom hint here",
    boyfriendName: "Your Name",
    girlfriendName: "Partner Name",
    boyfriendContactUrl: "https://m.me/your_facebook_id", // Your Messenger/Telegram link

    // Background music & custom sound effects
    bgmOptions: [ ... ],

    // Photos: Unsplash ID strings or local paths (/assets/...)
    soloPhotos: [ ... ],
    togetherPhotos: [ ... ],

    // Stage 4 prize rewards
    cashPrizes: [ ... ]
};
```

---

## 🛡️ License

This project is open-sourced under the [MIT License](LICENSE).
Feel free to fork, customize, and create memorable moments for your loved ones! 💖
