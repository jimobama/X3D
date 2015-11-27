/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

PhongShader =(function(glcontext){
    var __ambientLight;
    var __directionLight;
    var __pointLights;
    this.__call__=(function(self, glContext){
      self.__initialize(glContext);
    })(this,glcontext);
    
});
//extends the function from Shader
Object.__extends__(PhongShader,Shader);
PhongShader.MAX_POINT_LIGHT=4;
/*
PhongShader.prototype=Object.create(Shader.prototype);
PhongShader.prototype.constructor =Shader;
*/

PhongShader.prototype.__initialize=(function(glContext){
    
     if(glContext !==null){
         __ambientLight= null;
         __directionLight= null;
        __pointLights=null;
        Shader.call(this,glContext);
        this.createFromFile("phongvertex.glsl",Shader.VERTEX_SHADER );
        this.createFromFile("phongfragment.glsl",Shader.FRAGMENT_SHADER);
        this.compile();
        //this.addUniform("texture");
       // this.addUniform("basicColor");
        //this.addUniform("specularIntensity");
         // this.addUniform("specularExponent");
          
        this.addUniform("projection");
        this.addUniform("transform");
        this.addUniform("camPosition");
        this.addUniformDirectionLight("directionLight");
        this.addUniformMaterial("material");
        
         for(var i=0; i < PhongShader.MAX_POINT_LIGHT; i++)
          {
            this.addUniformPointLight("pointLights["+i+"]");
            
          }
     
     }
 });
 
 PhongShader.prototype.addAmbientLight =(function(light){     
     __ambientLight= light;
     if(__ambientLight !==null){         
       this.addUniform("ambientLight");
     }
     
 });
 
 
  PhongShader.prototype.addUniformMaterial =(function(attribute){ 
    
       this.addUniform(attribute+".color");
       this.addUniform("texture");
       this.addUniform(attribute+".specularIntensity");
       this.addUniform(attribute+".specularExponent");
       this.addUniform(attribute+".ambientColor");
 });
 

 
 
 
  PhongShader.prototype.setUniformMaterial =(function(attribute, material){     
   
     if(material instanceof Material){  
         
       var texture = material.getTexture();
       this.setUniformVector3f(attribute+".color", material.getColor());  
       this.setUniformVector3f(attribute+".ambientColor", material.getAmbientColor()); 
     
       this.setUniform1f(attribute+".specularIntensity",material.getSpecularIntensity());
       this.setUniform1f(attribute+".specularExponent",material.getSpecularExponent());
     if(texture !==null){
       this.setUniform1i("texture",texture.getIndex());
        texture.bind(this.getContext());
      }
     else{
           Texture.unbind(this.getContext());
       }
     }
 });
 
 
 
 
  PhongShader.prototype.addUniformBaseLight=(function(attribute){
        this.addUniform(attribute+".color");
        this.addUniform(attribute+".intensity"); 
  });

 PhongShader.prototype.addUniformDirectionLight=(function(attribute){
     
        this.addUniform(attribute+".direction");
        this.addUniformBaseLight(attribute+".baseLight");
      
  });
  
   PhongShader.prototype.setPointLights=(function(pointLightsArray){
       
      if(pointLightsArray instanceof Array ){ 
         
        if(pointLightsArray.length <  PhongShader.MAX_POINT_LIGHT){
            __pointLights = pointLightsArray;  
            
           
        }
      }
   });
   
    PhongShader.prototype.setUniformPointLight=(function(attribute, pointLight){
        
       if(pointLight instanceof PointLight )
       {
         
           this.setUniformBaseLight(attribute+".baseLight",pointLight.getBaseLight());
           this.setUniformAttenuation(attribute+".attenu", pointLight.getAttenuation());
           this.setUniformVector3f(attribute+".position", pointLight.getPosition());
       }
        
    });
    PhongShader.prototype.setUniformAttenuation=(function(attribute, atten)
    {
        
        if(atten instanceof Attenuation )
        {
            
            this.setUniform1f(attribute+".constant",atten.getConstant());
            this.setUniform1f(attribute+".linear",atten.getLinear());
            this.setUniform1f(attribute+".exponent",atten.getExponent());
        }
    });
    
   PhongShader.prototype.addUniformAttenuation=(function(attribute){
       
       this.addUniform(attribute+".constant"); 
       this.addUniform(attribute+".linear"); 
       this.addUniform(attribute+".exponent"); 
       
   });
   
    PhongShader.prototype.addUniformPointLight =(function(attribute){
        
        
         this.addUniform(attribute+".position");
         this.addUniformBaseLight(attribute+".baseLight");
         this.addUniformAttenuation(attribute+".attenu");
    });
    
  
 PhongShader.prototype.addDirectionLight =(function(directionLight){
     
     if(directionLight instanceof DirectionLight)
     {
         __directionLight= directionLight;
       
     }
     
 });
 
  PhongShader.prototype.setUniformBaseLight=(function(attribute,baseLight){
    
     if(baseLight instanceof BaseLight)
     {
         
         this.setUniformVector3f(attribute+".color",baseLight.getColor());
         this.setUniform1f(attribute+".intensity",baseLight.getIntensity());
         
       
     }
     
     
 });
 
   PhongShader.prototype.setUniformDirectionLight=(function(attribute,directionLight){
     
     if(directionLight instanceof DirectionLight)
     {
         this.setUniformVector3f(attribute+".direction",directionLight.getDirection());
         this.setUniformBaseLight(attribute+".baseLight",directionLight.getBaseLight());
     }
     
     
 });
 

PhongShader.prototype.update=(function(material,transform){
   this.use();
   this.setUniformMatrix4f("projection",transform.getPerspTransform()); 
   this.setUniformMatrix4f("transform",transform.getTransform()); 
   this.setUniformVector3f("camPosition",transform.getCamera().getPosition());
   this.setUniformMaterial("material",material);
 
    
   if(__ambientLight!==null){
     this.setUniformVector3f("ambientLight",__ambientLight);
     
   
   }
   if( __directionLight!==null)
   {
     this.setUniformDirectionLight("directionLight",__directionLight);
   }
   
   if(__pointLights instanceof Array){
      for(var i = 0; i < PhongShader.MAX_POINT_LIGHT; i++){
          this.setUniformPointLight("pointLights["+i+"]", __pointLights[i]);
     
      }
    }
   
   
 });
