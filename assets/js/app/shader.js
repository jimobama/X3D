/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */





 var Shader = (function(gl){   
     this.__gl= gl;
     var __glProgram=null;
     var __listShader=null;
     this.__uniforms ={};
   
   
     
 });
 Shader.prototype.VERTEX_SHADER=0;
 Shader.prototype.FRAGMENT_SHADER=1;
 Shader.prototype.GEOMETRY_SHADER=2;
 Shader.prototype.PATH="assets/shaders/";
 
 Shader.prototype.addUniform=(function(name){
      
      
      var gl = this.getContext();
     
      var  uniformLocation = gl.getUniformLocation(this.getProgram(), name);
      if(uniformLocation ===null){
          
          alert(name +" could not be found in the shader program as uniforms");
          return ;
      }
      //add the   alert("ss d"+name);
        
      this.__uniforms[name]= uniformLocation;
   
   
      
 });
 
 /*Set attribute location*/
 Shader.prototype.getAttributeLocation=function(attr){        
     
     var gl = this.getContext();      
     var index= gl.getAttribLocation(this.getProgram(), attr);     
     return index;
 }
 Shader.prototype.setUniform1f=(function(name, value)
 {
     var gl = this.getContext();
     gl.uniform1f( this.__uniforms[name], value);
 });
 
 Shader.prototype.setUniform1i=(function(name, value)
 {
      var gl = this.getContext();
      gl.uniform1i( this.__uniforms[name], value); 
 });
 
  Shader.prototype.setUniformMatrix4f=(function(name, matr)
 {
     var gl = this.getContext();
     if(gl.uniformMatrix4fv && matr instanceof Matrix4f){
       var gl = this.getContext();
       gl.uniformMatrix4fv(this.__uniforms[name],gl.FALSE, Matrix4f.value_ptr(matr));
   }
 });
 Shader.prototype.setUniformMatrix3f=(function(name,mat3f){
     
     
    var gl = this.getContext();
    if(gl.uniformMatrix3fv && mat3f instanceof Matrix3f){        
      gl.uniformMatrix3fv(this.__uniforms[name], gl.FALSE, Matrix3f.value_ptr(mat3f));
       
    }
     
 });
 
 
Shader.prototype.setUniformVector2f=(function(name, value)
 {
    if(value instanceof  Vector2f){
       var gl = this.getContext();
       gl.uniform2f(this.__uniforms[name], value.x, value.y);
   }
 });
 
  Shader.prototype.setUniformVector3f=(function(name, value)
 {
     
    if(value  instanceof Vector3f)
    {
      var gl = this.getContext();
     gl.uniform3f(this.__uniforms[name], value.x, value.x, value.z);
    }
 });
 
 
 Shader.prototype.getProgram=(function(){     
     return __glProgram;
     
 });
 
 
 Shader.prototype.init=(function(){
     var gl= this.getContext();
     if(gl instanceof WebGLRenderingContext)
     {// if(gl instanceof )
     __glProgram= gl.createProgram();
      __listShader= new  Array();      
    
     }
     else{
        Console.log("Couldnt create gl context cause invalid object passed");
     }
    
 });
 Shader.prototype.getScript=(function(filename){
    var file = new FileRequest(this.PATH+filename);   
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
 
 
Shader.prototype.getContext=function(){        
    return this.__gl;
}
Shader.prototype.getType=(function(type)
{
  var  shaderType;
 var gl =this.getContext();
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
   var gl = this.getContext();
   var shader = gl.createShader(shaderType);
   if(shader !==null){
       
     gl.shaderSource(shader,source);
     gl.compileShader(shader);
  
     if(!this.isSuccess(shader,gl.COMPILE_STATUS,false))
     {
         alert("Shader Error:  "+gl.getShaderInfoLog(shader));
         return ;
     }
     //add the shader to the shader lis
      
      __listShader.push(shader);
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
    
    
    for(var i=0; i < __listShader.length; i++)
    {
        var shaderId=__listShader[i];
        gl.attachShader(this.getProgram(),shaderId);      
    }
    
    
    gl.linkProgram(this.getProgram());
    if(!this.isSuccess(this.getProgram(), gl.LINK_STATUS,true)){
        //could link program
        alert("Unable to initialised the shader program \n "+gl.getProgramInfoLog(this.getProgram()));  
        return false;
    }
    gl.validateProgram(this.getProgram());
    if(!this.isSuccess(this.getProgram(),gl.LINK_STATUS,true)){
         alert("Invalid shader program \n "+gl.getProgramInfoLog(this.getProgram()));     
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
})
Shader.prototype.use=(function(){
    
    var gl = this.getContext();
    gl.useProgram(this.getProgram());
   
})

Shader.prototype.update=(function(material){
    this.use();
    if(material instanceof Material)
    {
        var texture = material.getTexture();
        var color   =material.getColor();
        if(texture !=null){
             
        texture.bind(this.getContext());
      }
       
         
    }
});
