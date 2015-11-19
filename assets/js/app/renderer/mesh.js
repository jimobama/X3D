




/*
 * 
 * @param {type} vertex
 * @param {type} indices
 * @returns {undefined}
 * 
 * Load the vertex 
 */
var Mesh=(function(shader,vertices, indices,allowCalNormals)
{
     
    this.__vertices   ;
    this.__indices  ;    
    var  __shader=  null;  
    var __allowCalNormals=false;
    //buffers
    var __vbo=null;
    var  __vboNormals=null;
    var __vboCoords=null;
    var __vboIndices=null;
 
   this.__call__=(function(self,ashader,avertices, aindices,allow){
       
     self.__construct(ashader, avertices, aindices,allow);
       
   })(this,shader,vertices, indices,allowCalNormals);
    
    
});
Mesh.prototype.__construct=(function(ashader,vertices, indices,allow){
    this.initialBuffers(ashader);
  
   
    if(allow)
    {
     this.__vertices = this.calcNormals(vertices,indices );
    }else{
        this.__vertices = vertices;  
    }
    this.__indices = indices;
    this.initMesh();
    
});
Mesh.prototype.initialBuffers=(function(ashader){
   __shader =ashader;
    var gl = this.getShader().getContext();      
    //create the buffer array objects
     __vbo = gl.createBuffer();
     gl.bindBuffer(gl.ARRAY_BUFFER, __vbo);
       __vboNormals =gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER,   __vboNormals);
     
       __vboCoords =gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER,  __vboCoords);
      
    
      
 
    
     __vboIndices =gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,__vboIndices);
    
});
Mesh.prototype.calcNormals=(function(vertices, indices){
    
    for(var i=0; i < indices.length; i+=3)
    {
        var i0= indices[i];
        var i1= indices[i + 1];
        var i2= indices[i + 2];
        
       var vec1 = vertices[i1].getPosition().minus(vertices[i0].getPosition());
       var vec2 = vertices[i2].getPosition().minus(vertices[i0].getPosition());
       var normal = (vec1.cross(vec2));
       normal=normal.normalize();
       console.log(normal);
       vertices[i0].setNormal(vertices[i0].getNormal().add(normal));
       vertices[i1].setNormal(vertices[i0].getNormal().add(normal));
       vertices[i2].setNormal(vertices[i0].getNormal().add(normal));
       
       
    }
    
    for(var i=0; i < vertices.length; i++) 
    {
      vertices[i].setNormal(vertices[i].getNormal().normalize());
    }
    return  vertices;
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
      
      //alert(attribute+" = " +index+" vbo ="+vbo);
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

Mesh.prototype.initMesh=(function(){
   if(__shader instanceof Shader)   {
   
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
              //push normals
              normals.push(vertex.getNormal().x);   
              normals.push(vertex.getNormal().y);
              normals.push(vertex.getNormal().z);
              //coords
              coords.push(vertex.getCoord().x);   
              coords.push(vertex.getCoord().y);
             //Normals
              
              
           }
       }
      // position=this.__vertices;
     
             
       this.setVertexAttribute2f("textCoord",coords,  __vboCoords);
       this.setVertexAttribute3f("normalCoords",normals,  __vboNormals);
       this.setVertexAttribute3f("position",position, __vbo);
      
       
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
     gl.bindBuffer(gl.ARRAY_BUFFER, __vboNormals); 
    // gl.drawArrays(gl.TRIANGLES, 0,this.__vertices.length);     
     //alert(shader.getProgram());
     gl.drawElements(gl.TRIANGLES, this.__indices.length, gl.UNSIGNED_SHORT, 0);
    
    });