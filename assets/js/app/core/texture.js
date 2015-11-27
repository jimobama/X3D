/* 
  The class Load a texture to the opengl window
 */

//The current path of textures
var TEXTURE_PATH ="assets/textures/";

var Texture = (function()
{  
  this.__textureID=null;
  this.__index=0;
    
});

Texture.load=(function(gl,src){

   

   var img = new Image();
   var texId =gl.createTexture();  
   gl.bindTexture(gl.TEXTURE_2D,texId);
   //The function will not run immediate so we need to re-bind the texture to reused it
    img.onload=(function(){  
       gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img); 
       gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,  gl.LINEAR);
       gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        //problem with INVALID_OPERATION: generateMipmap: level 0 not power was solved with the first two line of codes below
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      // gl.generateMipmap(gl.TEXTURE_2D);
       //gl.bindTexture(gl.TEXTURE_2D, null);
       
    });     
    img.src=TEXTURE_PATH+src;
    var tex2D=  new Texture();
    tex2D.setTextureID(texId);
   
    return tex2D;
   
});

Texture.prototype.setTextureID=(function(texture_id){
   this.__textureID=texture_id;
});

Texture.prototype.bind=(function(gl){
    
    if(gl!==null){
        gl.activeTexture(gl.TEXTURE0);     
        gl.bindTexture(gl.TEXTURE_2D,this.getTextureID()); 
    }
    
});

Texture.prototype.setIndex=(function(index){    
    this.__index = index; 
});


Texture.prototype.getIndex=(function(){    
    return this.__index;
});


Texture.prototype.getTextureID=(function(){    
 return this.__textureID;
});


 Texture.unbind=(function(gl){
     
      if(gl!==null){
        gl.activeTexture(gl.TEXTURE0);     
        gl.bindTexture(gl.TEXTURE_2D,null); 
    }
     
 });

