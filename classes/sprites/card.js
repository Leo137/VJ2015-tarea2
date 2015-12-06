var Card = function(game, type, map, layer, group, owner, unitGroup){
	if(type == 1){
		// Bridge
		Phaser.Sprite.call(this, game, 0, 0, 'card_bridge');
	}
	if(type == 2){
		// Catapult
		Phaser.Sprite.call(this, game, 0, 0, 'card_catapult');
	}
	if(type == 3){
		// Tunnel
		if(owner == 1){
			Phaser.Sprite.call(this, game, 0, 0, 'card_tunnel_red');
		}
		else{
			Phaser.Sprite.call(this, game, 0, 0, 'card_tunnel_blue');
		}
	}
    this.anchor.setTo(0.5);
    this.map = map;
    this.layer = layer;
    this.cardGroup = group;
    this.unitGroup = unitGroup;
    this.actionPossibleGroup = game.add.group();
    this.owner = owner;
    this.type = type;
    this.game.add.tween(this.scale).from( {x: 0.0,y: 0.0}
            , 400, Phaser.Easing.Quadratic.InOut, true);
    this.inputEnabled = true;
    this.events.onInputDown.add(this.onCardClicked,this);
}

Card.prototype = Object.create(Phaser.Sprite.prototype);
Card.prototype.constructor = Card;

Card.prototype.clearAllSelection = function(){
	this.cardGroup.forEach(function(card){
		if(card.clearSelection != null){
			card.clearSelection();
		}
	});
	if(this.unitGroup != null){
		this.unitGroup.forEach(function(unit){
			if(unit.clearSelection != null){
				unit.clearSelection();
			}
		});
	}
}

Card.prototype.clearSelection = function(){
	this.actionPossibleGroup.removeAll(true);
}

Card.prototype.onCardClicked = function(){
	var card = this;
	if((game.currentPlayer1P && this.owner == 2) || (!game.currentPlayer1P && this.owner == 1)){
		return;
	}
	fx.play('button_click');
	if(this.actionPossibleGroup.length > 0){
		this.clearAllSelection();
		return;
	}
	this.clearAllSelection();
	if(this.type == 1){
		// Bridge
		this.unitGroup.forEach(function(unit){
			var tile = unit.map.getTile(unit.x_/64,unit.y_/64,unit.layer,true);
			if(tile != null){
				for(deltax=-1;deltax<2;deltax++){
					for(deltay=-1;deltay<2;deltay++){
						if(deltay == 0 && deltax == 0){
							continue;
						}
						var positionx = unit.x_ + deltax * 64;
						var positiony = unit.y_ + deltay * 64;
						var tilex = positionx/64;
						var tiley = positiony/64;
						tile = unit.map.getTile(tilex,tiley,unit.layer);
						if(tile!=null){
							// Tiles permitidas:
							// rio_horizontal (3) rio_vertical (4)
							if(tile.index == 3 || tile.index == 4){
								card.createActionPossibleCircle(tilex,tiley);
							}
						}
					}
				}
			}
		});
	}
	if(this.type == 2){
		// Catapult
	}
	if(this.type == 3){
		// Tunnel
	}
}

Card.prototype.createActionPossibleCircle = function(tilex,tiley){
	circle = new Phaser.Sprite(game,tilex*64,tiley*64,this.key);
	circle.tint = 0x00FF00
	circle.alpha = 0.5;
	this.actionPossibleGroup.add(circle);
	circle.inputEnabled = true;
	circle.card = this;
	circle.tilex = tilex;
	circle.tiley = tiley;
    circle.events.onInputDown.add(this.onMovementPossibleCircleClicked,circle);
}

Card.prototype.onMovementPossibleCircleClicked = function(circle){
	fx.play('button_click');
	var card = circle.card;
	var cardGroup = card.cardGroup;
	var owner = card.owner;
	if(card.type == 1){
		// Bridge effect
		var tile = card.map.getTile(circle.tilex,circle.tiley,this.layer);
		if(tile != null){
			if(tile.index == 3){
				// Vertical bridge
				// Change to 14
				card.map.putTile(null,circle.tilex,circle.tiley);
				card.map.putTile(14,circle.tilex,circle.tiley);
			}
			if(tile.index == 4){
				// Horizontal bridge
				// Change to 7
				card.map.putTile(null,circle.tilex,circle.tiley);
				card.map.putTile(7,circle.tilex,circle.tiley);
			}
		}
	}
	card.clearAllSelection();
	cardGroup.destroyCard(card);
	cardGroup.updateCardsPosition(game,owner);
}