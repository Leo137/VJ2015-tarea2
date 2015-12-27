// Utils
function colorToHex(color) {
    if (color.substr(0, 1) === '#') {
        return color;
    }
    var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);

    var red = parseInt(digits[2]);
    var green = parseInt(digits[3]);
    var blue = parseInt(digits[4]);

    var rgb = blue | (green << 8) | (red << 16);
    return rgb;
};


BasicGame.Menu = function(){ }; 

BasicGame.Menu.prototype = { 
    loadUpdate : function(){
        if(this.pieProgressPie && this.pieProgressPie.alive){
            this.progress = (game.load.progress/100.0) * 1.0;
            if(this.progress != this.progress_prev){
                this.progress_prev = this.progress;
                pieTween = game.add.tween(this.pieProgressPie);
                pieTween.to({progress: (this.progress)}, 100, Phaser.Easing.Linear.None, true, 0, 0, false );
            }
        }
		this.menuBackground.updateBackground();
    },
    preload: function() {
        this.menuBackground = new MenuBackground(game,0,0,game.width,game.height,'bg_pattern_color');
        this.menuBackground.isRandomColor = true;
        

        //GameVarsData.loadFile();
        this.pieProgressPie = new PieProgress(game, game.width/2,game.height/2, 16, '#909090', 0);
		game.world.add(this.pieProgressPie);
		this.pieProgressPie.alpha = 0;

		// game.load.audio('sec_menu_bgm','assets/bgm/sec_menu.ogg');
		// game.load.audio('stage_bg','assets/bgm/stage_bg.ogg');
		// game.load.audio('yay', 'assets/bgm/win_stage.ogg');
		// game.load.audio('buu', 'assets/bgm/lose_stage.ogg');

        game.load.audio('sfx', 'assets/sfx/fx.mp3');

        ;

        // game.load.image('money_icon', 'assets/sprites/money_icon.png');

        game.load.image('sound_on', 'assets/sprites/sound_on.png');
        game.load.image('sound_off', 'assets/sprites/sound_off.png');

        // game.load.spritesheet('timer', 'assets/sprites/timer.png', 150, 20);

        if(game.cache.checkImageKey("bg")){
            this.bg = game.add.sprite(0, 0, 'bg');
            this.bg.anchor.setTo(0.0,0.0);
            this.bg.width = game.width;
            this.bg.height = game.height;
        }
        else{
            game.load.image('bg', 'assets/sprites/bg.jpg')
        }
    },
    create: function() {

        SaveManager.continueGame();

        this.pieProgressPie.DestroyPie();
        this.pieProgressPie = null;

        fx = game.add.audio('sfx');
        fx.allowMultiple = true;

        //  And this defines the markers.

        //  They consist of a key (for replaying), the time the sound starts and the duration, both given in seconds.
        //  You can also set the volume and loop state, although we don't use them in this example (see the docs)

        fx.addMarker('button_click', 4.049, 0.209);
        fx.addMarker('coin_get', 4.258, 0.648);
        fx.addMarker('happy_2', 4.906, 0.914);
        fx.addMarker('jingle', 5.820, 0.993);
        fx.addMarker('sound_wrong', 6.813, 0.366);
        fx.addMarker('unhappy', 7.179, 0.967);
        fx.addMarker('up_short', 8.145, 0.836);

        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        
        if(this.bg == null){
            this.bg = game.add.sprite(0, 0, 'bg');
            this.bg.anchor.setTo(0.0,0.0);
            this.bg.width = game.width;
            this.bg.height = game.height;
        }   

        this.logoText = game.add.text(0, game.height/2 - game.height/8, '"Land of Great Origins"', { font: "bold 44px Tahoma", fill: "#FFFFFF" });
        this.logoText.x = 30;
        this.logoText.stroke =  'grey';
        this.logoText.strokeThickness=3;
        this.logoText.anchor.setTo(0.0,0.5);
        this.logoText.scale.setTo(1.0);

        var grd = this.logoText.context.createLinearGradient(0, 0, 0, this.logoText.height);

        //  Add in 2 color stops
        grd.addColorStop(0, '#FCFC34');   
        grd.addColorStop(1, '#B0B001');

        //  And apply to the Text
        this.logoText.fill = grd;


        this.startGameText = game.add.text(0 + 30, game.height/2 + game.height/3 - 70, LocalizableStrings.getString("menu-startgametext"), { font: "bold 34px Arial", fill: "#FFFFFF" });

        this.startGameText.anchor.set(0.0);
        this.startGameText.stroke =  'black';
        this.startGameText.strokeThickness=2;

        this.startGameText.inputEnabled = true;
        this.startGameText.events.onInputDown.add(this.toGame, this);

        this.creditsText = game.add.text(game.width - 30, game.height/2 + game.height/3 - 0, "Creditos", { font: "bold 34px Arial", fill: "#FFFFFF" });

        this.creditsText.anchor.set(1.0,0.0);
        this.creditsText.stroke =  'black';
        this.creditsText.strokeThickness=2;

        this.creditsText.inputEnabled = true;
        this.creditsText.events.onInputDown.add(this.toCredits, this);

        this.statsText = game.add.text(game.width - 30, game.height/2 + game.height/3 - 70, "Estadisticas", { font: "bold 34px Arial", fill: "#FFFFFF" });

        this.statsText.anchor.set(1.0,0.0);
        this.statsText.stroke =  'black';
        this.statsText.strokeThickness=2;

        this.statsText.inputEnabled = true;
        this.statsText.events.onInputDown.add(this.toStats, this);

        // this.instructionsText = game.add.text(0 + 30, game.height/2 + game.height/3, LocalizableStrings.getString("menu-instructionstext"), { font: "bold 34px Arial", fill: "#FFFFFF" });

        // this.instructionsText.anchor.set(0.0);
        // this.instructionsText.stroke =  'black';
        // this.instructionsText.strokeThickness=2;

        // this.instructionsText.inputEnabled = true;
        // this.instructionsText.events.onInputDown.add(this.showInstructions, this);

        if(isLandscapeLittle){
            this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        }
        else{
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        }
        if(isLandscape){
            this.scale.minWidth = 768/2;
            this.scale.minHeight = 432/2;
            this.scale.maxWidth = 768*1.5;
            this.scale.maxHeight = 432*1.5;
        }
        else{
            this.scale.minWidth = 400/2;
            this.scale.minHeight = 600/2;
            this.scale.maxWidth = 400*1.5;
            this.scale.maxHeight = 600*1.5;
        }

        // Center canvas
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        this.statusbar_sound_icon = game.add.sprite(game.width-25,game.height - 20,game.sound.mute ? 'sound_off' : 'sound_on', 0);
        this.statusbar_sound_icon.anchor.set(0.5);
        this.statusbar_sound_icon.scale.setTo(0.8);
        this.statusbar_sound_icon.inputEnabled = true;
        this.statusbar_sound_icon.events.onInputDown.add(this.muteGame);

        // Start Preloader
        this.time = game.time.time;
        game.stage.backgroundColor = 0x6680CC;
    },
    update: function() {
		this.menuBackground.updateBackground();
    },
    toGame: function(){
        fx.play('button_click');
        game.state.start('Game');
    },
    toCredits: function(){
        fx.play('button_click');
        game.state.start('Credits');
    },
    toStats: function(){
        fx.play('button_click');
        game.state.start('Stats');
    },
    showInstructions: function(){
        fx.play('button_click');
        // Mostrar instrucciones...
    },
    muteGame: function(){
        game.sound.mute = !game.sound.mute;
        fx.play('button_click');
        game.state.callbackContext.statusbar_sound_icon.loadTexture(game.sound.mute ? 'sound_off' : 'sound_on', 0);
    },
}

