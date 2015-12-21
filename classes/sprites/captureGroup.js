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

},
CaptureGroup.prototype.finishTurn = function(unitsGroup) {
	var that = this;
    var map = this.map;
    this.forEach(function(capture){
        var tile = map.getTile(capture.mapx,capture.mapy);
        if(tile.index == 15 && (capture.owner == 1 || capture.owner == 2)){
        	if(!game.currentPlayer1P){
            	// Es casa, produce una unit
            	unitsGroup.createPlayerUnit(game,capture.mapx,capture.mapy,capture.owner);
        	}
        }
    });
}