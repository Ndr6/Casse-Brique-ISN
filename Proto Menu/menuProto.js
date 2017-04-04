/*global Audio: false*/
/*global alert: false*/

/***************************************
        Déclaration des variables
***************************************/

//Variables canvas
var canvas;
var scene;
var animation; //Fonction
var select; //Fonction de "collisions" choix de niveau

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

var image3 = new Image();
image3.src = "balle.png";
image3.width = 50;
image3.height = 50;

//Variables briques

var image2 = new Image();
image2.src = "briqueProto.png";
image2.width = 80;
image2.height = 40;



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

//Partie commande (touches)
document.addEventListener("keydown", function (event) {     // commande barre    
    "use strict";
    if (move) {
        switch (event.keyCode) {
        case 39:
            if (x >= 1040) {
                scene.clearRect(x, y, image.width, image.height);
                x += 0;
                scene.drawImage(image, x, y, image.width, image.height);
            } else {
                scene.clearRect(x, y, image.width, image.height);
                x += 250;
                posx = x + 75;
                posy = y - 50;
                scene.drawImage(image, x, y, image.width, image.height);
                animation();
            }
            break;
        case 37:
            if (x <= 40) {
                scene.clearRect(x, y, image.width, image.height);
                x -= 0;
                scene.drawImage(image, x, y, image.width, image.height);
            } else {
                scene.clearRect(x, y, image.width, image.height);
                x -= 250;
                posx = x + 75;
                posy = y - 50;
                scene.drawImage(image, x, y, image.width, image.height);
                animation();
            }
            break;
        case 32:
            flag = true;
            move = false;
            animation();
            break;
        }
    }
});

//Fonction principale : Animation du canvas et contrôle trajectoire de la balle
animation = function () {
    "use strict";
    //(Re)construction de la scène
    scene.clearRect(0, 0, 1280, 800);
    scene.beginPath();
    scene.drawImage(image3, posx, posy, 50, 50);
    //Insérer un truc important ici ?
    scene.drawImage(image, x, y, image.width, image.height);
    scene.closePath();
    scene.fill();
    
    //Trajectoire de la balle (à isoler)
    if (flag) {posy -= 15; }
    
    
    //Bouclage de la fonction animation
    if (flag) {
        setTimeout(animation, 15);
    }
};

select = function () {
    "use strict";
    //Fonction de "collisions" aux "briques" de choix de niveau
    
    setTimeout(select, 10);
};

//Lancement des fonctions principales après chargement de la page
setTimeout(animation, 250);
setTimeout(select, 251);


/******************************************************
                    Fin du programme
******************************************************/
