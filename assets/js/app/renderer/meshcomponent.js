/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var MeshComponent= (function(mesh,material){
    this.__mesh;
    this.__call__=(function(self, mesh,material , shader){        
        self.__construct(mesh,material);
        
    })(this, mesh,material);
});

Object.__extends__(MeshComponent,XComponent);


MeshComponent.prototype.__construct=(function(mesh,material)
{
    this.__mesh= (mesh instanceof Mesh)?mesh:null;
    this.setMaterial(material);
   
});

MeshComponent.prototype.update=(function(elapse){
      
});


MeshComponent.prototype.render=(function(){ 
  
 
   this.getParent().getShader().update(this);
   this.__mesh.draw();
});
