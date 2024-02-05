## BATTLESHIP BOARD GAME - ISLAND EDITION

### To download the game from chrome webstore click [here](https://chromewebstore.google.com/detail/battleship/ebkjodkggmaecphknjfepmdibcaddjbh?utm_source=github).

[<img src="https://storage.googleapis.com/web-dev-uploads/image/WlD8wC6g8khYWPJUsQceQkhXSlv1/UV4C4ybeBTsZt43U4xis.png">](https://chromewebstore.google.com/detail/battleship/ebkjodkggmaecphknjfepmdibcaddjbh?utm_source=github)

### [Snapshots](snapShots/)
![battleship game](https://github.com/abdullahjamal1/battleshipBoardGame/blob/master/snapShots/battleship-all.png)

An offline battleship board web game in which two players arrange five ships on their maps and then do guess-fire on each other's map in alternate turns until either player wins by sinking all the ships. 

Whats different from other battleship board games ?

* Supports creating island blocks where ships cannot be placed making the game interesting. 
* A tough to defeat bot, which uses probability density map to reduce number of average turns required to win to 17 ! 
* Turn on density lens to find how bot plays better under hoods.

Technologies used :- HTML, CSS, JavaScript (p5.js)
_________________________________________________________________________________________________________
 # Features
 * graphical and interactive GUI
 * supports random island generation on sea using DFS with number of island blocks being customizable
 * supports auto-arrange, which arranges all ships randomly on grid
 * supports single-player
 * supports offline multi-player
 * supports game statistics
 * AI uses probability-density model to guess shot
 * supports density lens option to reveal how the AI works internally
 ________________________________________________________________________________________________________
 ## Task List
 
 - [x] implement single-player
 - [x] implement offline-multiplayer
 - [x] implement game-statistics
 - [x] add random-island generation
 - [x] save game statistics in localStorage
 - [x] add PWA support [article followed for PWA support](https://cloudbytes.dev/snippets/convert-a-pelican-website-to-pwa-using-workbox)
 - [x] deploy PWA to play store [article for converting PWA to android app](https://developers.google.com/codelabs/pwa-in-play#0)
 - [x] add support for chrome extension [article for adding support](https://dev.to/chromiumdev/shipping-pwas-as-chrome-extensions-3l5c)
 - [ ] add audio in game
 ________________________________________________________________________________________________________
 
