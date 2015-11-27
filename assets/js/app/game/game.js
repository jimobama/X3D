/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var in_input=null;
var Game =(function(){
    var display;
   
    var speed;
    var g__mouse ;
    var  keyboard; 
    
   var root=null;
 
    
    this.__call__ =(function(self){      
      self.__construct();
    })(this);
   
});
var box1;
var box2;
Game.prototype.__construct=(function(){
  
    speed =0.05;
    display= new Display("glcanvas");
    display.initialGL();
    display.resize(new Vector2f(500,600));
    RenderUtils.initialize(display.getContext());  
    var shader = new BasicShader(display.getContext());
   var tran3f= new Transform3D(new Vector3f(0,0,-3));
   var tran3f1= new Transform3D(new Vector3f(0,2,-5));
   tran3f.setPersp(70.0,display.getWidth(), display.getHeight(), 0.01, 1000.0);
    var   __camera= new Camera();
    tran3f1.setCamera(__camera);
    tran3f.setCamera(__camera);
    root = new XObject();
    root.setTransformation(tran3f);
   box1 = new XObject();
   box2 = new XObject();
 
   
 
 
    
   
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
   
     var indices=[
         0, 1, 2,      0, 2, 3,    // Front face
         4, 5, 6,      4, 6, 7,    // Back face
         8, 9, 10,     8, 10, 11,  // Top face
         12, 13, 14,   12, 14, 15, // Bottom face
         16, 17, 18,   16, 18, 19, // Right face
         20, 21, 22,   20, 22, 23  // Left face
   ];
   
   
     var fronts=[
         0, 1, 2,      0, 2, 3,    // Front face
       
   ];
   
     var backs=[        
         4, 5, 6,      4, 6, 7,    // Back face        
   ];
   
     var tops=[
        
         8, 9, 10,     8, 10, 11,  // Top face
        
   ];
   
     var bottoms=[
       
         12, 13, 14,   12, 14, 15, // Bottom face
        
   ];
   
  var right=[
       
         16, 17, 18,   16, 18, 19, // Right face
        
   ];
   
   
var lefts=[
     20, 21, 22,   20, 22, 23  // Left face
   ];
  
   
   keyboard = display.getKeyboard();
   in_input = new Input(display);
   g__mouse= display.getMouse()  ;
   
   

var carpet1= new Material(Texture.load(display.getContext(),"gpu1.png"), new Vector3f(1.0 ,0 ,0.0));
var carpet2= new Material(Texture.load(display.getContext(),"carpet.png"), new Vector3f(0, 1.0 ,0));
var carpet3= new Material(Texture.load(display.getContext(),"trade.png"), new Vector3f(0, 0.0, 1.0));
var carpet4= new Material(Texture.load(display.getContext(),"carpet.png"), new Vector3f(1.0, 1.0, 0.0));
var carpet5= new Material(Texture.load(display.getContext(),"carpet.png"), new Vector3f(1, 0.0, 1.0));
var carpet6= new Material(Texture.load(display.getContext(),"gpu1.png"), new Vector3f(0.2,1.0, 1.0));




 var m1 = new Mesh(shader,vertices,fronts,true);
 var m2 = new Mesh(shader,vertices,backs,true);
 var m3 = new Mesh(shader,vertices,tops,true);
 var m4 = new Mesh(shader,vertices,bottoms,true);
 var m5 = new Mesh(shader,vertices,right,true);
 var m6 = new Mesh(shader,vertices,lefts,true);
 
 
 
 var f1= new MeshComponent(m1,carpet1,shader);
 var f2= new MeshComponent(m2,carpet2,shader);
 var f3= new MeshComponent(m3,carpet3,shader);
 var f4= new MeshComponent(m4,carpet4,shader);
  var f5= new MeshComponent(m5,carpet5,shader);
 var f6= new MeshComponent (m6, carpet6,shader);
 

/*
 * 
root.addComponent(f1);
root.addComponent(f2);
root.addComponent(f3);
root.addComponent(f4);
root.addComponent(f5);
root.addComponent(f6);

 */

box1.addComponent(f1);
box1.addComponent(f2);
box1.addComponent(f3);
box1.addComponent(f4);
box1.addComponent(f5);
box1.addComponent(f6);


box2.addComponent(f1);
box2.addComponent(f2);
box2.addComponent(f3);
box2.addComponent(f4);
box2.addComponent(f5);
box2.addComponent(f6);


root.addObject(box1);
root.addObject(box2);
box2.getTransformation().setPosition( new Vector3f(0,-2,-3));
box1.getTransformation().setPosition( new Vector3f(0,2,-3));

root.getTransformation().getCamera().setInput(in_input);
root.getTransformation().getCamera().setEnableKeyboard(true);
display.update(this.__run__);

});



Game.prototype.__update__=(function(delta){
   
    root.getTransformation().setRotation(new Vector3f(Math.cos(speed )*350,Math.sin(speed )*350,-3));
    
    root.update(delta);
  
    speed+=0.01;
});


Game.prototype.__draw__=(function(){
RenderUtils.clear(display.getContext(),0.2,0.2,0.2,1); 
root.render();
//box2.render();
});
Game.prototype.__run__ =(function(delta){
    Game.prototype.__update__(delta);
    Game.prototype.__draw__();
});