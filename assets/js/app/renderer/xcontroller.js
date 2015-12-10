/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var XController=(function(canvasid,width,height){ 
   
     
     this.__xsystem;
     this.__camera;
     this.__call__= (function(self,canvasId,width,height){ 
       self.__construct(canvasId,width,height);
     })(this,canvasid,width,height);     
});
XController.___instance=null;
XController.createInstance =(function(canvasId, width, height){
    
    if(XController.___instance ===null){
        
         XController.___instance = new XController(canvasId, width, height);
     }
    
  return XController.___instance;
});
XController.getInstance=(function(){    
    if(XController.___instance===null){
       XController.___instance= new   XController();
    }
    return XController.___instance;
});

XController.prototype.__construct=(function(canvasid,w,h){
     this.__xsystem= new XSystem(canvasid);
     this.__camera= new Camera();
   
  
     Display.getInstance().resize(new Vector2f(w,h));
     RenderUtils.initialize();  
     RenderUtils.clear(0,0,0,1);
     XRenderer.getInstance(this);
   
    
});




XController.prototype.getSystem=(function(){
    return this.__xsystem;
    
});

XController.prototype.getRenderer=(function()
{
    return  XRenderer.getInstance() ;
});

XController.prototype.getCamera=(function(){
    return  this.__camera;
});

