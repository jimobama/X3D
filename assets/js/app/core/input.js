/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var Input =(function(display){
    
    var __display;
    in__mouse =null;
    in__keyboard=null;
    var in__keys;
    this.__call__=(function(self,display){
        
        self.__construct(display);
        
    })(this,display);
    
    
});

 Input.prototype.__construct=(function(display){
     
     __display=display;
     in__keys= new Array(254);
     for(var i=0; i< 254; i++){
         in__keys[i]=false;
     }
     if(__display instanceof Display)
     {
         in__mouse=__display.getMouse();
          in__keyboard =__display.getKeyboard();
          this.__handle();
        
     }
 });
  Input.prototype.__handle=(function()
  {
      if( in__keyboard instanceof Keyboard)
      { 
          in__keyboard.setKeyboardListener((function(action,akey,code,character)
          {
                if(action===Keyboard.KEY_DOWN){
                    in__keys[akey]=true;
                    
                }else if(action===Keyboard.KEY_UP){
                     in__keys[akey]=false;
                     
                }
          }));
      }
  });
  Input.prototype.isKeyDown=(function(key){      
       return in__keys[key];
  });
