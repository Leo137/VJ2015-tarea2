var UnitsGroup = function(game,map,layer) {
	Phaser.Group.call(this, game);
	this.map = map;
	this.layer = layer;
}

UnitsGroup.prototype = Object.create(Phaser.Group.prototype);
UnitsGroup.prototype.constructor = UnitsGroup;
UnitsGroup.prototype.createPlayerUnit = function(game,mapx,mapy,owner) {
	playerUnit = new PlayerUnit(game,mapx,mapy,this.map,this.layer,this,owner,this.cardGroup);
	this.add(playerUnit);
}
UnitsGroup.prototype.update = function() {

}
UnitsGroup.prototype.finishTurn = function() {
	this.forEach(function(unit){
		if(unit.renewAct != null){
			unit.renewAct();
		}
	});
}