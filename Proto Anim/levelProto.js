/*global Audio: false*/
/*global alert: false*/

/***************************************
        Déclaration des variables
***************************************/

//Variables canvas
var canvas;
var scene;
var animation;

//Variables raquette
var x = 540, y = 700; //Dimensions balle

var image = new Image();
image.src = "Raquette.png"; //Asset graphique barre
image.width = 200;
image.height = 50; //Dimensions asset barre

var pupDef = false; //Flag powerup défense
var test = new Audio("PUPDef_sound.mp3");

//Variables balle
var flag = false; //Activation de la balle
var move = true; //Activation de la raquette
var rayon = 25; //Rayon balle
var pas = 5; //Vitesse animation
var posx = 615, posy = 649; //Position initiale de la balle
var revx = false, revy = false; //Sens animation balle

var k, distx, disty, distance, j;

var image3 = new Image();
image3.src = "balle.png";
image3.width = 50;
image3.height = 50;

//Variables briques

var image2 = new Image();
image2.src = "briqueProto.png";
image2.width = 80;
image2.height = 40;

var pos2x, pos2y, flag2;
var obj = [];

//Variables contrôles
var keyState = {};

/****************************************
           Début du programme
****************************************/

//Fonction de définition du pattern de briques (plutôt basique pour l'instant)
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

//Appel de la fonction de création des briques au chargement terminé de la page
window.addEventListener("load", creaBriques);

//Écoute des touches pour contrôles
window.addEventListener('keydown', function (e) {
    "use strict";
    keyState[e.keyCode || e.which] = true;
}, true);
window.addEventListener('keyup', function (e) {
    "use strict";
    keyState[e.keyCode || e.which] = false;
}, true);

//Fonction de contrôles raquette next gen
function controls() {
    "use strict";
    //Contrôles flèche gauche et "q"
    if (keyState[37] || keyState[81]) {
        if (move) {
            if (x <= 0) {
                scene.clearRect(x, y, image.width, image.height);
                x -= 0;
                scene.drawImage(image, x, y, image.width, image.height);
            } else {
                scene.clearRect(x, y, image.width, image.height);
                x -= 15;
                scene.drawImage(image, x, y, image.width, image.height);
            }
            if (!flag && posx >= 65) {
                posx -= 15;
                scene.clearRect(0, 0, 1280, 800);
                scene.beginPath();
                scene.drawImage(image3, posx, posy, 50, 50);
                for (k = 0; k < obj.length; k = k + 1) {
                    if (flag2) {
                        scene.drawImage(image2, obj[k].x, obj[k].y, 80, 40);
                    }
                }
                scene.drawImage(image, x, y, 200, 50);
            }
        }
    }
    //Contrôles flèche droite et "d"
    if (keyState[39] || keyState[68]) {
        if (move) {
            if (x >= 1280 - image.width) {
                scene.clearRect(x, y, image.width, image.height);
                x += 0;
                scene.drawImage(image, x, y, image.width, image.height);
            } else {
                scene.clearRect(x, y, image.width, image.height);
                x += 15;
                scene.drawImage(image, x, y, image.width, image.height);
            }
            if (!flag && posx <= 1115) {
                posx += 15;
                scene.clearRect(0, 0, 1280, 800);
                scene.beginPath();
                scene.drawImage(image3, posx, posy, 50, 50);
                for (k = 0; k < obj.length; k = k + 1) {
                    if (flag2) {
                        scene.drawImage(image2, obj[k].x, obj[k].y, 80, 40);
                    }
                }
                scene.drawImage(image, x, y, 200, 50);
            }
        }
    }
    //Lancement de la balle (espace)
    if (keyState[32] && !flag) {
        flag = true;
        move = true;
        animation();
    }
    //Pause (P)
    if (keyState[80] && flag) {
        flag = false;
        move = false;
        animation();
    }
    
    //CHEAT Reset raquette (0/à)
    if (keyState[48] && pupDef) {
        scene.clearRect(x, y, image.width, image.height);
        image.src = "Raquette.png";
        //Il manque un son pour perdre le PUP
        image.width = 200;
        image.height = 50;
        pupDef = false;
        x += 44;
        scene.drawImage(image, x, y, image.width, image.height);
        if (x >= 1270 - image.width) {
            x = 1270 - image.width;
            scene.clearRect(x, y, image.width, image.height);
            scene.drawImage(image, x, y, image.width, image.height);
        }
    }
    
    //CHEAT Powerup ("1/&")
    if (keyState[49] && !pupDef) {
        scene.clearRect(x, y, image.width, image.height);
        image.src = "RaquettePUPDef.png";
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
    setTimeout(controls, 15); //Bouclage de la fonction controls
}

//Fonction principale : Animation du canvas et contrôle trajectoire de la balle
animation = function () {
    "use strict";
    //(Re)construction de la scène
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
    
    //Trajectoire de la balle (à isoler)
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

    //Collisions balle-briques
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
    
    //Bouclage de la fonction animation
    if (flag) {
        setTimeout(animation, 10);
    }
};

//Lancement des fonctions principales après chargement de la page
setTimeout(animation, 250);
setTimeout(controls, 500);

/******************************************************
                    Fin du programme
******************************************************/
