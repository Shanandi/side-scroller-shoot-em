class GameController extends Controller {
    private _backgroundCollection: BackgroundCollection = new BackgroundCollection(this._stage);
    private _bulletCollection: BulletCollection = new BulletCollection(this._stage);
    private _enemyCollection: EnemyCollection = new EnemyCollection(this._stage);
    private _player: Player = new Player();

    public constructor(stage: PIXI.Container, renderer) {
        super(stage);
        this._stage.interactive = true;
        this._stage.addChild(this._player);
        this._stage.cursor = 'none';

        this._selectedOption = 'menu';
        this._timer = setInterval(this._enemyCollection.add.bind(this._enemyCollection), 2000);

        // stage events
        this._stage.on('pointertap', () => {
            let position = {
                x: this._player.position.x + Math.cos(this._player.rotation) * 60,
                y: this._player.position.y + Math.sin(this._player.rotation) * 60
            };
            this._bulletCollection.add(position);
        });

        this._stage.on('pointermove', () => {
            this._player.move(
                renderer.plugins.interaction.mouse.global.x,
                renderer.plugins.interaction.mouse.global.y
            );
        });
    }

    public update(): void {
        if (!this._stopped) {
            this._backgroundCollection.update();
            this._bulletCollection.move();
            this._enemyCollection.move();
            this.checkCollision();
        }
    }

    private checkCollision(): void {
        let enemies: Array<Enemy> = this._enemyCollection.items,
            bullets: Array<Bullet> = this._bulletCollection.items,
            eIndex: number = 0;

        while (eIndex < enemies.length) {
            let bIndex: number = 0,
                enemy: Enemy = this._enemyCollection.getModelAt(eIndex);
            while (bIndex < bullets.length) {
                let bullet: Bullet = this._bulletCollection.getModelAt(bIndex);
                if (this.checkPosition(bullet, enemy)) {
                    enemy.propagateExplosion(this._stage, SHORT_EXPLOSION);
                    this._enemyCollection.remove(eIndex);
                    this._bulletCollection.remove(bIndex);
                    break;
                } else {
                    ++bIndex;
                }
            }
            enemy = this._enemyCollection.getModelAt(eIndex);
            if (enemy && this.checkPosition(this._player, enemy)) {
                this.beforeOver(enemy);
                break;
            }
            ++eIndex;
        }
    }

    private checkPosition(spriteA, spriteB): boolean {
        let rectA: PIXI.Rectangle = spriteA.getBounds(),
            rectB: PIXI.Rectangle = spriteB.getBounds(),
            x1 = rectA.x, x2 = rectB.x,
            y1 = rectA.y, y2 = rectB.y,
            w1 = rectA.width - TOLERANCE, w2 = rectB.width - TOLERANCE,
            h1 = rectA.height - TOLERANCE, h2 = rectB.height - TOLERANCE;
        if ((x1 + w1 > x2) && (x1 < x2 + w2) && (y1 + h1 > y2) && (y1 < y2 + h2)) {
            return true;
        }
        return false;
    }

    private beforeOver(enemy): void {
        this._stopped = true;
        this._stage.off('pointertap');
        this._stage.off('pointermove');

        enemy.propagateExplosion(this._stage, LONG_EXPLOSION);
        this._player.propagateExplosion(this._stage, LONG_EXPLOSION);

        let text: DecoratedText = new DecoratedText('Game Over');
        text.position.set(CANVAS_X / 2, CANVAS_Y / 2);
        this._stage.addChild(text);

        this._enemyCollection.clear();
        this._bulletCollection.clear();
        this._player.destroy();
        setTimeout(() => { this.over(); }, 2000);
    }
}