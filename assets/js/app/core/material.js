/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var Material =(function(texture, color)
{
     this.__texture ;
     this.__color;
     this.__specular;
     this.__diffuse;
     this.__shiness;
    
    
    this.__call__=(function(self,atexture,acolor)
    {
        self.__construct(atexture,acolor);
        
    })(this, texture, color);
    
});



Material.prototype.__construct=(function(texture,color)
{
     this.__texture =   texture;
     this.__color   =   color;
     this.__specular= new Vector3f();
     this.__diffuse= new Vector3f();;
     this.__shiness= 32.0;
});

Material.prototype.setSpecular=(function(v3){    
   this.__specular =(v3 instanceof Vector3f )?v3:new Vector3f();
});
Material.prototype.setDiffuse=(function(v3){    
    this.__diffuse =(v3 instanceof Vector3f )?v3:new Vector3f();
});
Material.prototype.setShiness=(function(afloat){   
 this.__shiness =(typeof afloat ==="number" )?afloat:0.0;
});


Material.prototype.getShiness=(function(){    
    return   this.__shiness;
});
Material.prototype.getDiffuse=(function(){   
 return  this.__diffuse;
});
Material.prototype.getSpecular=(function(){   
 return  this.__specular;
});
Material.prototype.setAmbient=(function(v3){   
    this.__color =(v3 instanceof Vector3f )?v3:new Vector3f();
});


Material.prototype.getAmbient=(function(){    
    return  this.__color;
});

Material.prototype.getTexture=(function(){   
 return  this.__texture;
});