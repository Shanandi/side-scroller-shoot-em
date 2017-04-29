# Amazing Space Shooter
Development of a browser based application with HTML, CSS and vanilla JavaScript (using ES5, canvas or webGL), using PIXI.js and TypeScript. The game is fixed 800 x 600 px in size.

The game is composed of the following screens:

#1: Splash screen
Bitmap, shown for 2 seconds, then fades out

#2: Main screen
Elements:
* background and animation
* logo (bitmap)
* under the logo, 4 buttons placed from top to bottom (bitmaps, for handling states):
    GAME1, GAME2, GAME3 and EXIT
  Clicking the EXIT button navigates somewhere, clicking any of the GAME buttons takes the user to the game area.

#3: Game
A simple side scroller shoot’em up game with space ships. The goal is to destroy enemy ships and survive without collision as long as you can.

Rules:
* The space ship can be moved around on the game area (following the mouse), and it can shoot rockets (by clicking or tapping the screen)
* The game’s background moves from right to left, with parallax scrolling (the background is made up of two graphical layers, the farther layer moves slower)
* Every 2 seconds, an enemy space ship arrives from the front. The enemy space ships move randomly
* If the projectile of the player space ship hits an enemy space ship, the enemy ship blows up and disappears
* If the space ship collides with an enemy object, it blows up (like the enemy space ships), the game indicates that it’s over, then it goes back to the main menu.
