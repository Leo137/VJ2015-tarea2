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
    this.actionPossibleGroupTunnel = game.add.group();
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
	this.actionPossibleGroupTunnel.removeAll(true);
}

Card.prototype.onCardClicked = function(){
	var card = this;
	if((game.currentPlayer1P && this.owner == 2) || (!game.currentPlayer1P && this.owner == 1)){
		return;
	}
	fx.play('button_click');
	if(game.softPaused){
        return;
    }
	if(this.actionPossibleGroup.length > 0){
		this.clearAllSelection();
		return;
	}
	this.clearAllSelection();
	if(this.type == 1){
		// Bridge
		this.unitGroup.forEach(function(unit){
			if(unit.owner != card.owner){
				return;
			}
			var tile = unit.map.getTile(unit.x_/64,unit.y_/64,unit.layer,true);
			if(tile != null){
				for(var deltax=-1;deltax<2;deltax++){
					for(var deltay=-1;deltay<2;deltay++){
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
		this.unitGroup.forEach(function(unit){
			if(unit.owner != card.owner){
				return;
			}
			var tile = unit.map.getTile(unit.x_/64,unit.y_/64,unit.layer,true);
			if(tile != null){
				for(var deltax=-3;deltax<4;deltax++){
					for(var deltay=-3;deltay<4;deltay++){
						if(deltay == 0 && deltax == 0){
							continue;
						}
						if(deltax*deltax + deltay*deltay == 3*3){
							var positionx = unit.x_ + deltax * 64;
							var positiony = unit.y_ + deltay * 64;
							var tilex = positionx/64;
							var tiley = positiony/64;
							tile = unit.map.getTile(tilex,tiley,unit.layer);
							if(tile!=null){
								// Tiles permitidas:
								// Cualquiera
									card.createActionPossibleCircle(tilex,tiley);
							}
						}
					}
				}
			}
		});
	}
	if(this.type == 3){
		// Tunnel
		this.unitGroup.forEach(function(unit){
			if(unit.owner != card.owner){
				return;
			}
			var tile = unit.map.getTile(unit.x_/64,unit.y_/64,unit.layer,true);
			if(tile != null){
				for(var deltax=-1;deltax<2;deltax++){
					for(var deltay=-1;deltay<2;deltay++){
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
							// pasto_bonito (1)
							if(tile.index == 1){
								card.createActionPossibleCircle(tilex,tiley);
							}
						}
					}
				}
			}
		});
	}
}

Card.prototype.createActionPossibleCircle = function(tilex,tiley){
	var founded = false;
	this.cardGroup.forEach(function(car){
		car.actionPossibleGroup.forEach(function(circle){
			if(circle.tilex == tilex && circle.tiley == tiley){
				founded = true;
				return;
			}
		});
	});
	card.actionPossibleGroup.forEach(function(circle){
		if(circle.tilex == tilex && circle.tiley == tiley){
			founded = true;
			return;
		}
	});
	if(!founded){
		var circle = new Phaser.Sprite(game,tilex*64,tiley*64,this.key);
		circle.tint = 0x00FF00
		circle.alpha = 0.5;
		this.actionPossibleGroup.add(circle);
		circle.inputEnabled = true;
		circle.card = this;
		circle.tilex = tilex;
		circle.tiley = tiley;
	    circle.events.onInputDown.add(this.onMovementPossibleCircleClicked,circle);
	}
}

Card.prototype.onMovementPossibleCircleClicked = function(circle){
	fx.play('button_click');
	if(game.softPaused){
        return;
    }
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
		card.clearAllSelection();
		cardGroup.destroyCard(card);
		cardGroup.updateCardsPosition(game,owner);
		SaveManager.addCardsUsed(1);
	}
	if(card.type == 2){
		// Catapult effect
		card.unitGroup.forEach(function(unit){
			if(unit.x_/64 == circle.tilex && unit.y_/64 == circle.tiley){
				unit.quantityText.destroy();
				unit.destroy();
			}
		});
		card.clearAllSelection();
		cardGroup.destroyCard(card);
		cardGroup.updateCardsPosition(game,owner);
		SaveManager.addCardsUsed(1);
	}
	if(card.type == 3){
		// Bridge Effect
		var tilex = circle.tilex;
		var tiley = circle.tiley;
		card.clearAllSelection();
		card.createActionPossibleCircle(tilex,tiley);
		card.actionPossibleGroup.forEach(function(cir){
			cir.tint = 0xAAFFAA;
		});

		var tile = card.map.getTile(circle.tilex,circle.tiley,card.layer,true);
		if(tile != null){
			for(var deltax=-3;deltax<4;deltax++){
				for(var deltay=-3;deltay<4;deltay++){
					if(deltay == 0 && deltax == 0){
						continue;
					}
					if(deltax*deltax + deltay*deltay == 3*3){
						var tilex = circle.tilex + deltax;
						var tiley = circle.tiley + deltay;
						tile = card.map.getTile(tilex,tiley,card.layer);
						if(tile!=null){
							// Tiles permitidas:
							// pasto_bonito (1)
							if(tile.index == 1){
								card.createActionPossibleCircleTunnel(tilex,tiley,circle);
							}
						}
					}
				}
			}
		}
	}
}

Card.prototype.createActionPossibleCircleTunnel = function(tilex,tiley,cir){
	var founded = false;
	this.actionPossibleGroupTunnel.forEach(function(circle){
		if(circle.tilex == tilex && circle.tiley == tiley){
			founded = true;
			return;
		}
	});
	if(!founded){
		var circle = new Phaser.Sprite(game,tilex*64,tiley*64,this.key);
		circle.tint = 0x00FF00
		circle.alpha = 0.5;
		this.actionPossibleGroupTunnel.add(circle);
		circle.inputEnabled = true;
		circle.card = this;
		circle.tilex = tilex;
		circle.tiley = tiley;
		circle.stepOneCircle = cir;
	    circle.events.onInputDown.add(circle.card.onMovementPossibleCircleClickedTunnel,circle);
	}
}

Card.prototype.onMovementPossibleCircleClickedTunnel = function(circle){
	fx.play('button_click');
	if(game.softPaused){
        return;
    }
	var card = circle.card;
	var cardGroup = card.cardGroup;
	var owner = card.owner;
	if(card.type == 3){
		// Catapult effect
		var circleOne = circle.stepOneCircle;
		var tileToReplace;
		if(card.owner == 1){
			tileToReplace = 30;
		}
		else{
			tileToReplace = 31;
		}
		var tile = card.map.getTile(circle.tilex,circle.tiley,this.layer);
		if(tile != null){
			if(tile.index == 1){
				// Tunnel
				card.map.putTile(null,circle.tilex,circle.tiley);
				card.map.putTile(tileToReplace,circle.tilex,circle.tiley);
				var tunnel_b = card.map.getTile(circle.tilex,circle.tiley,this.layer);
			}
		}
		tile = card.map.getTile(circleOne.tilex,circleOne.tiley,this.layer);
		if(tile != null){
			if(tile.index == 1){
				// Tunnel
				card.map.putTile(null,circleOne.tilex,circleOne.tiley);
				card.map.putTile(tileToReplace,circleOne.tilex,circleOne.tiley);
				var tunnel_a = card.map.getTile(circleOne.tilex,circleOne.tiley,this.layer);
			}
		}
		if(tunnel_a != null && tunnel_b != null){
			tunnel_b.tunnel_warp = tunnel_a;
			tunnel_a.tunnel_warp = tunnel_b;
			console.log(tunnel_b);
		}
		card.clearAllSelection();
		cardGroup.destroyCard(card);
		cardGroup.updateCardsPosition(game,owner);
		SaveManager.addCardsUsed(1);
	}
}
