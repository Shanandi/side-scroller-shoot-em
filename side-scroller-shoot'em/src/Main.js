function Main() {
    let canvas = document.getElementById('game-canvas');
    canvas.width = CANVAS_X;
    canvas.height = CANVAS_Y;
    this.stage = new PIXI.Container();
    this.renderer = PIXI.autoDetectRenderer(canvas.width, canvas.height, { view: canvas });
    this.scroller = new Scroller(this.stage);
    this.player = new Player();
    this.stage.addChild(this.player);

    this.bulletCollection = new BulletCollection(this.stage);
    this.enemyCollection = new EnemyCollection(this.stage);

    this.timer = setInterval(this.enemyCollection.add.bind(this.enemyCollection), 2000);

    this.stage.interactive = true;

    this.stage.on('mousedown', function (e) {
        let position = {
            x: this.player.position.x + Math.cos(this.player.rotation) * 60,
            y: this.player.position.y + Math.sin(this.player.rotation) * 60
        };
        this.bulletCollection.add(this.player.rotation, position);
    }.bind(this));

    this.stage.on('mousemove', function (e) {
        this.player.move(
            this.renderer.plugins.interaction.mouse.global.x,
            this.renderer.plugins.interaction.mouse.global.y
        );
    }.bind(this));

    requestAnimationFrame(this.update.bind(this));
};

Main.prototype.update = function () {
    this.scroller.setViewportX();

    this.bulletCollection.moveSprites();
    this.enemyCollection.moveSprites();

    this.renderer.render(this.stage);
    requestAnimationFrame(this.update.bind(this));
};