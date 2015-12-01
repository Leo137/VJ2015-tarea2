var CaptureGroup = function(game,map,layer) {
	Phaser.Group.call(this, game);
	this.map = map;
	this.layer = layer;
}

CaptureGroup.prototype = Object.create(Phaser.Group.prototype);
CaptureGroup.prototype.constructor = CaptureGroup;
CaptureGroup.prototype.createCaptureTile = function(game,mapx,mapy,owner) {
	captureTile = new CaptureTile(game,mapx,mapy,this.map,this.layer,this,owner);
	this.add(captureTile);
}
CaptureGroup.prototype.update = function() {

}