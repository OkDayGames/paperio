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
        console.log('preload function');
        alert('preload function');
	},

	create: function(){
       }
}