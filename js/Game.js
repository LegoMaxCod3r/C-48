class Game {
  constructor() {
    this.resetTitle = createElement("h2");
    this.resetButton = createButton("");

    this.leadeboardTitle = createElement("h2");

    this.leader1 = createElement("h2");
    this.leader2 = createElement("h2");
  }

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }
  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    hunter1 = createSprite(width / 2 - 50, height - 100);
    hunter1.addImage("hunter1", hunterImage);
    hunter1.scale = 0.3;

    hunter2 = createSprite(width / 2 + 100, height - 100);
    hunter2.addImage("hunter2", hunter2Image);
    hunter2.scale = 0.3;

    hunters = [hunter1, hunter2];
    drawSprites();

    //obstacles = new Group();
  
  }

  addSprites(spriteGroup, numberOfSprites, spriteImage, scale, positions=[]) 
  {
    for (var i = 0; i < numberOfSprites; i++) 
    {
      var x, y;

      if(positions.length>0)
      {

        x = positions[i].x;
        y = positions[i].y;
        spriteImage = positions[i].image;

      }
      else
      {

      x = random(width / 2 + 150, width / 2 - 150);
      y = random(-height * 4.5, height - 400);

      }


      var sprite = createSprite(x, y);
      sprite.addImage("sprite", spriteImage);
    

      sprite.scale = scale;
      spriteGroup.add(sprite);

      
    }
  }

  handleFuel(index)
  {
    //Agregando combustible
    cars[index-1].overlap(fuels, function(collector, collected)
    {

      player.fuel = 185;
      collected.remove();

    });
  }

  handleCoins(index)
  {
    //Agregando combustible
    cars[index-1].overlap(powerCoins, function(collector, collected)
    {

      player.score += 5;
      player.update();
      collected.remove();

    });
  }

  handleElements() 
  {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");

    //C39
    this.resetTitle.html("Reiniciar juego");
    this.resetTitle.class("resetText");
    this.resetTitle.position(width / 2 + 200, 40);

    this.resetButton.class("resetButton");
    this.resetButton.position(width / 2 + 230, 100);

    this.leadeboardTitle.html("Puntuación");
    this.leadeboardTitle.class("resetText");
    this.leadeboardTitle.position(width / 3 - 60, 40);

    this.leader1.class("leadersText");
    this.leader1.position(width / 3 - 50, 80);

    this.leader2.class("leadersText");
    this.leader2.position(width / 3 - 50, 130);
  }

  play() {
    this.handleElements();
    this.handleResetButton();

    Player.getPlayersInfo();

    if (allPlayers !== undefined) {
    

      this.showLeaderboard();

      //índice de la matriz
      var index = 0;
      for (var plr in allPlayers) {
        //agrega 1 al índice para cada bucle
        index = index + 1;

        //utiliza los datos de la base de datos para mostrar los autos en las direcciones x e y
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;

        hunters[index - 1].position.x = x;
        hunters[index - 1].position.y = y;
        console.log("aqui estoy", player.index)
        if (index === player.index) {
          stroke(10);
          fill("green");
          ellipse(x, y, 60, 60);
          //this.handleFuel(index);
          //this.handleCoins(index);


        }
      }

      // manejar eventos teclado
      this.handlePlayerControls();

      drawSprites();
    }
  }

  handleResetButton() {
    this.resetButton.mousePressed(() => {
      database.ref("/").set({
        playerCount: 0,
        gameState: 0,
        players: {}
      });
      window.location.reload();
    });
  }

  showLeaderboard() {
    var leader1, leader2;
    var players = Object.values(allPlayers);
    if (
      (players[0].rank === 0 && players[1].rank === 0) ||
      players[0].rank === 1
    ) {
      // &emsp;    esta etiqueta se utiliza para mostrar cuatros espacios
      leader1 =
        players[0].rank +
        "&emsp;" +
        players[0].name +
        "&emsp;" +
        players[0].score;

      leader2 =
        players[1].rank +
        "&emsp;" +
        players[1].name +
        "&emsp;" +
        players[1].score;
    }

    if (players[1].rank === 1) {
      leader1 =
        players[1].rank +
        "&emsp;" +
        players[1].name +
        "&emsp;" +
        players[1].score;

      leader2 =
        players[0].rank +
        "&emsp;" +
        players[0].name +
        "&emsp;" +
        players[0].score;
    }

    this.leader1.html(leader1);
    this.leader2.html(leader2);
  }

  handlePlayerControls() {


    if (keyIsDown(LEFT_ARROW)) {
      player.positionX -= 5;
      player.update();
      console.log(playerIndex)
    }

    if (keyIsDown(RIGHT_ARROW)) {
      player.positionX += 5;
      player.update();
      console.log(playerIndex)
    }
  }
}
