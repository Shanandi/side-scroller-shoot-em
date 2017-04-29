class Enemy extends MovingObject {
    constructor() {
        super('enemy');
        this.position.x = CANVAS_X + 80;
        this.position.y = Math.floor(Math.random() * CANVAS_Y);
        this.rotation = Math.PI;
    }

    rotate() {
        if (!(this.moveCounter % 20)) {
            var rand = Math.random() - 0.5;
            this.rotation = this.rotation + rand;
        }
    }
}