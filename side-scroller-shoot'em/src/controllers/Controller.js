const OFFSET = 100;
function Controller() {
    this.collection = [];
};

Controller.prototype.add = function (sprite) {
    this.collection.push(sprite);
};

Controller.prototype.moveSprites = function () {
    var index = 0;
    while (index < this.collection.length) {
        let sprite = this.collection[index],
            x = sprite.position.x += Math.cos(sprite.rotation) * SPEED,
            y = sprite.position.y += Math.sin(sprite.rotation) * SPEED;
        if (this.isWithinCanvas(x, y)) {
            sprite.position.x = x;
            sprite.position.y = y;
            ++index;
        } else {
            this.collection.splice(index, 1);
            sprite.destroy();
        }
    }
    console.log(this.collection.length);
};

Controller.prototype.isWithinCanvas = function (x, y) {
    return x > -OFFSET && x < CANVAS_X + OFFSET && y > -OFFSET && y < CANVAS_Y + OFFSET;
}