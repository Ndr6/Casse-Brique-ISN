/*global Audio: false*/
/*global alert: false*/
/*global console: false*/

/***************************************
        Déclaration des variables
***************************************/

//Variables canvas
var canvas;
var scene;
var animation; //Fonction 
var defense;
var unstoppable;
var reset;
var resetFlag;

//Variables menu pause
var pauseImg = new Image();
pauseImg.src = "pausetest.png";
pauseImg.width = 400;
pauseImg.height = 400;

//Variables raquette
var x = 540, y = 700; //Position raquette 

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
var cheatSpeed = 10; //Vitesse balle
var flag8 = false;
var flag9 = true;

var pupUnstop = false;

var k, distx, disty, distance, j;

var image3 = new Image(); //Asset graphique de la balle
image3.src = "balle.png";
image3.width = 50;
image3.height = 50; //Dimensions balle

//Variables briques

var image2 = new Image(); //Asset graphique des briques
image2.src = "briqueProto.png";
image2.width = 80;
image2.height = 40;
var image4 = new Image();
image4.src = "briqueProto2.png";
image4.width = 80;
image4.height = 40;

//Variables powerup
var time = Math.floor((Math.random() * 100) + 1);
var powerup = Math.floor((Math.random() * 100) + 1);
var imagecaps = new Image();
imagecaps.src = "capsulebase.png";
imagecaps.width = 40;
imagecaps.height = 80;
var xcaps = 0;
var ycaps = 0;
var flag4 = false;
var flag5 = true;
var flag6 = false;
var flag7 = true;

var obj = [];

var pos2x, pos2y, flag2, life;
var pattern = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1,
            1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1,
            1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1,
            1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1,
            1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1,
            1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1];

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
//Je sais pas trop à quoi ça sert Anthony :/
resetFlag = function () {
    "use strict";
    flag4 = false;
    flag7 = true;
    powerup = Math.floor((Math.random() * 100) + 1);
};

//Fonction de reset des powerups
reset = function () {
    "use strict";
	if (move) {
		xcaps = 0;
		ycaps = 0;
		scene.clearRect(x, y, image.width, image.height);
		image.src = "Raquette.png";
		image3.src = "balle.png";
		//Il manque un son pour perdre le PUP
		image.width = 200;
		image.height = 50;
		if (pupDef) {x += 44; }
		pupDef = false;
		pupUnstop = false;
		scene.drawImage(image, x, y, image.width, image.height);
		if (x >= 1270 - image.width) {
			x = 1270 - image.width;
			scene.clearRect(x, y, image.width, image.height);
			scene.drawImage(image, x, y, image.width, image.height);
		}
		setTimeout(resetFlag, 10000);
	}
};
    
//Fonction d'activation standard du powerup Défense
defense = function () {
    "use strict";
    if (!pupDef && move) {
        scene.clearRect(xcaps, ycaps, imagecaps.width, imagecaps.height);
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
        setTimeout(reset, 15000);
    }
};

