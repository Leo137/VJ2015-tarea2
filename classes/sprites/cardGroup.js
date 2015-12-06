var CardGroup = function(game,map,layer,unitGroup) {
	Phaser.Group.call(this, game);
	this.map = map;
	this.layer = layer;
	this.unitGroup = unitGroup;
	this.playerOneCards = new Phaser.Group(game);
	this.playerTwoCards = new Phaser.Group(game);
	this.playerOneCardsArray = [];
	this.playerTwoCardsArray = [];
	this.maxNumberOfCardsPerPlayer = 5;
	this.fixedToCamera = true;
}

CardGroup.prototype = Object.create(Phaser.Group.prototype);
CardGroup.prototype.constructor = CardGroup;
CardGroup.prototype.createCard = function(game,type,owner) {
	if(owner == 1 && this.playerOneCardsArray.length < this.maxNumberOfCardsPerPlayer){
		card = new Card(game,type,this.map,this.layer,this,owner,this.unitGroup);
		this.playerOneCardsArray.push(card);
		this.add(card);
		this.updateCardsPosition(game,owner);
	}
	if(owner == 2 && this.playerTwoCardsArray.length < this.maxNumberOfCardsPerPlayer){
		card = new Card(game,type,this.map,this.layer,this,owner,this.unitGroup);
		this.playerTwoCardsArray.push(card);
		this.add(card);
		this.updateCardsPosition(game,owner);
	}
}

CardGroup.prototype.destroyCard = function(card) {
	if(card.owner == 1){
		var index = this.playerOneCardsArray.indexOf(card);
		if (index > -1) {
		    this.playerOneCardsArray.splice(index, 1);
		}
	}
	else{
		var index = this.playerTwoCardsArray.indexOf(card);
		if (index > -1) {
		    this.playerTwoCardsArray.splice(index, 1);
		}
	}
	card.destroy();
}

CardGroup.prototype.updateCardsPosition = function(game,owner) {
	var i = 0;
	var spacing = 50;
	var borderSeparation = 45;
	if(owner == 1){
		this.playerOneCardsArray.forEach(function(card){
			card.x = i*spacing + 0 + borderSeparation;
			card.y = game.height - 60;
			i++;
		});
	}
	if(owner == 2){
		this.playerTwoCardsArray.forEach(function(card){
			card.x = game.width - borderSeparation - i*spacing;
			card.y = game.height - 60;
			i++;
		});
	}
}

CardGroup.prototype.finishTurn = function() {
	this.forEach(function(card){
		if(card.clearSelection != null){
			card.clearSelection();
		}
	});
}