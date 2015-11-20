/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var PointLight =(function(baseLight, attenuation, position){
   
   var p_baseLight;
   var  p__attenu;
   var  p__position;
   
   this.__call__=(function(self,baseLight,attenuation, position){
       self.__construct(baseLight,attenuation, position);
   })(this,baseLight,attenuation, position);
    
});


PointLight.prototype.__construct=(function(baseLight,attenuation, position){
    
    
      p__attenu=(attenuation instanceof Attenuation )?attenuation:null;
      p__position =(position instanceof Vector3f )?position:null;
      p_baseLight= (baseLight instanceof BaseLight)?baseLight:null; ;
      
     
});
PointLight.prototype.getBaseLight=(function(){
     return  p_baseLight;
});
PointLight.prototype.getAttenuation=(function(){
     return  p__attenu;
});
PointLight.prototype.getPosition=(function(){
      return p__position;
});

