// create an array of assets to load

	var assetsToLoader = ["../resources/bg-back.png","../resources/bg-front.png","../resources/bg-house.png",
                          "../resources/clouds.png","../resources/landscape_one.png"];

	// create a new loader
	loader = new PIXI.AssetLoader(assetsToLoader);

	// use callback
	loader.onComplete = onAssetsLoaded;

	//begin load
	loader.load();

	// create an new instance of a pixi stage
	var stage = new PIXI.Stage(0xFFFFFF, true);

	// create a renderer instance
	var renderer = new PIXI.autoDetectRenderer(1080, 768,
                                              {view:document.getElementById("game-canvas")}
                                              );

	// set the canvas width and height, and margin
	renderer.view.style.display = "block";
    renderer.view.style.margin = "auto";
	renderer.view.style.width = "1080"
	renderer.view.style.height = "720"

	// add render view to DOM
	document.body.appendChild(renderer.view);

// Keyboard function

                function keyboard(keyCode) {
                  var key = {};
                  key.code = keyCode;
                  key.isDown = false;
                  key.isUp = true;
                  key.press = undefined;
                  key.release = undefined;
                  //The `downHandler`
                  key.downHandler = function(event) {
                    if (event.keyCode === key.code) {
                      if (key.isUp && key.press) key.press();
                      key.isDown = true;
                      key.isUp = false;
                    }
                    event.preventDefault();
                  };

                  //The `upHandler`
                  key.upHandler = function(event) {
                    if (event.keyCode === key.code) {
                      if (key.isDown && key.release) key.release();
                      key.isDown = false;
                      key.isUp = true;
                    }
                    event.preventDefault();
                  };

                  //Attach event listeners
                  window.addEventListener(
                    "keydown", key.downHandler.bind(key), false
                  );
                  window.addEventListener(
                    "keyup", key.upHandler.bind(key), false
                  );
                  return key;
                }


function onAssetsLoaded() {
    
 
    // adding textures
    
    //sky
    var farTexture = PIXI.Texture.fromImage("../resources/bg-back.png");
    far = new PIXI.Sprite(farTexture);
    far.position.x = 0;
    far.position.y = 0;
    
    stage.addChild(far);
    
    //clouds
    var cloudsTexture = PIXI.Texture.fromImage("../resources/clouds.png");
    clouds = new PIXI.TilingSprite(cloudsTexture, 1294, 720);
    clouds.position.x = 0;
    clouds.position.y = 0;
    clouds.tilePosition.x = 0;
    clouds.tilePosition.y = 0;
    
    stage.addChild(clouds);
    
    //forest
    var forestTexture = PIXI.Texture.fromImage("../resources/landscape_two.png");
    forest = new PIXI.Sprite(forestTexture,1756, 768);
    forest.position.x = -10;
    forest.position.y = 5;
    
    forest.vx = 0;
    forest.vy = 0;
    
    stage.addChild(forest);
    
    //hills
    var hillsTexture = PIXI.Texture.fromImage("../resources/landscape_one.png");
    hills = new PIXI.Sprite(hillsTexture,1756, 768);
    hills.position.x = 0;
    hills.position.y = 15;
    
    hills.vx = 0;
    hills.vy = 0;
    
    stage.addChild(hills);
    
    //house
    var houseTexture = PIXI.Texture.fromImage("../resources/bg-house.png");
    house = new PIXI.Sprite(houseTexture, 1771, 768);
    house.position.x = 0;
    house.position.y = 0;
    
    house.vx = 0;
    house.vy = 0;
    
    stage.addChild(house);
    
    //house
    var ballonTexture = PIXI.Texture.fromImage("../resources/ballon.png");
    ballon = new PIXI.Sprite(ballonTexture, 338, 608);
    ballon.position.x = 100;
    ballon.position.y = 0;
    
    ballon.vx = 0;
    ballon.vy = 0;
    
    stage.addChild(ballon);
    
    //town
    var townTexture = PIXI.Texture.fromImage("../resources/bg-front.png");
    town = new PIXI.Sprite(townTexture, 1080);
    town.position.x = 0;
    town.position.y = 0;
    
    stage.addChild(town);
     
                
                //Capture the keyboard arrow keys
                        var left = keyboard(37),
                            right = keyboard(39);

                        //right arrow key `press` method
                          right.press = function() {
                              
                            house.vx = 1.5;
                            hills.vx = 0.650;
                            forest.vx = 0.580;
                            ballon.vy = 0.7;  
                              
                        //Left arrow key `release` method
                          right.release = function() {
                            //If the left arrow has been released, and the right arrow isn't down,
                            //Stop the elements
                            if (!left.isDown) {
                              house.vx = 0;
                              hills.vx = 0;
                              forest.vx = 0;
                              ballon.vx = -2; 
                            }   
                          };      

                          };
                        
                        //left arrow key `press` method
                          left.press = function() {
                            
                            house.vx = -1.5;
                            hills.vx = -0.650;
                            forest.vx = -0.580;
                              
                                //Left arrow key `release` method
                          left.release = function() {
                            //If the left arrow has been released, and the right arrow isn't down,
                            //Stop the elements
                            if (!right.isDown) {
                              house.vx = 0;
                              hills.vx = 0;
                              forest.vx = 0;
                            }
                          };
                              
                          };
    
requestAnimFrame(update);
    
}

// Update function

function update() {
              clouds.tilePosition.x -= -0.200;
                
                house.position.x -= house.vx;
                hills.position.x -= hills.vx;
                forest.position.x -= forest.vx;
    
                ballon.position.y -= ballon.vy;
                ballon.position.x -= ballon.vx;
    
    if (house.position.x>-1) {
                house.vx = 0;
                hills.vx = 0;
                forest.vx = 0;
                      } 
    else if (house.position.x< -665) {
                house.vx = 0;
                hills.vx = 0;
                forest.vx = 0;
                      } 
    
  requestAnimFrame(update);
  renderer.render(stage);
}



