/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var AmbientLightShader =(function(){
    this.__ambientLight;
    this.__call__=(function(self){
        self.__construct();
    })(this);
});
Object.__extends__(AmbientLightShader,Shader);
AmbientLightShader.prototype.__construct=(function(){
   
    Shader.prototype.__construct();
    this.createFromFile("directional_light_vertex.glsl",Shader.VERTEX_SHADER );
    this.createFromFile("directional_light_fragment.glsl",Shader.FRAGMENT_SHADER);
    this.compile();
    this.__ambientLight=null;
    this.addUniformMaterial("material");
    this.addUniformTransform("transform");
    this.addUniform("ambientLight");
   
});
AmbientLightShader.prototype.setAmbientLight=(function(color){
    this.__ambientLight = (color instanceof Vector3f)?color:null;
});
AmbientLightShader.prototype.update=(function(xcomponent)
{
   Shader.prototype.update(xcomponent); 
   this.setUniformTransform("transform",xcomponent);
   this.setUniformMaterial("material",xcomponent.getMaterial());
   
   if(this.__ambientLight !==null){
       this.setUniformVector3f("ambientLight",this.__ambientLight);
   }
     
   
});

