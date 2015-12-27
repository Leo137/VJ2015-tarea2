BasicGame.Credits = function(){ }; 
//Esto hace todo lo que tiene que estar cargado antes que se muestre el menu siquiera
BasicGame.Credits.prototype = {
	preload: function(){
		this.menuBackground = new MenuBackground(game,0,0,game.width,game.height,'bg_pattern_color');
		this.bg = game.add.sprite(0, 0, 'bg');
        this.bg.anchor.setTo(0.0,0.0);
        this.bg.width = game.width;
        this.bg.height = game.height;
        this.bg.tint = 0x777777;

        this.pieProgressPie = new PieProgress(game, game.width/2,game.height/2, 16, '#909090', 0);

        game.load.image('phaser', 'assets/sprites/phaser.png');
        game.load.image('tiled', 'assets/sprites/tiled.png');
	},
	create: function(){
		this.pieProgressPie.DestroyPie();
        this.pieProgressPie = null;

        // Titulo
        this.titleText = game.add.text(0, 20, 'Creditos', { font: "bold 44px Tahoma", fill: "#FFFFFF" });
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

        // Programacion
        this.programacionTitleText =game.add.text(30, game.height/2 - 120, 'Programacion', { font: "bold 28px Tahoma", fill: "#FFFFFF" });
        this.programacionTitleText.stroke =  'grey';
        this.programacionTitleText.strokeThickness=3;
        this.programacionTitleText.anchor.setTo(0.0,0.0);
        this.programacionTitleText.scale.setTo(1.0);

        // Celeste Bertin
        this.celesteGroup = game.add.group();
        this.celesteGroup.x = 50;
        this.celesteGroup.y = game.height/2 - 50;

        this.celesteBertinText = new Phaser.Text(game,0, 0, 'Celeste Bertin', { font: "bold 24px Tahoma", fill: "#FFFFFF" });
        this.celesteBertinText.stroke =  '#AA4444';
        this.celesteBertinText.strokeThickness=3;
        this.celesteBertinText.anchor.setTo(0.0,0.0);
        this.celesteBertinText.scale.setTo(1.0);

        this.celesteBertinEmailText = new Phaser.Text(game,this.celesteBertinText.width/2, 30, 'celeste.bertin@alumnos.usm.cl', { font: "bold 13px Tahoma", fill: "#FFFFFF" });
        this.celesteBertinEmailText.stroke =  '#AA4444';
        this.celesteBertinEmailText.strokeThickness=1;
        this.celesteBertinEmailText.anchor.setTo(0.5,0.0);
        this.celesteBertinEmailText.scale.setTo(1.0);

        this.celesteBertinDetailText = new Phaser.Text(game,this.celesteBertinText.width/2, 50, 'Diseño Procedural', { font: "bold 11px Tahoma", fill: "#FFFFFF" });
        this.celesteBertinDetailText.stroke =  'grey';
        this.celesteBertinDetailText.strokeThickness=1;
        this.celesteBertinDetailText.anchor.setTo(0.5,0.0);
        this.celesteBertinDetailText.scale.setTo(1.0);

        this.celesteGroup.add(this.celesteBertinText);
        this.celesteGroup.add(this.celesteBertinEmailText);
        this.celesteGroup.add(this.celesteBertinDetailText);

        // Victor Cifuentes
        this.victorCifuentesGroup = game.add.group();
        this.victorCifuentesGroup.x = game.width/2;
        this.victorCifuentesGroup.y = game.height/2 - 50;

        this.victorCifuentesText = new Phaser.Text(game, 0, 0, 'Victor Cifuentes', { font: "bold 24px Tahoma", fill: "#FFFFFF" });
        this.victorCifuentesText.stroke =  '#44AA44';
        this.victorCifuentesText.strokeThickness=3;
        this.victorCifuentesText.anchor.setTo(0.5,0.0);
        this.victorCifuentesText.scale.setTo(1.0);

        this.victorCifuentesEmailText = new Phaser.Text(game,0, 30, 'victor.cifuentes@alumnos.usm.cl', { font: "bold 13px Tahoma", fill: "#FFFFFF" });
        this.victorCifuentesEmailText.stroke =  '#44AA44';
        this.victorCifuentesEmailText.strokeThickness=1;
        this.victorCifuentesEmailText.anchor.setTo(0.5,0.0);
        this.victorCifuentesEmailText.scale.setTo(1.0);

        this.victorCifuentesDetailText = new Phaser.Text(game,0, 50, 'Enemigos & IA, Sistema de Ataque', { font: "bold 11px Tahoma", fill: "#FFFFFF" });
        this.victorCifuentesDetailText.stroke =  'grey';
        this.victorCifuentesDetailText.strokeThickness=1;
        this.victorCifuentesDetailText.anchor.setTo(0.5,0.0);
        this.victorCifuentesDetailText.scale.setTo(1.0);

        this.victorCifuentesGroup.add(this.victorCifuentesText);
        this.victorCifuentesGroup.add(this.victorCifuentesEmailText);
        this.victorCifuentesGroup.add(this.victorCifuentesDetailText);

        // Leonardo Santis
        this.leonardoSantisGroup = game.add.group();
        this.leonardoSantisGroup.x = game.width*3/3 - 50;
        this.leonardoSantisGroup.y = game.height/2 - 50;

        this.leonardoSantisText = new Phaser.Text(game, 0, 0, 'Leonardo Santis', { font: "bold 24px Tahoma", fill: "#FFFFFF" });
        this.leonardoSantisText.stroke =  '#AAAA44';
        this.leonardoSantisText.strokeThickness=3;
        this.leonardoSantisText.anchor.setTo(1.0,0.0);
        this.leonardoSantisText.scale.setTo(1.0);

        this.leonardoSantisEmailText = new Phaser.Text(game,-this.leonardoSantisText.width/2, 30, 'leonardo.santis@alumnos.usm.cl', { font: "bold 13px Tahoma", fill: "#FFFFFF" });
        this.leonardoSantisEmailText.stroke =  '#AAAA44';
        this.leonardoSantisEmailText.strokeThickness=1;
        this.leonardoSantisEmailText.anchor.setTo(0.5,0.0);
        this.leonardoSantisEmailText.scale.setTo(1.0);

        this.leonardoSantisDetailText1 = new Phaser.Text(game,-this.leonardoSantisText.width/2, 50, 'Mapa, Movimiento, Sistema de Captura', { font: "bold 11px Tahoma", fill: "#FFFFFF" });
        this.leonardoSantisDetailText1.stroke =  'grey';
        this.leonardoSantisDetailText1.strokeThickness=1;
        this.leonardoSantisDetailText1.anchor.setTo(0.5,0.0);
        this.leonardoSantisDetailText1.scale.setTo(1.0);

        this.leonardoSantisDetailText2 = new Phaser.Text(game,-this.leonardoSantisText.width/2, 50 + 15, 'y Sistema de Cartas', { font: "bold 11px Tahoma", fill: "#FFFFFF" });
        this.leonardoSantisDetailText2.stroke =  'grey';
        this.leonardoSantisDetailText2.strokeThickness=1;
        this.leonardoSantisDetailText2.anchor.setTo(0.5,0.0);
        this.leonardoSantisDetailText2.scale.setTo(1.0);

        this.leonardoSantisGroup.add(this.leonardoSantisText);
        this.leonardoSantisGroup.add(this.leonardoSantisEmailText);
        this.leonardoSantisGroup.add(this.leonardoSantisDetailText1);
        this.leonardoSantisGroup.add(this.leonardoSantisDetailText2);

        // Framework
        this.frameworkTitleText =game.add.text(30, game.height/2 + 40, 'Hecho utilizando', { font: "bold 28px Tahoma", fill: "#FFFFFF" });
        this.frameworkTitleText.stroke =  'grey';
        this.frameworkTitleText.strokeThickness=3;
        this.frameworkTitleText.anchor.setTo(0.0,0.0);
        this.frameworkTitleText.scale.setTo(1.0);

        // Phaser
        this.phaserGroup = game.add.group();
        this.phaserGroup.x = 50 + 250;
        this.phaserGroup.y = game.height/2 + 60;

        this.phaserLogo = new Phaser.Sprite(game, 0, 0, 'phaser');
        this.phaserLogo.anchor.setTo(0.0,0.0);
        this.phaserLogo.scale.setTo(0.7);

        this.phaserDetailText = new Phaser.Text(game,this.phaserLogo.width/2, 50, 'Phaser', { font: "bold 20px Tahoma", fill: "#FFFFFF" });
        this.phaserDetailText.stroke =  'grey';
        this.phaserDetailText.strokeThickness=2
        this.phaserDetailText.anchor.setTo(0.5,0.0);
        this.phaserDetailText.scale.setTo(1.0);

        this.phaserGroup.add(this.phaserLogo);
        this.phaserGroup.add(this.phaserDetailText);

        // Tiled
        this.tiledGroup = game.add.group();
        this.tiledGroup.x = game.width/2 + 150;
        this.tiledGroup.y = game.height/2 + 60;

        this.tiledLogo = new Phaser.Sprite(game, 0, 0, 'tiled');
        this.tiledLogo.anchor.setTo(0.5,0.0);
        this.tiledLogo.scale.setTo(0.4);

        this.tiledDetailText = new Phaser.Text(game,0, 50, 'Tiled', { font: "bold 20px Tahoma", fill: "#FFFFFF" });
        this.tiledDetailText.stroke =  'grey';
        this.tiledDetailText.strokeThickness=2;
        this.tiledDetailText.anchor.setTo(0.5,0.0);
        this.tiledDetailText.scale.setTo(1.0);

        this.tiledGroup.add(this.tiledLogo);
        this.tiledGroup.add(this.tiledDetailText);

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
