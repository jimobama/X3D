/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var XSystem =(function(canvasId){
   
    
    this.__call__=(function(self,canvasId){
        self.__construct(canvasId);
        
    })(this, canvasId);
    
});


XSystem.prototype.__construct =(function(canvasId){
    if(canvasId===null){console.log("Canvas id not found");return ;};
    Display.Id=canvasId;
   
});

XSystem.prototype.getDisplay=(function()
{
     return Display.getInstance();
});

XSystem.prototype.getInput=(function()
{
     return Input.getInstance();
});



