/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var Input =(function(display){
    
    var __display;
    this.in__mouse =null;
    this.in__keyboard=null;
    this.in__keys=null;
    this.__call__=(function(self,display){
        
        self.__construct(display);
        
    })(this,display);
    
    
});
 Input.prototype.getMouse=(function(){     
     return  this.in__mouse;
 });
 
 Input.prototype.__construct=(function(display){
     this.in__keys= new Array(254);
     
     this.__display=display;
     for(var i=0; i< 254; i++){
         this.in__keys[i]=false;
     }
     if(this.__display instanceof Display)
     {
          this.in__mouse=this.__display.getMouse();
          this.in__keyboard =this.__display.getKeyboard();
          this.__handle();        
     }
 });
 
 
 
  Input.prototype.__handle=(function()
  {
      var inputTracker =  this.in__keys;
      if( this.in__keyboard instanceof Keyboard)
      { 
          this.in__keyboard.setKeyboardListener((function(action,akey,code,character)
          {
                if(action===Keyboard.KEY_DOWN){
                    inputTracker [akey]=true;
                    
                }else if(action===Keyboard.KEY_UP){
                    inputTracker [akey]=false;
                     
                }
          }));
      }
  });
  Input.prototype.isKeyDown=(function(key){      
       return this.in__keys[key];
  });
