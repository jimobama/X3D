/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var Camera=(function(position,forward, up){
   
   this.__position;
   this.__forward;
   this.__up;
   
   this.__target;

   this.__call__ = (function(self,position,forward, up){
      
        self.__construct(position,forward, up);
        
   })(this,position,forward, up);
  
 
});
Camera.yAxis =new Vector3f(0,1,0);
Camera.SPEED=0.05;
Camera.FOV =70.0;
Camera.WIDTH=0.0;
Camera.HEIGHT =0.0;
Camera.ZNEAR =0.10;
Camera.ZFAR =1000.0;
 
Camera.prototype.__construct=(function(position,forward, up){
        this.__position= (position instanceof Vector3f)?position:(new Vector3f(0,0,0)) ;         
        this.__forward =(forward instanceof Vector3f)?forward:  (new Vector3f(0,0,1)) ;
        this.__up= (up instanceof Vector3f)?up: Camera.yAxis ;
        this.__target= new Vector3f(0,0,0);
        this.__forward.normalize();
        this.__up.normalize();
       
       
        
    });
    
Camera.prototype.setPersp=(function(fov,width,height, near, far){
    
   Camera.FOV=fov;
   Camera.HEIGHT=height;
   Camera.WIDTH=width;
   Camera.ZFAR=far;
   Camera.ZNEAR=near;
});



Camera.prototype.getUp=(function(){       
    return  this.__up;
});


 Camera.prototype.getPosition=(function(){     
     return  this.__position;
 });
 
 Camera.prototype.setPosition=(function(pos){     
      this.__position = (pos instanceof Vector3f)?pos: this.__position;
 });
 
Camera.prototype.rotateX=(function(angle){
      
      var xAxis = Camera.yAxis.cross(this.__forward).normalize();
      this.__forward= this.getForward().rotate(Camera.yAxis,-angle).normalize();
      this.__up = this.__forward.cross(xAxis).normalize();
      
  });
  
  Camera.prototype.rotateY=(function(angle){
       var xAxis = Camera.yAxis.cross(this.__forward).normalize();
       this.__forward= this.getForward().rotate(xAxis,-angle).normalize();
       this.__up = this.__forward.cross(xAxis).normalize();
    
  });
  
  Camera.prototype.getRight=(function(){
      return  this.__forward.cross( this.__up);
  });
  Camera.prototype.move=(function(dir, amount){      
       this.__position =  this.__position.add(dir.mul(amount));
  });
  Camera.prototype.setEnableKeyboard=(function(abool){
      this.IsKeyboardEnable=(abool !==true)?false:true;
  });
  
  Camera.prototype.setEnableMouse=(function(abool){
      this.IsMouseEnable=(abool !==true)?false:true;
  });
  
  Camera.prototype.IsMouseEnable=false;
  Camera.prototype.IsKeyboardEnable=false;
  Camera.__mouseLastPos=new Vector2f();
  
  
   Camera.prototype.mouseHandle=(function(){
      
        var pos =  Mouse.getPosition().minus(Display.getInstance().getPosition());
       if(Mouse.IsMouseDown && Mouse.getGrap()){
          var deltaX = pos.x - Mouse.getLastPosition().x ;
          var deltaY =  Mouse.getLastPosition().y-pos.y; 
          this.rotateX(deltaX * Camera.SPEED* Time.getDelta());
          this.rotateY(deltaY * Camera.SPEED* Time.getDelta());
          Mouse.lock(); 
       }else{
           Mouse.isGrap(false);
           Mouse.unlock();
       }
       
      Mouse.setLastPosition(pos);
   });
   
   
   Camera.prototype.getForward=(function(){
       
     return  this.__forward; 
       
   });
  
 Camera.prototype.keyboardController=(function(){
     
       
        if(this.IsKeyboardEnable)
        { 
              var amount =Camera.SPEED * Time.getDelta();
               if(Keyboard.isKeyPress(Keyboard.Keys.K_W))
                {
                   this.move(this.getForward(), amount );
                }
              if(Keyboard.isKeyPress(Keyboard.Keys.K_S))
               {
                this.move(this.getForward().negate(), amount );
               }
              if(Keyboard.isKeyPress(Keyboard.Keys.K_A))
               {
                   this.move(this.getRight(), amount );
               } 
              if(Keyboard.isKeyPress(Keyboard.Keys.K_D))
               {
                 this.move(this.getRight().negate(), amount );

               } 
               
            
        }
   });
  

   
 Camera.prototype.getTarget=(function(){
       
       return this.__target;
       
   });
 Camera.prototype.getPersp=(function(){
 var __projectionMatrix = xgl.persp( Camera.FOV, Camera.WIDTH/ Camera.HEIGHT, Camera.ZNEAR, Camera.ZFAR);
 return  __projectionMatrix;
 });
 
 
 Camera.prototype.getTransform=(function(){
      this.keyboardController();
     
     this.mouseHandle();
    
      var pos = this.getPosition();
      var view=  xgl.lookAt(pos,pos.add(this.getForward()),this.getUp());
      return view;
  });
  
