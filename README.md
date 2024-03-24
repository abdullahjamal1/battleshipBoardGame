## BATTLESHIP BOARD GAME - ISLAND EDITION

### To download the game from chrome webstore click [here](https://chromewebstore.google.com/detail/battleship/ebkjodkggmaecphknjfepmdibcaddjbh?utm_source=github).

[<img src="https://storage.googleapis.com/web-dev-uploads/image/WlD8wC6g8khYWPJUsQceQkhXSlv1/UV4C4ybeBTsZt43U4xis.png">](https://chromewebstore.google.com/detail/battleship/ebkjodkggmaecphknjfepmdibcaddjbh?utm_source=github)

### [Snapshots](snapShots/)
![battleship game](/snapShots/v2/Screenshot%202024-02-12%20at%209.05.04 AM.png)
![battleship game](/snapShots/v2/Screenshot%202024-02-12%20at%209.06.00 AM.png)
![battleship game](/snapShots/v2/Screenshot%202024-02-12%20at%209.06.18 AM.png)
![battleship game](/snapShots/v2/Screenshot%202024-02-12%20at%209.08.40 AM.png)

Classic Battleship board game with special island edition and tough AI for your browser.

Engage in strategic warfare as two players arrange their fleets of five ships on custom maps. Take turns guessing and firing upon each other's hidden ships until one emerges victorious by sinking all enemy vessels !

What sets our game apart ?

- Island Blocks: Place island blocks strategically to challenge your opponents and add an extra layer of excitement.

- Tough AI: Uses probability density map to reduce average turns to win to 17. Turn on density filter to learn with AI.

- Light weight: Built with p5.js, game is very minimal in size.

- Light/Dark theme support

Set sail for victory and download "Battleship Game - Island Edition" today. Command your fleet, rule the waves and emerge as the ultimate naval commander!

Technologies used :- HTML, CSS, Typescript, p5.js

_________________________________________________________________________________________________________
# Installation Guide

## Option 1: Using the Plugin from the extensions store

1. Visit the [Battleship game extension on the Chrome Web Store](https://chromewebstore.google.com/detail/battleship/ebkjodkggmaecphknjfepmdibcaddjbh?utm_source=github)

2. Follow the installation instructions on the page.

## Option 2: Compiling it On Your Own

If you want to compile the extension on your own, follow these steps:

### Step 1: Clone the Repository

Clone the battleshipBoardGame repository to your local machine:

#### Chromium
```bash
git clone https://github.com/abdullahjamal1/battleshipBoardGame.git
```

### Step 2: Install Dependencies

Navigate to the project directory and install the necessary dependencies:

```bash
npm install
```

### Step 3: Code Your Magic

Make the necessary modifications or enhancements to the code.

### Step 4: Build the Extension

- Build the extension by running:
  ```bash
  npm run build
  ```

### Step 5: Generate a Release (Optional)

Generate a release zip file to be uploaded to the browser/store:

```bash
npm run release
```

### Load the extension in Chromium browsers
  - Go to `chrome://extensions/`.
  - Enable "Developer mode".
  - Click "Load unpacked" and select the project folder.

_________________________________________________________________________________________________________
 # Features
 * graphical and interactive GUI
 * supports random island generation on sea using DFS with number of island blocks being customizable
 * supports auto-arrange, which arranges all ships randomly on grid
 * supports single-player
 * supports offline multi-player
 * supports game statistics
 * AI uses probability-density model to guess shot
 * supports density filter option to reveal how the AI works internally
 ____________________________________________________________________________________________________