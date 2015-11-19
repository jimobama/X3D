/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var Transform3D =(function(position,rotation,scale){
    var t__position;
    var t__rotation ;
    var t__scale ;
    var t_camera;
    
    
    this.__call__=(function(self,position,rotation,scale){
        
        self.__init__(position,rotation,scale);
     
       
    })(this,position,rotation,scale);
    
});
Transform3D.FOV =70.0;
Transform3D.WIDTH=0.0;
Transform3D.HEIGHT =0.0;
Transform3D.ZNEAR =0.10;
Transform3D.ZFAR =1000.0;

Transform3D.prototype.setCamera = (function(camera)
{
     t_camera = camera;
});

Transform3D.prototype.getCamera = (function(){
     return t_camera;
});


Transform3D.prototype.__init__=(function(position,rotation,scale){
    
   t_camera = new Camera();
   t__position= (position instanceof Vector3f)?position:(new Vector3f());
   t__rotation = (rotation instanceof Vector3f)?rotation:(new Vector3f());
   t__scale = (scale instanceof Vector3f)?scale:(new Vector3f(1,1,1));

    
});
Transform3D.prototype.setPosition=(function(vec3){
    
    if(vec3 instanceof Vector3f)
    {
       t__position=vec3;
    }
});

Transform3D.prototype.getPosition=(function(){
   
      return  t__position;
    
});


Transform3D.prototype.setRotation=(function(vec3){
    
    if(vec3 instanceof Vector3f)
    {
       t__rotation=vec3;
    }
});

Transform3D.prototype.setScale=(function(vec3){
    
    if(vec3 instanceof Vector3f)
    {
       t__scale=vec3;
        
    }
});
Transform3D.prototype.setPersp=(function(fov,width,height, near, far){
    
   Transform3D.FOV=fov;
   Transform3D.HEIGHT=height;
   Transform3D.WIDTH=width;
   Transform3D.ZFAR=far;
   Transform3D.ZNEAR=near;
    
});


Transform3D.prototype.getTransform=(function(){
    
     var translationMatrix =xgl.traslate(t__position);
     var scaleMatrix =      xgl.scale3fv(t__scale);
     var rotationMatrix =   xgl.rotation3fv(t__rotation);  
     return translationMatrix.mul(rotationMatrix.mul(scaleMatrix));//
});

Transform3D.prototype.getPerspTransform =(function(){
    
    var __transformMatrix= this.getTransform(); 
    var __projectionMatrix = xgl.persp(Transform3D.FOV,Transform3D.WIDTH/Transform3D.HEIGHT,Transform3D.ZNEAR,Transform3D.ZFAR);
    var camTransformation=  t_camera.getTransform();  
    return __projectionMatrix.mul(camTransformation.mul(__transformMatrix));
});