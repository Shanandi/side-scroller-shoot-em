module SpaceShooter {
    export class BackgroundCollection {
        private _stage: PIXI.Container;
        private _far: FarBackground = new FarBackground();
        private _mid: MidBackground = new MidBackground();

        public constructor(stage) {
            this._stage = stage;
            this._stage.addChild(this._far);
            this._stage.addChild(this._mid);
        }

        public update(): void {
            this._far.update();
            this._mid.update();
        }
    }
}