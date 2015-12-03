/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


 var Shader = (function(){  
     
    
     this.__program=null;
     this.__listShader=null;
     this.__uniforms =null;
     
     this.__call__=(function(self){
         
         self.__construct();
         
     })(this);
    
 });
 Shader.VERTEX_SHADER=0;
 Shader.FRAGMENT_SHADER=1;
 Shader.GEOMETRY_SHADER=2;
 Shader.PATH="assets/shaders/";

Shader.prototype.__construct=(function(){
  this.initGL();
});

Shader.prototype.initGL=(function(){
     var gl = this.getContext(); 
     this.__program= gl.createProgram();
       this.__listShader= new Array();
    this.__uniforms = new  Array(); 
});
 Shader.prototype.addUniformMaterial=(function(attr){
       this.addUniform("tex");
       this.addUniform(attr+".color");
 });
 Shader.prototype.setUniformMaterial=(function(attr,material){
        if(material instanceof Material)
        {
           this.setUniformVector3f(attr+".color",material.getColor());
            var texture = material.getTexture();
            if(texture !==null){
             this.setUniform1i("tex",texture.getIndex());
             texture.bind(this.getContext());
             }
            else{
             Texture.unbind(this.getContext());
            }
           
        }else{
           Texture.unbind(this.getContext());
          
        }
 }); 

 Shader.prototype.addUniformTransform=(function(attr){
     
      this.addUniform(attr+".worldMatrix");
      this.addUniform(attr+".camMatrix");
      this.addUniform(attr+".viewMatrix");
 });
  Shader.prototype.setUniformTransform=(function(attr, xcomponent)
  {
      if(xcomponent instanceof XDrawable){
        this.setUniformMatrix4f(attr+".worldMatrix",xcomponent.getTransform().getModel());
        this.setUniformMatrix4f(attr+".camMatrix",xcomponent.getParent().getController().getCamera().getTransform());
        this.setUniformMatrix4f(attr+".viewMatrix",xcomponent.getParent().getController().getCamera().getPersp());
      }
      
  });


 Shader.prototype.addUniform=(function(name){
      var gl = this.getContext();
      if(gl===null)return ;
      var  uniformLocation = gl.getUniformLocation(this.getProgram(), name);
      if(uniformLocation ===null){
          
         console.log(name +" could not be found in the shader program as uniforms");
          return ;
      }
      //add the   alert("ss d"+name);
        
      this.__uniforms[name]= uniformLocation;
   
   
      
 });
  Shader.prototype.setAttributeLocation=(function(attr, index){
      
       var gl=this.getContext();
       gl.bindAttribLocation(this.getProgram(),index, attr);
      
  });
 /*Set attribute location*/
 Shader.prototype.getAttributeLocation=function(attr){        
     
     var gl = this.getContext();      
     var index= gl.getAttribLocation(this.getProgram(), attr); 
     
     return index;
 };
 Shader.prototype.setUniform1f=(function(name, value)
 {
     var gl = this.getContext();
     gl.uniform1f(this.__uniforms[name], parseFloat(value));
 });
 
 Shader.prototype.setUniform1i=(function(name, value)
 {
      var gl = this.getContext();
      gl.uniform1i(this.__uniforms[name], value); 
 });
 
  Shader.prototype.setUniformMatrix4f=(function(name, matr)
 {
     var gl = this.getContext();
     if(gl.uniformMatrix4fv && matr instanceof Matrix4f){
       var gl = this.getContext();
       gl.uniformMatrix4fv(this.__uniforms[name],gl.FALSE, xgl.value_ptr(matr));
       
   }
 });
 Shader.prototype.setUniformMatrix3f=(function(name,mat3f){
     
     
    var gl = this.getContext();
    if(gl.uniformMatrix3fv && mat3f instanceof Matrix3f){        
      gl.uniformMatrix3fv(this.__uniforms[name], gl.FALSE, xgl.value_ptr(mat3f));
       
    }
     
 });
 
 
