/*global Audio: false*/
/*global alert: false*/
/*global console: false*/

/***************************************
        Déclaration des variables
***************************************/

//Variables canvas
var canvas;
var scene;
var animation; //Fonction d'animation de la balle et bien d'autres
var defense;    //Fonction d'activation du powerup Défense
var unstoppable;    //Fonction d'activation du powerup Unstoppable
var reset;      //Fonction de désactivation des powerups
var resetFlag;  //Anthony, faut penser à un autre nom stp
var loseLife;   //ça c'est un bon nom
var backgroundMusic; //Ce nom est assez explicite je pense

//Variables son
var pupLoseSfx = new Audio("PUP_Lose.wav");

//Variables menu pause
var pauseImg = new Image();
pauseImg.src = "pausetest.png";
pauseImg.width = 400;
pauseImg.height = 400;

//Variables raquette
var xRaquette = 540, yRaquette = 700; //Position raquette 

var raquetteImg = new Image();
raquetteImg.src = "Raquette.png"; //Asset graphique barre
raquetteImg.width = 200;
raquetteImg.height = 50; //Dimensions asset barre

var pupDef = false; //Flag powerup défense
var DefSfx = new Audio("PUPDef_sound.mp3");

//Variables balle
var moveBalle = false; //Activation de la balle
var moveRaquette = true; //Activation de la raquette
var rayon = 25; //Rayon balle
var pasAnim = 5; //Vitesse animation
var xBalle = 615, yBalle = 649; //Position initiale de la balle
var revx = false, revy = false; //Sens animation balle
var speedBalle = 10; //Vitesse balle
var flag8 = false; //ANTHONY !!! C'est quoi ça ??
var pupUnstop = false;

var k, distx, disty, distance, j; //ANTHONY !!! Juste trouve moi un autre nom pour k et j stp, n'importe quoi mais un mot

var balleImg = new Image(); //Asset graphique de la balle
balleImg.src = "balle.png";
balleImg.width = 50;
balleImg.height = 50; //Dimensions balle

//Variables briques

var briqueImg = new Image(); //Asset graphique des briques
briqueImg.src = "briqueProto.png";
briqueImg.width = 80;
briqueImg.height = 40;
var brique2Img = new Image();
brique2Img.src = "briqueProto2.png";
brique2Img.width = 80;
brique2Img.height = 40;

var briquesObj = [];

//Variables powerup
var powerupTime = Math.floor((Math.random() * 100) + 1);
var powerup = Math.floor((Math.random() * 100) + 1);    //ANTHONY !!! ça manque de clarté, qu'est ce que ça fait exactement ?
var capsuleImg = new Image();
capsuleImg.width = 40;
capsuleImg.height = 80;
var xCapsule = 0;
var yCapsule = 0;
var flag4 = false; //ANTHONY !!! J'ai vraiment besoin d'expliquer ? (lien à la raquette et aux powerups ??)
var flag6 = false; //ANTHONY !!! ... (idem ??)
var flag7 = true;  //ANTHONY !!! Cela doit avoir un lien avec le timer du powerup, je crois ??
var flag9 = true;  //ANTHONY !!! En plus t'en rajoutes ???
var pos2x, pos2y, flag2, life; //ANTHONY !!! Les pos2x/y sont pas clairs, et puis "flag2", sérieusement ?
var pattern = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
               1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
               1, 2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2, 1,
               1, 2, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 2, 1,
               1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
               1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

//Variables contrôles
var keyState = {};
var pause = false;

/****************************************
           Début du programme
****************************************/

//Fonction de définition du pattern de briques (plutôt basique pour l'instant)
var creaBriques = function () {
    "use strict";
    canvas = document.getElementById('canvas');
    scene = canvas.getContext("2d");

    var v, i, Briques = function (pos2x, pos2y, flag2) { //ANTHONY !!! Même ici ? v et i, c'est problématique
        this.x = pos2x;
        this.y = pos2y;
        this.flag2 = flag2;
    };
    for (v = 0; v < 6; v += 1) {
        for (i = 0; i < 15; i += 1) {
            pos2x = 83 * i + 19;
            pos2y = 43 * v + 5;
            flag2 = true;
            briquesObj.push(new Briques(pos2x, pos2y, flag2));
        }
    }
};

//Permet la réapparition d'un powerup
resetFlag = function () {
    "use strict";
    flag7 = true;
};

