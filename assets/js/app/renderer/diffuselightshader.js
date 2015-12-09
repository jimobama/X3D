/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var DiffuseLightShader =(function(light){
    this.__shader=null;
   
    this.__light=null;
    this.__call__=(function(self,light){
      self.__construct(light);
        
    })(this,light);
    
});

DiffuseLightShader.prototype.__construct=(function(light)
{
    this.__shader= new Shader();
    this.__light=(light instanceof DiffuseLight)?light:null;
    this.__shader.createFromFile("forwarddiffuse_vertex.glsl",Shader.VERTEX_SHADER );
    this.__shader.createFromFile("forwarddiffuse_fragment.glsl",Shader.FRAGMENT_SHADER);
    this.__shader.compile();
     this.__shader.addUniformMaterial("material");
   
    this.__shader.addUniformTransform("transform");
    this.__shader.addUniform("camPosition");
    this.addUniformDirectionLight("diffusedLight");
});
DiffuseLightShader.prototype.setDirectionLight=(function(light)
{
    if(light instanceof DiffuseLight){
       
        this.__light=light;
    }
});
DiffuseLightShader.prototype.setUniformDiffusedLight=(function(attribute,directionLight){
     
     if(directionLight instanceof DiffuseLight)
     {
        
         this.__shader.setUniformVector3f(attribute+".position",directionLight.getPosition());
         this.__shader.setUniformBaseLight(attribute+".baseLight",directionLight.getBaseLight());
     }
 }); 
DiffuseLightShader.prototype.addUniformDirectionLight=(function(attribute){
    
      this.__shader.addUniform(attribute+".position");
      this.__shader.addUniformBaseLight(attribute+".baseLight");
    
});
DiffuseLightShader.prototype.update=(function(xdrawable)
{
    this.__shader.use();
    if(xdrawable ===null) return null;
     this.__shader.setUniformTransform("transform",xdrawable); 
      this.__shader.setUniformMaterial("material",xdrawable.getMaterial()); 
   
     this.__shader.setUniformVector3f("camPosition",xdrawable.getParent().getController().getCamera().getPosition());     
     if(this.__directionLight!==null){
       this.setUniformDiffusedLight("diffusedLight",this.__light);     
   }
    
    this.__shader.update(xdrawable);
  
});

