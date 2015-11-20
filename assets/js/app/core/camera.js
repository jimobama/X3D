/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var Camera=(function(position,forward, up){
   
   var c__position;
   var c__forward;
   var c__up;
   var c__target;

   this.__call__ = (function(self,position,forward, up){
      
        self.__init__(position,forward, up);
        
   })(this,position,forward, up);
  
 
});
 Camera.yAxis =new Vector3f(0,1,0);
Camera.SPEED=0.01;
 
Camera.prototype.__init__=(function(position,forward, up){
        c__position= (position instanceof Vector3f)?position:(new Vector3f(0,0,0)) ;         
        c__forward =(forward instanceof Vector3f)?forward:  (new Vector3f(0,0,1)) ;
        c__up= (up instanceof Vector3f)?up: Camera.yAxis ;
        c__target= new Vector3f(0,0,0);
        c__forward.normalize();
        c__up.normalize();
        
        
    });
   
Camera.prototype.getUp=(function(){       
    return c__up;
});


 Camera.prototype.getPosition=(function(){     
     return c__position;
 });
 
 Camera.prototype.setPosition=(function(pos){     
     c__position = (pos instanceof Vector3f)?pos: c__position;
 });
 

 


   
  Camera.prototype.rotateX=(function(angle){
      
      var xAxis = Camera.yAxis.cross(c__forward);
       xAxis.normalize();
      //rotate arround the ambitious xAxis
      c__forward.rotateX(angle, xAxis);
      c__forward.normalize();
      //let se c__forward.rotateX(angle, xAxis);t our __up vector since we have rotate the vector already
      c__up = c__forward.cross(xAxis);
     
      c__up.normalize();
      
  });
  
  Camera.prototype.getLeft=(function(){
      return c__forward.cross(c__up);
  });
  Camera.prototype.move=(function(dir, amount){      
      c__position = c__position.add(dir.mul(amount));
  });
  Camera.prototype.setEnableKeyboard=(function(keyboard){
      
       var amount =Camera.SPEED * Time.getDelta();
      if(in_input.isKeyDown(Keyboard.Keys.K_W))
       {
          this.move(this.getUp().negate(), amount );
       }
     if(in_input.isKeyDown(Keyboard.Keys.K_S))
      {
       this.move(this.getUp(), amount );
      }
     if(in_input.isKeyDown(Keyboard.Keys.K_A))
      {
          this.move(this.getLeft(), amount );
      } 
     if(in_input.isKeyDown(Keyboard.Keys.K_D))
      {
        this.move(this.getLeft().negate(), amount );
      
      } 
  
      
       
         if(in_input.isKeyDown(Keyboard.Keys.K_Z)){
             this.move(c__forward.negate(), amount );
          }
         
          if(in_input.isKeyDown(Keyboard.Keys.K_X)){
               
                this.move(c__forward, amount );
            }
        
     
      
      
  });
  
  
 Camera.prototype.rotateX=(function(angle,axis)
 {
     if(axis instanceof Vector3f)
     {
         var hAxis = Camera.yAxis.cross(c__forward);
         hAxis= hAxis.normalize();
        
        
         
         
     }
     
 });
   
 Camera.prototype.getTarget=(function(){
       
       return c__target;
       
   });
 Camera.prototype.getTransform=(function(){
      var pos = this.getPosition();
    
      
      var view=  xgl.lookAt( pos,pos.add(c__forward),this.getUp());
    
      return view;// rotation.mul(translation);
       
       
  });