//Fonction de reset des powerups
reset = function () {
    "use strict";
	if (pause) {
		xCapsule = 0;
		yCapsule = 0;
		scene.clearRect(xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
		raquetteImg.src = "Raquette.png";
		balleImg.src = "balle.png";
		pupLoseSfx.play();
		raquetteImg.width = 200;
		raquetteImg.height = 50;
		if (pupDef) {xRaquette += 44; }
		pupDef = false;
		pupUnstop = false;
		scene.drawImage(raquetteImg, xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
		if (xRaquette >= 1270 - raquetteImg.width) {
			xRaquette = 1270 - raquetteImg.width;
			scene.clearRect(xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
			scene.drawImage(raquetteImg, xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
		}
		powerup = Math.floor((Math.random() * 100) + 1);
		setTimeout(resetFlag, 10000);
		flag4 = false;
	}
};
    
//Fonction d'activation standard du powerup Défense
defense = function () {
    "use strict";
    if (!pupDef && moveRaquette) {
        scene.clearRect(xCapsule, yCapsule, capsuleImg.width, capsuleImg.height);
        scene.clearRect(xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
        raquetteImg.src = "RaquettePUPDef.png";
        DefSfx.play(); //la ferme !
        raquetteImg.width = 288;
        raquetteImg.height = 50;
        pupDef = true;
        xRaquette -= 44;
        scene.drawImage(raquetteImg, xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
        if (xRaquette >= 1272 - raquetteImg.width) {
            xRaquette = 1272 - raquetteImg.width;
            scene.clearRect(xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
            scene.drawImage(raquetteImg, xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
        }
        setTimeout(reset, 15000); //Faudra régler le délai, pour un truc un peu plus juste
    }
};

unstoppable = function () {
    "use strict";
    if (!pupUnstop && moveRaquette) {
        scene.clearRect(xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
        balleImg.src = "balleUnstop.png";
        //X.play(); la ferme !
        pupUnstop = true;
        scene.drawImage(raquetteImg, xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
        setTimeout(reset, 15000);
    }
};
loseLife = function () {
	"use strict";
    if (!flag9) {
        return;
    }
	scene.clearRect(xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
	scene.clearRect(xBalle, yBalle, 50, 50);
    moveRaquette = false;
    xBalle = 615;
    yBalle = 649;
	if (pupDef) {
		xRaquette = 496;
	} else {
		xRaquette = 540;
	}
    yRaquette = 700;
    reset();
	scene.drawImage(raquetteImg, xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
	scene.drawImage(balleImg, xBalle, yBalle, 50, 50);
    flag9 = false;
	moveBalle = false;
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
        if (moveRaquette) {
            if (xRaquette <= 0) {
                scene.clearRect(xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
                xRaquette -= 0;
                scene.drawImage(raquetteImg, xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
            } else {
                scene.clearRect(xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
                xRaquette -= 15;
                scene.drawImage(raquetteImg, xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
            }
            if (!moveBalle && xBalle >= 65) {
                xBalle = xRaquette + 75;
                scene.clearRect(0, 0, 1280, 800);
                scene.beginPath();
                scene.drawImage(balleImg, xBalle, yRaquette - 51, 50, 50);
                for (k = 0; k < briquesObj.length; k = k + 1) {
                    if (briquesObj[k].flag2) {
                        scene.drawImage(briqueImg, briquesObj[k].x, briquesObj[k].y, 80, 40);
                    }
                }
                scene.drawImage(raquetteImg, xRaquette, yRaquette, 200, 50);
            }
        }
    }
    //Contrôles flèche droite et "d"
    if (keyState[39] || keyState[68]) {
        if (moveRaquette) {
            if (xRaquette >= 1280 - raquetteImg.width) {
                scene.clearRect(xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
                xRaquette += 0;
                scene.drawImage(raquetteImg, xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
            } else {
                scene.clearRect(xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
                xRaquette += 15;
                scene.drawImage(raquetteImg, xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
            }
            if (!moveBalle && xBalle <= 1205) {
                xBalle = xRaquette + 75;
                scene.clearRect(0, 0, 1280, 800);
                scene.beginPath();
                scene.drawImage(balleImg, xBalle, yRaquette - 51, 50, 50);
                for (k = 0; k < briquesObj.length; k = k + 1) {
                    if (briquesObj[k].flag2) {
                        scene.drawImage(briqueImg, briquesObj[k].x, briquesObj[k].y, 80, 40);
                    }
                }
                scene.drawImage(raquetteImg, xRaquette, yRaquette, 200, 50);
            }
        }
    }
    //Lancement de la balle (espace)
    if (keyState[32] && !moveBalle) {
        moveBalle = true;
        flag9 = true;
        pause = true;
        moveRaquette = true;
        animation();
    }
    //Pause (P)
    if (keyState[80] && moveBalle) {
        moveBalle = false;
        pause = false;
        moveRaquette = false;
    }
    
    //CHEAT Reset powerups (0/à)
    if ((keyState[48] && pupDef) || (keyState[48] && pupUnstop)) {
        scene.clearRect(xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
        raquetteImg.src = "Raquette.png";
        balleImg.src = "balle.png";
        //Il manque un son pour perdre le PUP
        raquetteImg.width = 200;
        raquetteImg.height = 50;
        if (pupDef) {xRaquette += 44; }
        pupDef = false;
        pupUnstop = false;
        pupLoseSfx.play();
        scene.drawImage(raquetteImg, xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
        if (xRaquette >= 1270 - raquetteImg.width) {
            xRaquette = 1270 - raquetteImg.width;
            scene.clearRect(xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
            scene.drawImage(raquetteImg, xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
        }
	}
    
    //CHEAT Défense ("1/&")
    if (keyState[49] && !pupDef) {
        scene.clearRect(xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
        raquetteImg.src = "RaquettePUPDef.png";
        //DefSfx.play(); la ferme !
        raquetteImg.width = 288;
        raquetteImg.height = 50;
        pupDef = true;
        xRaquette -= 44;
        scene.drawImage(raquetteImg, xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
        if (xRaquette >= 1272 - raquetteImg.width) {
            xRaquette = 1272 - raquetteImg.width;
            scene.clearRect(xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
            scene.drawImage(raquetteImg, xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
        }
    }

    //CHEAT Unstoppable ("2/é")
    if (keyState[50] && !pupUnstop) {
        if (!pupUnstop) {
            scene.clearRect(xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
            balleImg.src = "balleUnstop.png";
            //X.play(); la ferme !
            pupUnstop = true;
            scene.drawImage(raquetteImg, xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
            setTimeout(reset, 15000);
        }
    }
    //CHEAT Accéleration balle
    if (keyState[76] && speedBalle === 10) {
        speedBalle = 4;
    }
    if (keyState[77] && speedBalle === 4) {
        speedBalle = 10;
    }
      
    setTimeout(controls, 15); //Bouclage de la fonction controls
}

//Fonction principale : Animation du canvas et contrôle trajectoire de la balle
animation = function () {
    "use strict";
    //(Re)construction de la scène
    scene.clearRect(0, 0, 1280, 800);
    scene.beginPath();
    scene.drawImage(balleImg, xBalle, yBalle, 50, 50);
    for (k = 0; k < briquesObj.length; k = k + 1) {
        if (briquesObj[k].flag2) {
            if (pattern[k] === 1) {
                scene.drawImage(briqueImg, briquesObj[k].x, briquesObj[k].y, 80, 40);
            }
            if (pattern[k] === 2) {
                scene.drawImage(brique2Img, briquesObj[k].x, briquesObj[k].y, 80, 40);
            }
        }
    }
    if (!moveRaquette && !pause) {
        scene.drawImage(pauseImg, 440, 200, pauseImg.width, pauseImg.height);
    }
    scene.drawImage(raquetteImg, xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
    if (!flag4 && xCapsule > 0 && yCapsule > 0) {
		if (powerup < 50) {
			capsuleImg.src = "capsuleDEF.png";
			scene.drawImage(capsuleImg, xCapsule, yCapsule, capsuleImg.width, capsuleImg.height);
			yCapsule += 4;
		} else if (powerup >= 50) {
			capsuleImg.src = "capsuleATK.png";
			scene.drawImage(capsuleImg, xCapsule, yCapsule, capsuleImg.width, capsuleImg.height);
			yCapsule += 4;
		}
    }
    scene.closePath();
    scene.fill();
    
    //Trajectoire de la balle (à isoler)
	if (moveRaquette) {
		if (xBalle < 0) {
			revx = false;
		} else if (xBalle + 50 > 1280) {
			revx = true;
		}
		if (yBalle < 0) {
			revy = false;
		} else if (yBalle + 50 > 800) {
			revy = true;
			loseLife();
			//alert("YOU LOSE!!!");
		}
		if (!revy) {
			yBalle = yBalle + pasAnim;
		} else {
			yBalle = yBalle - pasAnim;
		}
		if (!revx) {
			xBalle = xBalle + pasAnim;
		} else {
			xBalle = xBalle - pasAnim;
		}
	}
    if (!pupDef) {
        if (xCapsule < xRaquette + 200 && xCapsule + 40 > xRaquette && yCapsule + 80 > yRaquette && yCapsule + 90 > yRaquette && yCapsule + 70 < yRaquette) {  //collision sur le dessus
            flag4 = true;
            flag6 = true;
        }
        if (yCapsule + 80 > yRaquette && yCapsule < yRaquette + 50 && xCapsule + 40 > xRaquette && xCapsule + 30 < xRaquette && xCapsule + 50 > xRaquette) { //collision gauche
            flag4 = true;
            flag6 = true;
        }
        if (yCapsule + 80 > yRaquette && yCapsule < yRaquette + 50 && xCapsule < xRaquette + 200 && xCapsule - 10 < xRaquette + 200 && xCapsule + 10 > xRaquette + 200) {
            flag4 = true;
            flag6 = true;
        }
        if (xCapsule < xRaquette + 200 && xCapsule + 40 > xRaquette && yCapsule < yRaquette + 50 && yCapsule + 10 > yRaquette + 50 && yCapsule - 10 < yRaquette + 50) {
            flag4 = true;
            flag6 = true;
        }
    } else {
        if (xCapsule < xRaquette + 288 && xCapsule + 40 > xRaquette && yCapsule + 80 > yRaquette && yCapsule + 90 > yRaquette && yCapsule + 70 < yRaquette) {  //collision sur le dessus
            flag4 = true;
            flag6 = true;
        }
        if (yCapsule + 80 > yRaquette && yCapsule < yRaquette + 50 && xCapsule + 40 > xRaquette && xCapsule + 30 < xRaquette && xCapsule + 50 > xRaquette) { //collision gauche
            flag4 = true;
            flag6 = true;
        }
        if (yCapsule + 80 > yRaquette && yCapsule < yRaquette + 50 && xCapsule < xRaquette + 288 && xCapsule - 10 < xRaquette + 288 && xCapsule + 10 > xRaquette + 288) {
            flag4 = true;
            flag6 = true;
        }
        if (xCapsule < xRaquette + 288 && xCapsule + 40 > xRaquette && yCapsule < yRaquette + 50 && yCapsule + 10 > yRaquette + 50 && yCapsule - 10 < yRaquette + 50) {
            flag4 = true;
            flag6 = true;
        }
    }
    if (yCapsule > 800) {
        setTimeout(resetFlag, 5000);
        xCapsule = 0;
        yCapsule = 0;
    }
    if (flag6) {
        if (powerup < 50) {
            defense();
        } else if (powerup >= 50) {
            unstoppable();
        }
        flag6 = false;
    }

    
    //Fonction collision avec la raquette :
    if (!pupDef) {
        if (xBalle < xRaquette + 200 && xBalle + 50 > xRaquette && yBalle + 50 > yRaquette && yBalle + 60 > yRaquette && yBalle + 40 < yRaquette) {  //collision sur le dessus
            flag8 = true;
            revy = true;
        }
        if (xBalle < xRaquette + 200 && xBalle + 50 > xRaquette && yBalle < yRaquette + 50 && yBalle + 10 > yRaquette + 50 && yBalle - 10 < yRaquette + 50) {
            flag8 = true;
            revy = false;
        }
        if (yBalle + 50 > yRaquette && yBalle < yRaquette + 50 && xBalle + 50 > xRaquette && xBalle + 50 < xRaquette + 100) { //collision gauche
            if (xBalle + 40 < xRaquette && xBalle + 60 > xRaquette) {
                revx = true;
            } else if (!flag8) {
                xBalle = xRaquette - 50;
            }
        }
        if (yBalle + 50 > yRaquette && yBalle < yRaquette + 50 && xBalle < xRaquette + 200 && xBalle > xRaquette + 100) {
            if (xBalle - 10 < xRaquette + 200 && xBalle + 10 > xRaquette + 200) {
                revx = false;
            } else if (!flag8) {
                xBalle = xRaquette + 200;
            }
        }
    } else {
        if (xBalle < xRaquette + 288 && xBalle + 50 > xRaquette && yBalle + 50 > yRaquette && yBalle + 60 > yRaquette && yBalle + 40 < yRaquette) {  //collision sur le dessus
            flag8 = true;
            revy = true;
        }
        if (xBalle < xRaquette + 288 && xBalle + 50 > xRaquette && yBalle < yRaquette + 50 && yBalle + 10 > yRaquette + 50 && yBalle - 10 < yRaquette + 50) {
            flag8 = true;
            revy = false;
        }
        if (yBalle + 50 > yRaquette && yBalle < yRaquette + 50 && xBalle + 50 > xRaquette && xBalle + 50 < xRaquette + 144) { //collision gauche
            if (xBalle + 40 < xRaquette && xBalle + 60 > xRaquette) {
                revx = true;
            } else if (!flag8) {
                xBalle = xRaquette - 50;
            }
        }
        if (yBalle + 50 > yRaquette && yBalle < yRaquette + 50 && xBalle < xRaquette + 288 && xBalle > xRaquette + 144) {
            if (xBalle - 10 < xRaquette + 288 && xBalle + 10 > xRaquette + 288) {
                revx = false;
            } else if (!flag8) {
                xBalle = xRaquette + 288;
            }
        }
    }
    
    //Collisions balle-briques
    for (j = 0; j < briquesObj.length; j += 1) {
        if (briquesObj[j].flag2) {
            if (yBalle + 50 > briquesObj[j].y && yBalle < briquesObj[j].y + 40 && xBalle + 50 > briquesObj[j].x && xBalle + 40 < briquesObj[j].x && xBalle + 60 > briquesObj[j].x) { //collision gauche
                if (!pupUnstop) {revx = true; }
                pattern[j] -= 1;
                flag8 = false;
                if (pattern[j] <= 0) {
                    briquesObj[j].flag2 = false;
                    powerupTime = Math.floor((Math.random() * 100) + 1);
                    if (powerupTime <= 20  && flag7) {
                        xCapsule = briquesObj[j].x + 20;
                        yCapsule = briquesObj[j].y + 40;
                        flag7 = false;
                    }
                }
            }
            if (yBalle + 50 > briquesObj[j].y && yBalle < briquesObj[j].y + 40 && xBalle < briquesObj[j].x + 80 && xBalle - 10 < briquesObj[j].x + 80 && xBalle + 10 > briquesObj[j].x + 80) { //collision droite
                if (!pupUnstop) {revx = false; }
                pattern[j] -= 1;
                flag8 = false;
                if (pattern[j] <= 0) {
                    briquesObj[j].flag2 = false;
                    powerupTime = Math.floor((Math.random() * 100) + 1);
                    if (powerupTime <= 20 && flag7) {
                        xCapsule = briquesObj[j].x + 20;
                        yCapsule = briquesObj[j].y + 40;
                        flag7 = false;
                    }
                }
            }
            if (yBalle < briquesObj[j].y + 40 && yBalle - 10 < briquesObj[j].y + 40 && yBalle + 10 > briquesObj[j].y + 40 && xBalle + 50 > briquesObj[j].x && xBalle < briquesObj[j].x + 80) { //collision bas
                if (!pupUnstop) {revy = false; }
                pattern[j] -= 1;
                flag8 = false;
                if (pattern[j] <= 0) {
                    briquesObj[j].flag2 = false;
                    powerupTime = Math.floor((Math.random() * 100) + 1);
                    if (powerupTime <= 20 && flag7) {
                        xCapsule = briquesObj[j].x + 20;
                        yCapsule = briquesObj[j].y + 40;
                        flag7 = false;
                    }
                }
            }
            if (yBalle + 50 > briquesObj[j].y && yBalle + 40 < briquesObj[j].y && yBalle + 60 > briquesObj[j].y && xBalle + 50 > briquesObj[j].x && xBalle < briquesObj[j].x + 80) { //collision haut
                if (!pupUnstop) {revy = true; }
                pattern[j] -= 1;
                flag8 = false;
                if (pattern[j] <= 0) {
                    briquesObj[j].flag2 = false;
                    powerupTime = Math.floor((Math.random() * 100) + 1);
                    if (powerupTime <= 100 && flag7) {
                        xCapsule = briquesObj[j].x + 20;
                        yCapsule = briquesObj[j].y + 40;
                        flag7 = false;
                    }
                }
            }
        }
    }
    //Bouclage de la fonction animation
    if (moveBalle) {
        setTimeout(animation, speedBalle);
    }
};

backgroundMusic = function () {
    "use strict";
    var audioBG = new Audio("space_corsair.mp3");
    audioBG.play();
    audioBG.volume = 0.3;
    setTimeout(backgroundMusic, 202000);
};

//Lancement des fonctions principales après chargement de la page
setTimeout(animation, 250);
setTimeout(controls, 500);
backgroundMusic();

/******************************************************
                    Fin du programme
******************************************************/
