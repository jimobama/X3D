/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var BasicShader=(function(glconext){
     //initialised the shader construct
    // BasicShader.prototype.constructor(glconext);
    __vertexShaderPath   = "vertex.glsl";
    __fragmentShaderPath  ="fragment.glsl";
    __shader =null;
    
    this.__call__=(function(self, glContext){   
      self.__init__(glContext);
    })(this, glconext);
});


BasicShader.prototype.__init+(function(){
    
    alert("Hello World");
});

BasicShader.prototype.update=(function(material , transform){
   
    
    
});






