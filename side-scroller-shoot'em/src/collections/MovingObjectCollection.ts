const OFFSET = 100;
class MovingObjectCollection {
    private collection: Array<MovingObject> = [];
    private stage: PIXI.Container;

    constructor(stage) {
        this.stage = stage;
    }

    add(sprite) {
        this.collection.push(sprite);
        this.stage.addChild(sprite);
    }

    moveSprites() {
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
    }

    isWithinCanvas(x, y) {
        return x > -OFFSET && x < CANVAS_X + OFFSET && y > -OFFSET && y < CANVAS_Y + OFFSET;
    }

    remove(index) {
        this.collection[index].destroy();
        this.collection.splice(index, 1);
    }

    getItems() {
        return this.collection;
    }

    getModelAt(index) {
        return this.collection[index];
    }

    clear() {
        while (this.collection.length > 0) {
            this.remove(0);
        }
    }
}

// Bullet collection
class BulletCollection extends MovingObjectCollection {
    constructor(stage) {
        super(stage);
    }

    add(position) {
        let sprite = new Bullet(position);
        super.add(sprite);
    }
}

// Enemy collection
class EnemyCollection extends MovingObjectCollection {
    constructor(stage) {
        super(stage);
    }

    add() {
        let sprite = new Enemy();
        super.add(sprite);
    }
}