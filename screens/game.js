var levelNumber = 1;
var numeroTurnos;
var capture1P;
var capture2P;
var destroyed1P;
var destroyed2P;
var timeLeftPlayer;
var timePlayed;
// the structure of the map
var map;
var house;
var fight;
var tiger;
var elephant;

BasicGame.Game = function(){ }; 

BasicGame.Game.prototype = { 

loadUpdate : function(){
    if(this.pieProgressPie && this.pieProgressPie.alive){
        this.progress =  (game.load.progress/100.0);
        if(this.progress != this.progress_prev){
            this.progress_prev = this.progress;
            pieTween = game.add.tween(this.pieProgressPie);
            pieTween.to({progress: (this.progress)}, 300, Phaser.Easing.Linear.None, true, 0, 0, false );
        }
    }
    this.menuBackground.updateBackground();
},

preload: function() {
	this.menuBackground = new MenuBackground(game,0,0,game.width,game.height,'bg_pattern_color');
    this.pieProgressPie = new PieProgress(game, game.width/2,game.height/2, 16, '#909090', 0);
    game.world.add(this.pieProgressPie);

    //this.setLoadingText();
    game.time.advancedTiming = true;
    game.load.image('map', 'assets/tiles/tilemap.png');
    game.load.image('blank', 'assets/sprites/blank.png');
    game.load.image('arrow_h', 'assets/sprites/arrow_h.png');
    game.load.image('arrow_v', 'assets/sprites/arrow_v.png');
    game.load.image('player_unit', 'assets/sprites/player_unit.png');
    game.load.image('player_unit_2', 'assets/sprites/player_unit_2.png');
    game.load.image('capture_tile', 'assets/sprites/capture_tile.png');
    game.load.image('card_bridge', 'assets/sprites/card_bridge.png');
    game.load.image('card_catapult', 'assets/sprites/card_catapult.png');
    game.load.image('card_tunnel_red', 'assets/sprites/card_tunnel_red.png');
    game.load.image('card_tunnel_blue', 'assets/sprites/card_tunnel_blue.png');
    game.load.image('tiger', 'assets/sprites/tiger.png');
    game.load.image('elephant', 'assets/sprites/Elephant.png');
    game.load.image('questionBackground','assets/sprites/questionBackground.png');
    game.load.tilemap('level_'+levelNumber.toString(), 'assets/maps/'+levelNumber+'.json', null, Phaser.Tilemap.TILED_JSON);
	game.load.audio('ageofempires','assets/bgm/AoEIIIMainTheme.mp3');
	game.load.audio('house','assets/bgm/house.mp3');
	game.load.audio('fight','assets/bgm/fight.mp3');
	game.load.audio('tiger','assets/bgm/tiger.mp3');
	game.load.audio('elephant','assets/bgm/elephant.mp3');

    // Load things..
},
create: function() {

    SaveManager.addTimesPlayed(1);
    game.softPaused = false;
    timePlayed = 0;
    timeLeftPlayer = 30;
    capture1P = 0;
    capture2P = 0;
    destroyed1P = false;
    destroyed2P = false;
	numeroTurnos = 1;
    this.startedTime = game.time.now;

    game.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this);
	this.music = game.add.audio('ageofempires');
	this.music.loop = true;
	house=game.add.audio('house');
	fight=game.add.audio('fight');
	tiger=game.add.audio('tiger');
	elephant=game.add.audio('elephant');
    game.currentPlayer1P = true;
	this.map = game.add.tilemap('level_'+levelNumber.toString());
    this.map.addTilesetImage('map');
	this.layer = this.map.createLayer('Capa de Patrones 1');
	
    this.pieProgressPie.DestroyPie();
    this.pieProgressPie = null;

    // Create things...
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    this.finishTurnText = game.add.text(game.width - 20, 5, "Finalizar turno", { font: "bold 34px Arial", fill: "#FFFFFF" });
    this.finishTurnText.anchor.set(1.0,0.0);
    this.finishTurnText.fixedToCamera = true;
    this.finishTurnText.stroke =  'black';
    this.finishTurnText.strokeThickness=2;
    this.finishTurnText.inputEnabled = true;
    this.finishTurnText.events.onInputDown.add(this.finishTurn, this);

    this.captureStatsText = game.add.text(20, 30, "1P: 0 2P: 0", { font: "bold 24px Arial", fill: "#FFFFFF" });
    this.captureStatsText.anchor.set(0.0);
    this.captureStatsText.fixedToCamera = true;
    this.captureStatsText.stroke =  'black';
    this.captureStatsText.strokeThickness=2;

    this.currentTurnText = game.add.text(20, 0, "Turno Jugador 1", { font: "bold 24px Arial", fill: "#FFFFFF" });
    this.currentTurnText.anchor.set(0.0);
    this.currentTurnText.fixedToCamera = true;
    this.currentTurnText.stroke =  'black';
    this.currentTurnText.strokeThickness=2;

    this.timerText = game.add.text(20, 60, "Tiempo restante: 0", { font: "bold 24px Arial", fill: "#FFFFFF" });
    this.timerText.anchor.set(0.0);
    this.timerText.fixedToCamera = true;
    this.timerText.stroke =  'black';
    this.timerText.strokeThickness=2;

    //Pause
    this.pauseText = game.add.text(game.width - 20, 35, "Pause", { font: "bold 34px Arial", fill: "#FFFFFF" });
    this.pauseText.anchor.set(1.0,0.0);
    this.pauseText.fixedToCamera = true;
    this.pauseText.stroke =  'black';
    this.pauseText.strokeThickness=2;
    this.pauseText.inputEnabled = true;
    this.pauseText.events.onInputDown.add(this.togglePause, this);

    //this.map.setCollisionBetween(0,900);
    
    this.layer.resizeWorld();
    this.layer.resize(15*64,20*64);

    arrow_scale = 0.65;

    this.upArrow = game.add.sprite(game.width/2, 0 + 32, 'arrow_v');
    this.upArrow.anchor.setTo(0.5);
    this.upArrow.scale.setTo(arrow_scale);
    this.upArrow.fixedToCamera = true;
    this.upArrow.inputEnabled = true;
    this.upArrow.events.onInputDown.add(this.upArrowPressed, this);

    this.downArrow = game.add.sprite(game.width/2, game.height - 32, 'arrow_v');
    this.downArrow.anchor.setTo(0.5);
    this.downArrow.scale.setTo(arrow_scale,-arrow_scale);
    this.downArrow.fixedToCamera = true;
    this.downArrow.inputEnabled = true;
    this.downArrow.events.onInputDown.add(this.downArrowPressed, this);

    this.leftArrow = game.add.sprite(0 + 32, game.height/2, 'arrow_h');
    this.leftArrow.anchor.setTo(0.5);
    this.leftArrow.scale.setTo(-arrow_scale,arrow_scale);
    this.leftArrow.fixedToCamera = true;
    this.leftArrow.inputEnabled = true;
    this.leftArrow.events.onInputDown.add(this.leftArrowPressed, this);

    this.rightArrow = game.add.sprite(game.width - 32, game.height/2, 'arrow_h');
    this.rightArrow.anchor.setTo(0.5);
    this.rightArrow.scale.setTo(arrow_scale);
    this.rightArrow.fixedToCamera = true;
    this.rightArrow.inputEnabled = true;
    this.rightArrow.events.onInputDown.add(this.rightArrowPressed, this);

    this.game_ui_group = game.add.group();
    this.game_ui_group.add(this.upArrow);
    this.game_ui_group.add(this.downArrow);
    this.game_ui_group.add(this.leftArrow);
    this.game_ui_group.add(this.rightArrow);
    this.game_ui_group.add(this.finishTurnText);
    this.game_ui_group.add(this.currentTurnText);
    this.game_ui_group.add(this.captureStatsText);
    this.game_ui_group.add(this.timerText);

    game.camera.x = 0;
    game.camera.y = 5 * 64;

    this.cursors = game.input.keyboard.createCursorKeys();
    this.cursors.up.onDown.add(this.upArrowPressed, this);
    this.cursors.down.onDown.add(this.downArrowPressed, this);
    this.cursors.left.onDown.add(this.leftArrowPressed, this);
    this.cursors.right.onDown.add(this.rightArrowPressed, this);

    this.captureGroup = new CaptureGroup(game,this.map,this.layer);
    this.unitsGroup = new UnitsGroup(game,this.map,this.layer);
    this.cardGroup = new CardGroup(game,this.map,this.layer,this.unitsGroup);
    this.unitsGroup.cardGroup = this.cardGroup;

    this.game_ui_group.add(this.cardGroup);
    
    this.unitsGroup.createPlayerUnit(game,2,7,1);
    this.unitsGroup.createPlayerUnit(game,2,8,1);
    this.unitsGroup.createPlayerUnit(game,2,9,1);

    this.unitsGroup.createPlayerUnit(game,12,7,2);
    this.unitsGroup.createPlayerUnit(game,12,8,2);
    this.unitsGroup.createPlayerUnit(game,12,9,2);

    this.generateProcedural();
    this.processCapture();
    this.updateCurrentTurnText();
    this.updateCaptureStats();

    // Create cameras
    this.camera1P = new Phaser.Point(0,5*64);
    this.camera2P = new Phaser.Point(14*64,5*64);

    this.currentTurn = 0;

    this.startTurn();
	this.music.play();
},
update: function() {
    if(game.isGamepaused){
        return;
    }
    if(this.timerText){
        this.timerText.setText("Tiempo restante: " + timeLeftPlayer);
    }
    
    if(timeLeftPlayer <= 0){
        this.finishTurn();
    }
    game.world.bringToTop(this.game_ui_group);
    if(this.pauseMenu != null){
        game.world.bringToTop(this.pauseMenu);
    }
    if(this.menuQuestion != null){
        game.world.bringToTop(this.menuQuestion);
    }
    // Update things ...
},
updateCurrentTurnText: function(){
    if(game.currentPlayer1P){
        this.currentTurnText.text = "Turno jugador 1, turno:"+numeroTurnos;
    }
    else{
        this.currentTurnText.text = "Turno jugador 2, turno:"+numeroTurnos;
    }
},
updateCaptureStats: function(){
    capture1P = 0;
    capture2P = 0;
    this.captureGroup.forEach(function(capture){
        if(capture.owner == 1){
            capture1P++;
        }
        else if(capture.owner == 2){
            capture2P++;
        }
    });
    this.captureStatsText.text = "1P: "+capture1P+" 2P: "+capture2P;
},
tweenToCurrentCastlePlayer: function(){
    if(game.currentPlayer1P){
        this.game.add.tween(this.game.camera).to( {x: this.camera1P.x,y: this.camera1P.y}
            , 300, Phaser.Easing.Quadratic.InOut, true);
    }
    else{
        this.game.add.tween(this.game.camera).to( {x: this.camera2P.x,y: this.camera2P.y}
            , 300, Phaser.Easing.Quadratic.InOut, true);
    }
},
upArrowPressed: function(){
    fx.play('button_click');
    if(game.softPaused){
        return;
    }
    if(game.camera.y >= 64){
        //game.camera.y -= 64;
        this.game.add.tween(this.game.camera).to( {y: game.camera.y - 64}
            , 100, Phaser.Easing.Quadratic.InOut, true);
        if(game.currentPlayer1P){
            this.camera1P.y = game.camera.y - 64;
        }
        else{
            this.camera2P.y = game.camera.y - 64;
        }
    }

},
downArrowPressed: function(){
    fx.play('button_click');
    if(game.softPaused){
        return;
    }
    if(game.camera.y <= 20*64 - 64){
        //game.camera.y += 64;
        this.game.add.tween(this.game.camera).to( {y: game.camera.y + 64}
            , 100, Phaser.Easing.Quadratic.InOut, true);
        if(game.currentPlayer1P){
            this.camera1P.y = game.camera.y + 64;
        }
        else{
            this.camera2P.y = game.camera.y + 64;
        }
    }
},
leftArrowPressed: function(){
    fx.play('button_click');
    if(game.softPaused){
        return;
    }
    if(game.camera.x >= 64){
        //game.camera.x -= 64;
        this.game.add.tween(this.game.camera).to( {x: game.camera.x - 64}
            , 100, Phaser.Easing.Quadratic.InOut, true);
        if(game.currentPlayer1P){
            this.camera1P.x = game.camera.x - 64;
        }
        else{
            this.camera2P.x = game.camera.x - 64;
        }
    }
},
rightArrowPressed: function(){
    fx.play('button_click');
    if(game.softPaused){
        return;
    }
    if(game.camera.x <= 15*64 - 64){
        //game.camera.x += 64;
        this.game.add.tween(this.game.camera).to( {x: game.camera.x + 64}
            , 100, Phaser.Easing.Quadratic.InOut, true);
        if(game.currentPlayer1P){
            this.camera1P.x = game.camera.x + 64;
        }
        else{
            this.camera2P.x = game.camera.x + 64;
        }
    }
},
startTurn: function(){
    if(this.currentTurn % this.cardGroup.drawCardRate == 0){
        if(game.currentPlayer1P){
            this.cardGroup.drawCard(game,1);
        }
        else{
            this.cardGroup.drawCard(game,2);
        }
    }
},
createUnit: function(game,mapx,mapy,owner){
    this.unitsGroup.createPlayerUnit(game,mapx,mapy,owner);
    console.log(this.unitsGroup);
},
finishTurn: function(){
    fx.play('button_click');
    if(game.softPaused){
        return;
    }
    if(!game.currentPlayer1P){
        this.currentTurn += 1;
    }
    this.handleAttack();
    if(!game.currentPlayer1P){
        this.actTiger();
    }
    timeLeftPlayer = 30;
    this.timerText.setText("Tiempo restante: " + timeLeftPlayer);
    this.processCapture();
    this.unitsGroup.finishTurn();
    this.cardGroup.finishTurn();
    this.captureGroup.finishTurn(this.unitsGroup);
    game.currentPlayer1P = !game.currentPlayer1P;
    numeroTurnos++;
    this.updateCurrentTurnText();
    this.updateCaptureStats();
    this.tweenToCurrentCastlePlayer();
    this.startTurn();
    //Contar número de soldados de cada jugador.
    numberSoldiers1P = 0;
    numberSoldiers2P = 0;
    this.unitsGroup.forEach(function(unit){
        if(unit.owner == 1){
            numberSoldiers1P++;
			house.play();
        }
        else if (unit.owner == 2){
            numberSoldiers2P++;
			house.play();
        }
    });
    if(numberSoldiers1P == 0){
        timePlayed = game.time.now - this.startedTime;
        destroyed1P = true;
        this.toGameover();
    }
    else if (numberSoldiers2P == 0){
        timePlayed = game.time.now - this.startedTime;
        destroyed2P = true;
        this.toGameover();
    }
    //Comprueba si ambos jugadores ya realizaron sus 100 turnos.
    else if(numeroTurnos == 81){
        timePlayed = game.time.now - this.startedTime;
        this.toGameover();
    }
},
toMenuDestroy: function(){
    fx.play('button_click');
    if(this.menuQuestion != null){
        this.menuQuestion.destroy();
        this.menuQuestion = null;
    }
},
toMenuQuestion: function(){
    fx.play('button_click');
    if(this.menuQuestion == null){
    this.menuQuestion = game.add.group();

    this.menuQuestionBackground = new Phaser.Sprite(game,0,0,'questionBackground');
    this.menuQuestionBackground.width = game.width/3;
    this.menuQuestionBackground.height = game.height/3;
    this.menuQuestionBackground.anchor.setTo(0.5);

    this.menuOptionPrompt = new Phaser.Text(game,0,-20, "Go to menu?", { font: "bold 24px Arial", fill: "#FFFFFF" });
    this.menuOptionPrompt.anchor.set(0.5);
    this.menuOptionPrompt.stroke =  'black';
    this.menuOptionPrompt.strokeThickness=2;    

    this.menuOptionYes = new Phaser.Text(game,40,20, "Yes", { font: "bold 24px Arial", fill: "#FFFFFF" });
    this.menuOptionYes.anchor.set(0.5);
    this.menuOptionYes.stroke =  'black';
    this.menuOptionYes.strokeThickness=2;
    this.menuOptionYes.inputEnabled = true;
    this.menuOptionYes.events.onInputDown.add(this.toMenu, this);

    this.menuOptionNo = new Phaser.Text(game,-40,20, "No", { font: "bold 24px Arial", fill: "#FFFFFF" });
    this.menuOptionNo.anchor.set(0.5);
    this.menuOptionNo.stroke =  'black';
    this.menuOptionNo.strokeThickness=2;
    this.menuOptionNo.inputEnabled = true;
    this.menuOptionNo.events.onInputDown.add(this.toMenuDestroy, this);

    this.menuQuestion.add(this.menuQuestionBackground);
    this.menuQuestion.add(this.menuOptionPrompt);
    this.menuQuestion.add(this.menuOptionNo);
    this.menuQuestion.add(this.menuOptionYes);

    this.menuQuestion.fixedToCamera = true;

    this.menuQuestion.cameraOffset.x = game.width/2;
    this.menuQuestion.cameraOffset.y = game.height/2;
    }
},
toMenu: function(){
    if(this.menuQuestion != null){
        this.menuQuestion.destroy();
        this.menuQuestion = null;
    }
    fx.play('button_click');
    game.state.start('Menu');
    this.music.stop();
},
toGameover: function(){
    game.state.start('Gameover');
    this.music.stop();
},
toGame: function(){
    //Para reintentar
    // Reset things...
    game.state.start('Game');
},
handleAttack: function(){
    var that = this;
    this.unitsGroup.forEach(function(unit2){
        that.unitsGroup.forEach(function(unit){
            if(unit != unit2 && unit.owner != unit2.owner){
                if((unit.x_ == unit2.x_) && (unit.y_ == unit2.y_)){
                    var unitQuantity = unit.quantity;
                    var unitQuantity2 = unit2.quantity;
                    // Revisa los terrenos para agregar la defensa del terreno
                    that.captureGroup.forEach(function(capture){
                        if(capture.x - 32 == unit.x_ && capture.y - 32 == unit.y_ && capture.owner == unit.owner){
                            // Terreno pertenece al jugador unit 1
                            if(capture.tile.index != 8){
                                // no es montaña. le baja solo en 1 al jugador unit 2
                                unitQuantity2 -= 1;
                            }
                            else{
                                // Es montaña, bajar 2
                                unitQuantity2 -= 2;
                            }
                        }
                        if(capture.x - 32 == unit2.x_ && capture.y - 32 == unit2.y_ && capture.owner == unit2.owner){
                            // Terreno pertenece al jugador unit 2
                            if(capture.tile.index != 8){
                                // no es montaña. le baja solo en 1 al jugador unit 1
                                unitQuantity -= 1;
                            }
                            else{
                                // Es montaña, bajar 2
                                unitQuantity -= 2;
                            }
                        }
                    });
                    if(unitQuantity == unitQuantity2){
                        unit2.quantityText.destroy();
                        unit.quantityText.destroy();
                        unit2.destroy();
                        unit.destroy();
						fight.play();
                    }
                    else if (unitQuantity > unitQuantity2){
                        if(unitQuantity2 > 0)
                            unit.quantity -= unitQuantity2;
                        unit.updateQuantityText();
                        unit2.quantityText.destroy();
                        unit2.destroy();
						fight.play();
                    }
                    else if (unitQuantity2 > unitQuantity){
                        if(unitQuantity > 0)
                            unit2.quantity -= unitQuantity;
                        unit2.updateQuantityText();
                        unit.quantityText.destroy();
                        unit.destroy();
						fight.play();
                    }
                }
            }
        });
    });
},
generateProcedural: function(){
    //vaciar mapa
    /*
    for (var y = 0; y < 20; y++)
        for (var x = 0; x < 20; x++)        
            this.map.putTile(1,x,y,this.layer); 
    */
    //crear rio
    var t1;
    var t2;
    var third=1/3;
    var seed = Math.floor((0.5-Math.random())*(2)+8);
    var rio=4;
    var t1=seed;
    var anterior=t1;
    this.map.putTile(rio,seed,0,this.layer); //inicio siempre hacia abajo
    for (var z = 1; z < 20; z++){
        t2=Math.random(); //dirección del rio
        if(anterior==10){//si anterior se fue al tope derecha
            t1=t1-1;    
            this.map.putTile(36,t1+1,z,this.layer);
            this.map.putTile(37,t1,z,this.layer);
        }
        else{
            if(anterior==3){//si anterior se fue al tope izquierda
                t1=t1+1;
                this.map.putTile(29,t1-1,z,this.layer);
                this.map.putTile(22,t1,z,this.layer);
            }
            else{
                if(t2>2*third){
                    t1=t1+1;
                    if(t1>10) //limita movimiento a la derecha
                        t1=10;
                    this.map.putTile(29,t1-1,z,this.layer);
                    this.map.putTile(22,t1,z,this.layer);
                    if(t2>0.8)
                        this.map.putTile(15,t1-2,z,this.layer);
                }
                else{
                    if(t2<third){
                        t1=t1-1;
                        if(t1<3) //limita movimiento a la izquierda
                            t1=3;
                        this.map.putTile(36,t1+1,z,this.layer);
                        this.map.putTile(37,t1,z,this.layer);
                        if(t2<0.2)
                            this.map.putTile(15,t1+2,z,this.layer);
                    }
                    else{
                        this.map.putTile(rio,t1,z,this.layer);
                    }
                    
                }
            }
        }
    anterior=t1;    
    }
    
    //codigo generacion enemigos 
    
    //this.unitsGroup = new UnitsGroup(game,this.map,this.layer);
    //this.cardGroup = new CardGroup(game,this.map,this.layer,this.unitsGroup);
    //this.unitsGroup.cardGroup = this.cardGroup;

    for(var k=0; k<20; k++){
        var rand_t=Math.random();
        var rand_e=Math.random();
        if(rand_e<0.1){
            this.unitsGroup.createPlayerUnit(this.game,Math.round(rand_e)*10,k,3); //crear tigre
        }
        if(rand_t<0.2){
            this.unitsGroup.createPlayerUnit(this.game,Math.round(rand_e)*10,k,4); //crear elefante
        }
        
    }
},
processCapture: function(){
    var that = this;
    this.unitsGroup.forEach(function(unit){
        uncaptured_zone = true;
        that.captureGroup.forEach(function(capture){
            if(capture.x - 32 == unit.x_ && capture.y - 32 == unit.y_){
                uncaptured_zone = false;
                if(capture.owner == unit.owner){
                    // nada pasa
                    uncaptured_zone = false;
                }
                else{
                    // recaptura
                    capture.destroy();
                    that.captureGroup.createCaptureTile(game,unit.x_/64,unit.y_/64,unit.owner);
                }
            }
        });
        if(uncaptured_zone){
            // captura
            that.captureGroup.createCaptureTile(game,unit.x_/64,unit.y_/64,unit.owner);
        }
    });
},
actTiger: function(){
    var that = this;
    this.unitsGroup.forEach(function(unit){
        that.unitsGroup.forEach(function(unitTiger){
            if(unitTiger.owner == 3 && unit.owner != 3 && unitTiger.canAct){
                if(Math.abs(unitTiger.x_/64 - unit.x_/64) <= 4 && Math.abs(unitTiger.y_/64 - unit.y_/64) <= 4){
                    if(unitTiger.x_/64 > unit.x_/64){
                        unitTiger.x -= 64;
                    }
                    else if(unitTiger.x_/64 < unit.x_/64){
                        unitTiger.x += 64;
                    }
                    if(unitTiger.y_/64 > unit.y_/64){
                        unitTiger.y -= 64;
                    }
                    else if(unitTiger.y_/64 < unit.y_/64){
                        unitTiger.y += 64;
                    }
                    unitTiger.x_ = unitTiger.x;
                    unitTiger.y_ = unitTiger.y;
                    unitTiger.updateQuantityText();
                    unitTiger.canAct = false;
                }
            }
        });
    });
    // Attack
    this.unitsGroup.forEach(function(unit){
        that.unitsGroup.forEach(function(unitTiger){
            if(unitTiger.owner == 3 && unit.owner != 3){
                //console.log(Phaser.Math.distance(unitTiger.x_/64, unit.x_/64, unitTiger.y_/64, unit.y_/64));
                if(Math.abs(unitTiger.x_/64 - unit.x_/64) < 1 && Math.abs(unitTiger.y_/64 - unit.y_/64) < 1){
                    if(unitTiger.quantity > unit.quantity){
                        unitTiger.quantity -= unit.quantity;
                        unitTiger.updateQuantityText();
                        unit.quantityText.destroy();
                        unit.destroy();
    					tiger.play();
                    }
                    else if(unitTiger.quantity == unit.quantity){
                        unit.quantityText.destroy();
                        unit.destroy();
                        unitTiger.quantityText.destroy();
                        unitTiger.destroy();
                    }
                    else{
                        unit.quantity -= unitTiger.quantity;
                        unit.updateQuantityText();
                        unitTiger.quantityText.destroy();
                        unitTiger.destroy();
                    }
                }
            }
        });
    });
},
muteGame: function(){
    game.sound.mute = !game.sound.mute;
    fx.play('button_click'); 
    statusbarGroup.statusbar_sound_icon.loadTexture(game.sound.mute ? 'sound_off' : 'sound_on', 0);
},
togglePause: function(){

    fx.play('button_click');

    if(game.softPaused){
        // Unpause the game
        game.softPaused = false;

        // Destroy pauseMenu
        if(this.pauseMenu != null){
            this.pauseMenu.destroy();
        }
    }
    else{
        // Pause the game
        game.softPaused = true;
        
        // Show labels and stuff
        this.pauseMenu = game.add.group();

        this.pauseDarkUnderlay = new Phaser.Sprite(game,0,0,'blank');
        this.pauseDarkUnderlay.width = game.width;
        this.pauseDarkUnderlay.height = game.height;
        this.pauseDarkUnderlay.tint = 0x202020;
        this.pauseDarkUnderlay.alpha = 0.5;
        this.pauseDarkUnderlay.anchor.setTo(0.5);
        this.pauseDarkUnderlay.inputEnabled = true;

        this.pauseMenuBackground = new Phaser.Sprite(game,0,0,'questionBackground');
        this.pauseMenuBackground.width = game.width/3;
        this.pauseMenuBackground.height = game.height/3;
        this.pauseMenuBackground.anchor.setTo(0.5);

        this.pausedLabel = new Phaser.Text(game,0, -35, "Paused", { font: "bold 24px Arial", fill: "#FFFFFF", align: "center"});
        this.pausedLabel.anchor.setTo(0.5, 0.5);
        this.pausedLabel.stroke =  'black';
        this.pausedLabel.strokeThickness=2;

        this.resumeGame = new Phaser.Text(game,0, 0, "Reaundar partida", { font: "bold 24px Arial", fill: "#FFFFFF", align: "center"});
        this.resumeGame.anchor.setTo(0.5, 0.5);
        this.resumeGame.stroke =  'black';
        this.resumeGame.strokeThickness=2;
        this.resumeGame.inputEnabled = true;
        this.resumeGame.events.onInputDown.add(this.togglePause, this);

        this.toMenuText = new Phaser.Text(game,0, 30, "Volver a Menu", { font: "bold 24px Arial", fill: "#FFFFFF", align: "center"});
        this.toMenuText.anchor.setTo(0.5, 0.5);
        this.toMenuText.stroke =  'black';
        this.toMenuText.strokeThickness=2;
        this.toMenuText.inputEnabled = true;
        this.toMenuText.events.onInputDown.add(this.toMenuQuestion, this);

        this.pauseMenu.add(this.pauseDarkUnderlay);
        this.pauseMenu.add(this.pauseMenuBackground);
        this.pauseMenu.add(this.pausedLabel);
        this.pauseMenu.add(this.resumeGame);
        this.pauseMenu.add(this.toMenuText);

        this.pauseMenu.fixedToCamera = true;

        this.pauseMenu.cameraOffset.x = game.width/2;
        this.pauseMenu.cameraOffset.y = game.height/2;
    }
    
},
updateCounter: function() {
    if(game.softPaused){
        return;
    }
    timeLeftPlayer--;
    this.timerText.setText("Tiempo restante: " + timeLeftPlayer);

    if(timeLeftPlayer <= 0){
        this.finishTurn();
    }

}

}
