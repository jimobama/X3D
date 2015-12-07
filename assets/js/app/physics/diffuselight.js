/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var DiffuseLight= (function(base,pos){
    
    this.__position;
   this.__base;
  
    
    this.__call__=(function(self,base,pos){
        
        self.__construct(base,pos);
        
    })(this,base,pos);
    
});


DiffuseLight.prototype.__construct=(function(base,pos){
    
    this.__position = (pos instanceof Vector3f)?pos:new Vector3f();
    this.__base= (base instanceof BaseLight)?base:new BaseLight();
    
    
});

DiffuseLight.prototype.setBaseLight =(function(b){
    
    this.__base = (b instanceof BaseLight)?b:null;
    
});

DiffuseLight.prototype.setPosition =(function(vect){
    
    this.__position=(vect instanceof Vector3f)?vect:null;
    
});


DiffuseLight.prototype.getBaseLight =(function(){
    
    return this.__base;
    
});

DiffuseLight.prototype.getPosition =(function(){
    
    return  this.__position;
    
});

