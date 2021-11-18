var heroHappySprite;
var heroTalkingSprite;
var heroWonderingSprite;
var bossTalkingSprite;
var boss2TalkingSprite;
var bossSadSprite;

var dialogs = [];

function addDialog(sprite, text){
	dialogs.push({
		img: sprite,
		x: 0,
		y: 480 - 64,
		w: 64,
		h: 64,
		text: text,
		duration: fps * 2
	});
}

function drawDialog(){
	if(dialogs.length > 0){
		ctx.fillStyle = 'black';
		ctx.fillRect(0, 480 - 64, 640, 64);
		drawSprite(dialogs[0]);
		ctx.font = '24px monospace';
		ctx.fillStyle = 'white';
		ctx.fillText(dialogs[0].text, 64 + 12, 480 - 24);
		dialogs[0].duration--;
		if(dialogs[0].duration == 0){
			dialogs.shift();
		}
	}
}