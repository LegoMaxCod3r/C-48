var arrow, arrowImage, backGround, hunter, hunterImage, hunter2Image, leg, legImage, powerUps, handBow, handBowImage;
var cubeFont, MINIFont;

var bowShoot, bowFireShoot, bowPoisonShoot;
let game, hunter1, hunter2;
let player, form, database, playerCount, allPlayers;
let distance = 0;

let gameState = 0;
let hunters = [];

function preload()
{

    cubeFont=loadFont("./Font/04B_03.ttf");
    MINIFont=loadFont("./Font/MINI.ttf");

    backGround = loadImage("./images/background.png");
    arrowImage = loadImage("./images/arrow.png");
    hunterImage = loadImage("./images/body.png");
    legImage = loadImage("./images/leg.png");
    handBowImage = loadImage("./images/leg.png");
    hunter2Image = loadImage("./images/hunter2.png");



}

function setup() 
{
    
  createCanvas(1600,800);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();

}

function draw() 
{
  background(backGround);
  if (playerCount === 2) {
    game.update(1);
  }

  if (gameState === 1) {
    game.play();
  }

}
