




/*
 * 
 * @param {type} vertex
 * @param {type} indices
 * @returns {undefined}
 * 
 * Load the vertex 
 */
var Mesh=(function(vertices, indices)
{
     
    this.__vertices = vertices;    ;
    this.__indices = indices;      
    var  __shader=  null;   
    //buffers
    var __vbo=null;
    var __vboCoords=null;
    var __vboIndices=null;
 
  
    
    
});

Mesh.prototype.initialBuffers=(function(){
       
    var gl = this.getShader().getContext();      
    //create the buffer array objects
     __vbo = gl.createBuffer();
     gl.bindBuffer(gl.ARRAY_BUFFER, __vbo);
     
       __vboCoords =gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER,  __vboCoords);
    
     __vboIndices =gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,__vboIndices);
    
    this.__indices= ( this.__indices instanceof Array)?this.__indices:[];
  
    
});


Mesh.prototype.setVertexAttribute3f=(function(attribute,list,vbo)
{
    var shader = this.getShader();
    shader.use();
    var gl =shader.getContext();
    
    gl.bindBuffer(gl.ARRAY_BUFFER,vbo);
   
    if(list instanceof Array){   
      gl.bufferData(gl.ARRAY_BUFFER,  this.toFloatArray(list),  gl.STATIC_DRAW);
      var index = shader.getAttributeLocation(attribute);
      if(index >=0){
      gl.vertexAttribPointer(index, 3, gl.FLOAT,false, 0, 0);
      gl.enableVertexAttribArray(index);  
      }
    }
    
      
});

Mesh.prototype.setVertexAttribute2f=(function(attribute,list,vbo)
{  
    var shader = this.getShader();
    shader.use();
    var gl =shader.getContext();
    gl.bindBuffer(gl.ARRAY_BUFFER,vbo);
   
    if(list instanceof Array){         
      gl.bufferData(gl.ARRAY_BUFFER, this.toFloatArray(list),  gl.STATIC_DRAW);
      var index = shader.getAttributeLocation(attribute);
     
       if(index >=0){
            gl.vertexAttribPointer(index, 2, gl.FLOAT,false, 0, 0);
            gl.enableVertexAttribArray(index);  
        }
    
    }

      
});




Mesh.prototype.toFloatArray=(function(list)
{
      
    return (new  Float32Array(list));
});


Mesh.prototype.getShader=(function(){
    return __shader;
});

Mesh.prototype.init=(function(shader){
   __shader = shader;
 
   if(__shader instanceof Shader)   {
      this.initialBuffers();   
   
       
            
   
      if(this.__vertices instanceof Array) {          
     
        position=[];
        coords=[];
        normals=[];
            
       for(var i=0; i < this.__vertices.length; i++){
            
           var vertex = this.__vertices[i];
           if( vertex instanceof  Vertex)
           {
              
              //push position
              position.push(vertex.getPosition().x);   
              position.push(vertex.getPosition().y);
              position.push(vertex.getPosition().z);
              //coords
              coords.push(vertex.getCoord().x);   
              coords.push(vertex.getCoord().y);
             //Normals
              //push position
              normals.push(vertex.getNormal().x);   
              normals.push(vertex.getNormal().y);
              normals.push(vertex.getNormal().z);
                    
           }
       }
   
     
      // position=this.__vertices;
     
       this.setVertexAttribute3f("position",position, __vbo);
       this.setVertexAttribute2f("textCoord",coords,  __vboCoords);
       
       //set the element buffer for drawing
      
         var gl = __shader.getContext();
         gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,__vboIndices);
         gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,  new Uint16Array(this.__indices),  gl.STATIC_DRAW);
              
      
       }
     
  
    }
  return this;
   
});


Mesh.prototype.draw=(function(){    
     var shader = this.getShader();
     shader.use();
     var gl = shader.getContext(); 
     gl.bindBuffer(gl.ARRAY_BUFFER, __vbo);  
     gl.bindBuffer(gl.ARRAY_BUFFER, __vboCoords);  
     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, __vboIndices); 
    // gl.drawArrays(gl.TRIANGLES, 0,this.__vertices.length);     
     //alert(shader.getProgram());
     gl.drawElements(gl.TRIANGLES, this.__indices.length, gl.UNSIGNED_SHORT, 0);
    
    });