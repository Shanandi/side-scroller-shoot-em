"use strict";

class Main {
    constructor() {
        let canvas = document.getElementById('game-canvas');
        canvas.width = CANVAS_X;
        canvas.height = CANVAS_Y;
        this.stage = new PIXI.Container();
        this.renderer = PIXI.autoDetectRenderer(canvas.width, canvas.height, { view: canvas });
        this.scroller = new Scroller(this.stage);
        this.player = new Player();
        this.stage.addChild(this.player);

        this.bulletController = new BulletController();
        this.enemyController = new EnemyController();
        this.timer = setInterval(this.addEnemy.bind(this), 2000);

        this.stage.interactive = true;

        this.stage.on("mousedown", function (e) {
            this.shoot(this.player.rotation, {
                x: this.player.position.x + Math.cos(this.player.rotation) * 60,
                y: this.player.position.y + Math.sin(this.player.rotation) * 60
            });
        }.bind(this));

        this.stage.on("mousemove", function (e) {
            this.player.move(
                this.renderer.plugins.interaction.mouse.global.x,
                this.renderer.plugins.interaction.mouse.global.y
            );
        }.bind(this));

        // TODO: find a way to allow player rotation
        // this.stage.on("rightclick", function (e) {
        //     this.player.rotate(
        //         this.renderer.plugins.interaction.mouse.global.x,
        //         this.renderer.plugins.interaction.mouse.global.y
        //     );
        // }.bind(this))

        requestAnimationFrame(this.update.bind(this));
    }

    update() {
        var newViewportX = this.scroller.getViewportX() + SPEED;
        this.scroller.setViewportX(newViewportX);

        this.bulletController.moveSprites();
        this.enemyController.moveSprites();

        this.renderer.render(this.stage);
        requestAnimationFrame(this.update.bind(this));
    }

    shoot(rotation, startPosition) {
        var bullet = new Bullet(rotation, startPosition);
        this.bulletController.add(bullet);
        this.stage.addChild(bullet);
    }

    addEnemy() {
        var enemy = new Enemy();
        this.enemyController.add(enemy);
        this.stage.addChild(enemy);
    }
};