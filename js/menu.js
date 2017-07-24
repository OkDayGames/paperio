var menuState = function(game){};
menuState.prototype = {
	preload: function(){
		
	},
	create: function(){
		
	},
	update: function(){

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
}