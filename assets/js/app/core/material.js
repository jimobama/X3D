/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var Material =(function(texture, color,specularIntensity, speculatExponent)
{
     this.__texture ;
     this.__color;
     this.__ambientColor;
     this.__specularIntensity;
     this.__specularExponent;
    
    this.__call__=(function(self,atexture,acolor, aspecularIntensity, aspeculatExponent)
    {
        self.__construct(atexture,acolor, aspecularIntensity, aspeculatExponent);
        
    })(this, texture, color,specularIntensity, speculatExponent);
    
});

Material.prototype.setAmbientColor =(function(ambient){    
    if(ambient instanceof Vector3f)
      this.__ambientColor =ambient;
});

Material.prototype.getAmbientColor =(function(){    
    return  this.__ambientColor ;
});
Material.prototype.__construct=(function(texture,color, specularIntensity, specularExponent)
{
      this.__texture =   texture;
      this.__color   =   color;
     this.__ambientColor= new Vector3f(0.2,0.2,0.2);
    this.__specularIntensity =(typeof specularIntensity !=="undefined")? specularIntensity:2.0 ;
    this.__specularExponent =(typeof specularExponent !=="undefined")? specularExponent:32.0;
   
    
});
Material.prototype.getSpecularIntensity=(function(){    
    return  this.__specularIntensity;
});


Material.prototype.getSpecularExponent=(function(){    
    return  this.__specularExponent;
});
Material.prototype.getColor=(function(){    
    return  this.__color;
});
Material.prototype.getTexture=(function(){   
 return  this.__texture;
});