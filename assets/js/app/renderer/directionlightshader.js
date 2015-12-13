/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var DirectionLightShader =(function(light){
    this.__shader=null;
    this.__light=null;
    this.__call__=(function(self,light){
      self.__construct(light);
        
    })(this,light);
    
});

DirectionLightShader.prototype.__construct=(function(light)
{
    this.__shader= new Shader();
    this.__light=(light instanceof DirectionLight)?light:null;
    
  
    this.__shader.createFromFile("forwarddirection_vertex.glsl",Shader.VERTEX_SHADER );
    this.__shader.createFromFile("forwarddirection_fragment.glsl",Shader.FRAGMENT_SHADER);
    this.__shader.compile();
     this.__shader.addUniformMaterial("material");
   
    this.__shader.addUniformTransform("transform");
    this.__shader.addUniform("camPosition");
    this.addUniformDirectionLight("directionalLight");
});
DirectionLightShader.prototype.setDirectionLight=(function(light)
{
    if(light instanceof DirectionLight){
       
        this.__light=light;
    }
});
DirectionLightShader.prototype.setUniformDirectionLight=(function(attribute,directionLight){
     
     if(directionLight instanceof DirectionLight)
     {
        
         this.__shader.setUniformVector3f(attribute+".position",directionLight.getDirection());
         this.__shader.setUniformBaseLight(attribute+".baseLight",directionLight.getBaseLight());
     }
 }); 
DirectionLightShader.prototype.addUniformDirectionLight=(function(attribute){
    
      this.__shader.addUniform(attribute+".direction");
      this.__shader.addUniformBaseLight(attribute+".baseLight");
    
});
DirectionLightShader.prototype.update=(function(xdrawable)
{
    this.__shader.use();
    if(xdrawable ===null) return null;
     this.__shader.setUniformTransform("transform",xdrawable); 
      this.__shader.setUniformMaterial("material",xdrawable.getMaterial()); 
   
     this.__shader.setUniformVector3f("camPosition",xdrawable.getParent().getController().getCamera().getPosition());     
     if(this.__directionLight!==null){
       this.setUniformDirectionLight("directionalLight",this.__light);     
   }
    this.__shader.update(xdrawable);
  
});

