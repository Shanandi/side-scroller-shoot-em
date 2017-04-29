var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
///<reference path="../resources/pixi.js.d.ts" />
var SpaceShooter;
(function (SpaceShooter) {
    SpaceShooter.CANVAS_X = 800;
    SpaceShooter.CANVAS_Y = 600;
    SpaceShooter.SPEED = 5;
    SpaceShooter.SHORT_EXPLOSION_LENGTH = 600;
    SpaceShooter.LONG_EXPLOSION_LENGTH = 2500;
    SpaceShooter.COLLISION_TOLERANCE = 30;
    SpaceShooter.CANVAS_OFFSET = 100;
    SpaceShooter.PARTICLE_COUNT = 2000;
    var Main = (function (_super) {
        __extends(Main, _super);
        function Main() {
            var _this = _super.call(this) || this;
            _this._controller = null;
            document.body.appendChild(_this.view);
            _this._controller = _this.getNextController('init');
            _this.ticker.add(_this.update.bind(_this));
            return _this;
        }
        Main.prototype.update = function () {
            this._controller.update();
            if (this._controller.isOver) {
                this._controller = this.getNextController(this._controller.selectedOption);
            }
            if (!this._controller) {
                this.ticker.stop();
            }
        };
        Main.prototype.getNextController = function (selectedOption) {
            this.stage.filters = [];
            switch (selectedOption) {
                case 'init':
                    return new SpaceShooter.SplashController(this.stage);
                case 'menu':
                    return new SpaceShooter.MenuController(this.stage);
                case 'game1':
                case 'game2':
                case 'game3':
                    return new SpaceShooter.GameController(this.stage, this.renderer);
                case 'exit':
                    window.top.close();
                    return;
            }
        };
        return Main;
    }(PIXI.Application));
    SpaceShooter.Main = Main;
})(SpaceShooter || (SpaceShooter = {}));
var SpaceShooter;
(function (SpaceShooter) {
    var BackgroundCollection = (function () {
        function BackgroundCollection(stage) {
            this._far = new SpaceShooter.FarBackground();
            this._mid = new SpaceShooter.MidBackground();
            this._stage = stage;
            this._stage.addChild(this._far);
            this._stage.addChild(this._mid);
        }
        BackgroundCollection.prototype.update = function () {
            this._far.update();
            this._mid.update();
        };
        return BackgroundCollection;
    }());
    SpaceShooter.BackgroundCollection = BackgroundCollection;
})(SpaceShooter || (SpaceShooter = {}));
var SpaceShooter;
(function (SpaceShooter) {
    var MovingObjectCollection = (function () {
        function MovingObjectCollection(stage) {
            this._collection = [];
            this._stage = stage;
        }
        MovingObjectCollection.prototype.addSprite = function (sprite) {
            this._collection.push(sprite);
            this._stage.addChild(sprite);
        };
        MovingObjectCollection.prototype.move = function () {
            var index = 0;
            while (index < this._collection.length) {
                var sprite = this._collection[index], x = sprite.position.x += Math.cos(sprite.rotation) * SpaceShooter.SPEED, y = sprite.position.y += Math.sin(sprite.rotation) * SpaceShooter.SPEED;
                if (this.isWithinCanvas(x, y)) {
                    sprite.move(x, y);
                    ++index;
                }
                else {
                    this.remove(index);
                }
            }
        };
        MovingObjectCollection.prototype.isWithinCanvas = function (x, y) {
            return x > -SpaceShooter.CANVAS_OFFSET && x < SpaceShooter.CANVAS_X + SpaceShooter.CANVAS_OFFSET &&
                y > -SpaceShooter.CANVAS_OFFSET && y < SpaceShooter.CANVAS_Y + SpaceShooter.CANVAS_OFFSET;
        };
        MovingObjectCollection.prototype.remove = function (index) {
            this._collection[index].destroy();
            this._collection.splice(index, 1);
        };
        Object.defineProperty(MovingObjectCollection.prototype, "items", {
            get: function () {
                return this._collection;
            },
            enumerable: true,
            configurable: true
        });
        MovingObjectCollection.prototype.getModelAt = function (index) {
            return this._collection[index];
        };
        MovingObjectCollection.prototype.clear = function () {
            while (this._collection.length > 0) {
                this.remove(0);
            }
        };
        return MovingObjectCollection;
    }());
    // Bullet collection
    var BulletCollection = (function (_super) {
        __extends(BulletCollection, _super);
        function BulletCollection(stage) {
            return _super.call(this, stage) || this;
        }
        BulletCollection.prototype.add = function (x, y) {
            var sprite = new SpaceShooter.Bullet(x, y);
            _super.prototype.addSprite.call(this, sprite);
        };
        return BulletCollection;
    }(MovingObjectCollection));
    SpaceShooter.BulletCollection = BulletCollection;
    // Enemy collection
    var EnemyCollection = (function (_super) {
        __extends(EnemyCollection, _super);
        function EnemyCollection(stage) {
            return _super.call(this, stage) || this;
        }
        EnemyCollection.prototype.add = function () {
            var sprite = new SpaceShooter.Enemy();
            _super.prototype.addSprite.call(this, sprite);
        };
        return EnemyCollection;
    }(MovingObjectCollection));
    SpaceShooter.EnemyCollection = EnemyCollection;
})(SpaceShooter || (SpaceShooter = {}));
var SpaceShooter;
(function (SpaceShooter) {
    var ParticleCollection = (function (_super) {
        __extends(ParticleCollection, _super);
        function ParticleCollection(position, time) {
            var _this = _super.call(this, SpaceShooter.PARTICLE_COUNT, {
                scale: true,
                position: true,
                rotation: true,
                uvs: true,
                alpha: true
            }) || this;
            _this._particles = [];
            _this.position.set(position.x, position.y);
            _this.setParticles();
            setTimeout(function () {
                _this.clear();
            }, time);
            return _this;
        }
        ParticleCollection.prototype.setParticles = function () {
            for (var i = 0; i < SpaceShooter.PARTICLE_COUNT; ++i) {
                var angle = Math.random() * Math.PI * 2, radius = Math.random() * 20 * 2;
                var sprite = PIXI.Sprite.fromImage('../../resources/images/explosion.png');
                sprite.anchor.set(0.5);
                sprite.position.x += radius * Math.cos(angle);
                sprite.position.y += radius * Math.sin(angle);
                this.addChild(sprite);
                this._particles.push(sprite);
            }
        };
        ParticleCollection.prototype.clear = function () {
            while (this._particles.length > 0) {
                var particle = this._particles[0];
                this._particles.splice(0, 1);
                particle.destroy();
            }
            this.destroy();
        };
        return ParticleCollection;
    }(PIXI.particles.ParticleContainer));
    SpaceShooter.ParticleCollection = ParticleCollection;
})(SpaceShooter || (SpaceShooter = {}));
var SpaceShooter;
(function (SpaceShooter) {
    var Controller = (function () {
        function Controller(stage) {
            this._stage = null;
            this._background = null;
            this._selectedOption = '';
            this._stopped = false;
            this._timer = null;
            this._isOver = false;
            this._stage = stage;
        }
        Controller.prototype.update = function () { };
        Controller.prototype.over = function () {
            while (this._stage.children.length > 0) {
                var element = this._stage.children[0];
                this._stage.removeChildAt(0);
                element.destroy();
            }
            if (this._timer) {
                clearTimeout(this._timer);
            }
            this._isOver = true;
        };
        Object.defineProperty(Controller.prototype, "selectedOption", {
            // public getter setters
            get: function () {
                return this._selectedOption;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Controller.prototype, "isOver", {
            get: function () {
                return this._isOver;
            },
            enumerable: true,
            configurable: true
        });
        return Controller;
    }());
    SpaceShooter.Controller = Controller;
})(SpaceShooter || (SpaceShooter = {}));
var SpaceShooter;
(function (SpaceShooter) {
    var GameController = (function (_super) {
        __extends(GameController, _super);
        function GameController(stage, renderer) {
            var _this = _super.call(this, stage) || this;
            _this._backgroundCollection = new SpaceShooter.BackgroundCollection(_this._stage);
            _this._bulletCollection = new SpaceShooter.BulletCollection(_this._stage);
            _this._enemyCollection = new SpaceShooter.EnemyCollection(_this._stage);
            _this._player = new SpaceShooter.Player();
            _this._stage.interactive = true;
            _this._stage.addChild(_this._player);
            _this._stage.cursor = 'none';
            _this._selectedOption = 'menu';
            _this._timer = setInterval(function () {
                _this._enemyCollection.add();
            }, 2000);
            // stage events
            _this._stage.on('pointertap', function () {
                _this._bulletCollection.add(_this._player.position.x + Math.cos(_this._player.rotation) * 60, _this._player.position.y + Math.sin(_this._player.rotation) * 60);
            });
            _this._stage.on('pointermove', function () {
                _this._player.move(renderer.plugins.interaction.mouse.global.x, renderer.plugins.interaction.mouse.global.y);
            });
            return _this;
        }
        GameController.prototype.update = function () {
            if (!this._stopped) {
                this._backgroundCollection.update();
                this._bulletCollection.move();
                this._enemyCollection.move();
                this.checkCollision();
            }
        };
        GameController.prototype.checkCollision = function () {
            var enemies = this._enemyCollection.items, bullets = this._bulletCollection.items, eIndex = 0;
            while (eIndex < enemies.length) {
                var bIndex = 0, enemy = this._enemyCollection.getModelAt(eIndex);
                while (bIndex < bullets.length) {
                    var bullet = this._bulletCollection.getModelAt(bIndex);
                    if (this.checkPosition(bullet, enemy)) {
                        enemy.propagateExplosion(this._stage, SpaceShooter.SHORT_EXPLOSION_LENGTH);
                        this._enemyCollection.remove(eIndex);
                        this._bulletCollection.remove(bIndex);
                        break;
                    }
                    else {
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
        };
        GameController.prototype.checkPosition = function (spriteA, spriteB) {
            var rectA = spriteA.getBounds(), rectB = spriteB.getBounds(), x1 = rectA.x, x2 = rectB.x, y1 = rectA.y, y2 = rectB.y, w1 = rectA.width - SpaceShooter.COLLISION_TOLERANCE, w2 = rectB.width - SpaceShooter.COLLISION_TOLERANCE, h1 = rectA.height - SpaceShooter.COLLISION_TOLERANCE, h2 = rectB.height - SpaceShooter.COLLISION_TOLERANCE;
            if ((x1 + w1 > x2) && (x1 < x2 + w2) && (y1 + h1 > y2) && (y1 < y2 + h2)) {
                return true;
            }
            return false;
        };
        GameController.prototype.beforeOver = function (enemy) {
            var _this = this;
            this._stopped = true;
            this._stage.off('pointertap');
            this._stage.off('pointermove');
            enemy.propagateExplosion(this._stage, SpaceShooter.LONG_EXPLOSION_LENGTH);
            this._player.propagateExplosion(this._stage, SpaceShooter.LONG_EXPLOSION_LENGTH);
            var text = new SpaceShooter.DecoratedText('Game Over');
            text.position.set(SpaceShooter.CANVAS_X / 2, SpaceShooter.CANVAS_Y / 2);
            this._stage.addChild(text);
            this._enemyCollection.clear();
            this._bulletCollection.clear();
            this._player.destroy();
            setTimeout(function () { _this.over(); }, 2000);
        };
        return GameController;
    }(SpaceShooter.Controller));
    SpaceShooter.GameController = GameController;
})(SpaceShooter || (SpaceShooter = {}));
var SpaceShooter;
(function (SpaceShooter) {
    var MenuController = (function (_super) {
        __extends(MenuController, _super);
        function MenuController(stage) {
            var _this = _super.call(this, stage) || this;
            _this._background = new SpaceShooter.FarBackground();
            _this._stage.addChild(_this._background);
            _this._selectedOption = 'game1';
            var title = new SpaceShooter.DecoratedText('Amazing Space Shooter');
            title.position.set(SpaceShooter.CANVAS_X / 2, 50);
            _this._stage.addChild(title);
            var logo = new SpaceShooter.Player();
            logo.position.set(SpaceShooter.CANVAS_X / 2, 200);
            _this._stage.addChild(logo);
            _this._timer = setInterval(function () {
                logo.rotation += Math.PI / 12;
            }, 100);
            _this.addButtons();
            return _this;
        }
        MenuController.prototype.update = function () {
            if (!this._stopped) {
                this._background.update();
            }
        };
        MenuController.prototype.addButtons = function () {
            var _this = this;
            var gameButtons = [];
            for (var i = 1; i <= 3; ++i) {
                gameButtons.push(new SpaceShooter.Button('GAME', i));
            }
            gameButtons.push(new SpaceShooter.Button('EXIT'));
            gameButtons.forEach(function (button) {
                _this._stage.addChild(button);
                button.on('click', function () {
                    _this._selectedOption = button.text.toLowerCase();
                    clearInterval(_this._timer);
                    _this._stopped = true;
                    _this.over();
                });
            });
        };
        return MenuController;
    }(SpaceShooter.Controller));
    SpaceShooter.MenuController = MenuController;
})(SpaceShooter || (SpaceShooter = {}));
var SpaceShooter;
(function (SpaceShooter) {
    var SplashController = (function (_super) {
        __extends(SplashController, _super);
        function SplashController(stage) {
            var _this = _super.call(this, stage) || this;
            _this._background = PIXI.Sprite.fromImage('../../resources/images/far.png');
            _this._stage.addChild(_this._background);
            _this._selectedOption = 'menu';
            _this._stopped = true;
            var animation = new SpaceShooter.Animation();
            _this._stage.addChild(animation);
            animation.onComplete = function () {
                var text = new SpaceShooter.DecoratedText('GeoCat Technologies');
                text.position.set(SpaceShooter.CANVAS_X / 2, SpaceShooter.CANVAS_Y / 1.4);
                _this._stage.addChild(text);
            };
            setTimeout(function () {
                _this._filter = new PIXI.filters.ColorMatrixFilter();
                _this._stage.filters = [_this._filter];
                _this._stage.removeChild(animation);
                _this._stopped = false;
            }, 2000);
            setTimeout(function () { _this.over(); }, 3000);
            return _this;
        }
        SplashController.prototype.update = function () {
            if (!this._stopped) {
                this._filter.matrix[3] -= 0.15;
                this._filter.matrix[7] -= 0.15;
                this._filter.matrix[11] -= 0.15;
            }
        };
        return SplashController;
    }(SpaceShooter.Controller));
    SpaceShooter.SplashController = SplashController;
})(SpaceShooter || (SpaceShooter = {}));
var SpaceShooter;
(function (SpaceShooter) {
    var Animation = (function (_super) {
        __extends(Animation, _super);
        function Animation() {
            var _this = this;
            var textureArray = [];
            for (var i = 0; i < 7; i++) {
                var texture = PIXI.Texture.fromImage('../../resources/images/animation/geo' + i + '.png');
                textureArray.push(texture);
            }
            ;
            _this = _super.call(this, textureArray.reverse()) || this;
            _this.loop = false;
            _this.anchor.set(0.5);
            _this.scale.set(0.4);
            _this.position.set(SpaceShooter.CANVAS_X / 2, SpaceShooter.CANVAS_Y / 2.5);
            _this.animationSpeed = 0.15;
            _this.play();
            return _this;
        }
        return Animation;
    }(PIXI.extras.AnimatedSprite));
    SpaceShooter.Animation = Animation;
})(SpaceShooter || (SpaceShooter = {}));
var SpaceShooter;
(function (SpaceShooter) {
    var Background = (function (_super) {
        __extends(Background, _super);
        function Background(url) {
            if (url === void 0) { url = ''; }
            var _this = _super.call(this, PIXI.Texture.fromImage('../resources/images/' + url + '.png'), SpaceShooter.CANVAS_X, SpaceShooter.CANVAS_Y) || this;
            _this._viewportX = 0;
            _this._delta = 0;
            return _this;
        }
        Background.prototype.update = function () {
            var newViewportX = this._viewportX + SpaceShooter.SPEED;
            var distanceTravelled = newViewportX - this._viewportX;
            this._viewportX = newViewportX;
            this.tilePosition.x -= (distanceTravelled * this._delta);
        };
        return Background;
    }(PIXI.extras.TilingSprite));
    // Far background
    var FarBackground = (function (_super) {
        __extends(FarBackground, _super);
        function FarBackground() {
            var _this = _super.call(this, 'far') || this;
            _this._delta = 0.32;
            return _this;
        }
        return FarBackground;
    }(Background));
    SpaceShooter.FarBackground = FarBackground;
    // Mid background
    var MidBackground = (function (_super) {
        __extends(MidBackground, _super);
        function MidBackground() {
            var _this = _super.call(this, 'mid') || this;
            _this._delta = 1.28;
            return _this;
        }
        return MidBackground;
    }(Background));
    SpaceShooter.MidBackground = MidBackground;
})(SpaceShooter || (SpaceShooter = {}));
var SpaceShooter;
(function (SpaceShooter) {
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button(text, number) {
            if (number === void 0) { number = 0; }
            var _this = _super.call(this) || this;
            _this._buttonTexture = PIXI.Texture.fromImage('../../resources/images/button/button.png');
            _this._buttonDownTexture = PIXI.Texture.fromImage('../../resources/images/button/buttonDown.png');
            _this._buttonOverTexture = PIXI.Texture.fromImage('../../resources/images/button/buttonOver.png');
            _this.texture = _this._buttonTexture;
            _this.anchor.set(0.5);
            _this.position.set(SpaceShooter.CANVAS_X / 2, SpaceShooter.CANVAS_Y / 2 + 50 * (number ? number : 4));
            _this._text = text + (number ? number.toString() : '');
            var caption = new SpaceShooter.DecoratedText(_this._text, 24);
            _this.addChild(caption);
            _this.interactive = true;
            _this.buttonMode = true;
            _this.cursor = 'pointer';
            _this.on('pointerdown', function () {
                _this.texture = _this._buttonDownTexture;
            });
            _this.on('pointerout', function () {
                _this.texture = _this._buttonTexture;
            });
            _this.on('pointerover', function () {
                _this.texture = _this._buttonOverTexture;
            });
            return _this;
        }
        Object.defineProperty(Button.prototype, "text", {
            get: function () {
                return this._text;
            },
            enumerable: true,
            configurable: true
        });
        return Button;
    }(PIXI.Sprite));
    SpaceShooter.Button = Button;
})(SpaceShooter || (SpaceShooter = {}));
var SpaceShooter;
(function (SpaceShooter) {
    var DecoratedText = (function (_super) {
        __extends(DecoratedText, _super);
        function DecoratedText(text, size) {
            if (size === void 0) { size = 42; }
            var _this = _super.call(this, text, new PIXI.TextStyle({
                fontFamily: 'Arial',
                fontSize: size,
                fontWeight: 'bold',
                align: 'center',
                fill: '#ffffff',
                stroke: '#111111',
                strokeThickness: 2,
                dropShadow: true,
                dropShadowColor: '#111111',
                dropShadowBlur: 4,
                dropShadowAngle: Math.PI / 6,
                dropShadowDistance: 3
            })) || this;
            _this.anchor.set(0.5);
            return _this;
        }
        return DecoratedText;
    }(PIXI.Text));
    SpaceShooter.DecoratedText = DecoratedText;
})(SpaceShooter || (SpaceShooter = {}));
var SpaceShooter;
(function (SpaceShooter) {
    var MovingObject = (function (_super) {
        __extends(MovingObject, _super);
        function MovingObject(url) {
            var _this = _super.call(this, PIXI.Texture.fromImage('../resources/images/' + url + '.png')) || this;
            _this._moveCounter = 0;
            _this.anchor.set(0.5);
            _this.rotation = 0;
            return _this;
        }
        MovingObject.prototype.move = function (x, y) {
            this.rotate();
            this.position.set(x, y);
            ++this._moveCounter;
        };
        MovingObject.prototype.rotate = function () { };
        MovingObject.prototype.propagateExplosion = function (stage, time) {
            var particleCollection = new SpaceShooter.ParticleCollection({
                x: this.position.x,
                y: this.position.y
            }, time);
            stage.addChild(particleCollection);
        };
        return MovingObject;
    }(PIXI.Sprite));
    SpaceShooter.MovingObject = MovingObject;
    // Player
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player() {
            var _this = _super.call(this, 'player') || this;
            _this.position.x = 70;
            _this.position.y = SpaceShooter.CANVAS_Y / 2;
            return _this;
        }
        return Player;
    }(MovingObject));
    SpaceShooter.Player = Player;
    // Enemy
    var Enemy = (function (_super) {
        __extends(Enemy, _super);
        function Enemy() {
            var _this = _super.call(this, 'enemy') || this;
            _this.position.x = SpaceShooter.CANVAS_X + 80;
            _this.position.y = Math.floor(Math.random() * SpaceShooter.CANVAS_Y);
            _this.rotation = Math.PI;
            return _this;
        }
        Enemy.prototype.rotate = function () {
            if (!(this._moveCounter % 20)) {
                var rand = Math.random() - 0.5;
                this.rotation = this.rotation + rand;
            }
        };
        return Enemy;
    }(MovingObject));
    SpaceShooter.Enemy = Enemy;
    // Bullet
    var Bullet = (function (_super) {
        __extends(Bullet, _super);
        function Bullet(x, y) {
            var _this = _super.call(this, 'bullet') || this;
            _this.position.set(x, y);
            return _this;
        }
        return Bullet;
    }(MovingObject));
    SpaceShooter.Bullet = Bullet;
})(SpaceShooter || (SpaceShooter = {}));
//# sourceMappingURL=all.js.map