unstoppable = function () {
    "use strict";
    if (!pupUnstop && move) {
        scene.clearRect(x, y, image.width, image.height);
        image3.src = "balleUnstop.png";
        //X.play(); la ferme !
        pupUnstop = true;
        scene.drawImage(image, x, y, image.width, image.height);
        setTimeout(reset, 15000);
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
                posx = x + 75;
                scene.clearRect(0, 0, 1280, 800);
                scene.beginPath();
                scene.drawImage(image3, posx, y - 51, 50, 50);
                for (k = 0; k < obj.length; k = k + 1) {
                    if (obj[k].flag2) {
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
            if (!flag && posx <= 1205) {
                posx = x + 75;
                scene.clearRect(0, 0, 1280, 800);
                scene.beginPath();
                scene.drawImage(image3, posx, y - 51, 50, 50);
                for (k = 0; k < obj.length; k = k + 1) {
                    if (obj[k].flag2) {
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
    }
    
    //CHEAT Reset powerups (0/à)
    if ((keyState[48] && pupDef) || (keyState[48] && pupUnstop)) {
        scene.clearRect(x, y, image.width, image.height);
        image.src = "Raquette.png";
        image3.src = "balle.png";
        //Il manque un son pour perdre le PUP
        image.width = 200;
        image.height = 50;
        if (pupDef) {x += 44; }
        pupDef = false;
        pupUnstop = false;
        scene.drawImage(image, x, y, image.width, image.height);
        if (x >= 1270 - image.width) {
            x = 1270 - image.width;
            scene.clearRect(x, y, image.width, image.height);
            scene.drawImage(image, x, y, image.width, image.height);
        }
	}
    
    //CHEAT Défense ("1/&")
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

    //CHEAT Unstoppable ("2/é")
    if (keyState[50] && !pupUnstop) {
        if (!pupUnstop) {
            scene.clearRect(x, y, image.width, image.height);
            image3.src = "balleUnstop.png";
            //X.play(); la ferme !
            pupUnstop = true;
            scene.drawImage(image, x, y, image.width, image.height);
            setTimeout(reset, 15000);
        }
    }
    //CHEAT Accéleration balle
    if (keyState[76] && cheatSpeed === 10) {
        cheatSpeed = 4;
    }
    if (keyState[77] && cheatSpeed === 4) {
        cheatSpeed = 10;
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
        if (obj[k].flag2) {
            if (pattern[k] === 1) {
                scene.drawImage(image2, obj[k].x, obj[k].y, 80, 40);
            }
            if (pattern[k] === 2) {
                scene.drawImage(image4, obj[k].x, obj[k].y, 80, 40);
            }
        }
    }
    if (!move) {
        scene.drawImage(pauseImg, 440, 200, pauseImg.width, pauseImg.height);
    }
    scene.drawImage(image, x, y, image.width, image.height);
    if (!flag4 && xcaps > 0 && ycaps > 0) {
        scene.drawImage(imagecaps, xcaps, ycaps, imagecaps.width, imagecaps.height);
        ycaps += 4;
    }
    scene.closePath();
    scene.fill();
    
    //Trajectoire de la balle (à isoler)
    if (posx < 0) {
		revx = false;
    } else if (posx + 50 > 1280) {
        revx = true;
    }
    if (!revx) {
        posx = posx + pas;
    } else {
        posx = posx - pas;
    }
    if (posy < 0) {
        revy = false;
    } else if (posy + 50 > 800) {
        revy = true;
        //alert("YOU LOSE!!!");
    }
    if (!revy) {
        posy = posy + pas;
    } else {
        posy = posy - pas;
    }
    if (!pupDef) {
        if (xcaps < x + 200 && xcaps + 40 > x && ycaps + 80 > y && ycaps + 90 > y && ycaps + 70 < y) {  //collision sur le dessus
            flag4 = true;
            flag6 = true;
        }
        if (ycaps + 80 > y && ycaps < y + 50 && xcaps + 40 > x && xcaps + 30 < x && xcaps + 50 > x) { //collision gauche
            flag4 = true;
            flag6 = true;
        }
        if (ycaps + 80 > y && ycaps < y + 50 && xcaps < x + 200 && xcaps - 10 < x + 200 && xcaps + 10 > x + 200) {
            flag4 = true;
            flag6 = true;
        }
        if (xcaps < x + 200 && xcaps + 40 > x && ycaps < y + 50 && ycaps + 10 > y + 50 && ycaps - 10 < y + 50) {
            flag4 = true;
            flag6 = true;
        }
    } else {
        if (xcaps < x + 288 && xcaps + 40 > x && ycaps + 80 > y && ycaps + 90 > y && ycaps + 70 < y) {  //collision sur le dessus
            flag4 = true;
            flag6 = true;
        }
        if (ycaps + 80 > y && ycaps < y + 50 && xcaps + 40 > x && xcaps + 30 < x && xcaps + 50 > x) { //collision gauche
            flag4 = true;
            flag6 = true;
        }
        if (ycaps + 80 > y && ycaps < y + 50 && xcaps < x + 288 && xcaps - 10 < x + 288 && xcaps + 10 > x + 288) {
            flag4 = true;
            flag6 = true;
        }
        if (xcaps < x + 288 && xcaps + 40 > x && ycaps < y + 50 && ycaps + 10 > y + 50 && ycaps - 10 < y + 50) {
            flag4 = true;
            flag6 = true;
        }
    }
    if (ycaps > 800) {
        setTimeout(resetFlag, 5000);
        xcaps = 0;
        ycaps = 0;
    }
    if (flag6) {
        if (powerup <= 50) {
            defense();
        } else if (powerup >= 50) {
            unstoppable();
        }
        flag6 = false;
    }

    
    //Fonction collision avec la raquette :
    if (!pupDef) {
        if (posx < x + 200 && posx + 50 > x && posy + 50 > y && posy + 60 > y && posy + 40 < y) {  //collision sur le dessus
            flag8 = true;
            revy = true;
            posx = posx + 1;
            posy = posy + 1;
        }
        if (posx < x + 200 && posx + 50 > x && posy < y + 50 && posy + 10 > y + 50 && posy - 10 < y + 50) {
            flag8 = true;
            revy = false;
            posx = posx + 1;
            posy = posy + 1;
        }
        if (posy + 50 > y && posy < y + 50 && posx + 50 > x && posx + 50 < x + 100) { //collision gauche
            if (posx + 40 < x && posx + 60 > x) {
                revx = true;
                posx = posx + 1;
                posy = posy + 1;
            } else if (!flag8) {
                posx = x - 50;
            }
        }
        if (posy + 50 > y && posy < y + 50 && posx < x + 200 && posx > x + 100) {
            if (posx - 10 < x + 200 && posx + 10 > x + 200) {
                revx = false;
                posx = posx + 1;
                posy = posy + 1;
            } else if (!flag8) {
                posx = x + 200;
            }
        }
    } else {
        if (posx < x + 288 && posx + 50 > x && posy + 50 > y && posy + 60 > y && posy + 40 < y) {  //collision sur le dessus
            flag8 = true;
            revy = true;
            posx = posx + 1;
            posy = posy + 1;
        }
        if (posx < x + 288 && posx + 50 > x && posy < y + 50 && posy + 10 > y + 50 && posy - 10 < y + 50) {
            flag8 = true;
            revy = false;
            posx = posx + 1;
            posy = posy + 1;
        }
        if (posy + 50 > y && posy < y + 50 && posx + 50 > x && posx + 50 < x + 144) { //collision gauche
            if (posx + 40 < x && posx + 60 > x) {
                revx = true;
                posx = posx + 1;
                posy = posy + 1;
            } else if (!flag8) {
                posx = x - 50;
            }
        }
        if (posy + 50 > y && posy < y + 50 && posx < x + 288 && posx > x + 144) {
            if (posx - 10 < x + 288 && posx + 10 > x + 288) {
                revx = false;
                posx = posx + 1;
                posy = posy + 1;
            } else if (!flag8) {
                posx = x + 288;
            }
        }
    }
    
    //Collisions balle-briques
    for (j = 0; j < obj.length; j += 1) {
        if (obj[j].flag2) {
            if (posy + 50 > obj[j].y && posy < obj[j].y + 40 && posx + 50 > obj[j].x && posx + 40 < obj[j].x && posx + 60 > obj[j].x) { //collision gauche
                if (!pupUnstop) {revx = true; }
                posx = posx + 1;
                posy = posy + 1;
                if (flag9) {
                    pattern[j] -= 1;
                }
                flag8 = false;
                if (pattern[j] <= 0) {
                    obj[j].flag2 = false;
                    time = Math.floor((Math.random() * 100) + 1);
                    if (time <= 20  && flag7) {
                        xcaps = obj[j].x + 20;
                        ycaps = obj[j].y + 40;
                        flag7 = false;
                    }
                }
            }
            if (posy + 50 > obj[j].y && posy < obj[j].y + 40 && posx < obj[j].x + 80 && posx - 10 < obj[j].x + 80 && posx + 10 > obj[j].x + 80) { //collision droite
                if (!pupUnstop) {revx = false; }
                posx = posx + 1;
                posy = posy + 1;
                if (flag9) {
                    pattern[j] -= 1;
                    flag9 = false;
                }
                flag8 = false;
                if (pattern[j] <= 0) {
                    obj[j].flag2 = false;
                    time = Math.floor((Math.random() * 100) + 1);
                    if (time <= 20 && flag7) {
                        xcaps = obj[j].x + 20;
                        ycaps = obj[j].y + 40;
                        flag7 = false;
                    }
                }
            }
            if (posy < obj[j].y + 40 && posy - 10 < obj[j].y + 40 && posy + 10 > obj[j].y + 40 && posx + 50 > obj[j].x && posx < obj[j].x + 80) { //collision bas
                if (!pupUnstop) {revy = false; }
                posx = posx + 1;
                posy = posy + 1;
                if (flag9) {
                    pattern[j] -= 1;
                    flag9 = false;
                }
                flag8 = false;
                if (pattern[j] <= 0) {
                    obj[j].flag2 = false;
                    time = Math.floor((Math.random() * 100) + 1);
                    if (time <= 20 && flag7) {
                        xcaps = obj[j].x + 20;
                        ycaps = obj[j].y + 40;
                        flag7 = false;
                    }
                }
            }
            if (posy + 50 > obj[j].y && posy + 40 < obj[j].y && posy + 60 > obj[j].y && posx + 50 > obj[j].x && posx < obj[j].x + 80) { //collision haut
                if (!pupUnstop) {revy = true; }
                posx = posx + 1;
                posy = posy + 1;
                if (flag9) {
                    pattern[j] -= 1;
                    flag9 = false;
                }
                flag8 = false;
                if (pattern[j] <= 0) {
                    obj[j].flag2 = false;
                    time = Math.floor((Math.random() * 100) + 1);
                    if (time <= 20 && flag7) {
                        xcaps = obj[j].x + 20;
                        ycaps = obj[j].y + 40;
                        flag7 = false;
                    }
                }
            }
            flag9 = true;
        }
    }
    //Bouclage de la fonction animation
    if (flag) {
        setTimeout(animation, cheatSpeed);
    }
};

//Lancement des fonctions principales après chargement de la page
setTimeout(animation, 250);
setTimeout(controls, 500);

/******************************************************
                    Fin du programme
******************************************************/
