/*global Audio: false*/
/*global alert: false*/
var x = 100, y = 700;
var test = new Audio("son_robot.mp3");
var image = new Image();
image.src = "barreSpatiale.png";
image.width = 200;
image.height = 50;
var canvas;
var scene;
var rayon = 25;
var pas = 5;
var posx = 100, posy = 600;
var revx = false, revy = false;
var flag = false;
var image2 = new Image();
image2.src = "briquecaillou.png";
image2.width = 80;
image2.height = 40;
var grand = false;
var image3 = new Image();
image3.src = "terre.png";
image3.width = 50;
image3.height = 50;
var pos2x, pos2y, flag2;
var obj = [];

var creaBriques = function () {//création briques (apparement...)
    "use strict";
    canvas = document.getElementById('canvas');
    scene = canvas.getContext("2d");

    var v, i, Briques = function (pos2x, pos2y, flag2) {
        this.x = pos2x;
        this.y = pos2y;
        this.flag2 = flag2;
    };
    for (v = 0; v < 6; v++) {
        for (i = 0; i < 15; i++) {
            pos2x = 83 * i + 19;
            pos2y = 43 * v + 5;
            flag2 = true;
            obj.push(new Briques(pos2x, pos2y, flag2));
        }
    }
};

window.addEventListener("load", creaBriques);

var k, animation = function () {
    "use strict";
    scene.clearRect(0, 0, 1280, 800);
    scene.beginPath();
    scene.drawImage(image3, posx, posy, 50, 50);
    for (k = 0; k < obj.length; k = k + 1) {
        if (flag2) {
            scene.drawImage(image2, obj[k].x, obj[k].y, 80, 40);
        }
    }
    scene.drawImage(image, x, y, image.width, image.height);
    scene.closePath();
    scene.fill();
    if (posx < rayon) {
		posx = rayon;
		revx = false;
    } else if (posx + rayon > 1280) {
        posx = 1280 - rayon;
        revx = true;
    }
	if (!revx) {
		posx = posx + pas;
    } else {
		posx = posx - pas;
    }
    if (posy < rayon) {
        posy = rayon;
        revy = false;
    } else if (posy + rayon > 800) {
        posy = 800 - rayon;
        revy = true;
    }
	if (!revy) {
        posy = posy + pas;
    } else {
		posy = posy - pas;
    }
    if (flag) {
        setTimeout(animation, 10);
    }
    for(j=1;j<obj.length;j++){
    var distx=posx-obj[j].x; //comparaison distance en x
    var disty=posy-obj[j].y; //comparaison distance en y
    var distance=Math.pow((Math.pow(distx,2)+Math.pow(disty,2)),0.5); //calcule distance entre 
    if (distance<(2*(rayon))){
    posx=posx+1;
    posy=posy+1;
    revy=false;
    if(revy=false){
    obj[j].flag2=false;
    }    
    }
    }
    if (flag){
	  setTimeout(animation, 10);
		}
};

//Déplacement de la balle PROTO, appui sur haut pour pause
window.onkeydown = function (event) {
    "use strict";
	if (event.keyCode === 39) {
		if (!flag) {
			flag = true;
			animation();
		}
	}
	if (event.keyCode === 38) {
		flag = false;
	}
};

document.addEventListener("keydown", function (event) {     // commande barre    
    "use strict";
    switch (event.keyCode) {
    case 39:
        if (x >= 1270 - image.width) {
            scene.clearRect(x, y, image.width, image.height);
            x += 0;
            scene.drawImage(image, x, y, image.width, image.height);
        } else {
            scene.clearRect(x, y, image.width, image.height);
            x += 50;
            scene.drawImage(image, x, y, image.width, image.height);
        }
        break;
    case 37:
        if (x <= 2) {
            scene.clearRect(x, y, image.width, image.height);
            x -= 0;
            scene.drawImage(image, x, y, image.width, image.height);
        } else {
            scene.clearRect(x, y, image.width, image.height);
            x -= 50;
            scene.drawImage(image, x, y, image.width, image.height);
        }
        break;
    case 38:
        scene.clearRect(x, y, image.width, image.height);
        image.src = "barreSpatialeDefense.png";
        test.play(); //son
        image.width = 300;
        image.height = 50;
        scene.drawImage(image, x, y, image.width, image.height);
        if (x >= 1272 - image.width) {
            x = 1272 - image.width;
            scene.clearRect(x, y, image.width, image.height);
            scene.drawImage(image, x, y, image.width, image.height);
        }
        break;
    }
// commande barre
});