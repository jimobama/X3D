




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
    this.__shader=  null;  
 
    //buffers
    this.__vbo;
    this.__vboNormals=null;
    this.__vboCoords=null;
    this.__vboIndices=null;
 
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
  this.__shader =ashader;
    var gl = this.getShader().getContext();      
    //create the buffer array objects
     this.__vbo = gl.createBuffer();
     gl.bindBuffer(gl.ARRAY_BUFFER, this.__vbo);
      this. __vboNormals =gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER,this.__vboNormals);
     
       this.__vboCoords =gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER,  this.__vboCoords);
      
    
      
 
    
    this.__vboIndices =gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.__vboIndices);
    
});
Mesh.prototype.calcNormals=(function(vertices, indices){
    if(indices.length < 3) return ;
    for(var i=0; i < indices.length; i+=3)
    {
        var i0= indices[i];
        var i1= indices[i + 1];
        var i2= indices[i + 2];
        
       var vec1 = vertices[i1].getPosition().minus(vertices[i0].getPosition());
       var vec2 = vertices[i2].getPosition().minus(vertices[i0].getPosition());
       var normal = (vec1.cross(vec2));
       normal=normal.normalize();
      
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
    return this.__shader;
});

Mesh.prototype.initMesh=(function(){
   if(this.__shader instanceof Shader)   {
   
      if(this.__vertices instanceof Array) {          
     
       var position=[];
       var  coords=[];
       var  normals=[];
            
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
     
             
       this.setVertexAttribute2f("textCoord",coords,  this.__vboCoords);
       this.setVertexAttribute3f("normalCoords",normals,this.__vboNormals);
       this.setVertexAttribute3f("position",position, this.__vbo);
      
       
       //set the element buffer for drawing
         var gl = this.__shader.getContext();
         gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.__vboIndices);
         gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,  new Uint16Array(this.__indices),  gl.STATIC_DRAW);
              
      
       }
     
  
    }
  return this;
   
});


Mesh.prototype.draw=(function(){
    if(this.__indices.length < 3) return ;
     var shader = this.getShader();
     shader.use();
     var gl = shader.getContext(); 
    /*
      gl.bindBuffer(gl.ARRAY_BUFFER, this.__vbo); 
     gl.bindBuffer(gl.ARRAY_BUFFER, this.__vboCoords); 
     gl.bindBuffer(gl.ARRAY_BUFFER, this.__vboNormals);
     */
     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.__vboIndices); 
        
    // gl.drawArrays(gl.TRIANGLES, 0,this.__vertices.length);     
     //alert(shader.getProgram());
     gl.drawElements(gl.TRIANGLES, this.__indices.length, gl.UNSIGNED_SHORT, 0);
    
    });