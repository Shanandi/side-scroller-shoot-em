class Bullet extends MovingObject {
    constructor(position) {
        super('bullet');
        this.position.set(position.x, position.y);
    }
}