/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var XController=(function(canvasid,width,height){ 
     var ___instance =null;
     this.__renderer =null;
     this.__xsystem;
     this.__camera;
     this.__call__= (function(self,canvasId,width,height){ 
       self.__construct(canvasId,width,height);
     })(this,canvasid,width,height);     
});

XController.createInstance =(function(canvasId, width, height){
  ___instance = new XController(canvasId, width, height);
  return ___instance;
});
XController.getInstance=(function(){    
    if(___instance===null){
       ___instance= new   XController();
    }
    return ___instance;
});

XController.prototype.__construct=(function(canvasid,w,h){
     this.__xsystem= new XSystem(canvasid);
     this.__camera= new Camera();
     this.renderer= new XRenderer(this);
     this.getCamera().setInput(this.getSystem().getInput());
     this.getSystem().getDisplay().resize(new Vector2f(w,h));
     RenderUtils.initialize(this.getSystem().getDisplay().getContext());  
     RenderUtils.clear(this.getSystem().getDisplay().getContext(),0,0,0,1);
     
});




XController.prototype.getSystem=(function(){
    return this.__xsystem;
    
});

XController.prototype.getRenderer=(function()
{
    return this.renderer;
});

XController.prototype.getCamera=(function(){
    return  this.__camera;
});

