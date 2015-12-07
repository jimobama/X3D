/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var Input =(function(){
    this.in__mouse =null;
    this.in__keyboard=null;
    this.in__keys=null;
    this.in_mouse_buttons_down;
    this.__call__=(function(self){
        
        self.__construct();
        
    })(this);
    
    
});

 Input.__instance=null;
 
  Input.getInstance=(function(){
      if( Input.__instance===null)
      {
           Input.__instance= new Input();
      }
      
     return  Input.__instance; 
  });
  
  
 Input.prototype.getMouse=(function(){     
     return  this.in__mouse;
 });
 
 Input.prototype.__construct=(function(){
     this.in__keys= new Array(254);
     this.in_mouse_buttons_down= new Array(254);
     for(var i=0; i< 254; i++){
         this.in__keys[i]=false;
         this.in_mouse_buttons_down[i]=false;
     }
          this.in__mouse=    Display.getInstance().getMouse();
          this.in__keyboard =Display.getInstance().getKeyboard();
          this.__handle();        
     
 });
 
   Input.prototype.isMouseDown=(function(button){
       
       return this.in_mouse_buttons_down[button];
       
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
      
      //handle mouse 
      
      if(this.in__mouse instanceof Mouse)
      {
         
      }
  });
  Input.prototype.isKeyDown=(function(key){      
       return this.in__keys[key];
  });
