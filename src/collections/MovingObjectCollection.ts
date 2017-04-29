class MovingObjectCollection {
    private _collection: Array<MovingObject> = [];
    private _stage: PIXI.Container;

    public constructor(stage: PIXI.Container) {
        this._stage = stage;
    }

    public add(sprite: MovingObject): void {
        this._collection.push(sprite);
        this._stage.addChild(sprite);
    }

    public move() {
        var index: number = 0;
        while (index < this._collection.length) {
            let sprite = this._collection[index],
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

    private isWithinCanvas(x: number, y: number): boolean {
        return x > -OFFSET && x < CANVAS_X + OFFSET && y > -OFFSET && y < CANVAS_Y + OFFSET;
    }

    public remove(index: number): void {
        this._collection[index].destroy();
        this._collection.splice(index, 1);
    }

    public get items(): Array<MovingObject> {
        return this._collection;
    }

    public getModelAt(index: number): MovingObject {
        return this._collection[index];
    }

    public clear() {
        while (this._collection.length > 0) {
            this.remove(0);
        }
    }
}

// Bullet collection
class BulletCollection extends MovingObjectCollection {
    public constructor(stage: PIXI.Container) {
        super(stage);
    }

    public add(position: Object): void {
        let sprite: Bullet = new Bullet(position);
        super.add(sprite);
    }
}

// Enemy collection
class EnemyCollection extends MovingObjectCollection {
    public constructor(stage: PIXI.Container) {
        super(stage);
    }

    public add(): void {
        let sprite: Enemy = new Enemy();
        super.add(sprite);
    }
}