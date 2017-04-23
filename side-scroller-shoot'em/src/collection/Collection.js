const OFFSET = 100;
function Collection(stage) {
    this.collection = [];
    this.stage = stage;
};

Collection.prototype.add = function (sprite) {
    this.collection.push(sprite);
    this.stage.addChild(sprite);
};

Collection.prototype.getModel = function () { };

Collection.prototype.moveSprites = function () {
    var index = 0;
    while (index < this.collection.length) {
        let sprite = this.collection[index],
            x = sprite.position.x += Math.cos(sprite.rotation) * SPEED,
            y = sprite.position.y += Math.sin(sprite.rotation) * SPEED;
        if (this.isWithinCanvas(x, y)) {
            sprite.move(x, y);
            ++index;
        } else {
            this.remove(index);
        }
    }
};

Collection.prototype.isWithinCanvas = function (x, y) {
    return x > -OFFSET && x < CANVAS_X + OFFSET && y > -OFFSET && y < CANVAS_Y + OFFSET;
};

Collection.prototype.remove = function (index) {
    this.collection[index].destroy();
    this.collection.splice(index, 1);
};

Collection.prototype.getItems = function () {
    return this.collection;
};

Collection.prototype.getModelAt = function (index) {
    return this.collection[index];
};

// Bullet collection
function BulletCollection(stage) {
    Collection.call(this, stage);
};
BulletCollection.prototype = Object.create(Collection.prototype);

BulletCollection.prototype.add = function (rotation, position) {
    let sprite = new Bullet(rotation, position);
    Collection.prototype.add.call(this, sprite);
};

// Enemy collection
function EnemyCollection(stage) {
    Collection.call(this, stage);
};
EnemyCollection.prototype = Object.create(Collection.prototype);

EnemyCollection.prototype.add = function () {
    let sprite = new Enemy();
    Collection.prototype.add.call(this, sprite);
};