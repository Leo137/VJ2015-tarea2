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
	/*if (game. > 0){
        this.gameoverText = game.add.text(game.width/2, game.height/2, 'JUGADOR 1 GANA!', { font: "bold 34px Arial", fill: "#ff0044" });
    }
    else{
        this.gameoverText = game.add.text(game.width/2, game.height/2, 'JUGADOR 2 GANA!', { font: "bold 34px Arial", fill: "#ff0044" });
    }
    this.gameoverText.anchor.set(0.5);
    this.gameoverText.stroke =  'black';
    this.gameoverText.strokeThickness=2;

    this.gameoverText.inputEnabled = true;*/

},
update: function() {
	this.menuBackground.updateBackground();

}
}

