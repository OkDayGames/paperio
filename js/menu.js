var menuState = function(game){};
menuState.prototype = {
	preload: function(){
		this.stage.disableVisibilityChange = true;

		var c = Phaser.Color.getColor(217, 179, 140);
    	this.game.stage.backgroundColor = c;

    	var button_play;
		var button_fatalities;
		var button_leaderboard;
		var button_moregames;
		var buttons;

		console.log('menuState');
	},
	create: function(){
		//this.game.input.onDown.add(this.gofull, this);

    	bg_floors = this.game.add.sprite(0,0,'bg_floor');
    	bg_floors.alpha = 0.5;
    	bg_kitchen = this.game.add.sprite(0,0, 'bg_kitchen');
    	title_logo = this.game.add.sprite(0,0, 'title_logo');
    	bg_kitchen.ratio = bg_kitchen.width/bg_kitchen.height;
    	title_logo.ratio = title_logo.width/title_logo.height;
    	bg_kitchen.pivot.y = bg_kitchen.height/2;
    	title_logo.pivot.x = title_logo.width/2; title_logo.pivot.y = title_logo.height/2;

		this.add_btns();
    	this.resize_bg_floor()
    	this.resize_game();
    	this.resize_bg_kitchen();
    	this.resize_title_logo();
    	this.resize_title_logo();
    	this.resize_btns_menu();
    	this.resize_btns_menu();

    	button_play.btn_small.inputEnabled = true;
    	button_play.btn_small.input.useHandCursor = true;
    	button_play.btn_small.events.onInputDown.add(this.button_play_down, this);
    	button_play.btn_small.events.onInputUp.add(this.button_play_up, this);

        this.game.state.start('play');
	},
	update: function(){
		this.resize_game();
		this.resize_bg_kitchen();
    	this.resize_title_logo();
    	this.resize_title_logo();
    	this.resize_btns_menu();
    	this.resize_btns_menu();  
    	this.resize_bg_floor();
	},
	button_play_down: function(){
    	console.log('down');
    	button_play.container.scale.setTo(1.1);
	},
	button_play_up: function(){
    	console.log('up');
    	button_play.container.scale.setTo(1);
    	//this.game.state.start('play');
	},

	gofull: function() {
    	if (this.game.scale.isFullScreen) {
        	//game.scale.stopFullScreen();
        	//console.log('fullscreen off');
    	}
    	else{
        	this.game.scale.startFullScreen(false);
        //console.log('fullscreen on');
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
        	title_logo.x = this.game.width/2;
        	title_logo.y = title_logo.height/1.75;
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
	resize_btns_menu: function(){
    	//position
    	if(window.outerWidth > window.outerHeight){
        	//btns_menu.x = this.game.width - btns_menu.width/2-25;
        	//btns_menu.y = this.game.height/2;
            btns_menu.x = this.game.width/2;
            btns_menu.y = this.game.height/1.5;
    	}else{
       		//btns_menu.x = this.game.width/2;
        	//btns_menu.y = this.game.height- btns_menu.height/2 - 25;
            btns_menu.x = this.game.width/2;
            btns_menu.y = this.game.height/2 + this.game.height/4;
    	}
    	if(window.outerWidth > window.outerHeight){
        	btns_menu.width = this.game.width* 0.3;
        	btns_menu.height = btns_menu.width/btns_menu.ratio; 
        	if(this.game.height < (btns_menu.height*1.1)){
            	btns_menu.height = this.game.height*0.9;
            	btns_menu.width = btns_menu.height*btns_menu.ratio; 
            	//btns_menu.x = this.game.width - this.game.width/4;
                btns_menu.x = this.game.width/2;
                btns_menu.y = this.game.height - this.game.height/4;
        	} 
    	}else{
        	btns_menu.height = this.game.height*0.3;
        	btns_menu.width = btns_menu.height*btns_menu.ratio; 
        	if(this.game.width < (btns_menu.width*1.1)){
           		btns_menu.width = this.game.width*0.9;
            	btns_menu.height = btns_menu.width/btns_menu.ratio;  
            	btns_menu.y = this.game.height - this.game.height/4;
        	}
    	}
        //btns_menu.width = this.game.width*0.2;
        //btns_menu.height = btns_menu.width/btns_menu.ratio;  
	},
	add_btns: function(){    
    	btns_menu = this.game.add.sprite(0,0, 'btns_menu');
    	btns_menu.ratio = btns_menu.width/btns_menu.height;
    	btns_menu.anchor.setTo(0.5,0.5);
    	btns_menu.alpha = 0.0001;
    
    	buttons = this.game.add.group();
   	 	buttons.scale.setTo(1,1);
    	buttons.pivot.set(-5,-90);
 
    	var Button = function(game, btn_small, btn_small_icon, container,scale, posX, posY){
        	this.btn_small = game.add.sprite(posX,posY,btn_small,100);//'btn_small'
        	this.btn_small_icon = game.add.sprite(0,0,btn_small_icon,101);

        	if(btn_small == btn_small_icon){
            	this.btn_small.width = this.btn_small_icon.width;
            	this.btn_small.height = this.btn_small_icon.height;
        	}
        	this.btn_small.anchor.setTo(0.5,0.5);
        	this.btn_small.alpha = 10000;
        	this.btn_small.scale.setTo(scale, scale);

        	this.btn_small_icon.anchor.setTo(0.5,0.5);

        	this.group = game.add.group();
        	this.group.add(this.btn_small);
        	this.group.add(this.btn_small_icon);
        	this.btn_small.addChild(this.btn_small_icon);
        	container.addChild(this.group);

        	this.container = game.add.group();
        	function createShadow(shadow, btn_small){
            	this.btn_shade_L = game.add.sprite(btn_small.x, btn_small.y,'btn_shade');
            	this.btn_shade_rect_L = new Phaser.Rectangle(0, 0, 32, 89);
            	this.btn_shade_L.crop(this.btn_shade_rect_L);
            	this.btn_shade_L.alpha = 10000;

            	this.btn_shade_M = game.add.sprite(btn_small.x,0,'btn_shade');
            	this.btn_shade_rect_M = new Phaser.Rectangle(32, 0, 32, 89);
            	this.btn_shade_M.crop(this.btn_shade_rect_M);
            	this.btn_shade_M.alpha = 10000;

            	this.btn_shade_R = game.add.sprite(btn_small.x,0,'btn_shade');
            	this.btn_shade_rect_R = new Phaser.Rectangle(64, 0, 34, 89);
            	this.btn_shade_R.crop(this.btn_shade_rect_R);
            	this.btn_shade_R.alpha = 10000;

            	shadow.add(this.btn_shade_L);
            	shadow.add(this.btn_shade_M);
            	shadow.add(this.btn_shade_R);

            	this.btn_shade_M.anchor.setTo(0.5,0.5);
            	this.btn_shade_M.x = this.btn_shade_M.x-5;
            	this.btn_shade_M.y = posY-50;
            	if(btn_small.key == 'btn_play'){
                	this.btn_shade_M.x = -6;
                	this.btn_shade_M.y = this.btn_shade_M.y+20;
                	this.btn_shade_M.scale.setTo(2);
            	}

            	this.btn_shade_M.width = btn_small.width-30;
            	this.btn_shade_M.height = 25;
            	this.btn_shade_M.anchor.setTo(0.5,0.5);
            	this.btn_shade_L.anchor.setTo(1,0.5);
            	this.btn_shade_R.anchor.setTo(0,0.5);
           		this.btn_shade_L.x = this.btn_shade_M.x-this.btn_shade_M.width/2;
            	this.btn_shade_L.y = this.btn_shade_M.y;
           	 	this.btn_shade_R.x = this.btn_shade_M.x+this.btn_shade_M.width/2;
            	this.btn_shade_R.y = this.btn_shade_M.y;
            	this.btn_shade_L.scale.setTo(this.btn_shade_M.scale.y);
            	this.btn_shade_R.scale.setTo(this.btn_shade_M.scale.y);
        	}
        	createShadow(this.container, this.btn_small);
        	this.container.addChild(this.group);
        	this.group.x = -5;
        	this.group.y = -95; 
        	buttons.add(this.container);
    	}
    

    	button_fatalities = new Button(this.game,'btn_small','btn_small_icon_fatalities',buttons, 0.45, 0, 80);//renderOrderID
    	button_leaderboard = new Button(this.game,'btn_small','btn_small_icon_leaderboard',buttons, 0.45, 0, 80);
    	button_moregames = new Button(this.game,'btn_small','btn_small_icon_moregames',buttons, 0.45, 0, 80);
    	button_play = new Button(this.game,'btn_play','btn_play', buttons, 0.4,0,80);

    	button_fatalities.container.x = -100;
    	button_fatalities.container.y = 0;
   	 	button_leaderboard.container.x = 0;
    	button_leaderboard.container.y = 0;
    	button_moregames.container.x = 100;
    	button_moregames.container.y = 0;
    	button_play.container.y = -135;
    	button_play.container.scale.setTo(1.05,1.05);

    	btns_menu.addChild(buttons);
	}
}