/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var BaseLight =(function(color,intensity){
    
    var __color;
    var __intensity;
    
     this.__call__=(function(self,acolor,aintensity){
        
        self.__construct(acolor,aintensity);
        
    })(this,color,intensity);
    
});


BaseLight.prototype.__construct=(function(color,intensity){
    __color = (color instanceof Vector3f)?color:new Vector3f(0,0,0);
    __intensity = (typeof intensity  !== 'undefined')? intensity:0.0; 
    
});

BaseLight.prototype.getColor =(function(){
   
    return __color;
    
});


BaseLight.prototype.getIntensity =(function(){
    
    return __intensity;
});