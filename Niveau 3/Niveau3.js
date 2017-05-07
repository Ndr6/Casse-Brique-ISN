//*global Audio: false*/
/*global alert: false*/
/*global console: false*/
/*jslint plusplus: true */

/***************************************
        Déclaration des variables
***************************************/

//Variables canvas
var canvas;
var scene;
var animation; //Fonction d'animation de la balle et bien d'autres
var defense; //Fonction d'activation du powerup Défense
var unstoppable; //Fonction d'activation du powerup Unstoppable
var pupDirection; //Fonction d'activation du powerup Direction
var reset; //Fonction de désactivation des powerups
var loseLife; //ça c'est un bon nom
var backgroundMusic; //Ce nom est assez explicite je pense
var win; //Bah quand on gagne, quoi
var timer1; //Fonction qui permet d'avoir le décompte du powerup
var go; //Game over

//Variables son
var pupLoseSfx = new Audio("PUP_Lose.wav");
var pauseSfx = new Audio("pauseSfx.wav");
var unpauseSfx = new Audio("unpauseSfx.wav");
var audioBG = new Audio("space_corsair.mp3");
var bgLoop;
var wallSfx = new Audio("murSfx.wav");

//Variables menu pause
var pauseImg = new Image();
pauseImg.src = "pausetest.png";
pauseImg.width = 400;
pauseImg.height = 400;

//Variables raquette
var xRaquette = 540,
	yRaquette = 700; //Position raquette 

var raquetteImg = new Image();
raquetteImg.src = "Raquette.png"; //Asset graphique barre
raquetteImg.width = 200;
raquetteImg.height = 50; //Dimensions asset barre

var pupDef = false; //Drapeau powerup défense
var DefSfx = new Audio("PUPDef_sound.mp3");

var raquetteSfx = new Audio("raquetteSfx.wav");
raquetteSfx.volume = 0.5;

//Variables balle
var moveBalle = false; //Activation de la balle
var moveRaquette = true; //Activation de la raquette
var rayon = 25; //Rayon balle
var angleLine = -Math.PI / 4; //Angle de la trajectoire de la balle
var xPasAnim = 7.07 * Math.cos(-Math.PI / 4); //Vitesse animation en x
var yPasAnim = 7.07 * Math.sin(-Math.PI / 4); //Vitesse animation en y
var xBalle = 615,
	yBalle = 649; //Position initiale de la balle
var revx = false,
	revy = false; //Sens animation balle
var speedBalle = 10; //Vitesse balle
var collisionMemeSens = false;
var pupUnstop = false; //Drapeaux d'activation du powerup Unstoppable

var k, j; //Ce sont juste des compteurs pour les boucles for

var balleImg = new Image(); //Asset graphique de la balle
balleImg.src = "balle.png";
balleImg.width = 50;
balleImg.height = 50; //Dimensions balle

//Variables gain
var hasWon = false;
var winImg = new Image();
winImg.src = "win.png";
winImg.width = 313;
winImg.height = 232;
var xWinImg = 484,
	yWinImg = 284;

var winSfx = new Audio("victory.wav");
winSfx.volume = 0.7;
var winSfxPlayed = false;

//Variables briques

var briqueImg = new Image(); //Asset graphique des briques
briqueImg.src = "briqueProto.png";
briqueImg.width = 80; //taille briques
briqueImg.height = 40;
var brique2Img = new Image();
brique2Img.src = "briqueProto2.png";
brique2Img.width = 80;
brique2Img.height = 40;
var briqueIndest = new Image();
briqueIndest.src = "briqueIncassable.png";
briqueIndest.width = 120;
briqueIndest.height = 40;
var xBriqueIndest = 600;
var yBriqueIndest = 280;
var revxBrique = false;

var briquesObj = [];

var cheatBrick = 0;

var briqueSfx = new Audio("brickSfx.wav");
briqueSfx.volume = 0.5;

//Variables powerup
var powerupTime = Math.floor((Math.random() * 100) + 1); //Aléatoire activation powerup ou pas
var powerup = Math.floor((Math.random() * 100) + 1); //Génère un powerup aléatoire
var capsuleDEFImg = new Image();
var xCapsule,
	yCapsule;
