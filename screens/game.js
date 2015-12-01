var levelNumber = 1;

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
    game.load.image('arrow_h', 'assets/sprites/arrow_h.png');
    game.load.image('arrow_v', 'assets/sprites/arrow_v.png');
    game.load.tilemap('level_'+levelNumber.toString(), 'assets/maps/'+levelNumber+'.json', null, Phaser.Tilemap.TILED_JSON);

    // Load things..
},
create: function() {

    this.pieProgressPie.DestroyPie();
    this.pieProgressPie = null;

    // Create things...
    this.menuText = game.add.text(game.width - 20, game.height - 5, "Al Menu", { font: "bold 34px Arial", fill: "#FFFFFF" });
    this.menuText.anchor.set(1.0);
    this.menuText.fixedToCamera = true;
    this.menuText.stroke =  'black';
    this.menuText.strokeThickness=2;

    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    this.menuText.inputEnabled = true;
    this.menuText.events.onInputDown.add(this.toMenu, this);

    this.map = game.add.tilemap('level_'+levelNumber.toString());
    this.map.addTilesetImage('map');

    //this.map.setCollisionBetween(0,900);
    this.layer = this.map.createLayer('Capa de Patrones 1');
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

    game.camera.x = 0;
    game.camera.y = 5 * 64;

    this.cursors = game.input.keyboard.createCursorKeys();
    this.cursors.up.onDown.add(this.upArrowPressed, this);
    this.cursors.down.onDown.add(this.downArrowPressed, this);
    this.cursors.left.onDown.add(this.leftArrowPressed, this);
    this.cursors.right.onDown.add(this.rightArrowPressed, this);

    game.world.bringToTop(this.menuText);

},
update: function() {
    if(game.isGamepaused){
        return;
    }

    // Update things ...
},
upArrowPressed: function(){
    fx.play('button_click');
    if(game.camera.y >= 64){
        //game.camera.y -= 64;
        this.game.add.tween(this.game.camera).to( {y: game.camera.y - 64}
            , 100, Phaser.Easing.Quadratic.InOut, true);
    }

},
downArrowPressed: function(){
    fx.play('button_click');
    if(game.camera.y <= 20*64 - 64){
        //game.camera.y += 64;
        this.game.add.tween(this.game.camera).to( {y: game.camera.y + 64}
            , 100, Phaser.Easing.Quadratic.InOut, true);
    }
},
leftArrowPressed: function(){
    fx.play('button_click');
    if(game.camera.x >= 64){
        //game.camera.x -= 64;
        this.game.add.tween(this.game.camera).to( {x: game.camera.x - 64}
            , 100, Phaser.Easing.Quadratic.InOut, true);
    }
},
rightArrowPressed: function(){
    fx.play('button_click');
    if(game.camera.x <= 15*64 - 64){
        //game.camera.x += 64;
        this.game.add.tween(this.game.camera).to( {x: game.camera.x + 64}
            , 100, Phaser.Easing.Quadratic.InOut, true);
    }
},
toMenu: function(){
    fx.play('button_click');
    game.state.start('Menu');
},
toGameover: function(){
    game.state.start('Gameover');
},
toGame: function(){
    //Para reintentar
    // Reset things...
    game.state.start('Game');
},
muteGame: function(){
    game.sound.mute = !game.sound.mute;
    fx.play('button_click'); 
    statusbarGroup.statusbar_sound_icon.loadTexture(game.sound.mute ? 'sound_off' : 'sound_on', 0);
},
pauseGame: function(){
    game.isGamepaused = !game.isGamepaused;
    fx.play('button_click');
    if(game.isGamepaused){
        game.tweens.pauseAll();
        game.time.events.pause();
    }
    else{
        game.tweens.resumeAll();
        game.time.events.resume();
    }
}
}
