/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var in_input=null;
var Game =(function(){

    var display;
    var shader;
    var mesh;
    var tran3f;
    var  __camera;
    var speed;
    var model;
    var texture=null;
    var material;
    var g__mouse ;
    var  keyboard; 
    this.__call__ =(function(self){      
      self.__construct();
    })(this);
    
    
});

Game.prototype.__construct=(function(){
  
    speed =0.05;
    display= new Display("glcanvas");
    display.initialGL();
    display.resize(new Vector2f(500,600));
    RenderUtils.initialize(display.getContext());  
    shader = new PhongShader(display.getContext());
    tran3f= new Transform3D(new Vector3f(0,0,0));
    tran3f.setPersp(70.0,display.getWidth(), display.getHeight(), 0.01, 1000.0);
    __camera= new Camera();
    tran3f.setCamera(__camera);
    texture = Texture.load(display.getContext(),"carpet.png");
    material= new Material(texture, new Vector3f(1,1.0,1.0));
    
    var pointLights =[
        
        new PointLight(new BaseLight(new Vector3f(1,0,0),0.8), new Attenuation(0,0,1), new Vector3f(-2,1,3.0)),
        new PointLight(new BaseLight(new Vector3f(0,1,0),0.8), new Attenuation(0,0,1), new Vector3f(-2,1,3.0))
       
    ];
    
    shader.addAmbientLight(new Vector3f(0.1,0.1,0.1));
    //shader.setPointLights(pointLights);
    shader.addDirectionLight(new DirectionLight( new BaseLight(new Vector3f(1,1,1),0.2), new Vector3f(1,1,1)));
   
    
    model = new Model();
    model.load("cude.obj");
    var vertices=[
        //front
       new Vertex( new Vector3f( -1.0, -1.0,  1.0),null, new Vector2f(0.0 ,0.0)),
       new Vertex( new Vector3f( 1.0, -1.0,  1.0),null, new Vector2f( 0.0 , 1.0)),      
       new Vertex( new Vector3f(1.0,  1.0,  1.0),null, new Vector2f(1.0 , 1.0)), 
       new Vertex( new Vector3f(-1.0,  1.0,  1.0),null, new Vector2f(1.0 , 0.0)),   
       //back
       new Vertex( new Vector3f(-1.0, -1.0, -1.0),null, new Vector2f(0.0 ,0.0)),
       new Vertex( new Vector3f(-1.0,  1.0, -1.0),null, new Vector2f( 0.0 , 1.0)),      
       new Vertex( new Vector3f( 1.0,  1.0, -1.0),null, new Vector2f(1.0 , 1.0)), 
       new Vertex( new Vector3f(1.0, -1.0, -1.0),null, new Vector2f(1.0 , 0.0))  , 
       //top
        new Vertex( new Vector3f( -1.0,  1.0, -1.0),null, new Vector2f(0.0 ,0.0)),
       new Vertex( new Vector3f(- -1.0,  1.0,  1.0),null, new Vector2f( 0.0 , 1.0)),      
       new Vertex( new Vector3f(1.0,  1.0,  1.0),null, new Vector2f(1.0 , 1.0)), 
       new Vertex( new Vector3f(1.0,  1.0, -1.0),null, new Vector2f(1.0 , 0.0))  , 
       //bottom
        new Vertex( new Vector3f(-1.0, -1.0, -1.0),null, new Vector2f(0.0 ,0.0)),
       new Vertex( new Vector3f( 1.0, -1.0, -1.0),null, new Vector2f( 0.0 , 1.0)),      
       new Vertex( new Vector3f(1.0, -1.0,  1.0),null, new Vector2f(1.0 , 1.0)), 
       new Vertex( new Vector3f(-1.0, -1.0,  1.0),null, new Vector2f(1.0 , 0.0))   ,
       //right
       new Vertex( new Vector3f(1.0, -1.0, -1.0),null, new Vector2f(0.0 ,0.0)),
       new Vertex( new Vector3f(1.0,  1.0, -1.0),null, new Vector2f( 0.0 , 1.0)),      
       new Vertex( new Vector3f(1.0,  1.0,  1.0),null, new Vector2f(1.0 , 1.0)), 
       new Vertex( new Vector3f(1.0, -1.0,  1.0),null, new Vector2f(1.0 , 0.0))   ,
       //left
       new Vertex( new Vector3f(-1.0, -1.0, -1.0),null, new Vector2f(0.0 ,0.0)),
       new Vertex( new Vector3f(-1.0, -1.0,  1.0),null, new Vector2f( 0.0 , 1.0)),      
       new Vertex( new Vector3f(-1.0,  1.0,  1.0),null, new Vector2f(1.0 , 1.0)), 
       new Vertex( new Vector3f(-1.0,  1.0, -1.0),null, new Vector2f(1.0 , 0.0))
       
   ];
   
   var indices=[
         0, 1, 2,      0, 2, 3,    // Front face
         4, 5, 6,      4, 6, 7,    // Back face
         8, 9, 10,     8, 10, 11,  // Top face
         12, 13, 14,   12, 14, 15, // Bottom face
         16, 17, 18,   16, 18, 19, // Right face
         20, 21, 22,   20, 22, 23  // Left face
   ];
   
 
   keyboard = display.getKeyboard();
   in_input = new Input(display);
   g__mouse= display.getMouse()  ;
   mesh = new Mesh(shader,vertices,indices,true);

   display.update(this.__run__);
});



Game.prototype.__update__=(function(delta){
    
    __camera.setEnableKeyboard(keyboard);
       
    g__mouse.setMouseEvent((function( button , action, x, y){
     
       if(button===Mouse.BUTTON1 && action== Mouse.KEY_PRESSED)
       { 
             g__mouse.lock();
             g__mouse.setGrap(true);
       }else{
            g__mouse.unlock();  
            g__mouse.setGrap(false);
       }
    }));
     g__mouse.setMouseMove((function( x, y){
         
       
        if(g__mouse.getGrap()){  
           var v3=new   Vector3f(900,500,0);
           v3= v3.rotateX(30);
          
       }
      
    }));
   tran3f.setRotation(new Vector3f(Math.sin(speed )*20,Math.cos(speed)*20,0));
   shader.update(material,tran3f);
   speed+=0.01; 
});


Game.prototype.__draw__=(function(){
    
    var camPos= new Vector3f(__camera.getPosition().x,__camera.getPosition().y,__camera.getPosition().z);
    camPos=  camPos.mul(1/2045).abs();
    RenderUtils.clear(display.getContext(),camPos.x,camPos.y,camPos.z,1); 
    mesh.draw();
});
Game.prototype.__run__ =(function(delta){
    
    Game.prototype.__update__(delta);
    Game.prototype.__draw__();
 
   
});