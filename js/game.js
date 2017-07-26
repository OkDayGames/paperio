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

	},

	create: function(){
        //console.log('hello');
        game.stage.backgroundColor = '#DFF3F7';
        game.world.setBounds(0, 0, worldWidth, worldHeight);

        //game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.startSystem(Phaser.Physics.P2JS);
        
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

        _bmd = game.add.bitmapData(500, 500);
        _bmdSprite = game.add.sprite(player.x-300, player.y, _bmd);
        
        //game.physics.arcade.enable(_bmdSprite);
        game.physics.startSystem(Phaser.Physics.P2JS);
        //game.physics.p2.enable(_bmdSprite, false);
        game.physics.enable([_bmdSprite], true);
        
        //_bmdSprite.body.loadPolygon('physicsData', _bmd);
        
        _bmdSprite.inputEnabled = true;
        _bmdSprite.input.enableDrag(true);

        _bmd.ctx.fillStyle = '#FFCA00';
        //_bmd.ctx.rect(0, 0, 500, 500);

        _bmd.ctx.lineWidth = 50;
        _bmd.ctx.strokeStyle = 'ffd900';

        _bmd.ctx.beginPath();
        _bmd.ctx.moveTo(0, 0);
        _bmd.ctx.lineTo(100, 0);
        _bmd.ctx.lineTo(100, 100);
        _bmd.ctx.lineTo(0, 100);
        _bmd.ctx.closePath();
        _bmd.ctx.fill();
        _bmd.ctx.stroke();

        _bmd.clear();

        _bmd.ctx.moveTo(80, 0);
        _bmd.ctx.lineTo(300, 300);
        _bmd.ctx.lineTo(200, 500);
        _bmd.ctx.closePath();
        _bmd.ctx.fill();
        _bmd.ctx.stroke();

        _bmd.clear();
        _bmd.ctx.moveTo(300, 300);
        _bmd.ctx.strokeStyle = "#ffd900";
        //_bmd.ctx.globalAlpha = 0.5;
        //shadowColor="rgba(10, 0, 200, 0)";
        //_bmd.ctx.shadowOffsetX = -5;
        _bmd.ctx.lineTo(300, 300+100);
        _bmd.ctx.lineTo(50+300, 150+300);
        _bmd.ctx.lineTo(300+300, 150+300);
        //_bmd.ctx.closePath();
        _bmd.ctx.fill();
        _bmd.ctx.stroke();

        _bmdSprite.pivot.setTo(0.5);
        _bmdSprite.anchor.set(0.5);

        //console.log('_bmdSprite');
        //console.log(_bmdSprite);
        //console.log(_bmd.ctx);
        //console.log('---------');

        _bmdSprite.events.onDragStart.add(this.startDrag, this);
        _bmdSprite.events.onDragStop.add(this.stopDrag, this);

        game.physics.p2.enable(_bmdSprite, true);
        //_bmdSprite.body.clearShapes();
        //_bmdSprite.body.addPolygon({},[[0, 0], [70, 0], [70, 70], [0, 0]]);
        //Polygon------------------------------------------------------------------
        _bmdSprite.body.clearShapes();
        //polyDots = [[0, 0], [200, 0], [200, 400], [0, 500], [20,200]];
        //polyDots[polyDots.length] = [-50,200];
        //_bmdSprite.body.addPolygon({},polyDots);
        //_bmdSprite.body.addPolygon({},[[0, 0], [50,50]]);
        //_bmdSprite.body.loadPolygon('physicsData', _bmd);
        //console.log('_bmdSprite');
        //console.log(_bmdSprite);
        //_bmdSprite.body.addRectangle(100,100,1000,1000);
        //_bmdSprite.body.addShape(Phaser.Physics.P2.Body.addShape([[0, 0], [200, 0], [200, 400], [0, 0]], 0,0,0));
        //------------------------------------------------------------------

        //_bmdSprite.body.addToWorld();

        //console.log(_bmdSprite.body.debug);

        //game.debug.body(_bmdSprite);
        //console.log(bmdSprite_.body.debug);
        //------------------------------------------------------------------
        bmdSprite.alpha = 0;
        bmdSprite_.alpha = 0;
        _bmdSprite.alpha = 0;


        //dots[0] = new Phaser.Point(player.x,player.y);

        //---------------------
        /*
        polyGrap.moveTo(poly.points[0].x, poly.points[0].y);

        for (var i = 1; i < poly.points.length; i += 1) {
            polyGrap.lineTo(poly.points[i].x, poly.points[i].y);
        }

        polyGrap.lineTo(poly.points[0].x, poly.points[0].y);
        */
        //---------------------
        

        //bmdSprite_.pivot.setTo(0.5);
        //console.log(poly);
        //console.log(polyGrap);
        //console.log(player.body.bottom);
        //console.log(player.body);
        //player.events.onEnterBounds.add(this.collisionHandler, this);

        //console.log(dots);

        game.world.addChild(player);

        player.anchor.set(0.5);

        //----------------

        /*
        this.game.input.onDown.add(this.itemTouchedDown, this);
        this.game.input.onUp.add(this.itemTouchedUp, this);*/
	},
    itemTouchedDown: function(point){
        touctDown.x = point.screenX;
        touctDown.y = point.screenY;
        //console.log('x: ' + point.screenX + '; ' + 'y: ' + point.screenY);
        //console.log(touctDown);
    },
    itemTouchedUp: function(point){
        touctUp.x = point.screenX;
        touctUp.y = point.screenY;
        //console.log('x: ' + point.screenX + '; ' + 'y: ' + point.screenY);
        //console.log(touctUp);

        this.getMagnitude(touctDown, touctUp);
    },
    getMagnitude: function(start, end){
        if(start.x > end.x && start.y > end.y && start.x - end.x > start.y - end.y){
            //left
            //if(start.x - end.x > start.y - end.y){
                newDir = Side.left;
                //console.log('swipe left');
            //}
        } else if(start.x > end.x && start.y < end.y && start.x - end.x > end.y - start.y){
            //left
            //if(start.x - end.x > end.y - start.y){
                newDir = Side.left;
                //console.log('swipe left');
            //}
        }else if(end.x > start.x && start.y > end.y && end.x - start.x > start.y - end.y){
            //right
            //if(end.x - start.x > start.y - end.y){
                newDir = Side.right;
                //console.log('swipe right');
            //}
        } else if(end.x > start.x && start.y < end.y && end.x - start.x > end.y - start.y){
            //right
            //if(end.x - start.x > end.y - start.y){
                newDir = Side.right;
                //console.log('swipe right');
            //}
        } else if(start.y < end.y && start.x > end.x && end.y - start.y > start.x - end.x){
            //down
            //if(start.y - end.y > start.x - end.x){
                newDir = Side.down;
                //console.log('swipe down');
            //}
        } else if(start.y < end.y && start.x < end.x && end.y - start.x > end.x - start.x){
            //down
            //if(start.x - end.x > end.y - start.y){
                newDir = Side.down;
                //console.log('swipe down');
            //}
        } else if(start.y > end.y && start.x > end.x && start.y - end.y > start.x - end.x){
            //up
            //if(start.y - end.y > start.x - end.x){
                newDir = Side.up;
                //console.log('swipe up');
            //}
        } else if(start.y > end.y && start.x < end.x && start.y - end.y > end.x - start.x){
            //up
            //if(start.x - end.x > end.y - start.y){
                newDir = Side.up;
                //console.log('swipe up');
            //}
        }
    },
    startDrag: function() {
            //  You can't have a sprite being moved by physics AND input, so we disable the physics while being dragged
            _bmdSprite.body.moves = false;
            //console.log('startdrag');
        },

    stopDrag: function() {
            //  And re-enable it upon release
            _bmdSprite.body.moves = true;
            //console.log('stopdrag');
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
       
            if(t_bmd.getPixelRGB(player.x, player.y).a > 0){
                return true;
            }else{
                return false;
            }
        
    },
    onEnterTerrain: function(){
        //console.log('callback ENTER');
        //t_bmd.update();

        var offset = 50;
        //var offset_2 = 50;

        for(var i = 0; i < blackDots.length; i++){
            blackDots[i].checked = false;
        }
        blackDots = [];
        dots.forEach(function(obj){
            if(obj.checked){
                obj.checked = false;
            }
        });

        //dots[0] = new Phaser.Point(player.x,player.y);
        //dots[dots.length] = new Phaser.Point(player.x+25,player.y+25);
        if(movementSide == Side.left){
            dots[dots.length] = new Phaser.Point(player.x-20,player.y);
        }else if(movementSide == Side.right){
            dots[dots.length] = new Phaser.Point(player.x+25,player.y);
        }else if(movementSide == Side.up){
            dots[dots.length] = new Phaser.Point(player.x,player.y-25+5);
        }else if(movementSide == Side.down){
            dots[dots.length] = new Phaser.Point(player.x,player.y+25);
        }

        //округление координат
        if(dots[dots.length - 1].x%10>0){
            dots[dots.length - 1].x = dots[dots.length - 1].x - dots[dots.length - 1].x % 10;
        }
        if(dots[dots.length - 1].y%10>0){
            dots[dots.length - 1].y = dots[dots.length - 1].y - dots[dots.length - 1].y % 10;
        }
        //console.log('x%10: ' + dots[dots.length - 1].x%10);
        //console.log('dot enter: ' + dots[dots.length - 1].x + '; ' + dots[dots.length - 1].y);

        lines[lines.length] = new Phaser.Line(dots[dots.length-2].x, dots[dots.length-2].y, dots[dots.length-1].x, dots[dots.length-1].y);//new Line(dots[dots.length-2], dots[dots.length-1]);
        linesBorder[linesBorder.length] = lines[lines.length-1];
        //console.log('dots length in path: ' + dots.length);

        /*
        var dot;
        for(var i = 0; i < dots.length; i++){
            dot = dots[i];
            if(t_bmd.getPixelRGB(dot.x-offset, dot.y).a > 0 || 
                t_bmd.getPixelRGB(dot.x+offset, dot.y).a > 0 || 
                t_bmd.getPixelRGB(dot.x, dot.y-offset).a > 0 ||
                t_bmd.getPixelRGB(dot.x, dot.y+offset).a > 0 ||
                t_bmd.getPixelRGB(dot.x-offset, dot.y-offset).a > 0 ||
                t_bmd.getPixelRGB(dot.x+offset, dot.y-offset).a > 0 ||
                t_bmd.getPixelRGB(dot.x-offset, dot.y+offset).a > 0 ||
                t_bmd.getPixelRGB(dot.x+offset, dot.y+offset).a > 0) {

                }      
        }*/

        //console.log(lines);


        territoryWidth = buttomBorder.width;
        territoryHeight = leftBorder.height;
        //dotsFlood = undefined;
        dotsFlood = [];
        dotsFlood.length = 0;
        //dotsFlood[0].length = 0;
        //dotsFlood[0] = undefined;
        dotsFlood[0] = [];
        //if(isBorders){
            zeroDot = new Phaser.Point(leftBorder.start.x, buttomBorder.start.y);
            //console.log(zeroDot);
            dotsFlood[0][0] = zeroDot;
            var dotsCount_H = territoryWidth/player.width;
            var dotsCount_V = territoryHeight/player.width;
            //console.log('dotsCount_H: ' + dotsCount_H);
            dotEnter = dots[dots.length - 1];
            //console.log('dot enter: ' + dotEnter.x + '; ' + dotEnter.y);
            //console.log('dotsCount_V: ' + dotsCount_V);
            var index_H = 0;
            var index_V = 0;
            var isDotsFloodInit = false;

            var startIndex_i = 0;
            var startIndex_j = 0;
            var endIndex_i = 0;
            var endtIndex_j = 0;
            while(index_H <= dotsCount_H){
                dotsFlood[index_H] = [];
                while(index_V <= dotsCount_V){
                    dotsFlood[index_H][index_V] = new Phaser.Point(zeroDot.x + index_H * player.width, zeroDot.y + index_V * player.width);
                    //dotsFlood[index_H][index_V].x = dotsFlood[index_H][index_V].x - dotsFlood[index_H][index_V].x%10;
                    //dotsFlood[index_H][index_V].y = dotsFlood[index_H][index_V].y - dotsFlood[index_H][index_V].y%10;
                    dotsFlood[index_H][index_V].terrain = false;
                    dotsFlood[index_H][index_V].step = 0;
                    dotsFlood[index_H][index_V].index_i = index_H;
                    dotsFlood[index_H][index_V].index_j = index_V;
                    dotsFlood[index_H][index_V].checked = false;
                    //точка входа в территорию и вызода находятся в общем массиве точек
                    if(dotEnter.x == dotsFlood[index_H][index_V].x && dotEnter.y == dotsFlood[index_H][index_V].y){
                        //dotEnter == dotsFlood[index_H][index_V];
                        //dotEnter.terrain = true;
                        //dotEnter.step = 0;
                        //dotEnter.index_i = index_H;
                        //dotEnter.index_j = index_V;
                        startIndex_i = index_H;
                        startIndex_j = index_V;
                    }
                    if(dotExit.x == dotsFlood[index_H][index_V].x && dotExit.y == dotsFlood[index_H][index_V].y){
                        //dotExit == dotsFlood[index_H][index_V];
                        //dotExit.terrain = true;
                        //dotExit.step = 0;
                        //dotExit.index_i = index_H;
                        //dotExit.index_j = index_V;
                        endIndex_i = index_H;
                        endtIndex_j = index_V;
                    }
                    index_V++;
                }
                index_H++;
                index_V = 0;
                isDotsFloodInit = true;
            }
            

            //console.log('! dot enter: ' + dotEnter.x + '; ' + dotEnter.y);
            //console.log('! dot exit: ' + dotExit.x + '; ' + dotExit.y);
            //console.log(dotEnter.index_i);
            dotEnter = dotsFlood[startIndex_i][startIndex_j];
            dotExit = dotsFlood[endIndex_i][endtIndex_j];
            
            //пометка ячеек которые не прозрачные
            this.checkTerrainDot();
            this.checkTerrainDot();

            pathArr = [];
            pathArr.length = 0;
            //pathArr = dotsFlood;
            //console.log(dotsFlood);

            //максимальне количество вызова рекурсивного поиска
            stepsLimit = dotsFlood.length * dotsFlood[0].length;
            //console.log('dots: ' + stepsLimit);
            //console.log(dotEnter);
            //console.log(dotExit);
            //dotsFlood[0][0].terrain = false;
            //pathArr[0][0].terrain = false;
            //console.log('dotsFlood[0][0].terrain: ' + dotsFlood[0][0].terrain + '; pathArr[0][0].terrain: ' + pathArr[0][0].terrain);
            //if()
            isPathFinded = false;

            //dotExit.step = 0;
            //console.log('exit step: ' + dotExit.step);
            //начинаем с dotExit
            if(isDotsFloodInit){
                this.getPath(dotExit);
            }
            //заканчиваем dotEnter (получаем количество шагов, за которое можем дойти)

            pathArr = [];
            /*
            pathArr[pathArr.length] = dotEnter;
            for(var i = dotEnter.step; i > 0; i--){
                loop1:
                for(var j = dotEnter.index_i; j < dotsFlood.length; j++){
                    loop2:
                    for(var t = dotEnter.index_j; t < dotsFlood[j].length; t++){
                        if(dotsFlood[j][t].step == i){
                            //pathArr[pathArr.length] = dotsFlood[j][t];
                            //break loop1;
                        }
                    }
                }
            }
            */
            //console.log('exit step: ' + dotExit.step);
            dotExit.step = 0;
            //идем в обратном порядке
            this.patchInit(dotEnter);

            //console.log('patch array: -----------------------------------')
            //console.log(pathArr);
            //console.log('enter step: ' + dotEnter.step);
            //console.log('exit step: ' + dotExit.step);
            //console.log(dotExit);
            //console.log(dotEnter);
            //------------------------------------------------------------------------------------------------------------------------

            //draw lines
            t_bmd.ctx.beginPath();
            t_bmdSprite.alpha = 1;
            t_bmd.ctx.lineWidth = 51;
            t_bmd.ctx.fillStyle = terrainColor;//'#FFCA00';
            t_bmd.ctx.strokeStyle = terrainColor;
 
            for (var i = 0; i < dots.length; i++) {
                t_bmd.ctx.lineTo(dots[i].x, dots[i].y);
            }  

            for (var i = 0; i < pathArr.length; i++) {
                t_bmd.ctx.lineTo(pathArr[i].x, pathArr[i].y);
            }
        
            t_bmd.ctx.stroke();
            //t_bmd.ctx.closePath();
            t_bmd.ctx.fill();
            t_bmd.update();    
        
            game.world.addChild(player);
            //console.log(dotExit);

            delete dots;
            delete dotsFlood;
            delete pathArr;
    },
    checkTerrainDot: function(){
        for(var i = 0; i < dotsFlood.length; i++){
            for(var j = 0; j < dotsFlood[i].length; j++){
                if(t_bmd.getPixelRGB(dotsFlood[i][j].x, dotsFlood[i][j].y).a > 0){
                    dotsFlood[i][j].terrain = true;
                    //dotsFlood[i][j].checked = false;
                    //dotsFlood[i][j].step = 0;
                } 
            }
        }
    },
    patchInit: function(dot){
        if(dot != dotExit){
            pathArr[pathArr.length] = dotsFlood[dot.index_i][dot.index_j];
            //console.log('!!!!!!!!!');
        if(dot.index_i - 1 >= 0 && dotsFlood[dot.index_i - 1][dot.index_j].checked && dotsFlood[dot.index_i - 1][dot.index_j].step == dot.step - 1){
            this.patchInit(dotsFlood[dot.index_i - 1][dot.index_j]);
        }
        else if(dot.index_j - 1 >= 0 && dotsFlood[dot.index_i][dot.index_j-1].checked && dotsFlood[dot.index_i][dot.index_j-1].step == dot.step - 1){
            this.patchInit(dotsFlood[dot.index_i][dot.index_j-1]);
        }
        else if(dot.index_i + 1 < dotsFlood.length && dotsFlood[dot.index_i+1][dot.index_j].checked && dotsFlood[dot.index_i+1][dot.index_j].step == dot.step - 1){
            this.patchInit(dotsFlood[dot.index_i+1][dot.index_j]);
        }
        else if(dot.index_j + 1 < dotsFlood[dot.index_i].length && dotsFlood[dot.index_i][dot.index_j+1].checked && dotsFlood[dot.index_i][dot.index_j+1].step == dot.step - 1){
            this.patchInit(dotsFlood[dot.index_i][dot.index_j+1]);
        }
    }else{
        pathArr[pathArr.length] = dotsFlood[dot.index_i][dot.index_j];
        return;
    }
    },
    getPath: function(dot){
        if(dot == dotEnter || dot.step >= stepsLimit){
                isPathFinded = true;
                dotsFlood[dot.index_i][dot.index_j].checked = true;
                return;
                //dotsFlood[dot.index_i][dot.index_j].checked = true;
                //console.log('final step: ' + dot.step);
                //return;
                //console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
            }
        else{
            //var _step = step+1;
            //step+=1;
            //dot.step = step;
            //console.log(dot.step);
            //dot.checked = true;
            dotsFlood[dot.index_i][dot.index_j].checked = true;
            //console.log(step);
            //console.log(dot);
            //console.log(dotEnter);
            

            //_step = step;
            //dot.step=step;
            //step+=1;
            //console.log('i: ' + dot.index_i + ' | j: ' + dot.index_j + ' | step: ' + dot.step);
            //dotsFlood[dot.index_i][dot.index_j].step = step;
            //step++;
            //console.log('DOT');
            //console.log(dot);
            //проверка условий были ли в этой ячейки, есть ли ячейка в массиве, является ли ячейка частью территории
            //если координаты ячейки совпадают с координатами ячейки входа - прекращаем движение
            if(dot.index_i-1 >= 0 && dotsFlood[dot.index_i-1][dot.index_j].step == 0 && dotsFlood[dot.index_i-1][dot.index_j].terrain && !dotsFlood[dot.index_i-1][dot.index_j].checked){
                dotsFlood[dot.index_i-1][dot.index_j].step = dotsFlood[dot.index_i][dot.index_j].step+1;
                //console.log('i: ' + dot.index_i + ' | j: ' + dot.index_j + ' | step: ' + dotsFlood[dot.index_i-1][dot.index_j].step + ' => ' + dotsFlood[dot.index_i-1][dot.index_j].index_i + '; ' + dotsFlood[dot.index_i-1][dot.index_j].index_j);       
                //console.log('1');
                //this.getPath(dotsFlood[dot.index_i-1][dot.index_j], step);
                //this.getPath(dotsFlood[dot.index_i-1][dot.index_j]);
            }
            if(dot.index_j-1 >= 0  && dotsFlood[dot.index_i][dot.index_j-1].step == 0 && dotsFlood[dot.index_i][dot.index_j-1].terrain && !dotsFlood[dot.index_i][dot.index_j-1].checked){
                dotsFlood[dot.index_i][dot.index_j-1].step = dotsFlood[dot.index_i][dot.index_j].step+1;
                //console.log('i: ' + dot.index_i + ' | j: ' + dot.index_j + ' | step: ' + dotsFlood[dot.index_i][dot.index_j-1].step + ' => ' + dotsFlood[dot.index_i][dot.index_j-1].index_i + '; ' + dotsFlood[dot.index_i][dot.index_j-1].index_j);
                //console.log('2');
                //this.getPath(dotsFlood[dot.index_i][dot.index_j-1], step);
                //this.getPath(dotsFlood[dot.index_i][dot.index_j-1]);
            }
            if(dot.index_i+1 < dotsFlood.length && dotsFlood[dot.index_i+1][dot.index_j].step == 0 && dotsFlood[dot.index_i+1][dot.index_j].terrain && !dotsFlood[dot.index_i+1][dot.index_j].checked){
                dotsFlood[dot.index_i+1][dot.index_j].step = dotsFlood[dot.index_i][dot.index_j].step+1;
                //console.log('i: ' + dot.index_i + ' | j: ' + dot.index_j + ' | step: ' + dotsFlood[dot.index_i+1][dot.index_j].step + ' => ' + dotsFlood[dot.index_i+1][dot.index_j].index_i + '; ' + dotsFlood[dot.index_i+1][dot.index_j].index_j); 
                //console.log('3');
                //this.getPath(dotsFlood[dot.index_i+1][dot.index_j], step);
                //this.getPath(dotsFlood[dot.index_i+1][dot.index_j]);
            }
            if(dot.index_j+1 < dotsFlood[dot.index_i].length && dotsFlood[dot.index_i][dot.index_j+1].step == 0 && dotsFlood[dot.index_i][dot.index_j+1].terrain && !dotsFlood[dot.index_i][dot.index_j+1].checked){
                dotsFlood[dot.index_i][dot.index_j+1].step = dotsFlood[dot.index_i][dot.index_j].step+1;
                //console.log('i: ' + dot.index_i + ' | j: ' + dot.index_j + ' | step: ' + dotsFlood[dot.index_i][dot.index_j+1].step + ' => ' + dotsFlood[dot.index_i][dot.index_j+1].index_i + '; ' + dotsFlood[dot.index_i][dot.index_j+1].index_j);
                //console.log('4');
                //this.getPath(dotsFlood[dot.index_i][dot.index_j+1], step);
                //this.getPath(dotsFlood[dot.index_i][dot.index_j+1]);
            }

            if(dot.index_i-1 >= 0 && dotsFlood[dot.index_i-1][dot.index_j].step == dot.step+1 && dotsFlood[dot.index_i-1][dot.index_j].terrain && !dotsFlood[dot.index_i-1][dot.index_j].checked){
                //dotsFlood[dot.index_i-1][dot.index_j].step = dotsFlood[dot.index_i][dot.index_j].step+1;
                //console.log('i: ' + dot.index_i + ' | j: ' + dot.index_j + ' | step: ' + dotsFlood[dot.index_i-1][dot.index_j].step + ' => ' + dotsFlood[dot.index_i-1][dot.index_j].index_i + '; ' + dotsFlood[dot.index_i-1][dot.index_j].index_j);       
                //console.log('-1');
                this.getPath(dotsFlood[dot.index_i-1][dot.index_j]);
            }
            if(dot.index_j-1 >= 0  && dotsFlood[dot.index_i][dot.index_j-1].step == dot.step+1 && dotsFlood[dot.index_i][dot.index_j-1].terrain && !dotsFlood[dot.index_i][dot.index_j-1].checked){
                //dotsFlood[dot.index_i][dot.index_j-1].step = dotsFlood[dot.index_i][dot.index_j].step+1;
                //console.log('i: ' + dot.index_i + ' | j: ' + dot.index_j + ' | step: ' + dotsFlood[dot.index_i][dot.index_j-1].step + ' => ' + dotsFlood[dot.index_i][dot.index_j-1].index_i + '; ' + dotsFlood[dot.index_i][dot.index_j-1].index_j);
                //console.log('-2');
                this.getPath(dotsFlood[dot.index_i][dot.index_j-1]);
            }
            if(dot.index_i+1 < dotsFlood.length && dotsFlood[dot.index_i+1][dot.index_j].step == dot.step+1 && dotsFlood[dot.index_i+1][dot.index_j].terrain && !dotsFlood[dot.index_i+1][dot.index_j].checked){
                //dotsFlood[dot.index_i+1][dot.index_j].step = dotsFlood[dot.index_i][dot.index_j].step+1;
                //console.log('i: ' + dot.index_i + ' | j: ' + dot.index_j + ' | step: ' + dotsFlood[dot.index_i+1][dot.index_j].step + ' => ' + dotsFlood[dot.index_i+1][dot.index_j].index_i + '; ' + dotsFlood[dot.index_i+1][dot.index_j].index_j); 
                //console.log('-3');
                this.getPath(dotsFlood[dot.index_i+1][dot.index_j]);
            }
            if(dot.index_j+1 < dotsFlood[dot.index_i].length && dotsFlood[dot.index_i][dot.index_j+1].step == dot.step+1 && dotsFlood[dot.index_i][dot.index_j+1].terrain && !dotsFlood[dot.index_i][dot.index_j+1].checked){
                //dotsFlood[dot.index_i][dot.index_j+1].step = dotsFlood[dot.index_i][dot.index_j].step+1;
                //console.log('i: ' + dot.index_i + ' | j: ' + dot.index_j + ' | step: ' + dotsFlood[dot.index_i][dot.index_j+1].step + ' => ' + dotsFlood[dot.index_i][dot.index_j+1].index_i + '; ' + dotsFlood[dot.index_i][dot.index_j+1].index_j);
                //console.log('-4');
                this.getPath(dotsFlood[dot.index_i][dot.index_j+1]);
            }
        }
        //пока точка параметра не равна точке выхода в территорию - применить функцию к соседней не закрашенной точке
        //выбираем соседнюю точку у которой значение step равно нулю и присваиваем ей текущее значение step
        //рекурсия продолжается до тех пор, пока количество значение step не превысит значения stepLimit
    },
    onExitTerrain: function(){
        //dots = [];
        //lines = [];

        t_bmd.ctx.moveTo(dots[dots.length-1].x, dots[dots.length-1].y);
        lastDotIndex = dots.length - 1;
        //console.log('callback EXIT');
        dots = dots.splice(0,0);
        //console.log('splice!!!');
        //console.log(dots);
        lines = [];
        dotsFlood = dotsFlood.splice(0,0);
        
        if(movementSide == Side.left){
            dots[dots.length] = new Phaser.Point(player.x+25+5,player.y);
        }else if(movementSide == Side.right){
            dots[dots.length] = new Phaser.Point(player.x-25,player.y);
        }else if(movementSide == Side.up){
            dots[dots.length] = new Phaser.Point(player.x,player.y+25+5);
        }else if(movementSide == Side.down){
            dots[dots.length] = new Phaser.Point(player.x,player.y-25);
        }

        if(dots[dots.length - 1].x%10>0){
            dots[dots.length - 1].x = dots[dots.length - 1].x - dots[dots.length - 1].x % 10;
        }
        if(dots[dots.length - 1].y%10>0){
            dots[dots.length - 1].y = dots[dots.length - 1].y - dots[dots.length - 1].y % 10;
        }
        //console.log('x%10: ' + dots[dots.length - 1].x%10);
        //lines[lines.length] = new Line(dots[dots.length-2], dots[dots.length-1]);
        dotExit = dots[dots.length - 1];

        //console.log('dot exit: ' + dotExit.x + '; ' + dotExit.y);
        //playerPrexXY.x = player.x;
        //playerPrexXY.y = player.y;
    },
	playerMove: function(){
		game.camera.x +=3;
		//game.camera.y += 3;
		//player.body.setZeroVelocity();
        //t_bmd.setPixel32(500, 500,'rgba(0,0,0,1)');
        //var color = "rgba(255,202,0,0.5)";//t_bmd.getPixelRGB(1000, 1000);
        //console.log(color);
        
        //t_bmd.update();
        
		if(movementSide == Side.left){
            player.body.x -= playerSpeed;
            trail.lineTo(player.body.x, player.body.y+player.width/2);
        }else if(movementSide == Side.right){
            player.body.x += playerSpeed;
            trail.lineTo(player.body.x+player.width, player.body.y+player.width/2);
        }else if(movementSide == Side.up){
            player.body.y -= playerSpeed;
            trail.lineTo(player.body.x+player.width/2, player.body.y);   
        }else if(movementSide == Side.down){
            player.body.y += playerSpeed;
            trail.lineTo(player.body.x+player.body.width/2, player.body.y+player.body.width);
        }
        
        //console.log(steps);
        //console.log(player.x);
        //console.log(player.body.x%100);
        //bmdSprite.x = player.x;
        //console.log(Math.round(player.body.x%50));
        if(movementSide != newDir){
        	//console.log(player.body.x%50);
        	//player.body.x = player.body.x - player.body.x%100 + 50;
            //player.body.y = player.body.y - player.body.y%100 + 50;
            if((newDir == Side.up || newDir == Side.down) && (movementSide != Side.up && movementSide != Side.down)){
                if(Math.round(player.body.x%50)==25){
                	/*if((newDir == Side.up && movementSide == Side.left) || (newDir == Side.down && movementSide == Side.left)){
                    	player.body.x = player.body.x - player.body.x%100 + 50;// + 4;
                    	player.body.x += player.body.x%10;
                    	console.log(player.x);
                	}else if((newDir == Side.up && movementSide == Side.right) || (newDir == Side.down && movementSide == Side.right)){
                    	player.body.x = player.body.x - player.body.x%100 + 50;// - 4;
                    	player.body.x -= player.body.x%10;
                    	console.log(player.x);
                	}*/
                    steps+=1;

                    //вносить точки для линий когда игрок за пределами территории
                    if(!onTerrain && !enterFlag){
                        dotIndex += 1;
                        //if(newDir == Side.up){
                            //if(movementSide == Side.left){
                                dots[dots.length] = new Phaser.Point(player.body.x+25, player.body.y+25);
                                dots[dots.length-1].x = Math.round(dots[dots.length-1].x);
                                dots[dots.length-1].y = Math.round(dots[dots.length-1].y);
                                //console.log(dots[dots.length-1].x + '; ' + dots[dots.length-1].y);
                            //} else if(movementSide == Side.right){
                              //  dots[dots.length] = new Phaser.Point(player.body.x+25, player.body.y+25);
                            //}
                        //} else if(newDir == Side.down){
                          //  dots[dots.length] = new Phaser.Point(player.body.x+25, player.body.y + 25);
                        //}

                        lines[lines.length] = new Phaser.Line(dots[dots.length-2].x, dots[dots.length-2].y, dots[dots.length-1].x, dots[dots.length-1].y);//new Line(dots[dots.length-2], dots[dots.length-1]);
                        linesBorder[linesBorder.length] = lines[lines.length-1];
                        //lines[lines.length-1].start.x = Math.round(lines[lines.length-1].start.x);
                        //lines[lines.length-1].start.y = Math.round(lines[lines.length-1].start.y);
                        //lines[lines.length-1].end.x = Math.round(lines[lines.length-1].end.x);
                        //lines[lines.length-1].end.y = Math.round(lines[lines.length-1].end.y);
                        
                        //console.log(Math.round(0.5));

                        

                        for(var i = 0; i < linesBorder.length; i++){
                            if(linesBorder[i].start.y == linesBorder[i].end.y){
                                border_H[border_H.length] = linesBorder[i];
                            }else if(linesBorder[i].start.x == linesBorder[i].end.x){
                                border_V[border_V.length] = linesBorder[i];
                            }
                        }

                        if(!leftBorder || !rightBorder || !topBorder || !buttomBorder){
                            leftBorder = border_V[0];
                            rightBorder = border_V[0];
                            topBorder = border_H[0];
                            buttomBorder = border_H[0];
                            isBorders = true;
                        }

                        for(var i = 0; i < border_V.length; i++){
                            if(leftBorder.start.x > border_V[i].start.x){
                                leftBorder = border_V[i];
                            }
                            if(rightBorder.start.x < border_V[i].start.x){
                                rightBorder = border_V[i];
                            }
                        }

                        for(var i = 0; i < border_H.length; i++){
                            if(buttomBorder.start.y > border_H[i].start.y){
                                buttomBorder = border_H[i];
                            }
                            if(topBorder.start.y < border_H[i].start.y){
                                topBorder = border_H[i];
                            }
                        }

                        if(leftBorder && rightBorder && buttomBorder && topBorder){
                            leftBorder.start.y = buttomBorder.start.y;
                            leftBorder.end.y = topBorder.start.y;

                            rightBorder.start.y = buttomBorder.start.y;
                            rightBorder.end.y = topBorder.start.y;

                            buttomBorder.start.x = leftBorder.start.x;
                            buttomBorder.end.x = rightBorder.start.x;

                            topBorder.start.x = leftBorder.start.x;
                            topBorder.end.x = rightBorder.start.x;
                        }

                        //console.log(linesBorder[linesBorder.length-1].end.x);

                        islines = true;
                    }
                    //polyDots[length] = [player.x, player.y];

                    /*if(movementSide == Side.right){
                        if(newDir == Side.up){
                            dots[dotIndex] = new Phaser.Point(player.right, player.bottom);
                        }else if(newDir == Side.down){
                            dots[dotIndex] = new Phaser.Point(player.right, player.top);
                        }
                    }else if(movementSide == Side.left){
                        if(newDir == Side.up){
                            dots[dotIndex] = new Phaser.Point(player.left, player.bottom);
                        }else if(newDir == Side.down){
                            dots[dotIndex] = new Phaser.Point(player.left, player.bottom);
                        }
                    }*/
                    //console.log(player);

                    t_bmd.update();

                    movementSide = newDir;

                    //trail.moveTo(player.x,player.y);
                    //if(newDir == Side.down){
                        //trail.moveTo(player.body.x, player.body.y+25);
                        
                    //}

                    //trail.lineTo(player.body.x+25, player.body.y+25);
                    //trail.moveTo(player.body.x, player.body.y);
                    //trail.beginFill(0xff0000);
                    //trail.endFill();

                    //trail.lineTo(player.body.x+50, player.body.y);
                    //trail.lineTo(player.body.x, player.body.y);
                    //trail.lineTo(player.body.x+50, player.body.y+50);
                    

                        trail.lineTo(player.body.x+25, player.body.y+25);

                    //territory.lineTo(player.body.x+25, player.body.y+25);
                    
                    
                    //console.log(trail);
                    //console.log(dots);
                }
            } else if((newDir == Side.left || newDir == Side.right) && (movementSide != Side.left && movementSide != Side.right)){
                if(Math.round(player.body.y%50)==25){
                	/*if((newDir == Side.left && movementSide == Side.up) || (newDir == Side.right && movementSide == Side.up)){
                    	player.body.y = player.body.y - player.body.y%100 + 50;// - 5;
                    	player.body.y += player.body.y%10;
                    	console.log(player.y);
                	} else if((newDir == Side.left && movementSide == Side.down) || (newDir == Side.right && movementSide == Side.down)){
                    	player.body.y = player.body.y - player.body.y%100 + 50;// - 5;
                    	player.body.y -= player.body.y%10;
                    	console.log(player.y);
                	}*/
                	steps+=1;

                    //вносить точки для линий когда игрок за пределами территории
                    if(!onTerrain && !enterFlag){
                        dotIndex += 1;
                        dots[dots.length] = new Phaser.Point(player.body.x+25, player.body.y+25);

                        dots[dots.length-1].x = Math.round(dots[dots.length-1].x);
                        dots[dots.length-1].y = Math.round(dots[dots.length-1].y);
                        //console.log(dots[dots.length-1].x + '; ' + dots[dots.length-1].y);

                        lines[lines.length] = new Phaser.Line(dots[dots.length-2].x, dots[dots.length-2].y, dots[dots.length-1].x, dots[dots.length-1].y);//new Line(dots[dots.length-2], dots[dots.length-1]);
                        linesBorder[linesBorder.length] = lines[lines.length-1];

                        for(var i = 0; i < linesBorder.length; i++){
                            if(linesBorder[i].start.y == linesBorder[i].end.y){
                                border_H[border_H.length] = linesBorder[i];
                            }else if(linesBorder[i].start.x == linesBorder[i].end.x){
                                border_V[border_V.length] = linesBorder[i];
                            }
                        }

                        if(!leftBorder || !rightBorder || !topBorder || !buttomBorder){
                            leftBorder = border_V[0];
                            rightBorder = border_V[0];
                            topBorder = border_H[0];
                            buttomBorder = border_H[0];
                            isBorders = true;
                        }

                        for(var i = 0; i < border_V.length; i++){
                            if(leftBorder.start.x > border_V[i].start.x){
                                leftBorder = border_V[i];
                            }
                            if(rightBorder.start.x < border_V[i].start.x){
                                rightBorder = border_V[i];
                            }
                        }

                        for(var i = 0; i < border_H.length; i++){
                            if(buttomBorder.start.y > border_H[i].start.y){
                                buttomBorder = border_H[i];
                            }
                            if(topBorder.start.y < border_H[i].start.y){
                                topBorder = border_H[i];
                            }
                        }

                        if(leftBorder && rightBorder && buttomBorder && topBorder){
                            leftBorder.start.y = buttomBorder.start.y;
                            leftBorder.end.y = topBorder.start.y;

                            rightBorder.start.y = buttomBorder.start.y;
                            rightBorder.end.y = topBorder.start.y;

                            buttomBorder.start.x = leftBorder.start.x;
                            buttomBorder.end.x = rightBorder.start.x;

                            topBorder.start.x = leftBorder.start.x;
                            topBorder.end.x = rightBorder.start.x;
                        }

                        islines = true;
                    }

                    //polyDots[length] = [player.x, player.y];
                   /*if(movementSide == Side.down){
                        if(newDir == Side.left){
                            dots[dotIndex] = new Phaser.Point(player.right, player.bottom);
                        }else if(newDir == Side.right){
                            dots[dotIndex] = new Phaser.Point(player.left, player.bottom);
                        }
                    }else if(movementSide == Side.up){
                        if(newDir == Side.left){
                            dots[dotIndex] = new Phaser.Point(player.right, player.top);
                        }else if(newDir == Side.right){
                            dots[dotIndex] = new Phaser.Point(player.left, player.top);
                        }
                    }*/

                    t_bmd.update();

                    movementSide = newDir;

                    //trail.moveTo(player.x,player.y);
                    //console.log(player.body.overlapX + '; ' + player.body.overlapY);

                    //trail.lineTo(player.body.x+25, player.body.y+25);
                    //trail.moveTo(player.body.x+50, player.body.y+50);
                    //trail.endFill();
                    //trail.beginFill(0xFF700B, 1);

                    trail.lineTo(player.body.x+25, player.body.y+25);



                    //territory.lineTo(player.body.x+25, player.body.y+25);
                    

                    //console.log(trail);
                    //console.log(dots);

                    //POLYGON-------------------------
                    //polyGrap = game.add.graphics(0, 0);
                    //polyGrap.beginFill(0xffd900);
                    //polyGrap.drawPolygon(dots);
                    //polyGrap.endFill();
                }
            }
            //console.log(steps);
            if(steps==99999){
                steps=0;

                //bmd_.clear();
                
                t_bmd.ctx.moveTo(dots[stepLast].x, dots[stepLast].y);
                t_bmd.ctx.fillStyle = '#FFCA00';
                t_bmd.ctx.lineWidth = 50;
                t_bmd.ctx.strokeStyle = '#FFCA00';
                t_bmd.ctx.beginPath();
                //console.log('last step: ' + stepLast);
                
                for(var i = stepLast; i<dots.length;i++){
                    t_bmd.ctx.lineTo(dots[i].x, dots[i].y);
                    dots[i].isTerritory = true;
                    stepLast = i-1;
                }
                //t_bmd.ctx.closePath();
                //t_bmd.ctx.stroke();
                
                t_bmd.ctx.fill();
                //t_bmdSprite.alpha = 0.5;
                t_bmd.update();
                
                //t_bmd.addToWorld();
                //t_bmdSprite.alpha = 0.5;
                //
                //t_bmdSprite.body.clearShapes();
                
                //console.log(dots);
                //console.log(t_bmd.getPixelRGB(player.x, player.y));

                //if(polyDots.length%4 == 0){
                    //t_bmdSprite.body.clearShapes();
                    //t_bmdSprite.body.addPolygon({},polyDots);
                //}
                //Когда игрок выходит за рамки захваченной территории - создать точку в которой он вышел из территории
                //когда игрок входит в свою захваченную территорию - создать точку
                //если в координатах, в которых находится игрок цвет пикселя соответствует цвету территории - заливаем
            }
        }
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
},

Dot = function(x, y){
    this.x = x;
    this.y = y;
}
Line = function(start, end){
    this.start = start;
    this.end = end;
}