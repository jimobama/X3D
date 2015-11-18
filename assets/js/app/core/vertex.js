/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var Vertex=(function(pos,norm,coord)
{
  
     this.__position = (pos instanceof Vector3f)? (pos) :(new Vector3f());  
     this.__normal   = (norm instanceof Vector3f)? (norm) :(new Vector3f());
     this.__coord   = (coord instanceof Vector2f)? (coord) :(new Vector2f()); ;
     
});


Vertex.prototype.getPosition=(function(){    
    return this.__position;    
});



Vertex.prototype.getCoord=(function(){
    return this.__coord;
})

Vertex.prototype.getNormal=(function(){    
    return this.__normal;
   
});


Vertex.prototype.setPosition= function(pos){    
   this.__position= (pos instanceof Vector3f)?(pos):(new Vector3f(0,0,0));;
   return this;
}

Vertex.prototype.setNormal= function(normal){    
   
   this.__normal  = (normal instanceof Vector3f)?(normal):(new Vector3f(0,0,0));

   return this;
}
Vertex.prototype.setCoord= function(coord){
    
     this.__coord   = (coord instanceof Vector2f)?(coord):(new Vector2f(0,0)); 
      return this;
}
