BasicGame.Stats = function(){ }; 
//Esto hace todo lo que tiene que estar cargado antes que se muestre el menu siquiera
BasicGame.Stats.prototype = {
	preload: function(){
		this.menuBackground = new MenuBackground(game,0,0,game.width,game.height,'bg_pattern_color');
		this.bg = game.add.sprite(0, 0, 'bg');
                this.bg.anchor.setTo(0.0,0.0);
                this.bg.width = game.width;
                this.bg.height = game.height;
                this.bg.tint = 0x777777;

                this.pieProgressPie = new PieProgress(game, game.width/2,game.height/2, 16, '#909090', 0);
                game.load.image('questionBackground','assets/sprites/questionBackground.png');
	},
	create: function(){
		this.pieProgressPie.DestroyPie();
                this.pieProgressPie = null;

                // Titulo
                this.titleText = game.add.text(0, 20, 'Estadisticas', { font: "bold 44px Tahoma", fill: "#FFFFFF" });
                this.titleText.x = 30;
                this.titleText.stroke =  'grey';
                this.titleText.strokeThickness=3;
                this.titleText.anchor.setTo(0.0,0.0);
                this.titleText.scale.setTo(1.0);

                var grd = this.titleText.context.createLinearGradient(0, 0, 0, this.titleText.height);
                //  Add in 2 color stops
                grd.addColorStop(0, '#FCFC34');   
                grd.addColorStop(1, '#B0B001');
                //  And apply to the Text
                this.titleText.fill = grd;

                // Status Group
                this.statsGroup = game.add.group();

                this.statsGroup.x = 150;
                this.statsGroup.y = 60;

                this.statsGroupBackground = new Phaser.Sprite(game,10,10,'questionBackground');
                this.statsGroupBackground.width = 450;
                this.statsGroupBackground.height = 300;

                // Games played
                this.gamesPlayedText = new Phaser.Text(game,300, 80, 'Partidas jugadas:', { font: "bold 20px Tahoma", fill: "#FFFFFF" });
                this.gamesPlayedText.stroke =  'grey';
                this.gamesPlayedText.strokeThickness=3;
                this.gamesPlayedText.anchor.setTo(1.0,0.0);
                this.gamesPlayedText.scale.setTo(1.0);

                this.gamesPlayedValueText = new Phaser.Text(game,310, 80, '0', { font: "bold 20px Tahoma", fill: "#FFFFFF" });
                this.gamesPlayedValueText.stroke =  'grey';
                this.gamesPlayedValueText.strokeThickness=3;
                this.gamesPlayedValueText.anchor.setTo(0.0,0.0);
                this.gamesPlayedValueText.scale.setTo(1.0);

                this.gamesPlayedValueText.text = SaveManager.getTimesPlayed();

                // Victorias Jugador 1
                this.winsPlayer1Text = new Phaser.Text(game,300, 100, 'Victorias jugador 1:', { font: "bold 20px Tahoma", fill: "#FFFFFF" });
                this.winsPlayer1Text.stroke =  'grey';
                this.winsPlayer1Text.strokeThickness=3;
                this.winsPlayer1Text.anchor.setTo(1.0,0.0);
                this.winsPlayer1Text.scale.setTo(1.0);

                this.winsPlayer1ValueText = new Phaser.Text(game,310, 100, '0', { font: "bold 20px Tahoma", fill: "#FFFFFF" });
                this.winsPlayer1ValueText.stroke =  'grey';
                this.winsPlayer1ValueText.strokeThickness=3;
                this.winsPlayer1ValueText.anchor.setTo(0.0,0.0);
                this.winsPlayer1ValueText.scale.setTo(1.0);

                this.winsPlayer1ValueText.text = SaveManager.getP1Wins();

                // Victorias Jugador 2
                this.winsPlayer2Text = new Phaser.Text(game,300, 120, 'Victorias jugador 2:', { font: "bold 20px Tahoma", fill: "#FFFFFF" });
                this.winsPlayer2Text.stroke =  'grey';
                this.winsPlayer2Text.strokeThickness=3;
                this.winsPlayer2Text.anchor.setTo(1.0,0.0);
                this.winsPlayer2Text.scale.setTo(1.0);

                this.winsPlayer2ValueText = new Phaser.Text(game,310, 120, '0', { font: "bold 20px Tahoma", fill: "#FFFFFF" });
                this.winsPlayer2ValueText.stroke =  'grey';
                this.winsPlayer2ValueText.strokeThickness=3;
                this.winsPlayer2ValueText.anchor.setTo(0.0,0.0);
                this.winsPlayer2ValueText.scale.setTo(1.0);

                this.winsPlayer2ValueText.text = SaveManager.getP2Wins();

                // Empates
                this.tiesText = new Phaser.Text(game,300, 140, 'Empates:', { font: "bold 20px Tahoma", fill: "#FFFFFF" });
                this.tiesText.stroke =  'grey';
                this.tiesText.strokeThickness=3;
                this.tiesText.anchor.setTo(1.0,0.0);
                this.tiesText.scale.setTo(1.0);

                this.tiesValueText = new Phaser.Text(game,310, 140, '0', { font: "bold 20px Tahoma", fill: "#FFFFFF" });
                this.tiesValueText.stroke =  'grey';
                this.tiesValueText.strokeThickness=3;
                this.tiesValueText.anchor.setTo(0.0,0.0);
                this.tiesValueText.scale.setTo(1.0);

                this.tiesValueText.text = SaveManager.getTies();

                // Cartas usadas
                this.cardsUsed = new Phaser.Text(game,300, 160, 'Cartas usadas:', { font: "bold 20px Tahoma", fill: "#FFFFFF" });
                this.cardsUsed.stroke =  'grey';
                this.cardsUsed.strokeThickness=3;
                this.cardsUsed.anchor.setTo(1.0,0.0);
                this.cardsUsed.scale.setTo(1.0);

                this.cardsValueUsed = new Phaser.Text(game,310, 160, '0', { font: "bold 20px Tahoma", fill: "#FFFFFF" });
                this.cardsValueUsed.stroke =  'grey';
                this.cardsValueUsed.strokeThickness=3;
                this.cardsValueUsed.anchor.setTo(0.0,0.0);
                this.cardsValueUsed.scale.setTo(1.0);

                this.cardsValueUsed.text = SaveManager.getCardsUsed();

                // Tiempo total jugado
                this.totalTimePlayedText = new Phaser.Text(game,300, 180, 'Tiempo total jugado:', { font: "bold 20px Tahoma", fill: "#FFFFFF" });
                this.totalTimePlayedText.stroke =  'grey';
                this.totalTimePlayedText.strokeThickness=3;
                this.totalTimePlayedText.anchor.setTo(1.0,0.0);
                this.totalTimePlayedText.scale.setTo(1.0);

                this.totalTimePlayedValueText = new Phaser.Text(game,310, 180, '00:00:00', { font: "bold 20px Tahoma", fill: "#FFFFFF" });
                this.totalTimePlayedValueText.stroke =  'grey';
                this.totalTimePlayedValueText.strokeThickness=3;
                this.totalTimePlayedValueText.anchor.setTo(0.0,0.0);
                this.totalTimePlayedValueText.scale.setTo(1.0);

                //Algoritmo para transformar de milisegundos a formato HH:MM:SS
                millisecs = SaveManager.getTotalTimePlayed();
                secs = Math.floor((millisecs / 1000) % 60);
                minutes = Math.floor((millisecs / (1000 * 60)) % 60);
                hours = Math.floor((millisecs / (1000 * 60 * 60)) % 24);

                if(hours < 10 && minutes < 10 && secs < 10){
                        this.totalTimePlayedValueText.text = "0" + hours + ":0" + minutes + ":0" + secs;
                }
                else if(hours < 10 && secs < 10){
                        this.totalTimePlayedValueText.text = "0" + hours + ":" + minutes + ":0" + secs;

                }
                else if(hours < 10 && minutes < 10){
                        this.totalTimePlayedValueText.text = "0" + hours + ":0" + minutes + ":" + secs;
                }
                else if(minutes < 10 && secs < 10){
                        this.totalTimePlayedValueText.text = hours + ":0" + minutes + ":0" + secs;
                }
                else if(hours < 10){
                        this.totalTimePlayedValueText.text = "0" + hours + ":" + minutes + ":" + secs;
                }
                else if(minutes < 10){
                        this.totalTimePlayedValueText.text = hours + ":0" + minutes + ":" + secs;
                }
                else if(secs < 10){
                        this.totalTimePlayedValueText.text = hours + ":" + minutes + ":0" + secs;
                }
                else{
                        this.totalTimePlayedValueText.text = hours + ":" + minutes + ":" + secs;
                }


                this.statsGroup.add(this.statsGroupBackground);
                this.statsGroup.add(this.gamesPlayedText);
                this.statsGroup.add(this.gamesPlayedValueText);
                this.statsGroup.add(this.winsPlayer1Text);
                this.statsGroup.add(this.winsPlayer1ValueText);
                this.statsGroup.add(this.winsPlayer2Text);
                this.statsGroup.add(this.winsPlayer2ValueText);
                this.statsGroup.add(this.tiesText);
                this.statsGroup.add(this.tiesValueText);
                this.statsGroup.add(this.cardsUsed);
                this.statsGroup.add(this.cardsValueUsed);
                this.statsGroup.add(this.totalTimePlayedText);
                this.statsGroup.add(this.totalTimePlayedValueText);

                this.backText = game.add.text(0 + 30, game.height/2 + game.height/3, "Al Menu", { font: "bold 34px Arial", fill: "#FFFFFF" });
                this.backText.anchor.set(0.0);
                this.backText.stroke =  'black';
                this.backText.strokeThickness=2;
                this.backText.inputEnabled = true;
                this.backText.events.onInputDown.add(this.toMenu, this);
	},
	toMenu: function(){
		fx.play('button_click');
		game.state.start('Menu');
	}
}
