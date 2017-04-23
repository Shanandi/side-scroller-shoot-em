class SpaceShip extends PIXI.Sprite {
    constructor(url) {
        let texture = PIXI.Texture.fromImage('../resources/' + url + '.png');
        super(texture);
    }

    rotate(anchorPositionX, anchorPositionY) {
        var dist_Y = anchorPositionY - this.position.y;
        var dist_X = anchorPositionX - this.position.y;
        var angle = Math.atan2(dist_Y, dist_X);
        //var degrees = angle * 180/ Math.PI;
        this.rotation = angle;
    }
}