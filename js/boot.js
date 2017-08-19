var bootState = function(game){};

bootState.prototype = {
	create: function(){
        //console.log('bootState');
        this.game.state.start('load');
    }
}