class MovingObject extends PIXI.Sprite {
    protected moveCounter: number = 0;

    constructor(url) {
        super(PIXI.Texture.fromImage('../resources/images/' + url + '.png'));
        this.anchor.set(0.5);
        this.rotation = 0;
    }

    move(x, y) {
        this.rotate();
        this.position.set(x, y);
        ++this.moveCounter;
    }

    rotate() { }

    propagateExplosion(stage, time) {
        let particleCollection = new ParticleCollection({
            x: this.position.x,
            y: this.position.y
        }, time);
        stage.addChild(particleCollection);
    }
}