/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var Material =(function(texture, color,specularIntensity, speculatExponent)
{
    var __texture ;
    var __color;
    var __ambientColor;
    var __specularIntensity;
    var __specularExponent;
    
    this.__call__=(function(self,atexture,acolor, aspecularIntensity, aspeculatExponent)
    {
        self.__construct(atexture,acolor, aspecularIntensity, aspeculatExponent);
        
    })(this, texture, color,specularIntensity, speculatExponent);
    
});

Material.prototype.setAmbientColor =(function(ambient){    
    if(ambient instanceof Vector3f)
     __ambientColor =ambient;
});

Material.prototype.getAmbientColor =(function(){    
    return __ambientColor ;
});
Material.prototype.__construct=(function(texture,color, specularIntensity, specularExponent)
{
     __texture =   texture;
     __color   =   color;
    __ambientColor= new Vector3f(0.2,0.2,0.2);
   __specularIntensity =(typeof specularIntensity !=="undefined")? specularIntensity:2.0 ;
   __specularExponent =(typeof specularExponent !=="undefined")? specularExponent:32.0;
   
    
});
Material.prototype.getSpecularIntensity=(function(){    
    return __specularIntensity;
});


Material.prototype.getSpecularExponent=(function(){    
    return __specularExponent;
});
Material.prototype.getColor=(function(){    
    return __color;
});
Material.prototype.getTexture=(function(){   
 return __texture;
});