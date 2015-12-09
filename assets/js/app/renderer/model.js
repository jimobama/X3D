/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var MODEL_PATH_FOLDER="assets/models/";

var Model =(function(){    
    this.__positions = new Array();
    this.__coords    = new Array();
    this.__normals   = new Array();
    
    //read the indices 
    this.__drawIndices = new Array();
    this.__vertices = new Array();
 
    
});

 Model.prototype.load=(function(filename)
 {
    filestream= new  FileRequest(MODEL_PATH_FOLDER+filename);
    var source= filestream.load();
    //parse the file 
    var line=0;
    var lineValue="";
    for(var i=0; i< source.length; i ++)
    {    
        lineValue =lineValue + source[i];
        
         if(source[i]==='\n')
         {
               line++;
               this.parseLine(lineValue,line);
              lineValue="";
         }
    }
    
   
  
 });
 Model.prototype.insertVertex=(function(positionIndex, CoordIndex,norIndex)
 {
      var position = this.__positions[positionIndex];
      var normals =  this.__normals[norIndex];
      var coords =   this.__coords[CoordIndex];
      this.__vertices[positionIndex]= new Vertex(position,coords,normals);
      this.__drawIndices.push(positionIndex);
   
 });
 
 Model.prototype.parseLine=(function(line, lineNumber){
     
     var tokenArray= line.split(" ");       
       var lookahead=tokenArray[0];
       
       if(lookahead ==="f")//vertex / texture/ coordinates indices
        { 
         //check if its vertices texture and norms
          if(this.__coords.length >0 && this.__normals.length>0)
          {
              
              for(var i=0; i < 3; i++){
                var face= tokenArray[i+1].split("/");
                this.insertVertex(parseInt(face[0])-1,parseInt(face[1])-1,parseInt(face[2])-1);               
              }
              
          }
          
        }
        else if(lookahead ==="v")//vertex
        {
           
            //add the vertices indices positions
            var vface=new Vector3f(parseFloat(tokenArray[1]),parseFloat(tokenArray[2]), parseFloat(tokenArray[3]));
            
            this.__positions.push(vface);
           
           
          
        }
       else if(lookahead ==="vn") // normal coordinates
       {
           //get the normals 
            
           this.__normals.push(new Vector3f(parseFloat(tokenArray[1]),
                                            parseFloat(tokenArray[2]),
                                            parseFloat(tokenArray[3])));
                    
       }
        else if(lookahead ==="vt")//vertex texture coordinates
       {
           
           this.__coords.push(new Vector2f(parseFloat(tokenArray[1]),
                                           parseFloat(tokenArray[2])));
          
       }
     
     
 });
 
 Model.prototype.getVertices=(function(){     
     return this.__vertices;     
 });
 Model.prototype.getIndices=(function(){
     
     return this.__drawIndices;
     
 });








