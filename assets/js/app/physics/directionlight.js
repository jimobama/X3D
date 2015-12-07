/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var DirectionLight= (function(base,direction){
    
   this.__direction;
   this.__base;
  
    
    this.__call__=(function(self,base,direction){
        
        self.__construct(base,direction);
        
    })(this,base,direction);
    
});


DirectionLight.prototype.__construct=(function(base,direction){
    
    this.__direction = (direction instanceof Vector3f)?direction:new Vector3f();
    this.__base= (base instanceof BaseLight)?base:new BaseLight();
    
    
});

DirectionLight.prototype.setBaseLight =(function(b){
    
    this.__base = (b instanceof BaseLight)?b:null;
    
});

DirectionLight.prototype.setDirection =(function(vect){
    
   this.__direction=(vect instanceof Vector3f)?vect:null;
    
});


DirectionLight.prototype.getBaseLight =(function(){
    
    return this.__base;
    
});

DirectionLight.prototype.getDirection =(function(){
    
    return this.__direction;
    
});

