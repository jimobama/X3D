/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var PhongShader =(function(glcontext){
    var __ambientLight;
    var __directionLight;
    this.__call__=(function(self, glContext){
      self.__initialize(glContext);
    })(this,glcontext);
    
});

PhongShader.prototype=Object.create(Shader.prototype);
PhongShader.prototype.constructor =Shader;

PhongShader.prototype.__initialize=(function(glContext){
    
     if(glContext !==null){
         __ambientLight= null;
         __directionLight= null;
        Shader.call(this,glContext);
        this.createFromFile("phongvertex.glsl",Shader.VERTEX_SHADER );
        this.createFromFile("phongfragment.glsl",Shader.FRAGMENT_SHADER);
        this.compile();
        this.addUniform("texture");
        this.addUniform("basicColor");
         this.addUniform("specularIntensity");
          this.addUniform("specularExponent");
          
        this.addUniform("projection");
        this.addUniform("transform");
        this.addUniform("camPosition");
       this.addUniformDirectionLight("directionLight");
     
     }
 });
 
 PhongShader.prototype.addAmbientLight =(function(light){     
     __ambientLight= light;
     if(__ambientLight !==null){         
       this.addUniform("ambientLight");
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
   
   var texture = material.getTexture(); 
   this.setUniformVector3f("basicColor",material.getColor());
   this.setUniform1f("specularExponent",material.getSpecularExponent());
   this.setUniform1f("specularIntensity",material.getSpecularIntensity());
   
   if(__ambientLight!==null){
     this.setUniformVector3f("ambientLight",__ambientLight);
   }
   if( __directionLight!==null)
   {
         this.setUniformDirectionLight("directionLight",__directionLight);
       
        
   }
   if(texture !==null){
       this.setUniform1i("texture",texture.getIndex());
       texture.bind(this.getContext());
    }else{
        Texture.unbind(this.getContext());
    }
   
 });
