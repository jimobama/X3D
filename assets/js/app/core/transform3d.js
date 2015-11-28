/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var Transform3D =(function(position,rotation,scale){
    this.__position;
    this.__rotation ;
    this.__scale ;
    var __camera;
    this.__parentMatrix;
 
    
    
    this.__call__=(function(self,position,rotation,scale){
        
        self.__construct(position,rotation,scale);
     
       
    })(this,position,rotation,scale);
    
});
Transform3D.FOV =70.0;
Transform3D.WIDTH=0.0;
Transform3D.HEIGHT =0.0;
Transform3D.ZNEAR =0.10;
Transform3D.ZFAR =1000.0;

Transform3D.prototype.setCamera = (function(camera)
{
     __camera = camera;
});

/*check if the parents transformation has changes
Transform3D.prototype.hasChange=(function(){
       var trigger =false;
       if(this.__parentT===null) return trigger;
       
        if(this.__oldPos===null)
        {
           this.__oldPos=new Vector3f();
           this.__oldRotation=new Vector3f();
           this.__oldScale =new Vector3f();
        }
        
        if(!this.__position.equals(this.__parentT.getPosition())
          || !this.__rotation.equals(this.__parentT.getRotation())
          || !this.__scale.equals(this.__parentT.getScale()))
        {
           trigger=true;
        }
    return trigger ;
    });
    
   */ 
Transform3D.prototype.getCamera = (function(){
     return  __camera;
});


Transform3D.prototype.__construct=(function(position,rotation,scale){
    
   __camera = new Camera();
   this.__position= (position instanceof Vector3f)?position:(new Vector3f(0,0,-3));
   this.__rotation = (rotation instanceof Vector3f)?rotation:(new Vector3f());
   this.__scale = (scale instanceof Vector3f)?scale:(new Vector3f(1,1,1));

    this.__parentMatrix= new Matrix4f();
    this.__parentMatrix.identity();
    
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


Transform3D.prototype.getRotation=(function(){
      return  this.__rotation;
});

Transform3D.prototype.setScale=(function(vec3){
    
    if(vec3 instanceof Vector3f)
    {
       this.__scale=vec3;
        
    }
});


Transform3D.prototype.getScale=(function(){
    
      return this.__scale;
  
});
Transform3D.prototype.setPersp=(function(fov,width,height, near, far){
    
   Transform3D.FOV=fov;
   Transform3D.HEIGHT=height;
   Transform3D.WIDTH=width;
   Transform3D.ZFAR=far;
   Transform3D.ZNEAR=near;
});


Transform3D.prototype.getModel=(function(){
    
      var translationMatrix =xgl.traslate(this.__position);
      var scaleMatrix =      xgl.scale3fv(this.__scale);
      var rotationMatrix =   xgl.rotation3fv(this.__rotation); 
      
      return this.__parentMatrix.mul(translationMatrix.mul(rotationMatrix.mul(scaleMatrix)));//
});
Transform3D.prototype.getPersp=(function()
{
 var __projectionMatrix = xgl.persp(Transform3D.FOV,Transform3D.WIDTH/Transform3D.HEIGHT,Transform3D.ZNEAR,Transform3D.ZFAR);
 
 return  __projectionMatrix;
});
Transform3D.prototype.setParentTranformMatrix4f=(function(matrix4f){
    
    if(matrix4f instanceof Matrix4f)
    {
        this.__parentMatrix=matrix4f;
    }
});

Transform3D.prototype.getPerspTransform =(function(){
    
    var __transformMatrix= this.getModel(); 
   
    var __projectionMatrix = this.getPersp();
    var camTransformation=  __camera.getTransform();
     
    return __projectionMatrix.mul(camTransformation.mul(__transformMatrix));
});