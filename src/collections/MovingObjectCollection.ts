module SpaceShooter {
    class MovingObjectCollection {
        private _collection: Array<MovingObject> = [];
        private _stage: PIXI.Container;

        public constructor(stage: PIXI.Container) {
            this._stage = stage;
        }

        public addSprite(sprite: MovingObject): void {
            this._collection.push(sprite);
            this._stage.addChild(sprite);
        }

        public move() {
            var index: number = 0;
            while (index < this._collection.length) {
                let sprite: MovingObject = this._collection[index],
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
            return x > -CANVAS_OFFSET && x < CANVAS_X + CANVAS_OFFSET &&
                y > -CANVAS_OFFSET && y < CANVAS_Y + CANVAS_OFFSET;
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
    export class BulletCollection extends MovingObjectCollection {
        public constructor(stage: PIXI.Container) {
            super(stage);
        }

        public add(x: number, y: number): void {
            let sprite: Bullet = new Bullet(x, y);
            super.addSprite(sprite);
        }
    }

    // Enemy collection
    export class EnemyCollection extends MovingObjectCollection {
        public constructor(stage: PIXI.Container) {
            super(stage);
        }

        public add(): void {
            let sprite: Enemy = new Enemy();
            super.addSprite(sprite);
        }
    }
}