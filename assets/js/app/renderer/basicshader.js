/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



var BasicShader=(function(){
   
    this.__call__=(function(self){
      self.__construct();
    })(this);
    
});
//inheritance
Object.__extends__(BasicShader,Shader);

 BasicShader.prototype.__construct=(function(){
    Shader.prototype.__construct();
    this.createFromFile("vertex.glsl",Shader.VERTEX_SHADER );
    this.createFromFile("fragment.glsl",Shader.FRAGMENT_SHADER);
    this.compile();
    this.addUniformTransform("trans");
    this.addUniformMaterial("material");
  
 });

  

 BasicShader.prototype.update=(function(xcomponent){
  
  if(xcomponent ===null) return ;
     this.setUniformTransform("trans",xcomponent);
     this.setUniformMaterial("material",xcomponent.getMaterial() );
    Shader.prototype.update(xcomponent);
   
  
 });

