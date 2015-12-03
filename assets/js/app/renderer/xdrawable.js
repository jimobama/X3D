/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var XDrawable =(function(){  
    
   
    this.__parent;
    this.__transform;
    this.__material;
    this.__model;
    this.__call__=(function(self){        
        self.__construct();
    })(this);
   
});
XDrawable.prototype.__construct=(function()
{
    this.__parent =null;
    this.__material=null;
 
    this.__transform = new Transform3D();
    
   
});

XDrawable .prototype.setMesh =(function(model){
     this.__model = (model instanceof Mesh)? model:null;
});

XDrawable.prototype.getMesh =(function(){
    return this.__model;
});


XDrawable.prototype.setParent=(function(parent){
   this.__parent =(parent instanceof XObject)?parent:null;
   
});
XDrawable.prototype.setTransform=(function(t)
{
     this.__transform = (t instanceof Transform3D)?t:this.__transform;
     
    
});
XDrawable.prototype.getTransform=(function(){
   
    var parent= null;
    if(this.hasParent())
    {
      this.__transform.setParentTranformMatrix4f(this.__parent.getTransform().getModel());
    }

  return this.__transform;
});
XDrawable.prototype.hasParent =(function()
{
    if(this.__parent===null) return false;
    return true;
});
XDrawable.prototype.getMaterial=(function(){
   return this.__material;
});
XDrawable.prototype.setMaterial=(function(material){
  this.__material =(material instanceof Material)?material:null;
});

XDrawable.prototype.getParent=(function(){
   
    return this.__parent;
   
});
XDrawable.prototype.input=(function(){  
  
});
XDrawable.prototype.update=(function(timelapse){  
   
});
XDrawable.prototype.render=(function(shader){  
    
   if(shader!==null && shader.update)
   {
       shader.update(this);
   }
});

