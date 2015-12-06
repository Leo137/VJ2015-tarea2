var PlayerUnit = function(game, mapx, mapy, map, layer, group, owner, cardGroup){
	if(owner == 1){
    	Phaser.Sprite.call(this, game, mapx * 64, mapy *64, 'player_unit');
    }
    else{
    	Phaser.Sprite.call(this, game, mapx * 64, mapy *64, 'player_unit_2');
    }
    this.anchor.setTo(0.0);
    this.scale.setTo(0.8);
    this.inputEnabled = true;
    this.events.onInputDown.add(this.onUnitClicked,this);
    this.map = map;
    this.layer = layer;
    this.unitGroup = group;
    this.cardGroup = cardGroup;
    this.movementPossibleGroup = game.add.group();
    this.canAct = true;
    this.owner = owner;
    this.quantity = 1;
    this.quantityText = game.add.text(this.x, this.y, "1", { font: "bold 24px Arial", fill: "#FFFFFF" });
    this.quantityText.anchor.setTo(0.0);
    this.quantityText.stroke =  'black';
    this.quantityText.strokeThickness=2;
    this.x_ = this.x;
    this.y_ = this.y;
    if(this.owner == 2){
		this.x +=10;
		this.y +=10;
	}
	this.updateQuantityText();
}

PlayerUnit.prototype = Object.create(Phaser.Sprite.prototype);
PlayerUnit.prototype.constructor = PlayerUnit;
PlayerUnit.prototype.update = function(cursors,shootButton,layer) {
	
}

PlayerUnit.prototype.renewAct = function(){
	this.canAct = true;
	this.tint = 0xFFFFFF;
}

PlayerUnit.prototype.consumeAct = function(){
	this.canAct = false;
	this.tint = 0xA0A0A0;
}

PlayerUnit.prototype.clearAllSelection = function(){
	this.unitGroup.forEach(function(unit){
		if(unit.clearSelection != null){
			unit.clearSelection();
		}
	});
	if(this.cardGroup != null){
		this.cardGroup.forEach(function(card){
			if(card.clearSelection != null){
				card.clearSelection();
				console.log("asd");
			}
		});
	}
}

PlayerUnit.prototype.clearSelection = function(){
	this.movementPossibleGroup.removeAll(true);
}

PlayerUnit.prototype.onUnitClicked = function(){
	if((game.currentPlayer1P && this.owner == 2) || (!game.currentPlayer1P && this.owner == 1)){
		return;
	}
	fx.play('button_click');
	if(this.canAct){
		if(this.movementPossibleGroup.length > 0){
			this.clearAllSelection();
			return;
		}
		this.clearAllSelection();
		tile = this.map.getTile(this.x_/64,this.y_/64,this.layer,true);
		if(tile != null){
			for(deltax=-1;deltax<2;deltax++){
				for(deltay=-1;deltay<2;deltay++){
					if(deltay == 0 && deltax == 0){
						continue;
					}
					positionx = this.x_ + deltax * 64;
					positiony = this.y_ + deltay * 64;
					tilex = positionx/64;
					tiley = positiony/64;
					tile = this.map.getTile(tilex,tiley,this.layer);
					if(tile!=null){
						// Tiles permitidas:
						// pasto (1) puente_h (7)
						// montaña (8) puente_v (14) casa (15)
						// castillo_1 (16) castillo_2 (17)
						// castillo_3 (23) castillo_4 (24)
						// tunnel_rojo (30) tunnel_azul (31)
						if(tile.index == 1 || tile.index == 7 || tile.index == 8 || tile.index == 14 || tile.index == 15 || 
							tile.index == 16 || tile.index == 17 || tile.index == 23 || tile.index == 24
							|| tile.index == 30 || tile.index == 31){
							this.createMovementPossibleCircle(tilex,tiley);
						}
					}

				}
			}
		}
	}
}

PlayerUnit.prototype.createMovementPossibleCircle = function(tilex,tiley){
	circle = new Phaser.Sprite(game,tilex*64,tiley*64,this.key);
	circle.tint = 0x00FF00
	circle.alpha = 0.5;
	this.movementPossibleGroup.add(circle);
	circle.inputEnabled = true;
	circle.unit = this;
	circle.tilex = tilex;
	circle.tiley = tiley;
    circle.events.onInputDown.add(this.onMovementPossibleCircleClicked,circle);
}

PlayerUnit.prototype.onMovementPossibleCircleClicked = function(circle){
	fx.play('button_click');
	var unit = circle.unit;
	var tile = circle.unit.map.getTile(circle.tilex,circle.tiley,this.layer);
	if(tile != null){
		if(tile.index == 30 && circle.unit.owner == 1){
			if(tile.tunnel_warp != null){
				unit.x = tile.tunnel_warp.x *64;
				unit.y = tile.tunnel_warp.y *64;
				unit.x_ = unit.x;
				unit.y_ = unit.y;
				unit.consumeAct();
				unit = circle.unit;
				circle.unit.clearAllSelection();
				if(merged){
					unit.quantityText.destroy();
					unit.destroy();
				}
				else{
					if(unit.owner == 2){
						unit.x +=10;
						unit.y +=10;
					}
					unit.updateQuantityText();
				}
				return;
			}
		}
	}
	var merged = false;
	circle.unit.unitGroup.forEach(function(unit){
		if(merged){
			return;
		}
		if(unit.x_ == circle.x && unit.y_ == circle.y && unit.owner == circle.unit.owner){
			unit.mergeWith(circle.unit);
			merged = true;
		}
	});
	if(!merged){
		unit.x = circle.x;
		unit.y = circle.y;
		unit.x_ = unit.x;
		unit.y_ = unit.y;
	}
	unit.consumeAct();
	unit = circle.unit;
	circle.unit.clearAllSelection();
	if(merged){
		unit.quantityText.destroy();
		unit.destroy();
	}
	else{
		if(unit.owner == 2){
			unit.x +=10;
			unit.y +=10;
		}
		unit.updateQuantityText();
	}
}

PlayerUnit.prototype.mergeWith = function(unit){
	this.quantity += unit.quantity;
	this.updateQuantityText();
}

PlayerUnit.prototype.updateQuantityText = function(){
	if(this.owner == 1){
		this.quantityText.x = this.x;
		this.quantityText.y = this.y - 5;
	}
	else{
		this.quantityText.x = this.x + this.width/2;
		this.quantityText.y = this.y + this.height/2;
	}
	this.quantityText.text = this.quantity;
}