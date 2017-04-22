let stage, renderer, far, mid;

function Main() {
    let canvas = document.getElementById('game-canvas');
    stage = new PIXI.Container();
    renderer = PIXI.autoDetectRenderer(canvas.width, canvas.height, { view: canvas });
    far = new FarBackground();
    mid = new MidBackground();
    stage.addChild(far);
    stage.addChild(mid);

    requestAnimationFrame(update);
};

let initTexture = (url) => {
    return new PIXI.extras.TilingSprite(PIXI.Texture.fromImage(url), canvas.width, canvas.height);
};

let update = () => {
    far.update();
    mid.update();

    renderer.render(stage);
    requestAnimationFrame(update);
};