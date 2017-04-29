declare const SHORT_EXPLOSION = 600;
declare const LONG_EXPLOSION = 2500;

class GameController extends Controller {
    protected selectedOption = 'menu';

    private TOLERANCE = 30;
    private cursor = 'none';
    private backgroundCollection = new BackgroundCollection(this.stage);
    private bulletCollection = new BulletCollection(this.stage);
    private enemyCollection = new EnemyCollection(this.stage);
    private player = new Player();
    private timer;

    constructor(stage, renderer) {
        super(stage);
        this.stage.interactive = true;
        this.stage.addChild(this.player);

        this.timer = setInterval(this.enemyCollection.add.bind(this.enemyCollection), 2000);

        // TODO: create custom stage??
        this.stage.on('pointertap', function () {
            let position = {
                x: this.player.position.x + Math.cos(this.player.rotation) * 60,
                y: this.player.position.y + Math.sin(this.player.rotation) * 60
            };
            this.bulletCollection.add(position);
        }.bind(this));

        this.stage.on('pointermove', function () {
            this.player.move(
                renderer.plugins.interaction.mouse.global.x,
                renderer.plugins.interaction.mouse.global.y
            );
        }.bind(this));
    }

    checkCollision() {
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
    }

    update() {
        if (!this.stopped) {
            this.backgroundCollection.setViewportX();
            this.bulletCollection.moveSprites();
            this.enemyCollection.moveSprites();
            this.checkCollision();
        }
    }

    checkPosition(spriteA, spriteB) {
        let rectA = spriteA.getBounds(),
            rectB = spriteB.getBounds(),
            x1 = rectA.x, x2 = rectB.x,
            y1 = rectA.y, y2 = rectB.y,
            w1 = rectA.width - this.TOLERANCE, w2 = rectB.width - this.TOLERANCE,
            h1 = rectA.height - this.TOLERANCE, h2 = rectB.height - this.TOLERANCE;
        if ((x1 + w1 > x2) && (x1 < x2 + w2) && (y1 + h1 > y2) && (y1 < y2 + h2)) {
            return true;
        }
        return false;
    }

    beforeOver(enemy) {
        this.stopped = true;
        // this.stage.pointermove = null;
        // this.stage.pointermove = null;

        enemy.propagateExplosion(this.stage, LONG_EXPLOSION);
        this.player.propagateExplosion(this.stage, LONG_EXPLOSION);

        let text = new DecoratedText('Game Over');
        text.position.set(CANVAS_X / 2, CANVAS_Y / 2);
        this.stage.addChild(text);

        this.enemyCollection.clear();
        this.bulletCollection.clear();
        this.player.destroy();
        setTimeout(this.over.bind(this), 2000);
    }
}