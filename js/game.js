// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container.
var app = new PIXI.Application();
var renderer = app.renderer;
console.log(app);
app.autoResize = true;

renderer.resize(window.innerWidth,window.innerHeight);
renderer.autoResize = true;
renderer.view.style.position = "absolute";
renderer.view.style.display = "block";
renderer.backgroundColor = 0xDFF3F7;

renderer.view.id = 'canvas';
var canvas = renderer.view;// 
var ctx;// = canvas.getContext('2d');

//var stage = new PIXI.Stage(0x660000);
var stage = app.stage;

var scaleRation = 0.5;
var aspectRatio;
var currWidth = window.innerWidth;
var currHeight = window.innerHeight;

stage.pivot.x = currWidth / 2;
stage.pivot.y = currHeight / 2;

var player = PIXI.Sprite;


// load the texture we need
PIXI.loader.add('player', 'asset/square.png').load(function(loader, resources) {
    // This creates a texture from a 'bunny.png' image.
    player = new PIXI.Sprite(resources.player.texture);
    
    // Setup the position of the player
    player.x = Math.round(app.renderer.width / 2);
    player.y = Math.round(app.renderer.height / 2);

    // Rotate around the center
    player.anchor.x = 0.5;
    player.anchor.y = 0.5;

    // Add the player to the scene we are building.
    stage.addChild(player);

    resize(true);

    

    //canvas = new PIXI.CanvasRenderer(400, 300);
    ctx = canvas.getContext('webgl');

    console.log(renderer);
    console.log(canvas);
    console.log(ctx);
});
requestAnimationFrame(gameLoop);

function resize(firsLaunch){
    if(window.innerWidth !== currWidth || window.innerHeight != currHeight || firsLaunch){
        if(window.innerWidth > window.innerHeight){
            aspectRatio = window.innerWidth / window.innerHeight;
            renderer.resize(window.innerHeight * aspectRatio, window.innerHeight+0.25);
        }else if(window.innerHeight > window.innerWidth){
            aspectRatio = window.innerHeight / window.innerWidth;
            renderer.resize(window.innerHeight / aspectRatio, window.innerHeight+0.5);
        }
        currWidth = window.innerWidth;
        currHeight = window.innerHeight;
        
        stage.x = currWidth / 2;
        stage.y = currHeight / 2;

        stage.scale.x = aspectRatio * scaleRation;
        stage.scale.y = aspectRatio * scaleRation;
    }
}

function gameLoop(){
    requestAnimationFrame(gameLoop);
    move();
    resize();
    player.rotation += 0.025;
    //console.log(player.y);
}

var pSpeed;
var Side = {'LEFT':'LEFT','RIGHT':'RIGHT','UP':'UP','DOWN':'DOWN'};
var pSide;// = Side.DOWN;
var newSide;

function move(){
    if(pSide == Side.LEFT){
        player.x -= 1;
    }else if(pSide == Side.RIGHT){
        player.x += 1;
    }else if(pSide == Side.UP){
        player.y -= 1;
    }else if(pSide == Side.DOWN){
        player.y += 1;
    }
}








