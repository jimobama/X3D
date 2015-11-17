/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


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
  
    tran3f= new Transform3D(new Vector3f(0,0,5));
    tran3f.setPersp(70.0,display.getWidth(), display.getHeight(), 0.01, 1000);
    __camera= new Camera();
    tran3f.setCamera(__camera);
    texture = Texture.load(display.getContext(),"carpet.png");
    material= new Material(texture, new Vector3f(1.0,0.0,1.0));
    model = new Model();
    model.load("cude.obj");
    tran3f.setScale(new Vector2f(0.2,0.2));
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
    var  keyboard = display.getKeyboard();
         keyboard.SPEED =0.005;
          if(keyboard instanceof Keyboard)
          {
               
                keyboard.onKeyDown(function(key,charCode,character){
                
                if(Keyboard.Keys.K_W===key){  
                    
                   
                 }
                  
              });
          }
   
        
   mesh = new Mesh( model.getVertices(),  model.getIndices());
   mesh.init(shader);  
   display.update(this.__run__);
    
});


Game.prototype.__run__ =(function(delta){
    
     RenderUtils.clear(display.getContext(),0.2,0.2,0.2,1.0);
     shader.setUniform1i("uSampler",texture.getIndex());
     __camera.setPosition(new Vector3f(Math.cos(speed),Math.sin(speed),Math.cos(speed)+3.0));
  
     shader.setUniformMatrix4f("transform3D",tran3f.getPerspTransform());
   
     shader.update(material);
     mesh.draw();
    
     speed+=0.01;
    
    
});