  window.addEventListener("load", function() {

    
   
    x = 100;
    y = 700;
    image = new Image();
    image.src = "barreSpatiale.png" ; 
	image.width = 200;
	image.height = 50;
    canvas = document.getElementById('canvas');
    scene = canvas.getContext("2d");
	rayon = 25;
	pas = 5;
	posx = 100;
	posy = 600;
	revx=false;
	revy=false;
    flag = false;
    
	image2 = new Image();
	
	image2.src = "briquecaillou.png" ; 
	image2.width = 80;
	image2.height = 40;
	grand = false;
	image3 = new Image();
	image3.src = "terre.png" ;
	image3.width = 50;
	image3.height = 50;
	// var balle=canvas.getContext('2d');
	//scene.drawImage(image3,posx,posy,50,50);
	//var brique=canvas.getContext('2d');
	for(v=15; v<248; v=v+42){
		for(i=20; i<1200; i=i+82){
			scene.drawImage(image2,i,v,80,40)
		}
	}
  })
	window.onkeydown = function(event){
	if (event.keyCode==39){
		if (!flag){
			flag=true;
			animation();
		}
	}
	if (event.keyCode==38){
		flag=false;
	}
    }
  function animation(){
		scene.clearRect(0,0,1280,800);
		scene.beginPath();
		scene.drawImage(image3,posx,posy,50,50);
        for(v=15; v<248; v=v+42){
		for(i=20; i<1200; i=i+82){
			scene.drawImage(image2,i,v,80,40)
		}
	    }
        scene.drawImage(image,x,y,image.width,image.height);
        
		scene.closePath();
		scene.fill();
		if (posx<rayon){
		posx=rayon;
		revx=false;
		}
		else if (posx+rayon>1280) {
		posx=1280-rayon;
		revx=true;
		}
	
		if (!revx){
		posx=posx+pas;
		}
		else{
		
			posx=posx-pas;
			}
		if (posy<rayon){
			posy=rayon;
			revy=false;
		}
		else if (posy+rayon>800) {
			posy=800-rayon;
			revy=true;
		}
	
		if (!revy){
			posy=posy+pas;
		}
		else{
		
			posy=posy-pas;
		}
		if (flag){
			setTimeout(animation, 10);
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
                    x += 50;
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
                    x -= 50;
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




                              
