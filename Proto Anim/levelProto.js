
window.addEventListener("load", function(){

    
    var canvas = document.getElementById('canvas');
    var scene = canvas.getContext("2d");
    var x = 100;
    var y = 700;
	var rayon = 25;
	var pas = 30;
	var posx = 100;
	var posy = 600;
	var revx=false;
	var revy=false;
    var image = new Image();
	var image2 = new Image();
	image.src = "barreSpatiale.png" ;
	image.width = 200;
	image.height = 50;
	image2.src = "briquecaillou.png" ;
	image2.width = 80;
	image2.height = 40;
	var grand = false;
	var image3 = new Image();
	image3.src = "terre.png" ;
	image3.width = 50;
	image3.height = 50;
	var balle=canvas.getContext('2d');
	balle.drawImage(image3,posx,posy,50,50);
	var brique=canvas.getContext('2d');
	for(v=15; v<248; v=v+42){
		for(i=20; i<1200; i=i+82){
			brique.drawImage(image2,i,v,80,40)
		}
	}
	
	
	
	
	
		
		
		
	

	
    
    
    document.addEventListener("keydown", function (event) {    
 
    switch (event.keyCode) {   
                
            case 39 :
			if (x >= 1272-image.width){
					scene.clearRect(x, y, image.width,image.height);
                    x += 0;
					scene.drawImage(image,x,y,image.width,image.height);
			} else{
				scene.clearRect(x, y, image.width,image.height);
                    x += 25;
					scene.drawImage(image,x,y,image.width,image.height);
					
				}
                break;
				
            case 37 :
			if (x <= 1){
					scene.clearRect(x, y, image.width,image.height);
                    x -= 0;
					scene.drawImage(image,x,y,image.width,image.height);
					
				} else{
				scene.clearRect(x, y, image.width,image.height);
                    x -= 25;
					scene.drawImage(image,x,y,image.width,image.height);
				};	
			 break;
			
			case 38 :
				image.src = "barreSpatialeGrande.png";
					image.width = 300;
					image.height = 50;
					if (x >= 1272-image.width){
					x=1272-image.width;
					scene.clearRect(x, y, image.width,image.height);
					scene.drawImage(image,x,y,image.width,image.height);
					}
                break;	
        }  
	
})
})


                              
