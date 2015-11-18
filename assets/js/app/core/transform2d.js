/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var Transform2D= (function(_pos){    
    this.__position  = (_pos instanceof Vector2f)?_pos: (new Vector2f());
    this.__scale     =  new Vector2f(1,1) ;
    this.__rotation  =  new Vector2f();
    
});
Transform2D.prototype.setPosition=(function(vec2){
  
    if(vec2 instanceof Vector2f)
    {
        this.__position =vec2;
    }
    
    return this;
    
});

Transform2D.prototype.setScale=(function(vec2){
  
    if(vec2 instanceof Vector2f)
    {
        this.__scale =vec2;        
    }
    
    return this;
    
});


Transform2D.prototype.setRotate=(function(vec2f){
  
    if(vec2f instanceof Vector2f)
    {
       this.__rotation=vec2f;       
    }

    return this;
    
});




Transform2D.prototype.getTransform=(function(){
  
   var    translateMatrix3f = Matrix3f.initTranslate(this.__position);
   var    scaleMatrix3f     = Matrix3f.initScale(this.__scale);
   var    rotateMatrix      = Matrix3f.initRotation(this.__rotation.getAngle());
   return  translateMatrix3f.mul(rotateMatrix.mul(scaleMatrix3f)) ;
    
});

