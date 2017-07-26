var gameState = function(game){};

var isDebug = false;

var player;
var playerSpeed = 5;
var steps = 0;
var stepLast = 0;
var cursors;

var lineStep;
var linesCount = 1000;

var worldWidth = 3400;
var worldHeight = 3400;

var Side = {'left':'LEFT','right':'RIGHT','up':'UP','down':'DOWN'};
var movementSide;// = Side.down;
var newDir;
var trail;
var t_bmd;
var t_bmdSprite;
var territory;

var dots = [];
var trails = [];
var polyDots = [];
var dotIndex = 0;

var line1;
var testLine;

var bmd;
var bmdSprite;
var _bmdSprite;
var _bmd;

var poly;
var polyGrap;

var bmd_;
var bmdSprite_;

var onTerrain = false;
var enterFlag = true;

var dotExit;
var dotEnter;

var lastDotIndex = 0;

var playerPrexXY = {'x':0,'y':0};
var cellShaded = false;

var islines = false;
var terrainColor = '#FFD839';

var linesBorder = [];

var border_H = [];
var border_V = [];

var leftBorder;
var rightBorder;
var topBorder;
var buttomBorder;

var territoryWidth;
var territoryHeight;

var dotsFlood = [];
var zeroDot;
var isBorders = false;

var debugStroke = [];
var debugKontur = [];
var blackDots = [];
var blackLines = [];

var firstDot;

var greenDots = [];
var pathArr = [];
var stepsLimit;
var isPathFinded = false;
var bmp_mapEdjes;
var bmp_mapEdjesSprite;

var canMove;
var touctDown = {'x':0,'y':0};
var touctUp = {'x':0,'y':0};
var swipeMagnitude = 0;

