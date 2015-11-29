/* 
 This is the render engine and should be able to have just one method render
 */


var XRenderer =(function(controller){
   this.controller =null;
   this.effects=null;
   this.__call__=(function(self,controller){       
       self.__construct(controller);
   })(this,controller);
});
XRenderer.prototype.__construct=(function(controller){    
   this.controller=(controller instanceof XController)?controller:null;
   this.effects = new XObject();
});
XRenderer.prototype.getController=(function(){
    return  this.controller;
});
XRenderer.prototype.addEffect=(function(xobject){
    if(xobject instanceof XObject)
        this.effects.addObject(xobject);
});
XRenderer.prototype.render=(function(object){
   if(this.getController()===null){
        console.log("Could not render the model without an engine controller");
        return ;
   }
  var gl = this.getController().getSystem().getDisplay().getContext();
  RenderUtils.clear(gl,0.1,0.1,0.1,1);
  object.renderAll();
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  //gl.blendFunc(gl.ONE, gl.ONE);
  gl.depthMask(false);
  gl.depthFunc(gl.EQUAL);
  //Draw blender objects here like light shaders and effects
  this.effects.renderAll();
  gl.depthFunc(gl.LESS);
  gl.depthMask(true);
  gl.disable(gl.BLEND);
                
                
                
});