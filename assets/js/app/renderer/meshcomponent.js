/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var MeshComponent= (function(mesh,material){
    this.__call__=(function(self, mesh,material , shader){        
        self.__construct(mesh,material);
        
    })(this, mesh,material);
});

Object.__extends__(MeshComponent,XDrawable);

MeshComponent.prototype.__construct=(function(mesh,material)
{
    XDrawable.prototype.__construct();
    this.setMesh(mesh);
    this.setMaterial(material);
   
});