capsuleDEFImg.src = "capsuleDEF.png";
capsuleDEFImg.width = 40;
capsuleDEFImg.height = 80;
var capsuleATKImg = new Image();
capsuleATKImg.src = "capsuleATK.png";
capsuleATKImg.width = 40;
capsuleATKImg.height = 80;
var capsuleDIRECTImg = new Image();
capsuleDIRECTImg.src = "capsuleDIRECT.png";
capsuleDIRECTImg.width = 40;
capsuleDIRECTImg.height = 80;
var masquagePup = false; //détection collisions powerups / raquette + lance la disparition de la capsule
var collisionPupRaquette = false; //Détection collisions powerups / raquette + lance la génération aléatoire du powerup
var allowPowerup = true; //Créer une boucle qui permet d'avoir plusieurs powerups dans une partie
var xBriques, yBriques, life, hit; //Variables briques
var pupDirect = false; //Drapeux détection capsule Direction
var pupDirectActi = false; //Drapeux d'activation powerup Direction
var revAngle = true; //Inversion changement d'angle
var loseDirect = true;

var pattern = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, //Pattern briques
               1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
               1, 2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2, 1,
               1, 2, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 2, 1,
               1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
               1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

//Variables Timer
var secon;
var compte;
var clock;
//Variables contrôles
var keyState = {};
var pause = false; //Drapeaux activation pause

//Compteur de vie
var drawLife;
var nblife = 3; //Nombre de vie

var vieImg = new Image();
vieImg.src = "vieImg.png";

var vieCheatImg = new Image();
vieCheatImg.src = "vieCheat.png";

//image "Game over"
var goImg = new Image();
goImg.src = "gameover.jpg";
goImg.width = 421;
goImg.height = 105;
var hasLost = false;

var loseLifeSfx = new Audio("SfxLoseLife.wav");
loseLifeSfx.volume = 0.5;

var gameoverSfx = new Audio("gameoverSfx.wav");
/****************************************
           Début du programme
****************************************/

//Fonction de définition du pattern de briques (plutôt basique pour l'instant)
var creaBriques = function () {
	"use strict";
	canvas = document.getElementById('canvas');
	scene = canvas.getContext("2d");

	var v, i, Briques = function (xBriques, yBriques, life, hit) { //C'est juste des variables pour les boucles for
		this.x = xBriques;
		this.y = yBriques;
		this.life = life;
		this.hit = hit;
	};
	for (v = 0; v < 6; v += 1) {
		for (i = 0; i < 15; i += 1) {
			xBriques = 83 * i + 19;
			yBriques = 43 * v + 5;
			life = true;
			hit = false;
			briquesObj.push(new Briques(xBriques, yBriques, life, hit));
		}
	}
};
//Fonction du décompte pour les powerups
timer1 = function () {
	"use strict";
	if (clock) {
		if (!pause) {
			secon -= 1;
		}
		document.forsec.sec.value = " " + secon;
		compte = setTimeout(timer1, 1000);
		if (secon === 0) {
			powerup = Math.floor((Math.random() * 100) + 1);
			reset();
			clock = false;
		}
	}
};

