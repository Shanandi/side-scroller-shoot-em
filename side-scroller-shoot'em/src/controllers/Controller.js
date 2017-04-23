const OFFSET = 100;
class Controller {
    constructor() {
        this.collection = [];
    }

    add(sprite) {
        this.collection.push(sprite);
    }

    moveSprites() {
        var index = 0;
        while (index < this.collection.length) {
            let sprite = this.collection[index];
            if (this.isWithinCanvas(sprite)) {
                sprite.rotate();
                sprite.position.x += Math.cos(sprite.rotation) * SPEED;
                sprite.position.y += Math.sin(sprite.rotation) * SPEED;
                sprite.moveCounter += 1;
                ++index;
            } else {
                this.removeSprite(index);
            }
        }
    }

    isWithinCanvas(sprite) {
        let x = sprite.position.x, y = sprite.position.y;
        return x > -OFFSET && x < CANVAS_X + OFFSET && y > -OFFSET && y < CANVAS_Y + OFFSET;
    }

    removeSprite(index) {
        let sprite = this.collection[index];
        this.collection.splice(index, 1);
        sprite.destroy();
    }
}