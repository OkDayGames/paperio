var playState = function(game){};
var prevFly = {key: ''};
var player;
var Side = {'left':'LEFT','right':'RIGHT','up':'UP','down':'DOWN'};
var movementSide;// = Side.down;
var newDir;
var changePos;
var movementLimit;

var lineStep;

var trails = [];
var trailsGraphics;
var trailsCount= 0;
var playerSpeed = 4;

var swipe = {start_x: 0, start_y: 0, end_x: 0, end_y: 0};
playState.prototype = {
	preload: function(){
		this.stage.disableVisibilityChange = true;  
	},
	create: function(){
        game.stage.backgroundColor = '#000000';
        
        game.world.setBounds(0, 0, 2000, 2000);
        //Grid Generation------------------------------------------------------------
        var lines = [];
        var lineWidth = 0.25;
        lineStep = 50;
        var linesCount = 500;

        var linesGraphics = game.add.graphics(0, 0);
        linesGraphics.lineStyle(lineWidth, 0xFFFFFF);
        for(var i = 0; i<linesCount;i++){
            linesGraphics.moveTo(0,i*lineStep);
            linesGraphics.lineTo(2000, i*lineStep);
            lines[i] = linesGraphics.graphicsData[i];
        }
        var columns = [];
        var columnsGraphics = game.add.graphics(0, 0);
        columnsGraphics.lineStyle(lineWidth, 0xFFFFFF);
        for(var i = 0; i<linesCount;i++){
            columnsGraphics.moveTo(i*lineStep, 0);
            columnsGraphics.lineTo(i*lineStep, 2000);
            columns[i] = columnsGraphics.graphicsData[i];
            //console.log(columns[i].shape._points);
        }
        //Guides Generation---------------------------------
        var guides_H = [];
        var guideWidth = 0.25;
        var guidesGraphics_H = game.add.graphics(0, 0);
        guidesGraphics_H.lineStyle(guideWidth, 0xFFFFFF);
        for(var i = 0; i<linesCount;i++){
            guidesGraphics_H.moveTo(0,i*lineStep/2);
            guidesGraphics_H.lineTo(2000, i*lineStep/2);
            guides_H[i] = guidesGraphics_H.graphicsData[i];
        }
        var guides_V = [];
        var guidesGraphics_V = game.add.graphics(0, 0);
        guidesGraphics_V.lineStyle(guideWidth, 0xFFFFFF);
        for(var i = 0; i<linesCount;i++){
            guidesGraphics_V.moveTo(i*lineStep/2, 0);
            guidesGraphics_V.lineTo(i*lineStep/2, 2000);
            guides_V[i] = guidesGraphics_V.graphicsData[i];
        }

        
        //---------------------------------------------------------------------------

        //Player Create--------------------------------------------------------------
        player = game.add.graphics(50, 50);
        player.beginFill(0xFFFFFF);
        player.drawRect(50, 250, 50, 50);
        player.x=this.game.world.centerX;
        player.y=this.game.world.centerY;

        //Trains Create--------------------------------------------------------------
        trailsGraphics = game.add.graphics(0, 0);
        trailsGraphics.moveTo(0,0);
        trailsGraphics.lineTo(0,0)
        trailsGraphics.lineStyle(50, 0xFFFFFF);

        game.input.keyboard.onDownCallback = function(keyCode){
            console.log(keyCode);
            if(keyCode.code == 'ArrowLeft'){
                console.log(player.x%lineStep);
                newDir = Side.left;
                console.log('left');
            }else if(keyCode.code == 'ArrowUp'){
                console.log(player.x%lineStep);
                newDir = Side.up;
                console.log('up');
            }else if(keyCode.code == 'ArrowRight'){
                console.log(player.x%lineStep);
                newDir = Side.right;
                console.log('right');
            }else if(keyCode.code == 'ArrowDown'){
                console.log(player.x%lineStep);
                newDir = Side.down;
                console.log('down');
            }
        };

        this.game.camera.x=player.x-this.game.camera.width/2.5;
        this.game.camera.y=player.y-this.game.camera.height/6;

        game.input.onDown.add(this.beginSwipe, this);
        game.input.onUp.add(this.endingSwipe, this);
	},
	update: function(){
        this.playerMove();
	},
    playerMove: function(){
        this.game.camera.x=player.x-this.game.camera.width/2.5;
        this.game.camera.y=player.y-this.game.camera.height/6;

        this.game.camera.anchor = 0.5;

        if(movementSide == Side.left){
            player.x -= playerSpeed;
            trailsGraphics.lineTo(player.x+100, player.y+275);
        }else if(movementSide == Side.right){
            player.x += playerSpeed;
            trailsGraphics.lineTo(player.x+50, player.y+275);
        }else if(movementSide == Side.up){
            player.y -= playerSpeed;
            trailsGraphics.lineTo(player.x+75, player.y+300);
        }else if(movementSide == Side.down){
            player.y += playerSpeed;
            trailsGraphics.lineTo(player.x+75, player.y+250);
        }

        if(movementSide != newDir){
            if(newDir == Side.up || newDir == Side.down){
                if(player.x%50==0){
                    movementSide = newDir;

                    trailsGraphics.moveTo(player.x+75, player.y+275);
                    trailsGraphics.alpha = 0.5;
                }
            } else if(newDir == Side.left || newDir == Side.right){
                if(player.y%50==0){
                    movementSide = newDir;

                    trailsGraphics.moveTo(player.x+100, player.y+275);
                    trailsGraphics.alpha = 0.5;
                }
            }
        }
    },
    changeDirPos_set: function(){
        changeDir.x = player.x;
        changeDir.y = player.y;

        //console.log(player.x%lineStep);
    },
    
    beginSwipe: function(pointer){
        //console.log('begin swipe');
        swipe.start_x = 0;
        swipe.start_x = pointer.position.x;
        swipe.start_y = pointer.position.y;

        //console.log(swipe);
    },
    endingSwipe: function(pointer){
        //console.log('ending swipe');
        //console.log(pointer);
        swipe.end_x = pointer.position.x;
        swipe.end_y = pointer.position.y;

        if(swipe.start_x > swipe.end_x && ((swipe.start_y - swipe.end_y < swipe.start_x - swipe.end_x) || (swipe.end_y - swipe.start_y > swipe.start_x - swipe.end_x))){
            newDir = Side.left;
            //console.log('swipe left');
        }else if(swipe.start_x < swipe.end_x && ((swipe.start_y - swipe.end_y > swipe.start_x - swipe.end_x) || (swipe.end_y - swipe.start_y < swipe.start_x - swipe.end_x))){
            newDir = Side.right;
            //console.log('swipe right');
        }else if(swipe.start_y < swipe.end_y && ((swipe.start_x - swipe.end_x > swipe.start_y - swipe.end_y) || (swipe.end_x - swipe.start_x < swipe.start_y - swipe.end_y))){
            newDir = Side.down;
            //console.log('swipe down');
        }else if(swipe.start_x > swipe.end_x && ((swipe.start_x - swipe.end_x < swipe.start_y - swipe.end_y) || (swipe.end_x - swipe.start_x > swipe.start_y - swipe.end_y))){
            newDir = Side.up;
            //console.log('swipe up');
        }

        //console.log(swipe);
    },
}