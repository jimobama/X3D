/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var Camera=(function(position,fov, ratio, near , far){
   
  var __position;
  var __persp;
  var __fov;
  var __ratio;
  var __near;
  var __far;

  
   
   this.__call__ = (function(self,position,fov, ratio, near , far){
        self.__init__(position,fov, ratio, near , far);
        self.__super__ =this;
        return this;
   })(this,position,fov, ratio, near , far);
  

    
});
 
Camera.prototype.__init__=(function(position,fov, ratio, near , far){
      if(position instanceof Vector3f)
      {
        __position=   position;
       __fov = (!fov)?45.0:fov;
       __ratio=(!ratio)?0.0:ratio;
       __near=(!near)?0.01:near;
       __far=(!far)?1000.0:far;
        this.setPersp( __fov,__ratio,__near,__far);
        
      }
        
    });
    
   Camera.prototype.setPersp=(function(fov, ratio, near , far){
        
        __persp = Matrix4f.initPersp(fov, ratio, near , far);
     
      
        
    });
 Camera.prototype.getTransform=(function(){
     
      var view =new Matrix4f();
      view.identity();
      
     return view.mul(__persp);
       
       
  });