var PieProgress = function(game, x, y, radius, color, angle) {
    this._radius = radius;
    this._progress = 1;
    this.bmp = game.add.bitmapData(radius * 2, radius * 2);
    Phaser.Sprite.call(this, game, x, y, this.bmp);
    this.isPie = true;
    this.anchor.set(0.5);
    this.angle = angle || -90;
    this.color = color || "#fff";
    this.strokeColor = "#000";

    this.compositeTypes = [
      'source-over','source-in','source-out','source-atop',
      'destination-over','destination-in','destination-out','destination-atop',
      'lighter','darker','copy','xor'
    ];

    this.updateProgress();
}

PieProgress.prototype = Object.create(Phaser.Sprite.prototype);
PieProgress.prototype.constructor = PieProgress;

PieProgress.prototype.updateProgress = function() {
    var progress = this._progress;
    progress = Phaser.Math.clamp(progress, 0.00001, 0.99999);
    
    this.bmp.clear();

    this.bmp.ctx.fillStyle = this.strokeColor;
    this.bmp.ctx.beginPath();
    this.bmp.ctx.arc(this._radius, this._radius, this._radius, 0, (Math.PI * 2) * progress, true);
    this.bmp.ctx.lineTo(this._radius, this._radius);
    this.bmp.ctx.globalCompositeOperation = this.compositeTypes[2];
    this.bmp.ctx.closePath();
    this.bmp.ctx.fill();


    this.bmp.ctx.fillStyle = this.color;
    this.bmp.ctx.beginPath();
    this.bmp.ctx.arc(this._radius, this._radius, this._radius-1, 0, (Math.PI * 2) * progress, true);
    this.bmp.ctx.lineTo(this._radius-1, this._radius-1);
    this.bmp.ctx.globalCompositeOperation = this.compositeTypes[3];
    this.bmp.ctx.closePath();
    this.bmp.ctx.fill();

    this.bmp.ctx.fillStyle = this.strokeColor;
    this.bmp.ctx.beginPath();
    this.bmp.ctx.arc(this._radius, this._radius, this._radius*0.4 + 1, 0, (Math.PI * 2) * progress, true);
    this.bmp.ctx.lineTo(this._radius, this._radius);
    this.bmp.ctx.globalCompositeOperation = this.compositeTypes[3];
    this.bmp.ctx.closePath();
    this.bmp.ctx.fill();
    
    this.bmp.ctx.beginPath();
    this.bmp.ctx.arc(this._radius, this._radius, this._radius*0.4, 0, (Math.PI * 2) * 1, true);
    this.bmp.ctx.lineTo(this._radius, this._radius);
    this.bmp.ctx.globalCompositeOperation = this.compositeTypes[6];
    this.bmp.ctx.closePath();
    this.bmp.ctx.fill();

    this.bmp.dirty = true; 
}

PieProgress.prototype.DestroyPie = function(){
    //Elimina el pie completo, incluyendo el graphic
    this.bmp.destroy();
    this.destroy();
}

Object.defineProperty(PieProgress.prototype, 'radius', {
    get: function() {
        return this._radius;   
    },
    set: function(val) {
        this._radius = (val > 0 ? val : 0);
        this.bmp.resize(this._radius * 2, this._radius * 2);
        this.updateProgress();
    }
});

Object.defineProperty(PieProgress.prototype, 'progress', {
    get: function() {
        return this._progress;   
    },
    set: function(val) {
        this._progress = Phaser.Math.clamp(val, 0, 1);
        this.updateProgress();
    }
});