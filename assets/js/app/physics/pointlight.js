/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var PointLight =(function(baseLight, attenuation, position){
   
  this.__baseLight;
  this.__attenu;
  this.__position;
   
   this.__call__=(function(self,baseLight,attenuation, position){
       self.__construct(baseLight,attenuation, position);
   })(this,baseLight,attenuation, position);
    
});


PointLight.prototype.__construct=(function(baseLight,attenuation, position){
      this.__attenu= (attenuation instanceof Attenuation )?attenuation:null;
      this.__position =(position instanceof Vector3f )?position:null;
      this.__baseLight= (baseLight instanceof BaseLight)?baseLight:null;
      
     
});
PointLight.prototype.getBaseLight=(function(){
     return  this.__baseLight;
});
PointLight.prototype.getAttenuation=(function(){
     return  this.__attenu;
});
PointLight.prototype.getPosition=(function(){
      return this.__position;
});

