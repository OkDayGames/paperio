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
var playerSpeed = 2;

var swipe = {start_x: 0, start_y: 0, end_x: 0, end_y: 0};
playState.prototype = {
    Flyes: function(rows,columns){
        console.log('rows: '+rows);
        var arr = [];
        var graph = [];
        grid.alpha = 0.0001;
        for(var i=0; i<rows; i++){
            arr[i] = [];
            graph[i] = [];
            for(var j=0; j<columns; j++){
                graph[i][j] = 1;
                if(Math.random() < 0.9){
                    arr[i][j] = game.add.sprite(-100, -100, 'fly_' + (Math.floor(Math.random() * (62 - 1)) + 1));
                }else{
                    if(Math.random() > 0.5){
                        if(j > 0){
                            arr[i][j] = game.add.sprite(-100, -100, arr[i][j-1].key);
                        }else if(i > 0){
                            arr[i][j] = game.add.sprite(-100, -100, arr[i-1][j].key);
                        }else{
                            arr[i][j] = game.add.sprite(-100, -100, arr[0][0].key);
                        }
                    }else{
                        if(i > 0){
                            arr[i][j] = game.add.sprite(-100, -100, arr[i-1][j].key);
                        }else if(j > 0){
                            arr[i][j] = game.add.sprite(-100, -100, arr[i][j-1].key);
                        }else{
                            arr[i][j] = game.add.sprite(-100, -100, arr[0][0].key);
                        } 
                    }
                }
                arr[i][j].step = 0;
                arr[i][j].tag = 1;
                arr[i][j].ratio = arr[i][j].width/arr[i][j].height;
                arr[i][j].width = grid.width/14*0.9;
                arr[i][j].height = grid.height/10*0.9;
                grid.addChild(arr[i][j]);
                arr[i][j].x = i*grid.width/rows;
                arr[i][j].y = j*grid.height/columns;
                arr[i][j].alpha = 10000;

                arr[i][j].i = i;
                arr[i][j].j = j;
                arr[i][j].inputEnabled = true;
                arr[i][j].events.onInputDown.add(function(){
                    console.log('/-----------------------------------------------');
                    if((this.key == prevFly.key) && ((prevFly.x != this.x) || (prevFly.y != this.y))){
                        this.alpha = 0.0001;
                        prevFly.alpha = 0.0001;
                        this.tag = 0;
                        prevFly.tag = 0;

                        prevFly.key = '';

                        graph[this.i][this.j] = 0;
                        graph[prevFly.i][prevFly.j] = 0;
                        console.log(graph);

                        var count = 0;
                        var startPoint = prevFly;
                        arr.forEach(function(entry) {
                            entry.forEach(function(entry) {
                                //console.log(entry.tag);
                                //console.log(entry.step);
                                //console.log(index);
                                //if(entry.step == 0 && entry.tag == 0){
                                //  count += 1;
                                //  entry.step = count;
                                //}
                                //reset steps
                                //entry.step = 0;
                            });
                        });

                        console.log(prevFly.i + '; ' + prevFly.j);
                        console.log(this.i + '; ' + this.j);
                        //console.log(_graph);
                        //console.log(_graph.elements);
                        console.log('//result');

                        //console.log(result);
                    }else{
                        prevFly = this;
                    }
                    console.log();
                }, arr[i][j]);
            }
        }
        //console.log(arr[0][0].key);
        console.log(grid);
        console.log(graph);

        return arr;
    },
    fly_click: function(){
        console.log(this.key);
    },
	preload: function(){
		this.stage.disableVisibilityChange = true;

		//var c = Phaser.Color.getColor(217, 179, 140);
    	//this.game.stage.backgroundColor = c;
        
	},
	create: function(){
        game.stage.backgroundColor = '#000000';
        console.log('!!!');
    	//bg_floors.alpha = 0.5;

    	//bg_kitchen = this.game.add.sprite(0,0, 'bg_kitchen');
    	//bg_kitchen.ratio = bg_kitchen.width/bg_kitchen.height;
    	//bg_kitchen.pivot.y = bg_kitchen.height/2;

        //bg_kitchen.alpha = 0.65;
        //grid = this.game.add.sprite(0, 0, 'grid');
        //grid.ratio = grid.width / grid.height;
        //grid.pivot.x = grid.width / 2;
        //grid.pivot.y = grid.height / 2;
        //this.add_fly()
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

        //Player Create------------------------------------------------------------
        
        //game.physics.startSystem(Phaser.Physics.P2JS);
        //player = game.add.sprite(game.world.centerX, game.world.centerY, 'bg_floor');
        
        console.log(this.game.camera);

        player = game.add.graphics(50, 50);
        player.beginFill(0xFFFFFF);
        //graphics.lineStyle(2, 0x0000FF, 1);
        player.drawRect(50, 250, 50, 50);
        player.x=this.game.world.centerX;
        player.y=this.game.world.centerY;
        //player.x = player.x;
        //player.y = player.y;
        //game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

        trailsGraphics = game.add.graphics(0, 0);
        trailsGraphics.moveTo(0,0);
        trailsGraphics.lineTo(0,0)
        trailsGraphics.lineStyle(50, 0xFFFFFF);
        //trailsGraphics.moveTo(0,0);
        //trailsGraphics.lineTo(0, 0);
        //trailsGraphics.moveTo(player.x+75, player.y+300);
        //trailsGraphics.lineTo(player.x+75, 2000);

        console.log(player.worldPosition.x + '|'+ player.worldPosition.y);
        

        console.log('trailsGraphics----------');
        console.log(trailsGraphics);
        console.log('trailsGraphics----------');
        //this.game.camera.pivot= 0.5

        console.log(player);
        //game.camera.follow(player);

        game.input.keyboard.onDownCallback = function(keyCode){
            console.log(keyCode);
            if(keyCode.code == 'ArrowLeft'){
                console.log(player.x%lineStep);
                newDir = Side.left;
                //movementSide = Side.left;
                console.log('left');
            }else if(keyCode.code == 'ArrowUp'){
                console.log(player.x%lineStep);
                //movementSide = Side.up;
                newDir = Side.up;
                console.log('up');
            }else if(keyCode.code == 'ArrowRight'){
                console.log(player.x%lineStep);
                //movementSide = Side.right;
                newDir = Side.right;
                console.log('right');
            }else if(keyCode.code == 'ArrowDown'){
                console.log(player.x%lineStep);
                newDir = Side.down;
                //movementSide = Side.down;
                console.log('down');
            }
        };

        this.game.camera.x=player.x-this.game.camera.width/2.5;
        this.game.camera.y=player.y-this.game.camera.height/6;

        game.input.onDown.add(this.beginSwipe, this);
        game.input.onUp.add(this.endingSwipe, this);
	},
	update: function(){
		this.resize_game();
		//this.resize_bg_kitchen();
        //this.resize_grid();
        //console.log(game.input.mousePointer.x + ' ' + game.input.mousePointer.y);
        
        this.playerMove();

        //console.log(50%-35);
	},
    playerMove: function(){
        //console.log('centerX: ' + this.game.world.centerX);
        //console.log('centerY: ' + this.game.world.centerY);
        //trailsGraphics.moveTo(player.x+100, player.y+275);

        this.game.camera.x=player.x-this.game.camera.width/2.5;
        this.game.camera.y=player.y-this.game.camera.height/6;

        this.game.camera.anchor = 0.5;
        //this.trailCreate();
        //console.log('player: x = '+player.x+', y = ' + player.y + '; camera: x = ' + this.game.camera.x + ', y = ' + this.game.camera.y);

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

        console.log(player.x%lineStep);
    },
    trailCreate: function(){
        //trails[trailsCount] = game.add.graphics(0, 0);
        //trailsGraphics.moveTo(player.x, player.y);
        //trailsGraphics.lineTo(1000, 1000);
        //trails[0] = trailsGraphics.graphicsData[0];

        //console.log(trails[0]);
        //console.log(trailsGraphics);

        //trailsCount+=1;
    },
    beginSwipe: function(pointer){
        console.log('begin swipe');
        swipe.start_x = 0;
        swipe.start_x = pointer.position.x;
        swipe.start_y = pointer.position.y;

        console.log(swipe);
    },
    endingSwipe: function(pointer){
        console.log('ending swipe');
        //console.log(pointer);
        swipe.end_x = pointer.position.x;
        swipe.end_y = pointer.position.y;

        if(swipe.start_x > swipe.end_x && ((swipe.start_y - swipe.end_y < swipe.start_x - swipe.end_x) || (swipe.end_y - swipe.start_y > swipe.start_x - swipe.end_x))){
            newDir = Side.left;
            console.log('swipe left');
        }else if(swipe.start_x < swipe.end_x && ((swipe.start_y - swipe.end_y > swipe.start_x - swipe.end_x) || (swipe.end_y - swipe.start_y < swipe.start_x - swipe.end_x))){
            newDir = Side.right;
            console.log('swipe right');
        }else if(swipe.start_y < swipe.end_y && ((swipe.start_x - swipe.end_x > swipe.start_y - swipe.end_y) || (swipe.end_x - swipe.start_x < swipe.start_y - swipe.end_y))){
            newDir = Side.down;
            console.log('swipe down');
        }else if(swipe.start_x > swipe.end_x && ((swipe.start_x - swipe.end_x < swipe.start_y - swipe.end_y) || (swipe.end_x - swipe.start_x > swipe.start_y - swipe.end_y))){
            newDir = Side.up;
            console.log('swipe up');
        }

        console.log(swipe);
    },




    add_fly: function(){
        var flyes = new this.Flyes(14,10);
        //console.log(allFlyes);
        console.log(flyes);
        flyes[0][0].events.onInputDown.add(this.fly_click);
        flyes.forEach(function(entry) {
            entry.forEach(function(entry) {
                entry.inputEnabled = true
                //console.log(entry);
                //entry.events.onInputDown.add(this.fly_click, this);
            });
        });
    },
    resize_grid: function(){
        var scale = 0.6;
        grid.x = this.game.width / 2;
        grid.y = this.game.height / 2;
        if(window.outerWidth > window.outerHeight){
            grid.height = this.game.height * scale;
            grid.width = grid.height * grid.ratio;
            if(grid.height > window.outerHeight * scale){
                //grid.height = window.outerHeight * scale;
                //grid.width = grid.height * grid.ratio;
                //console.log('123213121212121');
            }
            //console.log('!@#!@#!@#!#@#@!#');
        }else{
            grid.width = this.game.width * scale*1.4;
            grid.height = grid.width / grid.ratio;
            if(grid.width > window.outerWidth * scale){
                //grid.width = window.outerWidth * scale;
                //grid.height = grid.width / grid.ratio;                
            }
            //console.log('???????????');
        }
    },
	resize_bg_floor: function(){
    	if(window.outerWidth > window.outerHeight){
        	bg_floors.height = this.game.height/3+20;   
        	bg_floors.width = this.game.width;   
        	bg_floors.y = 2*this.game.height/3-10;
    	}else{
        	bg_floors.height = this.game.height/2+20; 
        	bg_floors.width = this.game.width;   
        	bg_floors.y = this.game.height/2-10;
    	}
	},

	resize_game: function(){
    	this.game.scale.setGameSize(window.innerWidth, window.innerHeight);
	},
	resize_bg_kitchen: function(){
    	if(window.outerWidth > window.outerHeight){
            bg_kitchen.height = this.game.height;// - this.game.height/3;
            bg_kitchen.width = bg_kitchen.height * bg_kitchen.ratio;
            bg_kitchen.y = this.game.height/2;//3;
            if(bg_kitchen.width < this.game.width){
                bg_kitchen.width = this.game.width;
                bg_kitchen.height = bg_kitchen.width/bg_kitchen.ratio;
                bg_kitchen.x = (game.width - bg_kitchen.width)/2;
            }else{
                bg_kitchen.x = (game.width - bg_kitchen.width)/2;
            }
        }else{
            bg_kitchen.height = this.game.height;///2;
            bg_kitchen.width = bg_kitchen.height * bg_kitchen.ratio;
            bg_kitchen.y = this.game.height/2;
            if(bg_kitchen.width > this.game.width){
                bg_kitchen.x = (game.width - bg_kitchen.width)/2;
            }else{
                bg_kitchen.x = game.width/2;
            }
        }
	},
	resize_title_logo: function(){
    	//position
    	if(window.outerWidth > window.outerHeight){
        	title_logo.x = title_logo.width/2+25;
        	title_logo.y = this.game.height/2;
    	}else{
        	title_logo.x = this.game.width/2;
        	title_logo.y = title_logo.height/1.3;   
    	}
    	//size
    	if(window.outerWidth > window.outerHeight){
        	title_logo.width = this.game.width*0.44;  
        	title_logo.height = title_logo.width/title_logo.ratio;
        if(this.game.height < (title_logo.height*1.25)){
            title_logo.height = this.game.height*0.8;
            title_logo.width = title_logo.height*title_logo.ratio;  
            title_logo.x = this.game.width/3.8;
        }
    	}else{
        	title_logo.height = this.game.height*0.4;
        	title_logo.width = title_logo.height*title_logo.ratio; 
        	if(this.game.width < (title_logo.width*1.1)){
            	title_logo.width = this.game.width*0.9;
            	title_logo.height = title_logo.width/title_logo.ratio;  
            	title_logo.y = this.game.height/3.25;
        	}
    	}
	},
	resize_btns: function(){
    	//position
    	if(window.outerWidth > window.outerHeight){
        	btns_menu.x = this.game.width - btns_menu.width/2-25;
        	btns_menu_top.x = btns_menu.x;
        	btns_menu.y = this.game.height/1.8;
        	btns_menu_top.y = this.game.height/5;
        	
        	btn_guess_1.container.y = -80;//-70; 
        	btn_guess_2.container.y = 0;//20;
        	btn_guess_3.container.y = 80;//110;
        	
        	btns_menu_top.x = btns_menu.x;
        	timer.container.position.x = 0;
        	btns_menu_top.addChild(timer.container);
        	timer.container.x = -30;
        	timer.container.y = -50;
        	timer.container.scale.setTo(1.1,1.1);
        	//timer.container.height = 200;
        	btns_menu_top.y = (this.game.height + btn_guess_1.container.position.y)/5;

    	}else{
       		btns_menu.x = this.game.width/2;
       		btns_menu_top.x = btns_menu.x;
        	btns_menu.y = this.game.height - btns_menu.height/2 - 50;
       		btns_menu_top.y = this.game.height/18;
        	
        	btn_guess_1.container.y = -40;//-60; 
        	btn_guess_2.container.y = 30;//20; 
        	btn_guess_3.container.y = 100;//100; 

        	btns_menu_top.x = btns_menu.x;
        	timer.container.position.x = 0;
        	btns_menu_top.addChild(timer.container);
        	timer.container.x = 0;
        	timer.container.y = 0;
        	timer.container.scale.setTo(1,1);
        	//timer.container.height = 200;
    	}
    	//size
    	if(window.outerWidth > window.outerHeight){
        	btns_menu.width = this.game.width*0.4;
        	btns_menu.height = btns_menu.width/btns_menu.ratio; 
        	if(this.game.height < (btns_menu.height*1.1)){
            	btns_menu.height = this.game.height*0.9;
            	btns_menu.width = btns_menu.height*btns_menu.ratio; 
            	btns_menu.x = this.game.width - this.game.width/4;
        	} 
    	}else{
        	btns_menu.height = this.game.height*0.45;
        	btns_menu.width = btns_menu.height*btns_menu.ratio; 
        	if(this.game.width < (btns_menu.width*1.1)){
           		btns_menu.width = this.game.width*0.9;
            	btns_menu.height = btns_menu.width/btns_menu.ratio;  
            	btns_menu.y = this.game.height - this.game.height/4.75;
        	}
    	}
    	btns_menu_top.x = btns_menu.x;
    	btns_menu_top.width = btns_menu.width;
    	btns_menu_top.height = btns_menu_top.width/btns_menu_top.ratio;
	},

	add_btns: function(){
		btns_menu = this.game.add.sprite(0,0, 'btns_menu');
    	btns_menu.ratio = btns_menu.width/btns_menu.height;
    	btns_menu.anchor.setTo(0.5,0.5);	
    	btns_menu.alpha = 0.0001;

    	btns_menu_top = this.game.add.sprite(0,0, 'btns_menu');
    	btns_menu_top.scale.setTo(0.8,0.2);
    	btns_menu_top.ratio = btns_menu_top.width/btns_menu_top.height;
    	btns_menu_top.anchor.setTo(0.5,0.5);	
    	btns_menu_top.alpha = 0.0001;

    	buttons = this.game.add.group();

    	var Button = function(game, sprite, width, height, posX, posY){
    		this.btn_L = game.add.sprite(0, 0, sprite);
    		this.btn_M = game.add.sprite(0, 0, sprite);
    		this.btn_R = game.add.sprite(0, 0, sprite);

    		if(sprite == 'btn_guess'){
    			this.btn_rect_L = new Phaser.Rectangle(0, 0, 17, 141);
    			this.btn_rect_M = new Phaser.Rectangle(17, 0, 8, 141);
    			this.btn_rect_R = new Phaser.Rectangle(25, 0, 17, 141);
    		}else if(sprite == 'timer'){
    			this.btn_rect_L = new Phaser.Rectangle(0, 0, 14, 74);
    			this.btn_rect_M = new Phaser.Rectangle(14, 0, 22, 74);
    			this.btn_rect_R = new Phaser.Rectangle(36, 0, 14, 74);
    		}

    		this.btn_L.crop(this.btn_rect_L);
    		this.btn_M.crop(this.btn_rect_M);
    		this.btn_R.crop(this.btn_rect_R);

    		this.btn_L.alpha = 10000;
    		this.btn_M.alpha = 10000;
    		this.btn_R.alpha = 10000;

    		this.btn_M.anchor.setTo(0.5,0.5);
    		this.btn_L.anchor.setTo(1,0.5);
            this.btn_R.anchor.setTo(0,0.5);

            this.btn_M.width = width;
            this.btn_M.height = height;
            this.btn_M.x = posX;
            this.btn_M.y = posY;

            //this.btn_L.width = width;
            if(sprite != 'timer'){
            	this.btn_L.height = height;
            	this.btn_L.width = 2*this.btn_L.width/(width/height);
            	this.btn_L.x = posX - this.btn_M.width/2;
            	this.btn_L.y = posY;
            	this.btn_R.height = height;
            	this.btn_R.width = 2*this.btn_R.width/(width/height);
            	this.btn_R.x = posX + this.btn_M.width/2;
            	this.btn_R.y = posY;
        	}else{
        		this.btn_L.height = height;
            	this.btn_L.width = this.btn_L.width/(width/height)/1.25;
            	this.btn_L.x = posX - this.btn_M.width/2;
            	this.btn_L.y = posY;
            	this.btn_R.height = height;
            	this.btn_R.width = this.btn_R.width/(width/height)/1.25;
            	this.btn_R.x = posX + this.btn_M.width/2;
            	this.btn_R.y = posY;
        	}
            this.container = game.add.group();

            this.container.add(this.btn_L);
            this.container.add(this.btn_M);
            this.container.add(this.btn_R);
    	}

    	btn_guess_1 = new Button(this.game, 'btn_guess', 270, 60, 0, 0);
    	btn_guess_2 = new Button(this.game, 'btn_guess', 270, 60, 0, 0);
    	btn_guess_3 = new Button(this.game, 'btn_guess', 270, 60, 0, 0);

    	timer = new Button(this.game, 'timer', 180, 140, 0, 0);
    	//btn.container.scale.setTo(1.5);
    	round_indicator = this.game.add.sprite(0,0,'round_indicator');
    	//buttons.add(btn);
    	btns_menu.addChild(btn_guess_1.container);
    	btns_menu.addChild(btn_guess_2.container);
    	btns_menu.addChild(btn_guess_3.container);
    	

    	timer.container.x = 0;
    	//btn.container.x = -300;
    	btn_guess_1.container.y = -100;
    	btn_guess_2.container.y = 0;
    	btn_guess_3.container.y = 100;
    	//timer.container.x = -20;
    	//timer.container.y = -200;
    	
    	round_indicator.alpha = 10000;
    	round_indicator.anchor.setTo(0.5, 0.5);
    	round_indicator.scale.setTo(0.45,1.8);
    	//btns_menu_top.addChild(round_indicator);
    	//btns_menu.addChild(round_indicator);
    	timer.container.add(round_indicator);
    	round_indicator.x = timer.container.x+130;
    	round_indicator.y = timer.container.y;
    	console.log(round_indicator.x);
    	console.log(btns_menu.x);
    	
	},
	add_bg_wall: function(){
		bg_wall = this.game.add.sprite(0,0,'bg_wall');
		bg_wall.ratio = bg_wall.width/bg_wall.height;
		bg_wall.anchor.setTo(0.5,0.5);
	},
	resize_bg_wall: function(){
		if(game.width>game.height){
			bg_wall.alpha = 1;
			bg_wall.x = game.width;
			bg_wall.y = game.height/2;
			bg_wall.height = this.game.height+50;
			if(this.game.height > bg_wall.height){

			}
		bg_wall.x = btns_menu.x;//this.game.width*0.53;
		bg_wall.width = btns_menu.width*1.2;
		bg_wall.height = this.game.height*1.2;
		}else{
			bg_wall.alpha = 0;
		}
	}
}