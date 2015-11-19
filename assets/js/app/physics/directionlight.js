/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var DirectionLight= (function(base,direction){
    
    var __direction;
    var __base;
  
    
    this.__call__=(function(self,base,direction){
        
        self.__construct(base,direction);
        
    })(this,base,direction);
    
});


DirectionLight.prototype.__construct=(function(base,direction){
    
    __direction = (direction instanceof Vector3f)?direction:new Vector3f();
    __base= (base instanceof BaseLight)?base:new BaseLight();
    
    
});

DirectionLight.prototype.getBaseLight =(function(){
    
    return __base;
    
});

DirectionLight.prototype.getDirection =(function(){
    
    return __direction;
    
});

