// forked from about_hiroppy's "particle" http://jsdo.it/about_hiroppy/qHr0
var canvas;
var ctx;
var particles = [];
var mouseX = 250;
var mouseY = 250;
var radian = 100;
var distance = 50;
var spring = 0.6;
var friction = 0.5;

function init(){
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	for(var i=0;i<100;i++){
		for(var j=0;j<100;j++){
			var p = {};
			p.x = i*3+100;
			p.y = j*3+100;
			p.tx = i*3+100;
			p.ty = j*3+100;
			p.vx = 0;
			p.vy = 0;
			particles.push(p);
		}
	}

	canvas.onmousemove = onMouseEvent;
	draw();
}

function onMouseEvent(e){
	mouseX = e.clientX;
    mouseY = e.clientY;
}

function draw(){
	ctx.fillStyle = "rgb(0, 0, 0)";
	ctx.fillRect(0,0,500,500);
	ctx.fillStyle = "rgb(0,250,250)";

	var n = particles.length;
	var gx = mouseX;
	var gy = mouseY;

	while(n--){
		var p = particles[n];
		var angle = Math.atan2(p.y - mouseY,p.x - mouseX);
		var d = Math.sqrt(Math.pow(mouseX-p.x,2)+Math.pow(mouseY-p.y,2));
		var circle = radian / distance;
		if(d < distance){
			p.x += circle*Math.cos(angle) + (p.tx - p.x)*0.1;
			p.y += circle*Math.sin(angle) + (p.ty - p.y)*0.1;
		}
		else{
			p.vx += (p.tx - p.x)*spring*friction;
			p.vy += (p.ty - p.y)*spring*friction;
			p.x += (p.tx - p.x)*0.2+p.vx;
			p.y += (p.ty - p.y)*0.2+p.vy;
		}
		ctx.fillRect(p.x,p.y,1,1);
	}
	setTimeout(draw,30);
}