Shader.prototype.setUniformVector2f=(function(name, value)
 {
    if(value instanceof  Vector2f){
       var gl = this.getContext();
       gl.uniform2f(this.__uniforms[name], parseFloat(value.x), parseFloat(value.y));
   }
 });
 
  Shader.prototype.setUniformVector3f=(function(name, value)
 {
     
    if(value  instanceof Vector3f)
    {
      var gl = this.getContext();
     gl.uniform3f(this.__uniforms[name], parseFloat(value.x), parseFloat(value.x), parseFloat(value.z));
    }
 });
 
 
 Shader.prototype.getProgram=(function(){     
     return this.__program;
     
 });
 

 Shader.prototype.getScript=(function(filename){
    var file = new FileRequest(Shader.PATH+filename);   
    var source="";
    source= file.load(); 

  return source;
 });
 
 
 Shader.prototype.getSource=(function(id){     
  var shaderScript, theSource, currentChild;
  shaderScript = document.getElementById(id);
  
   if (!shaderScript) {
      return null;
  }
  
  theSource = "";
  currentChild = shaderScript.firstChild;
        while(currentChild) {
          if (currentChild.nodeType === currentChild.TEXT_NODE) 
          {
            theSource += currentChild.textContent;
          }
          currentChild = currentChild.nextSibling;
        }//end while statement
   
   return  theSource;
    
 });
 
 
Shader.prototype.getContext=(function(){        
    return window.gl;
});
Shader.prototype.getType=(function(type)
{
  var  shaderType=-1;
  var gl =this.getContext();
  if(gl===null) return shaderType;
  switch(type)
    {
       case 0:{
          shaderType=  gl.VERTEX_SHADER;
          break;
          }
        case 1:
        {
          shaderType=  gl.FRAGMENT_SHADER;
          break;
        }
        default:{
             shaderType=-1;
            break;
        }
    };  
   
    return  shaderType;
        
});
Shader.prototype.create=(function(type,source)
{ 
   var shaderType= this.getType(type); 
   if(shaderType ===-1) return ;
   
   var gl = this.getContext();
   var shader = gl.createShader(shaderType);
   
   if(shader !==null){
       
     gl.shaderSource(shader,source);
     gl.compileShader(shader);
  
     if(!this.isSuccess(shader,gl.COMPILE_STATUS,false))
     {
         console.log("Shader Error:  "+gl.getShaderInfoLog(shader));
         return ;
     }
     //add the shader to the shader lis
      
      this.__listShader.push(shader);
    
  }

});

Shader.prototype.createFromScript=(function(id,type)
{
   var thSource=this.getSource(id); 
   this.create(type,thSource);  
});

Shader.prototype.createFromFile=(function(filename,type)
{
   var thSource=this.getScript(filename); 
   this.create(type,thSource);  
});
//Compile the program
Shader.prototype.compile=(function(){    
    var gl = this.getContext();
      //alert("Number of Shaders "+__listShader.count());
    for(var i=0; i < this.__listShader.length; i++)
    {
        var shaderId=this.__listShader[i];
        
        gl.attachShader(this.getProgram(),shaderId);      
    }
   
    gl.linkProgram(this.getProgram());
    if(!this.isSuccess(this.getProgram(), gl.LINK_STATUS,true)){
        //could link program
       console.log("Unable to initialised the shader program \n "+gl.getProgramInfoLog(this.getProgram()));  
        return false;
    }
    gl.validateProgram(this.getProgram());
    if(!this.isSuccess(this.getProgram(),gl.LINK_STATUS,true)){
        console.log("Invalid shader program \n "+gl.getProgramInfoLog(this.getProgram()));     
         return false;
    }
    return true;
    
});


Shader.prototype.isSuccess=(function(shader, type, isProgram){
    
    var gl = this.getContext();
    var status;
    if(isProgram)
    {
       status = gl.getProgramParameter(shader,type);
    }else{
      status= gl.getShaderParameter(shader,type);
        
    }
   return status;
});

Shader.prototype.setProgram=(function(program){
    
    if(program instanceof  WebGLProgram)
    {
       this.__program= program;
    }
    //if(program instanceof )
    
});


Shader.prototype.use=(function(){
    var gl = XController.getInstance().getSystem().getDisplay().getContext();
     gl.useProgram(this.getProgram());
});
Shader.prototype.update=(function(xcomponent){  
   this.use();
 
   if(xcomponent ===null) return ;
     if(xcomponent.getMesh() !==null){
      xcomponent.getMesh().draw();
      
  }

});
