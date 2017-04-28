class Player extends MovingObject {
    constructor() {
        super('player');
        this.position.x = 70;
        this.position.y = CANVAS_Y / 2;
    }
}