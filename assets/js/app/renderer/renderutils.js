/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var RenderUtils=(function(){
    
});


RenderUtils.clear=(function(gl, r,g,b,a){
      gl.clearColor(r,g,b,a);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
     if (gl.clearDepth) gl.clearDepth(1.0); else gl.clearDepthf(1.0);
});
RenderUtils.getSupportedExtensions=(function(gl){
    return gl.getSupportedExtensions();
});


RenderUtils.initialize=(function(gl){
    gl.frontFace(gl.CW);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);
    gl.depthMask(gl.TRUE);
    
    gl.enable(gl.DEPTH_CLAMP);
   
    //gl.enable(gl.FRAMEBUFFER_SRGB);
    gl.depthFunc(gl.LEQUAL);
    

   
});
RenderUtils.isExtensitionEnable =(function(gl, extname)
{
    var e = gl.getExtension(extname);
    if(!e){
        return false;
    }
    return true;
});