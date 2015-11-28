/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var XSystem =(function(canvasId){
    
    this.__input;
    this.__display;
    
    this.__call__=(function(self,canvasId){
        self.__construct(canvasId);
        
    })(this, canvasId);
    
});


XSystem.prototype.__construct =(function(canvasId){
    if(canvasId===null){console.log("Canvas id not found");return ;};
    this.__display = new Display(canvasId);
    this.__display.initialGL();
    this.__input = new Input(this.__display);
   
});

XSystem.prototype.getDisplay=(function()
{
     return this.__display;
});

XSystem.prototype.getInput=(function()
{
     return this.__input;
});



