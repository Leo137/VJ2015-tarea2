BasicGame.Gameover = function(){ }; 

BasicGame.Gameover = function(){ }; 

BasicGame.Gameover.prototype = { 
preload: function() {
	this.menuBackground = new MenuBackground(game,0,0,game.width,game.height,'bg_pattern_color');
},
loadUpdate: function(){
	this.menuBackground.updateBackground();
},
create: function() {
    console.log(timePlayed);
    //Añadir tiempo jugado a SaveManager.
    SaveManager.addTotalTimePlayed(timePlayed);

    //Verifica si uno de los jugadores se queda sin soldados.
    if(destroyed2P == true){
        this.gameoverText = game.add.text(game.width/2, game.height/2, 'JUGADOR 2 SIN SOLDADOS: JUGADOR 1 WINS!', { font: "bold 34px Arial", fill: "#ff0000" });
        SaveManager.addP1Wins(1);
    }
    else if(destroyed1P == true){
        this.gameoverText = game.add.text(game.width/2, game.height/2, 'JUGADOR 1 SIN SOLDADOS: JUGADOR 2 WINS!', { font: "bold 34px Arial", fill: "#0000ff" });
        SaveManager.addP2Wins(1);
    }
    //Revisar quién posee más territorios capturados.
	else if(capture1P > capture2P){
        this.gameoverText = game.add.text(game.width/2, game.height/2, 'RESULTADO: JUGADOR 1 WINS!', { font: "bold 34px Arial", fill: "#ff0000" });
        SaveManager.addP1Wins(1);
    }
    else if(capture1P < capture2P){
        this.gameoverText = game.add.text(game.width/2, game.height/2, 'RESULTADO: JUGADOR 2 WINS!', { font: "bold 34px Arial", fill: "#0000ff" });
        SaveManager.addP2Wins(1);
    }
    else{
        this.gameoverText = game.add.text(game.width/2, game.height/2, 'RESULTADO: EMPATE!', { font: "bold 34px Arial", fill: "#ffffff" });
        SaveManager.addTies(1);
    }
    this.gameoverText.anchor.set(0.5);
    this.gameoverText.stroke =  'black';
    this.gameoverText.strokeThickness=2;

    this.gameoverText.inputEnabled = true;

    this.goToMenuText = game.add.text(game.width/2, game.height/2 + game.height/3, 'Click aquí para ver estadísticas', { font: "bold 34px Arial", fill: "#FFFFFF" });

    this.goToMenuText.anchor.set(0.5);
    this.goToMenuText.stroke =  'black';
    this.goToMenuText.strokeThickness=2;

    this.goToMenuText.inputEnabled = true;
    this.goToMenuText.events.onInputDown.add(this.toPreMenu, this);

},
update: function() {
	this.menuBackground.updateBackground();

},
toPreMenu: function(levelNumber,tutorial){
        fx.play('button_click');
        game.state.start('Stats');
}
}