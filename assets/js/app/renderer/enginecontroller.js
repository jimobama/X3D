/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var EngineController=(function(canvasid,width,height){ 
     var ___instance =null;
     this.renderer =null;
     this.__isRunning=false;
     this.__display;
     this.__input;
     this.__maincamera;
     this.__call__= (function(self,canvasId,width,height){ 
       self.__construct(canvasId,width,height);
     })(this,canvasid,width,height);     
});

EngineController.createInstance =(function(canvasId, width, height){
  ___instance = new EngineController(canvasId, width, height);
  return ___instance;
});
EngineController.getInstance=(function(){    
    if(___instance===null){
       ___instance= new   EngineController();
    }
    return ___instance;
});

EngineController.prototype.__construct=(function(canvasid,w,h){
     this.__canvasID=canvasid;
      this.__isRunning=false;
     if(this.__canvasID===null){console.log("Could'nt create canvas object invalid canvas id");return ;};
     this.__display = new Display(this.__canvasID);
     this.__display.initialGL();
     this.__input = new Input(this.__display);     
     this.__maincamera= new Camera();
     this.__maincamera.setInput(this.__input);
     this.renderer= new XRenderer(this);
     this.__display.resize(new Vector2f(w,h));
     RenderUtils.initialize(this.__display.getContext());  
     RenderUtils.clear(this.__display.getContext(),0,0,0,1);
     
});






EngineController.prototype.getRenderer=(function()
{
    return this.renderer;
});


EngineController.prototype.getDisplay=(function(){
    return this.__display;
});

EngineController.prototype.getCamera=(function(){
    return this.__maincamera;
});

EngineController.prototype.getInput=(function(){
    return this.__input;
});
