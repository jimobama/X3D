/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var Game =(function(canvasId){
    var controller;
    var root;
    this.__call__ =(function(self,canvasId){      
      self.__construct(canvasId);
    })(this,canvasId);
   
});
 Game.prototype.__construct =(function(canvasId){
    XObject.prototype.__construct();
    controller =  XController.createInstance(canvasId,600,400);                      
    root = new XObject();
    
    
    
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
    var carpet1= new Material(Texture.load(Game.getController().getSystem().getDisplay().getContext(),
                                "carpet.png"), new Vector3f(1.0 ,0 ,0.0));
   
     var shader  = new BasicShader(Game.getController().getSystem().getDisplay().getContext());
    
 
     Game.getController().getCamera().setPersp(70.0,Game.getController().getSystem().getDisplay().getWidth(),
     Game.getController().getSystem().getDisplay().getHeight(), 0.01, 1000.0);
   
     
     var mesh = new Mesh(shader ,vertices, indices,true);
     var meshComponent = new MeshComponent(mesh,carpet1);
     var meshComponent2 = new MeshComponent(mesh,carpet1);
      var meshComponent3 = new MeshComponent(mesh,carpet1);
    var cudeObject = new XObject();
    cudeObject.addComponent(meshComponent);
    cudeObject.setTransform(new Transform3D(new Vector3f(1,-2,-3)));
    root.addObject(cudeObject);
    

    var cudeObject2 = new XObject();
    cudeObject2.addComponent(meshComponent2);
    cudeObject2.setTransform(new Transform3D(new Vector3f(1,2,-3)));
    root.addObject(cudeObject2);
   
    root.addComponent(meshComponent3);
    root.setTransform(new Transform3D(new Vector3f(1,2,0)));
   
    Game.getController().getCamera().setEnableKeyboard(true);
    root.setShader(shader );
   
    root.setController(Game.getController());
    //cudeObject.setShader(new PhongShader(Game.getController().getDisplay().getContext()));
    
     
});

 Game.getRootObject=(function(){     
     return root;
 });
 Game.getController=(function(){     
     return controller;
 });
 Game.prototype.start=(function(){
    var controller = Game.getController();
     var speed =0.001;
    setInterval((function(){
        Game.getRootObject().getTransform().setRotation(new Vector3f(Math.sin(speed)* 360,Math.cos(speed)* 360,Math.cos(speed)* 360));
        controller.getRenderer().render(Game.getRootObject());
        speed+=0.001;
    }),5);
 });