/*global Audio: false*/
/*global alert: false*/

/***************************************
        Déclaration des variables
***************************************/

//Variables canvas
var canvas;
var scene;
var animation; //Fonction 

//Variables raquette
var x = 540, y = 700;

var image = new Image();
image.src = "Raquette.png"; //Asset graphique barre
image.width = 200;
image.height = 50; //Dimensions asset barre

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

var pos2x, pos2y, flag2, life;
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

    //Un jour ma brique viendra, ....
};

//Appel de la fonction de création des briques au chargement terminé de la page
window.addEventListener("load", creaBriques);

// INSERER ICI CONTROLES
//Partie commande (touches)
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
            x += 100;
            posx = x + 50;
            posy = y + 50;
            scene.drawImage(image, x, y, image.width, image.height);
            animation();
        }
        break;
    case 37:
        if (x <= 2) {
            scene.clearRect(x, y, image.width, image.height);
            x -= 0;
            scene.drawImage(image, x, y, image.width, image.height);
        } else {
            scene.clearRect(x, y, image.width, image.height);
            x -= 100;
            posx = x - 50;
            posy = y - 50;
            scene.drawImage(image, x, y, image.width, image.height);
            animation();
        }
        break;
    case 32:
        animation();
        break;
    }
});

//Fonction principale : Animation du canvas et contrôle trajectoire de la balle
animation = function () {
    "use strict";
    //(Re)construction de la scène
    scene.clearRect(0, 0, 1280, 800);
    scene.beginPath();
    scene.drawImage(image3, posx, posy, 50, 50);
    for (k = 0; k < obj.length; k = k + 1) {
        if (obj[k].flag2) {
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
    
    
    //Bouclage de la fonction animation
    if (flag) {
        setTimeout(animation, 15);
    }
};

//Lancement des fonctions principales après chargement de la page
setTimeout(animation, 250);

/******************************************************
                    Fin du programme
******************************************************/