gameState.prototype = {
	preload: function(){
        console.log('hello');
	},

	create: function(){
        
        game.stage.backgroundColor = '#DFF3F7';
        game.world.setBounds(0, 0, worldWidth, worldHeight);

        //game.physics.startSystem(Phaser.Physics.ARCADE);
        //game.physics.startSystem(Phaser.Physics.P2JS);
        
		cursors = game.input.keyboard.createCursorKeys();
        //console.log(game.camera);
        //console.log(game.camera.y);
        //console.log(this.game.world);

        this.gridCreate();

        //Create trail
        trail = game.add.graphics(0, 0);
        trail.lineStyle(50, 0xffd900);
        trail.alpha = 0.4;

        //Start territory
        bmd = game.add.bitmapData(150, 150);
        bmd.ctx.fillStyle = '#FFCA00';
        bmd.ctx.beginPath();
        bmd.ctx.rect(0, 0, 200, 200);
        //console.log(bmd.ctx);
        bmd.ctx.closePath();
        bmd.ctx.fill();
        bmdSprite = game.add.sprite(0, 0, bmd);
        bmdSprite.pivot.setTo(0.5);
        bmdSprite.anchor.set(0.5);

        player = game.add.sprite(game.world.centerX,game.world.centerY, 'player');
        //PHYSICS
        game.physics.arcade.enable(player);
        player.body.collideWorldBounds = true;
        //var territory = game.add.sprite(game.world.centerX,game.world.centerY, 'territory');
        player.width = 50;
        player.height = 50;
        //player.pivot.setTo(0.5);

        player.x = this.game.world.bounds.centerX;// + 25;
        player.y = this.game.world.bounds.centerY;// + 25;
        //console.log('player start x: ' + player.x);
        //console.log('player start y: ' +  player.y);
        //console.log(player);

        //Setup positions
        bmdSprite.x = player.x;
        bmdSprite.y = player.y;

        trail.moveTo(player.body.x+player.width/2, player.body.y + player.width);

        game.camera.x = player.x;
        game.camera.y = player.y;
        game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

        

        game.input.keyboard.onDownCallback = function(keyCode){
            //console.log(keyCode);
            if(keyCode.code == 'ArrowLeft'){
                //console.log(player.x%lineStep);
                newDir = Side.left;
                //console.log('left');
            }else if(keyCode.code == 'ArrowUp'){
                //console.log(player.x%lineStep);
                newDir = Side.up;
                //console.log('up');
            }else if(keyCode.code == 'ArrowRight'){
                //console.log(player.x%lineStep);
                newDir = Side.right;
                //console.log('right');
            }else if(keyCode.code == 'ArrowDown'){
                //console.log(player.x%lineStep);
                newDir = Side.down;
                //console.log('down');
            }
        };

       /*
        */
        //------------------------------------------------------------------------------------------------------------------------------------
        t_bmd = game.add.bitmapData(worldWidth, worldHeight);
        t_bmdSprite = game.add.sprite(0, 0, t_bmd);
        t_bmd.ctx.fillStyle = terrainColor;
        t_bmd.ctx.strokeStyle = terrainColor;
        t_bmd.ctx.lineWidth = 50;
        t_bmd.ctx.beginPath();

        t_bmdSprite.alpha = 1;

        t_bmd.ctx.moveTo(player.x - player.width, player.y - player.width);
        t_bmd.ctx.lineTo(player.x + player.width, player.y - player.width);
        t_bmd.ctx.lineTo(player.x + player.width, player.y + player.width);
        t_bmd.ctx.lineTo(player.x - player.width, player.y + player.width);

        dots = [
            new Phaser.Point(player.x - 50, player.y),
            new Phaser.Point(player.x + 50, player.y),
            new Phaser.Point(player.x, player.y + 50),
            new Phaser.Point(player.x, player.y - 50),
            new Phaser.Point(player.x+50, player.y + 50),
            new Phaser.Point(player.x+50, player.y - 50),
            new Phaser.Point(player.x-50, player.y + 50),
            new Phaser.Point(player.x-50, player.y - 50),
            //new Phaser.Point(player.x, player.y)
        ];
        dotIndex = 3;
        //t_bmd.ctx.lineTo(player.x - 25, player.y - 25);

        polyDots = [
           
            [1000, 1000],
            [1500, 1000],
            [1500, 1500],
            [1000,1500]
        ];
        //console.log(polyDots);

        t_bmd.ctx.closePath();
        //console.log('t_bmdSprite');
        //console.log(t_bmdSprite);
        t_bmd.ctx.stroke();
        t_bmd.ctx.fill();
        t_bmd.ctx.closePath();

        t_bmd.update();

        //------------------------------------------------

        bmp_mapEdjes = game.add.bitmapData(worldWidth, worldHeight);
        bmp_mapEdjesSprite = game.add.sprite(0, 0, bmp_mapEdjes);
        //bmp_mapEdjesSprite.anchor.set(0.5);
        //bmp_mapEdjes.ctx.fillStyle = '#FFFFFF';
        bmp_mapEdjes.ctx.strokeStyle = '#d3d3d3';
        bmp_mapEdjes.ctx.lineWidth = 50;
        bmp_mapEdjes.ctx.beginPath();

        bmp_mapEdjes.ctx.rect(250, 250, worldWidth - 300*2+100-3, worldHeight - 300*2+100-3);

        bmp_mapEdjesSprite.anchor.set(0.5);
        bmp_mapEdjesSprite.x = worldWidth/2;
        bmp_mapEdjesSprite.y = worldHeight/2;

        bmp_mapEdjesSprite.alpha = 1;

        bmp_mapEdjes.ctx.stroke();
        //bmp_mapEdjes.ctx.fill();
        bmp_mapEdjes.ctx.closePath();
        bmp_mapEdjes.update();

       
        //------------------------------------------------------------------------------------------------------------------------------------

        bmd_ = game.add.bitmapData(500, 500);
        bmdSprite_ = game.add.sprite(player.x-300, player.y, _bmd);

        //------------------------------------------------------------------
        bmd_ = game.add.bitmapData(500, 500);
        bmdSprite_ = game.add.sprite(player.x-300, player.y, _bmd);


        game.world.addChild(player);

        player.anchor.set(0.5);

        //----------------

	},
    itemTouchedDown: function(point){

    },
    itemTouchedUp: function(point){

    },
    getMagnitude: function(start, end){
        
    },
    startDrag: function() {
           
        },

    stopDrag: function() {
           
        },
/*
	render: function(){
        

        if(isDebug){
		    game.debug.cameraInfo(game.camera, 32, 32);
            //game.debug.body(player);
            game.debug.body(_bmdSprite);
            //game.debug.geom(line1);

            for(var i = 0; i < dots.length; i++){
                game.debug.geom(dots[i], 'rgba(255,255,255,1)' ) ;
            }

            //все линии
            if(islines){
                for(var i = 0; i < lines.length; i++){
                    game.debug.geom(lines[i], 'rgba(125,0,255,1)');
                }
                for(var i = 0; i < linesBorder.length; i++){
                    game.debug.geom(linesBorder[i], 'rgba(125,125,255,0.5)');
                }
            }

            //горизонтальные и вертикальные границы
            for(var i = 0; i < border_H.length; i++){
                game.debug.geom(border_H[i], 'rgba(125,125,255,1)');
            }
            for(var i = 0; i < border_V.length; i++){
                game.debug.geom(border_V[i], 'rgba(125,125,0,0.5)');
            }

            game.debug.geom(leftBorder, 'rgba(125,125,0,0.5)');
            game.debug.geom(rightBorder, 'rgba(125,125,0,0.5)');
            game.debug.geom(topBorder, 'rgba(125,125,0,0.5)');
            game.debug.geom(buttomBorder, 'rgba(125,125,0,0.5)');

            
                for(var i = 0; i < dotsFlood.length; i++){
                    for(var j = 0; j< dotsFlood[i].length; j++){
                        if(dotsFlood[i][j].terrain == true){
                            //game.debug.geom(dotsFlood[i][j], 'rgba(255,255,255,1)'); 
                            if(dotsFlood[i][j].checked){
                                game.debug.geom(dotsFlood[i][j], 'rgba(0,0,255,1)');
                            }else{
                               game.debug.geom(dotsFlood[i][j], 'rgba(150,155,155,1)'); 
                            }
                        }else{
                            game.debug.geom(dotsFlood[i][j], 'rgba(0,0,0,1)' );
                        }
                    }
                }
            
            for(var i = 0; i < pathArr.length; i++){
                game.debug.geom(pathArr[i], 'rgba(0,255,0,1)'); 
            }
            //console.log(dotsFlood);

        //берем произвольный не закрашенный элемент из dotsFlood, создаем двухмерный массив и переносим туда строки и столбцы из dotsFlood
        //если ни один из элементов не принадлежит множеству точек, содержащих границу - то область закрашивается

        //из массива всех линий берем ту, которая равна левой вертикальной границе терртории, берем горизондальную линию которая имеет координаты своего начала равные концу вертикальной линии
        //затем сновы из массива выбираем вертикальную линию имеющуу начальные координаты как конечные координаты у предыдущей горизонтальной линии
        //продолжаем до тех пор, пока не найдем горизонтальную линию (т.к начинали с вертикальной) с конечной точкой соответствующей координатам начала первой линии

        //начиная с конечной или начальной точки вертикальной пограничной линии идем вниз до тех пор, пока следующая ячейка не будет пустой
        //если следующая ячейка пустая - идем вправо до тех пор пока следующая ячейка не будет пустой, затем идем вверх, после пытаемся пойти вправо (на случай если многоугольник вогнутый)
        //затем вниз, если не получается - идем вверх


        for(var i = 1; i < debugStroke.length; i++){
            //debugKontur[debugKontur.length] = new Phaser.Line(debugStroke[i-1].x, debugStroke[i-1].y, debugStroke[i].x, debugStroke[i].y);
        }
        for(var i = 0; i < debugKontur.length; i++){
            //game.debug.geom(debugKontur[i], 'rgba(125,125,255,0.5)');
        }

        for(var i = 0; i < blackDots.length; i++){
            //game.debug.geom(blackDots[i], 'rgba(0,0,0,1)' );
        }

        /*
        for(var i = 0; i < blackDots.length; i++){
            if(blackDots[i].checked){
                game.debug.geom(blackDots[i], 'rgba(0,0,0,1)' );
                //game.debug.geom(new Phaser.Point(blackDots[i].x, blackDots[i].y - 50), 'rgba(0,0,0,1)' );
            }else if(!blackDots[i].checked){
                game.debug.geom(blackDots[i], 'rgba(0,255,0,1)' );
                game.debug.geom(new Phaser.Point(blackDots[i].x, blackDots[i].y - 50), 'rgba(0,255,0,1)' );
                game.debug.geom(new Phaser.Point(blackDots[i].x, blackDots[i].y + 50), 'rgba(0,255,0,1)' );
                game.debug.geom(new Phaser.Point(blackDots[i].x - 50, blackDots[i].y), 'rgba(0,255,0,1)' );
                game.debug.geom(new Phaser.Point(blackDots[i].x + 50, blackDots[i].y), 'rgba(0,255,0,1)' );
                game.debug.geom(new Phaser.Point(blackDots[i].x - 50, blackDots[i].y + 50), 'rgba(0,255,0,1)' );
                game.debug.geom(new Phaser.Point(blackDots[i].x + 50, blackDots[i].y + 50), 'rgba(0,255,0,1)' );
                game.debug.geom(new Phaser.Point(blackDots[i].x - 50, blackDots[i].y - 50), 'rgba(0,255,0,1)' );
                game.debug.geom(new Phaser.Point(blackDots[i].x + 50, blackDots[i].y - 50), 'rgba(0,255,0,1)' );
            }
            //game.debug.geom(new Phaser.Line(blackDots[i-1].x,blackDots[i-1].y,blackDots[i].x,blackDots[i].y), 'rgba(125,125,255,0.5)');
            }
        

            game.debug.geom(new Phaser.Point(player.x, player.y));
        }
	},*/
    /*
    collisionHandler: function (obj1, obj2) {

        //  The two sprites are colliding
        //console.log('COLLISION !!!!!!!!!!!!!');
    },*/
	update: function(){
/*
        if(newDir == Side.right){
            if(player.x < worldWidth - 305){//bmp_mapEdjes.getPixelRGB(player.x+30,player.y).color == 4292072403){
                this.playerMove();
            }
        }else if(newDir == Side.up){
            if(player.y > 305){
                this.playerMove();
            }
        }else if(newDir == Side.left){
            if(player.x > 305){
                this.playerMove();
            }
        }else if(newDir == Side.down){
            if(player.y < worldHeight - 305){
                this.playerMove();
            }
        }

        if(this.onTerrain() && !enterFlag){
            onTerrain = true;
            enterFlag = true;
            //console.log(onTerrain);

            this.onEnterTerrain();
        }else if(!this.onTerrain() && enterFlag){
            onTerrain = false;
            enterFlag = false;
            //console.log(onTerrain);

            this.onExitTerrain();
        }
        */
	},
    onTerrain: function () {
       
        
    },
    onEnterTerrain: function(){
 
    },
    checkTerrainDot: function(){

    },
    patchInit: function(dot){
       
    },
    getPath: function(dot){
       
    },
    onExitTerrain: function(){
       
    },
	playerMove: function(){
		
	},
	gridCreate: function(){
		var lines = [];
        var lineWidth = 1;
        lineStep = 50;

        var linesGraphics = game.add.graphics(0, 0);
        linesGraphics.lineStyle(lineWidth, 0xFFFFFF);
        for(var i = 0; i<linesCount;i++){
            linesGraphics.moveTo(0,i*lineStep-lineStep/2);
            linesGraphics.lineTo(worldWidth, i*lineStep-lineStep/2);
            lines[i] = linesGraphics.graphicsData[i];
        }
        var columns = [];
        var columnsGraphics = game.add.graphics(0, 0);
        columnsGraphics.lineStyle(lineWidth, 0xFFFFFF);
        for(var i = 0; i<linesCount;i++){
            columnsGraphics.moveTo(i*lineStep-lineStep/2, 0);
            columnsGraphics.lineTo(i*lineStep-lineStep/2, worldHeight);
            columns[i] = columnsGraphics.graphicsData[i];
            //console.log(columns[i].shape._points);
        }
        //Guides Generation---------------------------------
        var guides_H = [];
        var guideWidth = 0.25;
        var guidesGraphics_H = game.add.graphics(0, 0);
        guidesGraphics_H.lineStyle(guideWidth, 0xFFFFFF);
        game.physics.arcade.enable(guidesGraphics_H);
        for(var i = 0; i<linesCount;i++){
            guidesGraphics_H.moveTo(0,i*lineStep/2-lineStep/2);
            guidesGraphics_H.lineTo(worldWidth, i*lineStep/2-lineStep/2);
            guides_H[i] = guidesGraphics_H.graphicsData[i];

            game.physics.arcade.enable(guidesGraphics_H);
        }
        var guides_V = [];
        var guidesGraphics_V = game.add.graphics(0, 0);
        guidesGraphics_V.lineStyle(guideWidth, 0xFFFFFF);
        game.physics.arcade.enable(guidesGraphics_V);
        for(var i = 0; i<linesCount;i++){
            guidesGraphics_V.moveTo(i*lineStep/2-lineStep/2, 0);
            guidesGraphics_V.lineTo(i*lineStep/2-lineStep/2, worldHeight);
            guides_V[i] = guidesGraphics_V.graphicsData[i];

            //game.physics.p2.enable();
            game.physics.arcade.enable(guidesGraphics_V);
        }

	}
}