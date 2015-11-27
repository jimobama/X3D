/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var Scene=(function(canvasid){
     this.__display;
     this.__input;
     this.__camera;
     this.__canvasID;
     
     this.__call__= (function(self,canvasId){
         
         self.__construct(canvasId);
     })(this,canvasid);
     
});
Object.__extends__(Scene,XObject);

Scene.prototype.__construct=(function(canvasId){
   
     this.__input = new Input(this.__display);
     this.__camera= new Camera();
     this.__canvasID=canvasId;
     this.__display = new Display(this.__canvasID);
});


Scene.prototype.render=(function(){
 
});
