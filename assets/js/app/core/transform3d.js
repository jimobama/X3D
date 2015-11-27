/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var Transform3D =(function(position,rotation,scale){
    this.__position;
    this.__rotation ;
    this.__scale ;
    this._camera;
    
    
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
     this._camera = camera;
});

Transform3D.prototype.getCamera = (function(){
     return this._camera;
});


Transform3D.prototype.__init__=(function(position,rotation,scale){
    
   this._camera = new Camera();
   this.__position= (position instanceof Vector3f)?position:(new Vector3f());
   this.__rotation = (rotation instanceof Vector3f)?rotation:(new Vector3f());
   this.__scale = (scale instanceof Vector3f)?scale:(new Vector3f(1,1,1));

    
});
Transform3D.prototype.setPosition=(function(vec3){
    
    if(vec3 instanceof Vector3f)
    {
       this.__position=vec3;
    }
});

Transform3D.prototype.getPosition=(function(){
   
      return  this.__position;
    
});


Transform3D.prototype.setRotation=(function(vec3){
    
    if(vec3 instanceof Vector3f)
    {
       this.__rotation=vec3;
    }
});

Transform3D.prototype.setScale=(function(vec3){
    
    if(vec3 instanceof Vector3f)
    {
       this.__scale=vec3;
        
    }
});
Transform3D.prototype.setPersp=(function(fov,width,height, near, far){
    
   Transform3D.FOV=fov;
   Transform3D.HEIGHT=height;
   Transform3D.WIDTH=width;
   Transform3D.ZFAR=far;
   Transform3D.ZNEAR=near;
    
});

Transform3D.prototype.setParentTransformation=(function(parent)
{
    alert("Helo")
    
});
Transform3D.prototype.getTransform=(function(){
    
     var translationMatrix =xgl.traslate(this.__position);
     var scaleMatrix =      xgl.scale3fv(this.__scale);
     var rotationMatrix =   xgl.rotation3fv(this.__rotation);  
     return translationMatrix.mul(rotationMatrix.mul(scaleMatrix));//
});
Transform3D.prototype.getPersp=(function()
{
 var __projectionMatrix = xgl.persp(Transform3D.FOV,Transform3D.WIDTH/Transform3D.HEIGHT,Transform3D.ZNEAR,Transform3D.ZFAR);
 
 return  __projectionMatrix;
});


Transform3D.prototype.getPerspTransform =(function(){
    
    var __transformMatrix= this.getTransform(); 
    var __projectionMatrix = this.getPersp();
    var camTransformation=  this._camera.getTransform();  
    
    
    return __projectionMatrix.mul(camTransformation.mul(__transformMatrix));
});