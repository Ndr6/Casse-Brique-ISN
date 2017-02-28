
window.addEventListener("load", function () {

    
    var canvas = document.getElementById('canvas');
    var scene = canvas.getContext("2d");
    var x = 100;
    var y = 700;
    var image = new Image();
	var image2 = new Image();
	image.src = "barreSpatiale.png";
	image.width = 200;
	image.height = 50;
	image2.src = "briquecaillou.png";
	image2.width = 120;
	image2.height = 30;
	var grand = false;
	var brique = canvas.getContext('2d');
	for (v = 5; v < 248; v = v + 62) {
		for (i = 12; i < 1150; i = i + 126) {
			brique.drawImage(image2, i, v, 124, 60)
		}
	}
	

	
    
    
    document.addEventListener("keydown", function (event) {    
 
    switch (event.keyCode) {   
                
            case 39 :
			if (x >= 1272 - image.width) {
					scene.clearRect(x, y, image.width, image.height);
                    x += 0;
					scene.drawImage(image, x, y, image.width, image.height);
			} else {
				scene.clearRect(x, y, image.width, image.height);
                    x += 25;
					scene.drawImage(image, x, y, image.width, image.height);
					
				}
                break;
				
            case 37 :
			if (x <= 1) {
					scene.clearRect(x, y, image.width, image.height);
                    x -= 0;
					scene.drawImage(image, x, y, image.width, image.height);
					
				} else {
				scene.clearRect(x, y, image.width, image.height);
                    x -= 25;
					scene.drawImage(image, x, y ,image.width, image.height);
				} ;
			 break;
			
			case 38 :
				image.src = "barreSpatialeGrande.png";
					image.width = 300;
					image.height = 50;
					if (x >= 1272 - image.width) {
					x = 1272 - image.width;
					scene.clearRect(x, y, image.width, image.height);
					scene.drawImage(image, x, y, image.width, image.height);
					}
                break;
    }
    })
})


                              
