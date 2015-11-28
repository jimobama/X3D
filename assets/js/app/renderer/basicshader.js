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
        this.addUniform("prespMatrix");
        this.addUniform("camaraMatrix");
     
     }
 });

 BasicShader.prototype.update=(function(xcomponent){
    
  if(xcomponent ===null) return ;
  
      this.setUniformMatrix4f("transform3D",xcomponent.getTransform().getModel());
      if(xcomponent.getParent()!==null){
        this.setUniformMatrix4f("prespMatrix",xcomponent.getParent().getController().getCamera().getPersp());
        this.setUniformMatrix4f("camaraMatrix",xcomponent.getParent().getController().getCamera().getTransform());
      }
    
  
   if(xcomponent.getMaterial()!=null)
   {
      this.setUniformVector3f("color",xcomponent.getMaterial().getColor());  
      var texture =xcomponent.getMaterial().getTexture();     
      if(texture !==null){
       this.setUniform1i("texture",texture.getIndex());
       texture.bind(this.getContext());
      }else{
           Texture.unbind(this.getContext());
      }
     
   }
 
 
 });

