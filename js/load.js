var loadState = function(game){};

loadState.prototype = {
	preload: function(){
        /*
		this.game.load.image('bg_kitchen', 'assets/sprites/background.jpg');
    	this.game.load.image('bg_floor', 'assets/sprites/gtk_bg_floor.png');
    	this.game.load.image('title_logo', 'assets/sprites/gtk_title_logo.png');
    	this.game.load.image('btns_menu', 'assets/sprites/buttons_menu.png');
    	this.game.load.image('btn_play', 'assets/sprites/ui/gtk_btn_play.png');
    	this.game.load.image('btn_small', 'assets/sprites/ui/gtk_btn_small.png');
    	this.game.load.image('btn_small_icon_fatalities', 'assets/sprites/ui/gtk_btn_small_fatalities.png');
    	this.game.load.image('btn_small_icon_leaderboard', 'assets/sprites/ui/gtk_btn_small_leaderboard.png');
    	this.game.load.image('btn_small_icon_moregames', 'assets/sprites/ui/gtk_btn_small_moregames.png');
    	this.game.load.image('btn_shade', 'assets/sprites/ui/gtk_btn_shade.png');

    	this.game.load.image('btn_guess', 'assets/sprites/ui/gtk_btn_guess.png');
    	this.game.load.image('btn_guess_right', 'assets/sprites/ui/gtk_btn_guess_right.png');
    	this.game.load.image('btn_guess_wrong', 'assets/sprites/ui/gtk_btn_guess_wrong.png');

    	this.game.load.image('timer', 'assets/sprites/ui/gtk_timer.png');
    	this.game.load.image('round_indicator', 'assets/sprites/ui/gtk_round_indicator.png');
    	this.game.load.image('bg_wall', 'assets/sprites/ui/gtk_bg_wall.png');
		//this.game.state.start('game');
		//console.log(guess);
        this.game.load.image('grid', 'assets/sprites/grid.png');

        for(var i = 1; i < 62; i++){
            this.game.load.image('fly_'+i, 'assets/sprites/butterflies/'+i+'.png');
        }
        */
	},

	create: function(){
		//this.game.state.start('menu');
		console.log('loadState');
		//this.game.state.start('menu');
        this.game.state.start('play');
	}
}