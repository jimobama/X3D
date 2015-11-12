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
    
    this.__construct__=(function(self, glContext){        
      for(var key in self){
          
          alert(key);
      }
       
       
    })(this, glconext);
});


BasicShader.prototype.pro=89;
BasicShader.prototype.add=(function(){});

BasicShader.prototype.update=(function(material , transform){
   
    
    
});






