/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var DirectionLightShader =(function(){
    this.__shader=null;
   
    this.__directionLight=null;
    this.__call__=(function(self){
      self.__construct();
        
    })(this);
    
});

DirectionLightShader.prototype.__construct=(function()
{
    this.__shader= new Shader();
    this.__directionLight= new DirectionLight(new BaseLight(new Vector3f(1,0,0),8.0), new Vector3f(1,1,1));
    this.__shader.createFromFile("forwarddirection_vertex.glsl",Shader.VERTEX_SHADER );
    this.__shader.createFromFile("forwarddirection_fragment.glsl",Shader.FRAGMENT_SHADER);
    this.__shader.compile();
    this.__shader.__ambientLight=null;
    this.addUniformMaterial("material");
    this.__shader.addUniformTransform("transform");
    this.addUniform("camPosition");
    this.addUniformDirectionLight("directionLight");
});
DirectionLightShader.prototype.setUniformBaseLight=(function(attribute,baseLight){
    
     if(baseLight instanceof BaseLight)
     {
        this.__shader.setUniformVector3f(attribute+".color",baseLight.getColor());
        this.__shader.setUniform1f(attribute+".intensity",baseLight.getIntensity());
     }
     
     
 });
 
DirectionLightShader.prototype.setUniformDirectionLight=(function(attribute,directionLight){
     
     if(directionLight instanceof DirectionLight)
     {
         this.__shader.setUniformVector3f(attribute+".direction",directionLight.getDirection());
         this.setUniformBaseLight(attribute+".baseLight",directionLight.getBaseLight());
     }
 }); 

DirectionLightShader.prototype.addUniformDirectionLight=(function(){
    
      this.__shader.addUniform(attribute+".direction");
      this.addUniformBaseLight(attribute+".baseLight");
    
});
DirectionLightShader.prototype.addUniformBaseLight=(function(attribute){
    
        this.__shader.addUniform(attribute+".color");
        this.__shader.addUniform(attribute+".intensity");
});

DirectionLightShader.prototype.addUniformMaterial=(function(attribute)
{
    this.__shader.addUniformMaterial(attribute); 
    this.__shader.addUniform(attribute+".specularIntensity");
    this.__shader.addUniform(attribute+".specularExponent");
});
 DirectionLightShader.prototype.setUniformMaterial=(function(attribute, material){
     
      this.__shader.setUniformMaterial(attribute,material);
      this.__shader.setUniform1f(attribute+".specularIntensity",material.getSpecularIntensity());
      this.__shader.setUniform1f(attribute+".specularExponent",material.getSpecularExponent()); 
       
       
 });
DirectionLightShader.prototype.update=(function(xdrawable)
{
    if(xdrawable ===null) return null;
     this.setUniformMaterial(xdrawable.getMaterial());
     this.__shader.setUniformVector3fv("camPosition",xdrawable.getParent().getController().getCamera().getPosition());
     this.setUniformDirectionLight("directionLight",this.__directionLight);
    
    this.__shader.update(xdrawable);
  
});

