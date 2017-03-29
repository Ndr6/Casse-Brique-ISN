/*global Audio: false*/
/*global alert: false*/
var x = 540, y = 700;
var test = new Audio("son_robot.mp3");
var image = new Image();
image.src = "barreSpatiale.png";
image.width = 200;
image.height = 50;
var canvas;
var scene;
var rayon = 25;
var pas = 5;
var posx = 615, posy = 649;
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
var keyState = {};
var pupDef = false;
var animation;

//Fonction de création des briques (apparement...)
var creaBriques = function () {
    "use strict";
    canvas = document.getElementById('canvas');
    scene = canvas.getContext("2d");

    var v, i, Briques = function (pos2x, pos2y, flag2) {
        this.x = pos2x;
        this.y = pos2y;
        this.flag2 = flag2;
    };
    for (v = 0; v < 6; v += 1) {
        for (i = 0; i < 15; i += 1) {
            pos2x = 83 * i + 19;
            pos2y = 43 * v + 5;
            flag2 = true;
            obj.push(new Briques(pos2x, pos2y, flag2));
        }
    }
};
//Fin création briques

//Appel de la fonction de création des briques au chargement terminé de la page
window.addEventListener("load", creaBriques);

//Écoute des touches
window.addEventListener('keydown', function (e) {
    "use strict";
    keyState[e.keyCode || e.which] = true;
}, true);
window.addEventListener('keyup', function (e) {
    "use strict";
    keyState[e.keyCode || e.which] = false;
}, true);
//Fonction de commnde raquette next gen
function controls() {
    "use strict";
    //Contrôles flèche gauche et "q"
    if (keyState[37] || keyState[81]) {
        if (x <= 2) {
            scene.clearRect(x, y, image.width, image.height);
            x -= 0;
            scene.drawImage(image, x, y, image.width, image.height);
        } else {
            scene.clearRect(x, y, image.width, image.height);
            x -= 15;
            scene.drawImage(image, x, y, image.width, image.height);
        }
    }
    //Contrôles flèche droite et "d"
    if (keyState[39] || keyState[68]) {
        if (x >= 1270 - image.width) {
            scene.clearRect(x, y, image.width, image.height);
            x += 0;
            scene.drawImage(image, x, y, image.width, image.height);
        } else {
            scene.clearRect(x, y, image.width, image.height);
            x += 15;
            scene.drawImage(image, x, y, image.width, image.height);
        }
    }
    //Lancement de la balle (espace)
    if (keyState[32] && !flag) {
        flag = true;
        animation();
    }
    //CHEAT Pause de la balle (espace)
    //if (keyState[32] && flag) {
    //    flag = false;
    //    animation();
    //}
    //CHEAT Powerup
    if (keyState[49] && !pupDef) {
        scene.clearRect(x, y, image.width, image.height);
        image.src = "barreSpatialeDefense.png";
        //test.play(); la ferme !
        image.width = 288;
        image.height = 50;
        pupDef = true;
        x -= 44;
        scene.drawImage(image, x, y, image.width, image.height);
        if (x >= 1272 - image.width) {
            x = 1272 - image.width;
            scene.clearRect(x, y, image.width, image.height);
            scene.drawImage(image, x, y, image.width, image.height);
        }
    }
    
    setTimeout(controls, 15);
}
var k;
animation = function () {
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

    //Collisions briques
    var j, distx, disty, distance;
    for (j = 1; j < obj.length; j += 1) {
        distx = posx - obj[j].x; //comparaison distance en x
        disty = posy - obj[j].y; //comparaison distance en y
        distance = Math.pow((Math.pow(distx, 2) + Math.pow(disty, 2)), 0.5); //calcule distance entre 
        if (distance < (2 * rayon)) {
            posx = posx + 1;
            posy = posy + 1;
            revy = false;
            if (revy === false) {
                obj[j].flag2 = false;
            }
        }
    }
    //Fin collisions briques
    
    if (flag) {
        setTimeout(animation, 10);
    }
    //Appel de la fonction contrôle raquette
};
setTimeout(animation, 500);
setTimeout(controls, 750);

/*//Déplacement de la balle PROTO, appui sur haut pour pause
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
};*/
//Fin partie commande
