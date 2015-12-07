/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var AmbientLightShader =(function(){
    this.__shader;
    this.__call__=(function(self){
        self.__construct();
    })(this);
});

AmbientLightShader.prototype.__construct=(function(){
    this.__shader= new Shader();
    this.__shader.createFromFile("ambient_light_vertex.glsl",Shader.VERTEX_SHADER );
    this.__shader.createFromFile("ambient_light_fragment.glsl",Shader.FRAGMENT_SHADER);
    this.__shader.compile();
    this.__shader.__ambientLight=null;
    this.__shader.addUniformMaterial("material");
    this.__shader.addUniformTransform("transform");
    this.__shader.addUniformBaseLight("baseLight");
});
AmbientLightShader.prototype.setAmbientLight=(function(basicLight){
    this.__ambientLight = (basicLight instanceof BaseLight)?basicLight:null;
});
AmbientLightShader.prototype.update=(function(xcomponent)
{
   this.__shader.use();
   this.__shader.setUniformTransform("transform",xcomponent);
   
   this.__shader.setUniformMaterial("material",xcomponent.getMaterial());
   
   if(this.__ambientLight !==null){
       this.__shader.setUniformBaseLight("baseLight",this.__ambientLight);
   }
   this.__shader.update(xcomponent); 
});

