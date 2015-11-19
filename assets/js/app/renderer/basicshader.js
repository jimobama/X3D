/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var BasicShader=(function(glcontext){
   
    this.__call__=(function(self, glContext){
      self.__initialize(glContext);
    })(this,glcontext);
    
});
//inheritance
BasicShader.prototype=Object.create(Shader.prototype);
BasicShader.prototype.constructor =Shader;

 BasicShader.prototype.__initialize=(function(glContext){
     
     if(glContext !==null){
        Shader.call(this,glContext);
        this.createFromFile("vertex.glsl",Shader.VERTEX_SHADER );
        this.createFromFile("fragment.glsl",Shader.FRAGMENT_SHADER);
        this.compile();
        this.addUniform("texture");
        this.addUniform("color");
        this.addUniform("transform3D");
      
     
     }
 });

 BasicShader.prototype.update=(function(material,transform){
   
   this.setUniformMatrix4f("transform3D",transform.getPerspTransform()); 
   var texture = material.getTexture(); 
   this.setUniformVector3f("color",material.getColor());
   if(texture !==null){
       this.setUniform1i("texture",texture.getIndex());
       texture.bind(this.getContext());
    }else{
        Texture.unbind(this.getContext());
    }
   
 });

