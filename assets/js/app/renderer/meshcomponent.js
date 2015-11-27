/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var MeshComponent= (function(mesh,material , shader){
    this.__mesh;
    this.__shader;
    this.__material;
    this.__call__=(function(self, mesh,material , shader){        
        self.__construct(mesh,material , shader);
        
    })(this, mesh,material , shader);
});

Object.__extends__(MeshComponent,XComponent);


MeshComponent.prototype.__construct=(function(mesh,material , shader)
{
    this.__mesh= (mesh instanceof Mesh)?mesh:null;
    this.__material =(material instanceof Material)?material:null;;
    this.__shader= (shader instanceof Shader)?shader:null;
   
});

MeshComponent.prototype.update=(function(elapse,transform){
   
      
});


MeshComponent.prototype.render=(function(transform){ 
       this.__shader.update(this.__material, transform);
       this.__mesh.draw();
});
