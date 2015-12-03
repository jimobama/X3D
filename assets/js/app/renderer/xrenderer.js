/* 
 This is the render engine and should be able to have just one method render
 */


var XRenderer =(function(controller){
   this.controller =null;
   this.__object;
   this.meshShader=null;
   this.effects=null;
   this.__call__=(function(self,controller){       
       self.__construct(controller);
   })(this,controller);
});
XRenderer .__instance=null;
XRenderer.getInstance=(function(controller){
    if(XRenderer .__instance===null)
    XRenderer .__instance= new XRenderer(controller);

   return XRenderer.__instance;
});

XRenderer.prototype.setObject=(function(xobject){
    
    if(xobject instanceof XObject)
        this.__object=xobject;
});

XRenderer.prototype.getObject=(function(){
        return this.__object;
});
XRenderer.prototype.__construct=(function(controller){    
   this.controller=(controller instanceof XController)?controller:null;
   this.effects = new XObject();
    this.__object=new XObject();
    this.meshShader= new AmbientLightShader();
    this.meshShader.setAmbientLight(new Vector3f(0.2,0.2,0.2));
});
XRenderer.prototype.getController=(function(){
    return  this.controller;
});
XRenderer.prototype.addEffect=(function(xobject){
    if(xobject instanceof XObject)
        this.effects.addObject(xobject);
});
XRenderer.prototype.render=(function(){
   if(this.getController()===null){
        console.log("Could not render the model without an engine controller");
        return ;
   }
  var gl = window.gl;
  RenderUtils.clear(0.1,0.1,0.1,1);
  this.getObject().renderAll();
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