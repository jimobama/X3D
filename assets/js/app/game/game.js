/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var Game =(function(){
     var translation;
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
      
    self.__init__();
    })(this);
    
    
});

Game.prototype.__init__=(function(){
  
    speed =0.05;
    display= new Display("glcanvas");
    display.initialGL();
    display.resize(new Vector2f(500,600));
    RenderUtils.initialize(display.getContext());
    
    shader = new Shader(display.getContext());
    shader.init();
    shader.createFromFile("vertex.glsl",shader.VERTEX_SHADER );
    shader.createFromFile("fragment.glsl",shader.FRAGMENT_SHADER);
    shader.compile();
    shader.addUniform("uSampler");
    shader.addUniform("transform3D");
  
    tran3f= new Transform3D(new Vector3f(0,0,0));
    tran3f.setPersp(70.0,display.getWidth(), display.getHeight(), 0.01, 1000.0);
    __camera= new Camera();
    tran3f.setCamera(__camera);
    texture = Texture.load(display.getContext(),"carpet.png");
    material= new Material(texture, new Vector3f(1.0,0.0,1.0));
    model = new Model();
    model.load("cude.obj");
    translation= document.getElementById("translation");
     
    tran3f.setScale(new Vector2f(0.2,0.2));
    translation.innerHTML="x = "+ __camera.getPosition().x + " y = "+__camera.getPosition().y+" z = "+__camera.getPosition().z;
   var vertices=[
       new Vertex( new Vector3f(-1.0,  -1.0,  0.0),null, new Vector2f(0.0 ,0.0)),
       new Vertex( new Vector3f(-1.0, 1.0,  0.0),null, new Vector2f( 0.0 , 1.0)),      
       new Vertex( new Vector3f(1.0,  1.0, 0.0),null, new Vector2f(1.0 , 1.0)), 
       new Vertex( new Vector3f(1.0, -1.0, 0.0),null, new Vector2f(1.0 , 0.0))   
   ];
   
   var indices=[
        0,1,2,
        0,2,3
   ];
   keyboard = display.getKeyboard();
 
  g__mouse= display.getMouse()  ;
   mesh = new Mesh(vertices,indices);
   mesh.init(shader);  
   display.update(this.__run__);
    
});


Game.prototype.__run__ =(function(delta){
    
     __camera.enableKeyboard(keyboard);
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
           translation.innerHTML="Button1 x = "+ x + " y = "+y; 
       }
      
    }));
    
 
     RenderUtils.clear(display.getContext(),0.2,0.2,0.2,1.0);
     shader.setUniform1i("uSampler",texture.getIndex());
     shader.setUniformMatrix4f("transform3D",tran3f.getPerspTransform());
   
     shader.update(material);
     mesh.draw();
    speed+=0.01;
   
   
});