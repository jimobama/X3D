/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



var BasicShader=(function(){
    this.shader =null
    this.__call__=(function(self){
      self.__construct();
    })(this);
    
});


 BasicShader.prototype.__construct=(function(){
    this.shader= new Shader();
    this.shader.createFromFile("vertex.glsl",Shader.VERTEX_SHADER );
    this.shader.createFromFile("fragment.glsl",Shader.FRAGMENT_SHADER);
    this.shader.compile();
    this.shader.addUniformTransform("trans");
    this.shader.addUniformMaterial("material");
  
 });
 
  BasicShader.prototype.getShader=(function(){
      return  this.shader;
  });

 BasicShader.prototype.update=(function(xcomponent){
   this.shader.use();
  if(xcomponent ===null) return ;
    this.shader.setUniformTransform("trans",xcomponent);
    this.shader.setUniformMaterial("material",xcomponent.getMaterial() );
    this.shader.update(xcomponent);
  
 });

