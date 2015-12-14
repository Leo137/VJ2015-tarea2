var CaptureTile = function(game, mapx, mapy, map, layer, group, owner){
	Phaser.Sprite.call(this, game, mapx * 64 + 32, mapy *64 + 32, 'capture_tile');
	if(owner == 1){
    	this.tint = 0xFF0000;
    }
    else if(owner == 2){
    	this.tint = 0x0000FF;
    }
    this.anchor.setTo(0.5);
    this.map = map;
    this.layer = layer;
    this.captureGroup = group;
    this.owner = owner;
    this.game.add.tween(this.scale).from( {x: 0.0,y: 0.0}
            , 300, Phaser.Easing.Quadratic.InOut, true);
    this.tile = this.map.getTile(mapx,mapy);
}

CaptureTile.prototype = Object.create(Phaser.Sprite.prototype);
CaptureTile.prototype.constructor = CaptureTile;
CaptureTile.prototype.update = function(cursors,shootButton,layer) {
	
}