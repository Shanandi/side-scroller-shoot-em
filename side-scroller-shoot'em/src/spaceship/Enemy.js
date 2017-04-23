class Enemy extends SpaceShip {
    constructor() {
        super('enemy');
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        this.position.x = CANVAS_X + 80;
        this.position.y = Math.floor(Math.random() * CANVAS_Y);
        this.moveCounter = 0;
        this.rotation = Math.PI;
    }

    rotate() {
        if (this.moveCounter > 0 && !(this.moveCounter % 50)) {
            var rand = Math.floor(Math.random() * (Math.PI / 2));
            this.rotation = this.rotation + rand;
        }
    }
}