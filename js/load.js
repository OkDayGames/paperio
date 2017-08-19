var loadState = function(game){};

loadState.prototype = {
	preload: function(){
		this.game.load.image('player', 'asset/square.png');
		this.game.load.image('territory', 'asset/territory.png');
	},

	create: function(){
        this.game.state.start('game');
	}
}