//Fonction de reset des powerups
reset = function () {
	"use strict";
	if (!pause) {
		xCapsule = 0;
		yCapsule = 0;
		pupDirect = false;
		pupDirectActi = false;
		scene.clearRect(xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
		raquetteImg.src = "Raquette.png";
		balleImg.src = "balle.png";
		pupLoseSfx.play();
		raquetteImg.width = 200;
		raquetteImg.height = 50;
		if (pupDef) {
			xRaquette += 44;
		}
		pupDef = false;
		pupUnstop = false;
		scene.drawImage(raquetteImg, xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
		if (xRaquette >= 1270 - raquetteImg.width) {
			xRaquette = 1270 - raquetteImg.width;
			scene.clearRect(xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
			scene.drawImage(raquetteImg, xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
		}
		allowPowerup = true;
	}
};

//Fonction d'activation standard du powerup Défense
defense = function () {
	"use strict";
	if (!pupDef && moveRaquette) {
		scene.clearRect(xCapsule, yCapsule, capsuleDEFImg.width, capsuleDEFImg.height);
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
		clock = true;
		secon = 20;
		timer1();
	}
};
//Fonction du powerup Unstoppable
unstoppable = function () {
	"use strict";
	if (!pupUnstop && moveRaquette) {
		scene.clearRect(xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
		balleImg.src = "balleUnstop.png";
		//X.play(); la ferme !
		pupUnstop = true;
		scene.drawImage(raquetteImg, xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
		clock = true;
		secon = 5; //Définition da la valeur du timer
		timer1(); //Lancement timer
	}
};
//Fonction powerup Direction
pupDirection = function () {
	"use strict";
	if (loseDirect) {
		pupDirect = true;
	}
	if (pupDirectActi) {
		yBalle = yRaquette - 55;
		moveRaquette = false;
		scene.beginPath();
		scene.moveTo(xBalle + 25, yBalle + 25);
		scene.lineTo(xBalle + 25 + 110 * Math.cos(angleLine), yBalle + 25 + 110 * Math.sin(angleLine)); //Dessin ligne
		scene.stroke();
		scene.strokeStyle = "#ffffff"; //couleur ligne en hexadécimal
		scene.closePath();
		if (revAngle) {
			angleLine += 0.008;
		} else {
			angleLine -= 0.008;
		}
		if (angleLine > 0) {
			angleLine = 0;
			revAngle = false;
		} else if (angleLine < -Math.PI) {
			angleLine = -Math.PI;
			revAngle = true;
		}
		if (keyState[32]) {
			xPasAnim = Math.cos(angleLine) * 7.07;
			yPasAnim = Math.sin(angleLine) * 7.07;
			if (angleLine < -Math.PI / 2) {
				if (xPasAnim < 0) {
					xPasAnim = -xPasAnim;
				}
				revx = true;
			} else if (angleLine > -Math.PI / 2) {
				if (xPasAnim < 0) {
					xPasAnim = -xPasAnim;
				}
				revx = false;
			}
			if (yPasAnim < 0) {
				yPasAnim = -yPasAnim;
				revy = false;
			}
			moveRaquette = true;
			reset();
			powerup = Math.floor((Math.random() * 100) + 1);
		}
	}
};
//Fonction quand on perd une vie
loseLife = function () {
	"use strict";
	yBalle = 649;
	scene.clearRect(xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
	scene.clearRect(xBalle, yBalle, 50, 50);
	moveRaquette = false;
	pupDirect = false;
	pupDirectActi = false;
	loseDirect = false;
	if (pupDef) {
		xRaquette = 496;
		xBalle = xRaquette + 119;
	} else {
		xRaquette = 540;
		xBalle = xRaquette + 75;
	}
	yRaquette = 700;
	angleLine = -Math.PI / 4;
	secon = 1;
	timer1();
	scene.drawImage(raquetteImg, xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
	scene.drawImage(balleImg, xBalle, yBalle, 50, 50);
	moveBalle = false;
};

var gameoverSound = function () {
	"use strict";
	audioBG.pause();
	clearInterval(bgLoop);
	gameoverSfx.play();
};

go = function () { //Perte des vies
	"use strict";
	nblife -= 1;
	loseLifeSfx.play();
	console.log(nblife);
	if (nblife <= 0) {
		scene.drawImage(goImg, 440, 300, goImg.width, goImg.height);
		moveBalle = false;
		moveRaquette = false;
		//gameoverSfx.play();
		setTimeout(gameoverSound, 2000);
	}
};

function win() {
	"use strict";
	var addLife, sumLife;
	addLife = function (a, b) {
		return a + b;
	};
	sumLife = pattern.reduce(addLife, 0);
	console.log(sumLife);
	console.log(pattern);
	if (sumLife === 0) {
		hasWon = true;
		moveBalle = false;
		moveRaquette = false;
		scene.clearRect(0, 0, 1280, 800);
		scene.drawImage(winImg, xWinImg, yWinImg, winImg.width, winImg.height);
		if (!winSfxPlayed) {
			audioBG.pause();
			winSfx.play();
			winSfxPlayed = true;
		}
		setTimeout(win, 30);
	}
}

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
		if (!pause && !hasWon && !hasLost && moveRaquette) {
			if (xRaquette <= 0) {
				scene.clearRect(xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
				xRaquette -= 0;
				scene.drawImage(raquetteImg, xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
			} else {
				scene.clearRect(xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
				xRaquette -= 20;
				scene.drawImage(raquetteImg, xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
			}
			if (!moveBalle && xBalle >= 65) {
				xBalle = xRaquette + 75;
				scene.clearRect(0, 0, 1280, 800);
				scene.beginPath();
				scene.drawImage(balleImg, xBalle, yRaquette - 51, 50, 50);
				for (k = 0; k < briquesObj.length; k = k + 1) {
					if (briquesObj[k].life) {
						if (pattern[k] === 1) {
							scene.drawImage(briqueImg, briquesObj[k].x, briquesObj[k].y, 80, 40);
						}
						if (pattern[k] === 2) {
							scene.drawImage(brique2Img, briquesObj[k].x, briquesObj[k].y, 80, 40);
						}
					}
				}
				scene.drawImage(raquetteImg, xRaquette, yRaquette, 200, 50);
			}
		}
		drawLife();
	}
	//Contrôles flèche droite et "d"
	if (keyState[39] || keyState[68]) {
		if (!pause && !hasWon && !hasLost && moveRaquette) {
			if (xRaquette >= 1280 - raquetteImg.width) {
				scene.clearRect(xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
				xRaquette += 0;
				scene.drawImage(raquetteImg, xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
			} else {
				scene.clearRect(xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
				xRaquette += 20;
				scene.drawImage(raquetteImg, xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
			}
			if (!moveBalle && xBalle <= 1205) {
				xBalle = xRaquette + 75;
				scene.clearRect(0, 0, 1280, 800);
				scene.beginPath();
				scene.drawImage(balleImg, xBalle, yRaquette - 51, 50, 50);
				for (k = 0; k < briquesObj.length; k = k + 1) {
					if (briquesObj[k].life) {
						if (pattern[k] === 1) {
							scene.drawImage(briqueImg, briquesObj[k].x, briquesObj[k].y, 80, 40);
						}
						if (pattern[k] === 2) {
							scene.drawImage(brique2Img, briquesObj[k].x, briquesObj[k].y, 80, 40);
						}
					}
				}
				scene.drawImage(raquetteImg, xRaquette, yRaquette, 200, 50);
			}
		}
		drawLife();
	}
	//Lancement de la balle (espace)
	if (keyState[32] && !moveBalle && !hasWon && !hasLost) {
		if (pause) {
			unpauseSfx.play();
		}
		moveBalle = true;
		pause = false;
		moveRaquette = true;
		animation();
	}
	if (keyState[32] && hasWon) {
		location.replace("../Menu/mainMenu.html");
	}
	if (keyState[32] && hasLost) {
		location.reload();
	}

	//Pause (P)
	if (keyState[80] && moveBalle && !hasWon) {
		moveBalle = false;
		pause = true;
		moveRaquette = false;
		pauseSfx.play();
	}

	//CHEAT Reset powerups (0/à)
	if ((keyState[48] && pupDef) || (keyState[48] && pupUnstop)) {
		scene.clearRect(xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
		raquetteImg.src = "Raquette.png";
		balleImg.src = "balle.png";
		//Il manque un son pour perdre le PUP
		raquetteImg.width = 200;
		raquetteImg.height = 50;
		if (pupDef) {
			xRaquette += 44;
		}
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

	//CHEAT Casser toutes les briques
	var cheatBrickFunc = function () {
		moveBalle = false;
		moveRaquette = false;
		if (cheatBrick < 90) {
			pattern[cheatBrick] = 0;
			cheatBrick += 1;
			setTimeout(cheatBrickFunc, 60);
		}
		animation();
		win();
	};
	if (keyState[51] && cheatBrick === 0) {
		cheatBrickFunc();
	}

	//CHEAT vies illimitées
	if (keyState[53]) {
		nblife = 999;
	}

	setTimeout(controls, 15); //Bouclage de la fonction controls
}

//Fonction qui montre le nombre de vies restantes
drawLife = function () {
	"use strict";
	scene.clearRect(0, 750, 225, 50);
	if (nblife <= 0) {
		hasLost = true;
	}
	if (nblife >= 1) {
		scene.drawImage(vieImg, 0, 750, 75, 50);
	}
	if (nblife >= 2) {
		scene.drawImage(vieImg, 75, 750, 75, 50);
	}
	if (nblife >= 3) {
		scene.drawImage(vieImg, 150, 750, 75, 50);
	}
	if (nblife > 3) {
		scene.drawImage(vieCheatImg, 0, 750, 225, 50);
	}
};

//Fonction principale : Animation du canvas et contrôle trajectoire de la balle
animation = function () {
	"use strict";
	//(Re)construction de la scène
	scene.clearRect(0, 0, 1280, 800);
	scene.drawImage(balleImg, xBalle, yBalle, 50, 50);
	for (k = 0; k < briquesObj.length; k = k + 1) {
		if (briquesObj[k].life) {
			if (pattern[k] === 1) {
				scene.drawImage(briqueImg, briquesObj[k].x, briquesObj[k].y, 80, 40);
			}
			if (pattern[k] === 2) {
				scene.drawImage(brique2Img, briquesObj[k].x, briquesObj[k].y, 80, 40);
			}
		}
	}
	if (!moveRaquette && pause) {
		scene.drawImage(pauseImg, 440, 200, pauseImg.width, pauseImg.height);
	}
	scene.drawImage(raquetteImg, xRaquette, yRaquette, raquetteImg.width, raquetteImg.height);
	if (masquagePup) {
		if (powerup < 34) {
			scene.drawImage(capsuleDEFImg, xCapsule, yCapsule, capsuleDEFImg.width, capsuleDEFImg.height);
			yCapsule += 4;
		} else if (powerup >= 34 && powerup < 67) {
			scene.drawImage(capsuleATKImg, xCapsule, yCapsule, capsuleATKImg.width, capsuleATKImg.height);
			yCapsule += 4;
		} else if (powerup >= 67) {
			scene.drawImage(capsuleDIRECTImg, xCapsule, yCapsule, capsuleDIRECTImg.width, capsuleDIRECTImg.height);
			yCapsule += 4;
		}
	}
	scene.drawImage(briqueIndest, xBriqueIndest, yBriqueIndest, briqueIndest.width, briqueIndest.height);
	if (pupDirect) {
		pupDirection();
	}
	//Trajectoire de la balle (à isoler)
	if (moveRaquette) {
		xPasAnim = 7.07 * Math.abs(Math.cos(angleLine));
		yPasAnim = 7.07 * Math.abs(Math.sin(angleLine));
		if (xBalle < 0) {
			revx = false;
			wallSfx.play();
		} else if (xBalle + 50 > 1280) {
			revx = true;
			wallSfx.play();
		}
		if (yBalle < 0) {
			revy = false;
			wallSfx.play();
		} else if (yBalle + 50 > 1000) {
			go();
			loseLife();
		}
		if (!revy) {
			yBalle = yBalle + yPasAnim;
		} else {
			yBalle = yBalle - yPasAnim;
		}
		if (!revx) {
			xBalle = xBalle + xPasAnim;
		} else {
			xBalle = xBalle - xPasAnim;
		}
	}
	//collisions pup raquette
	if (!pupDef) {
		if (xCapsule < xRaquette + 200 && xCapsule + 40 > xRaquette && yCapsule + 80 > yRaquette && yCapsule + 90 > yRaquette && yCapsule + 70 < yRaquette) { //collision sur le dessus
			masquagePup = false;
			collisionPupRaquette = true;
		}
		if (yCapsule + 80 > yRaquette && yCapsule < yRaquette + 50 && xCapsule + 40 > xRaquette && xCapsule + 30 < xRaquette && xCapsule + 50 > xRaquette) { //collision gauche
			masquagePup = false;
			collisionPupRaquette = true;
		}
		if (yCapsule + 80 > yRaquette && yCapsule < yRaquette + 50 && xCapsule < xRaquette + 200 && xCapsule - 10 < xRaquette + 200 && xCapsule + 10 > xRaquette + 200) {
			masquagePup = false;
			collisionPupRaquette = true;
		}
		if (xCapsule < xRaquette + 200 && xCapsule + 40 > xRaquette && yCapsule < yRaquette + 50 && yCapsule + 10 > yRaquette + 50 && yCapsule - 10 < yRaquette + 50) {
			masquagePup = false;
			collisionPupRaquette = true;
		}
	} else {
		if (xCapsule < xRaquette + 288 && xCapsule + 40 > xRaquette && yCapsule + 80 > yRaquette && yCapsule + 90 > yRaquette && yCapsule + 70 < yRaquette) { //collision sur le dessus
			masquagePup = false;
			collisionPupRaquette = true;
		}
		if (yCapsule + 80 > yRaquette && yCapsule < yRaquette + 50 && xCapsule + 40 > xRaquette && xCapsule + 30 < xRaquette && xCapsule + 50 > xRaquette) { //collision gauche
			masquagePup = false;
			collisionPupRaquette = true;
		}
		if (yCapsule + 80 > yRaquette && yCapsule < yRaquette + 50 && xCapsule < xRaquette + 288 && xCapsule - 10 < xRaquette + 288 && xCapsule + 10 > xRaquette + 288) {
			masquagePup = false;
			collisionPupRaquette = true;
		}
		if (xCapsule < xRaquette + 288 && xCapsule + 40 > xRaquette && yCapsule < yRaquette + 50 && yCapsule + 10 > yRaquette + 50 && yCapsule - 10 < yRaquette + 50) {
			masquagePup = false;
			collisionPupRaquette = true;
		}
	}
	if (yCapsule > 800) {
		allowPowerup = true;
		masquagePup = false;
		powerup = Math.floor((Math.random() * 100) + 1);
	}
	if (collisionPupRaquette) {
		if (powerup < 34) {
			defense();
		} else if (powerup >= 34 && powerup < 67) {
			unstoppable();
		} else if (powerup >= 67) {
			pupDirection();
		}
		collisionPupRaquette = false;
	}


	//Fonction collision avec la raquette :
	if (!pupDef) {
		if (xBalle < xRaquette + 200 && xBalle + 50 > xRaquette && yBalle + 50 > yRaquette && yBalle + 60 > yRaquette && yBalle + 40 < yRaquette) { //collision sur le dessus
			revy = true;
			collisionMemeSens = true;
			if (keyState[39] && revx) {
				angleLine += 0.15;
			} else if (keyState[39] && !revx) {
				angleLine -= 0.15;
			}
			if (keyState[37] && revx) {
				angleLine -= 0.15;
			} else if (keyState[37] && !revx) {
				angleLine += 0.15;
			}
			if (xPasAnim <= 0) {
				revx = !revx;
				xPasAnim = -xPasAnim;
			}
			if (yPasAnim <= 0) {
				revy = !revy;
				yPasAnim = 0;
			}
			if (pupDirect) {
				angleLine = -Math.PI / 2;
				loseDirect = true;
				pupDirectActi = true;
			}
			raquetteSfx.play();
		}
		if (xBalle < xRaquette + 200 && xBalle + 50 > xRaquette && yBalle < yRaquette + 50 && yBalle + 10 > yRaquette + 50 && yBalle - 10 < yRaquette + 50) {
			revy = false;
			collisionMemeSens = true;
			raquetteSfx.play();
		}
		if (yBalle + 50 > yRaquette && yBalle < yRaquette + 50 && xBalle + 50 > xRaquette && xBalle + 50 < xRaquette + 100) { //collision gauche
			if (!collisionMemeSens) {
				if (revx) {
					xBalle = xRaquette - 50;
				}
				revx = true;
				raquetteSfx.play();
			}
			collisionMemeSens = false;
		}
		if (yBalle + 50 > yRaquette && yBalle < yRaquette + 50 && xBalle < xRaquette + 200 && xBalle > xRaquette + 100) {
			if (!collisionMemeSens) {
				if (!revx) {
					xBalle = xRaquette + 200;
				}
				revx = false;
				raquetteSfx.play();
			}
			collisionMemeSens = false;
		}
	} else {
		if (xBalle < xRaquette + 288 && xBalle + 50 > xRaquette && yBalle + 50 > yRaquette && yBalle + 60 > yRaquette && yBalle + 40 < yRaquette) { //collision sur le dessus
			revy = true;
			collisionMemeSens = true;
			if (keyState[39] && revx) {
				angleLine += 0.15;
			} else if (keyState[39] && !revx) {
				angleLine -= 0.15;
			}
			if (keyState[37] && revx) {
				angleLine -= 0.15;
			} else if (keyState[37] && !revx) {
				angleLine += 0.15;
			}
			if (xPasAnim <= 0) {
				revx = !revx;
				xPasAnim = -xPasAnim;
			}
			if (yPasAnim <= 0) {
				revy = !revy;
				yPasAnim = 0;
			}
			if (pupDirect) {
				angleLine = -Math.PI / 2;
				pupDirectActi = true;
			}
			raquetteSfx.play();

		}
		if (xBalle < xRaquette + 288 && xBalle + 50 > xRaquette && yBalle < yRaquette + 50 && yBalle + 10 > yRaquette + 50 && yBalle - 10 < yRaquette + 50) {
			revy = false;
			collisionMemeSens = true;
			raquetteSfx.play();
		}
		if (yBalle + 50 > yRaquette && yBalle < yRaquette + 50 && xBalle + 50 > xRaquette && xBalle + 50 < xRaquette + 144) { //collision gauche
			if (!collisionMemeSens) {
				if (revx) {
					xBalle = xRaquette - 50;
				}
				revx = true;
			}
			raquetteSfx.play();
		}
		if (yBalle + 50 > yRaquette && yBalle < yRaquette + 50 && xBalle < xRaquette + 288 && xBalle > xRaquette + 144) {
			if (!collisionMemeSens) {
				if (!revx) {
					xBalle = xRaquette + 288;
				}
				revx = false;
			}
			raquetteSfx.play();
		}
		collisionMemeSens = false;
	}
	//Collisions brique incassable + trajectoire
	if (xBriqueIndest < 0) {
		revxBrique = false;
	} else if (xBriqueIndest + 80 > 1280) {
		revxBrique = true;
	}
	if (!revxBrique) {
		xBriqueIndest += 4;
	} else {
		xBriqueIndest -= 4;
	}
	if (yBalle + 50 > yBriqueIndest && yBalle < yBriqueIndest + 40 && xBalle + 50 > xBriqueIndest && xBalle + 40 < xBriqueIndest && xBalle + 60 > xBriqueIndest) {
		revx = true;
		briqueSfx.play();
	}
	if (yBalle + 50 > yBriqueIndest && yBalle < yBriqueIndest + 40 && xBalle < xBriqueIndest + 120 && xBalle - 10 < xBriqueIndest + 120 && xBalle + 10 > xBriqueIndest + 120) {
		revx = false;
		briqueSfx.play();
	}
	if (yBalle < yBriqueIndest + 40 && yBalle - 10 < yBriqueIndest + 40 && yBalle + 10 > yBriqueIndest + 40 && xBalle + 50 > xBriqueIndest && xBalle < xBriqueIndest + 120) {
		if (!revxBrique && !revx) {
			angleLine += 0.15;
		} else if (!revxBrique && revx) {
			angleLine -= 0.15;
		}
		if (revxBrique && !revx) {
			angleLine -= 0.15;
		} else if (revxBrique && revx) {
			angleLine += 0.15;
		}
		if (xPasAnim <= 0) {
			revx = !revx;
			xPasAnim = -xPasAnim;
		}
		if (yPasAnim <= 0) {
			revy = !revy;
			yPasAnim = 0;
		}
		revy = false;
		briqueSfx.play();
	}
	if (yBalle + 50 > yBriqueIndest && yBalle + 40 < yBriqueIndest && yBalle + 60 > yBriqueIndest && xBalle + 50 > xBriqueIndest && xBalle < xBriqueIndest + 120) {
		if (!revxBrique && !revx) {
			angleLine -= 0.15;
		} else if (!revxBrique && revx) {
			angleLine += 0.15;
		}
		if (revxBrique && !revx) {
			angleLine += 0.15;
		} else if (revxBrique && revx) {
			angleLine -= 0.15;
		}
		if (xPasAnim <= 0) {
			revx = !revx;
			xPasAnim = -xPasAnim;
		}
		if (yPasAnim <= 0) {
			revy = !revy;
			yPasAnim = 0;
		}
		revy = true;
		briqueSfx.play();
	}

	//Collisions balle-briques
	for (j = 0; j < briquesObj.length; j += 1) {
		if (pattern[j] > 0) {
			if (yBalle + 50 > briquesObj[j].y && yBalle < briquesObj[j].y + 40 && xBalle + 50 > briquesObj[j].x && xBalle + 40 < briquesObj[j].x && xBalle + 60 > briquesObj[j].x) { //collision gauche
				if (!pupUnstop) {
					revx = true;
				}
				if (pattern[j] > 0 && !briquesObj[j].hit) {
					pattern[j] -= 1;
					briquesObj[j].hit = true;
					briqueSfx.play();
				}
				if (pattern[j] <= 0) {
					briquesObj[j].life = false;
					win();
					powerupTime = Math.floor((Math.random() * 100) + 1);
					if (powerupTime <= 20 && allowPowerup) {
						xCapsule = briquesObj[j].x + 20;
						yCapsule = briquesObj[j].y + 40;
						masquagePup = true;
						allowPowerup = false;
					}
				}
			}
			if (yBalle + 50 > briquesObj[j].y && yBalle < briquesObj[j].y + 40 && xBalle < briquesObj[j].x + 80 && xBalle - 10 < briquesObj[j].x + 80 && xBalle + 10 > briquesObj[j].x + 80) { //collision droite
				if (!pupUnstop) {
					revx = false;
				}
				if (pattern[j] > 0 && !briquesObj[j].hit) {
					pattern[j] -= 1;
					briquesObj[j].hit = true;
					briqueSfx.play();
				}
				if (pattern[j] <= 0) {
					briquesObj[j].life = false;
					win();
					powerupTime = Math.floor((Math.random() * 100) + 1);
					if (powerupTime <= 20 && allowPowerup) {
						xCapsule = briquesObj[j].x + 20;
						yCapsule = briquesObj[j].y + 40;
						masquagePup = true;
						allowPowerup = false;
					}
				}
			}
			if (yBalle < briquesObj[j].y + 40 && yBalle - 10 < briquesObj[j].y + 40 && yBalle + 10 > briquesObj[j].y + 40 && xBalle + 50 > briquesObj[j].x && xBalle < briquesObj[j].x + 80) { //collision bas
				if (!pupUnstop) {
					revy = false;
				}
				if (pattern[j] > 0 && !briquesObj[j].hit) {
					pattern[j] -= 1;
					briquesObj[j].hit = true;
					briqueSfx.play();
				}
				if (pattern[j] <= 0) {
					briquesObj[j].life = false;
					win();
					powerupTime = Math.floor((Math.random() * 100) + 1);
					if (powerupTime <= 20 && allowPowerup) {
						xCapsule = briquesObj[j].x + 20;
						yCapsule = briquesObj[j].y + 40;
						masquagePup = true;
						allowPowerup = false;
					}
				}
			}
			if (yBalle + 50 > briquesObj[j].y && yBalle + 40 < briquesObj[j].y && yBalle + 60 > briquesObj[j].y && xBalle + 50 > briquesObj[j].x && xBalle < briquesObj[j].x + 80) { //collision haut
				if (!pupUnstop) {
					revy = true;
				}
				if (pattern[j] > 0 && !briquesObj[j].hit) {
					pattern[j] -= 1;
					briquesObj[j].hit = true;
					briqueSfx.play();
				}
				if (pattern[j] <= 0) {
					briquesObj[j].life = false;
					win();
					powerupTime = Math.floor((Math.random() * 100) + 1);
					if (powerupTime <= 100 && allowPowerup) {
						xCapsule = briquesObj[j].x + 20;
						yCapsule = briquesObj[j].y + 40;
						masquagePup = true;
						allowPowerup = false;
					}
				}
			}
			briquesObj[j].hit = false;
		}
	}
	drawLife();
	//Bouclage de la fonction animation
	if (moveBalle) {
		setTimeout(animation, speedBalle); //Boucle qui lance la fonction animation
	}
};
//Fonction qui gère la musique
backgroundMusic = function () {
	"use strict";
	audioBG.play();
	audioBG.volume = 0.3;
	bgLoop = setTimeout(backgroundMusic, 202000);
};

//Lancement des fonctions principales après chargement de la page
setTimeout(creaBriques, 499);
setTimeout(animation, 500);
setTimeout(controls, 501);
backgroundMusic();

/******************************************************
                    Fin du programme
******************************************************/
