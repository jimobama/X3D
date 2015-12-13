/* 
 This is the render engine and should be able to have just one method render
 */


var XRenderer =(function(controller){
   
   this.__object;
   this.meshShader=null;
   
   this.blenderShaders=null;
   this.__call__=(function(self){       
       self.__construct();
   })(this);
});
XRenderer .__instance=null;
XRenderer.getInstance=(function(){
    if(XRenderer .__instance===null)
        XRenderer .__instance= new XRenderer();
   return XRenderer.__instance;
});

XRenderer.prototype.setObject=(function(xobject){
    
    if(xobject instanceof XObject)
        this.__object=xobject;
});

XRenderer.prototype.getObject=(function(){
        return this.__object;
});
XRenderer.prototype.__construct=(function(){    
   
    this.blenderShaders = new Array();
    this.__object=new XObject();
    this.meshShader= new AmbientLightShader();
    this.meshShader.setAmbientLight(new BaseLight(new Vector3f(0.1,0.1,0.1),0.2));
     var light=new DirectionLight(new BaseLight(new Vector3f(0.1,0.5,1),0.8), new Vector3f(-1,-1,-1));
     var newShader= new DirectionLightShader(light);
     this.addRendererShader(newShader);
   
});

XRenderer.prototype.addRendererShader=(function(xobject){
    if(xobject!==null && xobject.update){
         this.blenderShaders.push(xobject);
     
 }
});

XRenderer.prototype.onBlender=(function(self){
     for(var i=0; i < self.blenderShaders.length; i++){
     self.getObject().renderAll(self.blenderShaders[i]);
    
    }
});

XRenderer.prototype.render=(function(){
  
  var gl = window.gl;
  RenderUtils.clear(0.2,0.2,0.2,1);
  this.getObject().renderAll(this.meshShader);
  gl.enable(gl.BLEND);
 // gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  gl.blendFunc(gl.ONE, gl.ONE);
  gl.depthMask(false);
  gl.depthFunc(gl.EQUAL);
  this.onBlender(this);
  gl.depthFunc(gl.LESS);
  gl.depthMask(true);
  gl.disable(gl.BLEND);
                
                
                
});