/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var Transform3D =(function(position,rotation,scale){
    this.__position;
    this.__rotation ;
    this.__scale ;
    this.__parentMatrix;
 
    
    
    this.__call__=(function(self,position,rotation,scale){
        
        self.__construct(position,rotation,scale);
     
       
    })(this,position,rotation,scale);
    
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

Transform3D.prototype.__construct=(function(position,rotation,scale){

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



Transform3D.prototype.getModel=(function(){
    
      var translationMatrix =xgl.traslate(this.__position);
      var scaleMatrix =      xgl.scale3fv(this.__scale);
      var rotationMatrix =   xgl.rotation3fv(this.__rotation); 
      return this.__parentMatrix.mul(translationMatrix.mul(rotationMatrix.mul(scaleMatrix)));//
});

Transform3D.prototype.setParentTranformMatrix4f=(function(matrix4f){
    
    if(matrix4f instanceof Matrix4f)
    {
      
        this.__parentMatrix=matrix4f;
    }
});

