/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var Transform3D =(function(position,rotation,scale){
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

Transform3D.prototype.getTransform=(function(){
    
     var translationMatrix =Matrix4f.initTranslate(this.__position);
     var scaleMatrix =      Matrix4f.initScale(this.__scale);
     var rotationMatrix =  Matrix4f.initRotation(this.__rotation);
    
     return translationMatrix.mul(rotationMatrix.mul(scaleMatrix));//
});