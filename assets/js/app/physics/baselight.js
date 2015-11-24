/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var BaseLight =(function(color,intensity){
    
    this.__color=null;
    this.__intensity=0;
    
     this.__call__=(function(self,color,intensity){
        self.__construct(color,intensity);
        
    })(this,color,intensity);
    
});


BaseLight.prototype.__construct=(function(color,intensity){
  
    this.__color = (color instanceof Vector3f)?color:new Vector3f(0,0,0);
    this.__intensity = (typeof intensity  !== 'undefined')? intensity:0.0; 
    
});

BaseLight.prototype.getColor =(function(){
   
    return this.__color;
    
});


BaseLight.prototype.getIntensity =(function(){
    
    return this.__intensity;
});