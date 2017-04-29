const TOLERANCE = 30;
const SHORT_EXPLOSION = 600;
const LONG_EXPLOSION = 2500;

function GameController(stage, renderer) {
    Controller.call(this, stage);
    this.stage.interactive = true;
    this.cursor = 'none';
    this.selectedOption = 'menu';
    this.stopped = false;

    this.backgroundCollection = new BackgroundCollection(this.stage);
    this.bulletCollection = new BulletCollection(this.stage);
    this.enemyCollection = new EnemyCollection(this.stage);
    this.player = new Player();
    this.stage.addChild(this.player);

    this.timer = setInterval(this.enemyCollection.add.bind(this.enemyCollection), 2000);

    this.stage.pointertap = function () {
        let position = {
            x: this.player.position.x + Math.cos(this.player.rotation) * 60,
            y: this.player.position.y + Math.sin(this.player.rotation) * 60
        };
        this.bulletCollection.add(position);
    }.bind(this);

    this.stage.pointermove = function () {
        this.player.move(
            renderer.plugins.interaction.mouse.global.x,
            renderer.plugins.interaction.mouse.global.y
        );
    }.bind(this);
};
GameController.prototype = Object.create(Controller.prototype);

GameController.prototype.checkCollision = function () {
    let enemies = this.enemyCollection.getItems(),
        bullets = this.bulletCollection.getItems(),
        eIndex = 0;

    while (eIndex < enemies.length) {
        let bIndex = 0;
        var enemy = this.enemyCollection.getModelAt(eIndex);
        while (bIndex < bullets.length) {
            var bullet = this.bulletCollection.getModelAt(bIndex);
            if (this.checkPosition(bullet, enemy)) {
                enemy.propagateExplosion(this.stage, SHORT_EXPLOSION);
                this.enemyCollection.remove(eIndex);
                this.bulletCollection.remove(bIndex);
                break;
            } else {
                ++bIndex;
            }
        }
        enemy = this.enemyCollection.getModelAt(eIndex);
        if (enemy && this.checkPosition(this.player, enemy)) {
            this.beforeOver(enemy);
            break;
        }
        ++eIndex;
    }
};

GameController.prototype.update = function () {
    if (!this.stopped) {
        this.backgroundCollection.setViewportX();
        this.bulletCollection.moveSprites();
        this.enemyCollection.moveSprites();
        this.checkCollision();
    }
};

GameController.prototype.checkPosition = function (spriteA, spriteB) {
    let rectA = spriteA.getBounds(),
        rectB = spriteB.getBounds(),
        x1 = rectA.x, x2 = rectB.x,
        y1 = rectA.y, y2 = rectB.y,
        w1 = rectA.width - TOLERANCE, w2 = rectB.width - TOLERANCE,
        h1 = rectA.height - TOLERANCE, h2 = rectB.height - TOLERANCE;
    if ((x1 + w1 > x2) && (x1 < x2 + w2) && (y1 + h1 > y2) && (y1 < y2 + h2)) {
        return true;
    }
    return false;
};

GameController.prototype.beforeOver = function (enemy) {
    this.stopped = true;
    this.stage.pointermove = null;
    this.stage.pointermove = null;

    enemy.propagateExplosion(this.stage, LONG_EXPLOSION);
    this.player.propagateExplosion(this.stage, LONG_EXPLOSION);

    let text = new DecoratedText('Game Over');
    text.position.set(CANVAS_X / 2, CANVAS_Y / 2);
    this.stage.addChild(text);

    this.enemyCollection.clear();
    this.bulletCollection.clear();
    this.player.destroy();
    setTimeout(this.over.bind(this), 2000);
};