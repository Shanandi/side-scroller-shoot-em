class MenuController extends Controller {
    constructor(stage) {
        super(stage);
        this._background = new FarBackground();
        this._stage.addChild(this._background);

        this._selectedOption = 'game1';

        let title: DecoratedText = new DecoratedText('Amazing Space Shooter');
        title.position.set(CANVAS_X / 2, 50);
        this._stage.addChild(title);

        let logo: Player = new Player();
        logo.position.set(CANVAS_X / 2, 200);
        this._stage.addChild(logo);

        this._timer = setInterval(() => {
            logo.rotation += Math.PI / 12;
        }, 100);

        this.addButtons();
    }

    public update(): void {
        if (!this._stopped) {
            this._background.update();
        }
    }

    private addButtons(): void {
        let gameButtons: Array<Button> = [];
        for (let i = 1; i <= 3; ++i) {
            gameButtons.push(new Button('GAME', i));
        }
        gameButtons.push(new Button('EXIT'));
        gameButtons.forEach((button) => {
            this._stage.addChild(button);
            button.on('click', () => {
                this._selectedOption = button.text.toLowerCase();
                clearInterval(this._timer);
                this._stopped = true;
                this.over();
            });
        });
    }
}