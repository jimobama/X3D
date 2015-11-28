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
   this.__input;
   this.__call__ = (function(self,position,forward, up){
      
        self.__construct(position,forward, up);
        
   })(this,position,forward, up);
  
 
});
Camera.yAxis =new Vector3f(0,1,0);
Camera.SPEED=0.01;
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
         this.__input=null;
        
        
    });
    
Camera.prototype.setPersp=(function(fov,width,height, near, far){
    
   Camera.FOV=fov;
   Camera.HEIGHT=height;
   Camera.WIDTH=width;
   Camera.ZFAR=far;
   Camera.ZNEAR=near;
});


Camera.prototype.setInput=(function(sysInput)
{ 
    this.__input =sysInput;
});
Camera.prototype.getUp=(function(){       
    return  this.__up;
});


 Camera.prototype.getPosition=(function(){     
     return  this.__position;
 });
 
 Camera.prototype.setPosition=(function(pos){     
      this.__position = (pos instanceof Vectora3f)?pos: this.__position;
 });
 
Camera.prototype.rotateX=(function(angle){
      
      var xAxis = Camera.yAxis.cross(this.__forward);
       xAxis.normalize();
      //rotate arround the ambitious xAxis
       this.__forward.rotateX(angle, xAxis);
       this.__forward.normalize();
      //let se c__forward.rotateX(angle, xAxis);t our __up vector since we have rotate the vector already
       this.__up = this.__forward.cross(xAxis);
     
       this.__up.normalize();
      
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
  
   Camera.prototype.mouseController=(function(){
       
       if(this.__input ===null) return ;
       var mouse = this.__input.getMouse();
       
       if(mouse!==null && this.IsMouseEnable)
       {
          mouse.setMouseEvent(function(button,action,xpos,ypos)
          {
              if(action==Mouse.KEY_PRESSED)
                 mouse.isGrap(true);
               else
                   mouse.isGrap(false);
              
              
          });
           
       }
       
   });
  
  
 Camera.prototype.keyboardController=(function(){
     
         if(this.__input === null)return ;
        if(this.IsKeyboardEnable)
        { 
              var amount =Camera.SPEED * Time.getDelta();
               if(this.__input.isKeyDown(Keyboard.Keys.K_W))
                {
                   this.move(this.getUp().negate(), amount );
                }
              if(this.__input.isKeyDown(Keyboard.Keys.K_S))
               {
                this.move(this.getUp(), amount );
               }
              if(this.__input.isKeyDown(Keyboard.Keys.K_A))
               {
                   this.move(this.getRight().negate(), amount );
               } 
              if(this.__input.isKeyDown(Keyboard.Keys.K_D))
               {
                 this.move(this.getRight(), amount );

               } 
               
                if(this.__input.isKeyDown(Keyboard.Keys.K_Z)){
                    this.move(this.__forward.negate(), amount );
                 }

                 if(this.__input.isKeyDown(Keyboard.Keys.K_X)){

                       this.move(this.__forward, amount );
                   }
        }
   });
  
 Camera.prototype.setRotation=(function(axis)
 {
     if(axis instanceof Vector3f)
     {
       
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
      this.mouseController();
      var pos = this.getPosition();
      var view=  xgl.lookAt( pos,pos.add(this.__forward),this.getUp());
      return view;
  });
  
