module SpaceShooter {
    export class MovingObject extends PIXI.Sprite {
        protected _moveCounter: number = 0;

        public constructor(url) {
            super(PIXI.Texture.fromImage('../resources/images/' + url + '.png'));
            this.anchor.set(0.5);
            this.rotation = 0;
        }

        public move(x: number, y: number): void {
            this.rotate();
            this.position.set(x, y);
            ++this._moveCounter;
        }

        public rotate(): void { }

        public propagateExplosion(stage: PIXI.Container, time: number): void {
            let particleCollection: ParticleCollection = new ParticleCollection({
                x: this.position.x,
                y: this.position.y
            }, time);
            stage.addChild(particleCollection);
        }
    }

    // Player
    export class Player extends MovingObject {
        public constructor() {
            super('player');
            this.position.x = 70;
            this.position.y = CANVAS_Y / 2;
        }
    }

    // Enemy
    export class Enemy extends MovingObject {
        public constructor() {
            super('enemy');
            this.position.x = CANVAS_X + 80;
            this.position.y = Math.floor(Math.random() * CANVAS_Y);
            this.rotation = Math.PI;
        }

        public rotate(): void {
            if (!(this._moveCounter % 20)) {
                let rand: number = Math.random() - 0.5;
                this.rotation = this.rotation + rand;
            }
        }
    }

    // Bullet
    export class Bullet extends MovingObject {
        public constructor(x: number, y: number) {
            super('bullet');
            this.position.set(x, y);
        }
    }
}