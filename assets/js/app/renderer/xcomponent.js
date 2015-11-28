/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var XComponent =(function(){  
    
    this.__parent;
    this.__transform;
    this.__material;
    
    this.__call__=(function(self){        
        self.__construct();
    })(this);
   
});
XComponent.prototype.__construct=(function()
{
    this.__parent =null;
    this.__material=null;
    this.__transform = new Transform3D();
});

XComponent.prototype.setParent=(function(parent){
   this.__parent =(parent instanceof XObject)?parent:null;
});
XComponent.prototype.setTransform=(function(t)
{
     this.__transform = (t instanceof Transform3D)?t:this.__transform;
});


XComponent.prototype.getTransform=(function(){
   
    var parent= null;
    if(this.__parent !==null )
    {
     this.__transform.setParentTranformMatrix4f(this.__parent.getTransform().getModel());
    }
  
  return this.__transform;
});

XComponent.prototype.getMaterial=(function(){
   return this.__material;
});
XComponent.prototype.setMaterial=(function(material){
  this.__material =(material instanceof Material)?material:null;
});

XComponent.prototype.getParent=(function(){
   
    return this.__parent;
   
});
XComponent.prototype.input=(function(){  
  
});

XComponent.prototype.update=(function(timelapse){  
   
});
XComponent.prototype.render=(function(){  
    
   
});

