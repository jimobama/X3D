/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var RenderUtils=(function(){
    
    
});


RenderUtils.clear=(function(gl, r,g,b,a){
      gl.clearColor(r, g, b, a);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
});


RenderUtils.getSupportedExtensions=(function(gl){
    return gl.getSupportedExtensions();
});


RenderUtils.initialize=(function(gl){
    
   gl.enable(gl.DEPTH_TEST);
   gl.depthFunc(gl.LEQUAL);
});
