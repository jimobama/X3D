/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var Keyboard=(function(view){
    
    var k__view ;
    var k_onkeyListener;
    this.__call__=(function(self, view){        
        self.__construct(view);
    })(this,view);
    
});

Keyboard.KEY_DOWN=0;
Keyboard.KEY_UP=1;

Keyboard.prototype.__construct=(function(view)
{

    k__view=view;
    k_onkeyListener =(function(action,key,code,character){});
    
    if( k__view !==null)
    {   
         window.addEventListener("keydown",(function(event){
                var charCode = event.charCode || event.keyCode ;
                var character= String.fromCharCode(charCode); 
                var key=    character.toUpperCase().charCodeAt();
                k_onkeyListener(Keyboard.KEY_DOWN, key,charCode,character);
         }));
         
          window.addEventListener("keyup",(function(event){          
              //var key=  event.which || event.keyCode ; 
                var charCode = event.charCode || event.keyCode ;
                var character= String.fromCharCode(charCode); 
                var key=    character.toUpperCase().charCodeAt();
                k_onkeyListener(Keyboard.KEY_UP, key,charCode,character);
          }));
    }
    
});

Keyboard.prototype.setKeyboardListener =(function(callBack){
    
   k_onkeyListener= callBack;
    
});

Keyboard.Keys=(function(){
    
    this.NUM_0=0x0000;
    this.K_1 = 49;
    
 });
 Keyboard.Keys.K_TAB   = 9;
 Keyboard.Keys.K_ENTER = 13;
 //num keys
Keyboard.Keys.K_NUM1 = 35;
Keyboard.Keys.K_NUM2 = 40;
Keyboard.Keys.K_NUM3 = 34;
Keyboard.Keys.K_NUM4 = 37;
Keyboard.Keys.K_NUM5 =12;
Keyboard.Keys.K_NUM6 = 39;
Keyboard.Keys.K_NUM7 = 36;
Keyboard.Keys.K_NUM8 = 38;
Keyboard.Keys.K_NUM9 = 33;


Keyboard.Keys.K_1 = 49;
Keyboard.Keys.K_2 = 50;
Keyboard.Keys.K_3 = 51;
Keyboard.Keys.K_4 = 52;
Keyboard.Keys.K_5 = 53;
Keyboard.Keys.K_6 = 54;
Keyboard.Keys.K_7 = 55;
Keyboard.Keys.K_8 = 56;
Keyboard.Keys.K_9 = 57;
Keyboard.Keys.K_0 = 48;
Keyboard.Keys.K_A = 65;
Keyboard.Keys.K_B = 66;
Keyboard.Keys.K_C = 67;
Keyboard.Keys.K_D = 68; 
Keyboard.Keys.K_E = 69;
Keyboard.Keys.K_F = 70;
Keyboard.Keys.K_G = 71; 
Keyboard.Keys.K_H = 72;
Keyboard.Keys.K_I = 73;
Keyboard.Keys.K_J = 74;
Keyboard.Keys.K_K = 75;
Keyboard.Keys.K_L = 76;
Keyboard.Keys.K_M = 77;
Keyboard.Keys.K_N = 78;
Keyboard.Keys.K_O = 79;
Keyboard.Keys.K_P = 80;
Keyboard.Keys.K_Q = 81;
Keyboard.Keys.K_R = 82;
Keyboard.Keys.K_S = 83;
Keyboard.Keys.K_T = 84;
Keyboard.Keys.K_U = 85;
Keyboard.Keys.K_V = 86;
Keyboard.Keys.K_W = 87;
Keyboard.Keys.K_X = 88;
Keyboard.Keys.K_Y = 89;
Keyboard.Keys.K_Z = 90;



//The Array keys
Keyboard.Keys.ARROW_UP     = 38;
Keyboard.Keys.ARROW_RIGHT  = 39;
Keyboard.Keys.ARROW_DOWN   = 40;
Keyboard.Keys.ARROW_LEFT   = 37;



//SPECIAL CHARACTERS
Keyboard.Keys.K_QUOTE = 39;
Keyboard.Keys.K_SEMI_COLON = 59;
Keyboard.Keys.K_HASH = 35;
Keyboard.Keys.K_FORWARD_SLASH = 47;
Keyboard.Keys.K_COLON = 58;
Keyboard.Keys.K_AT = 64;
Keyboard.Keys.K_WAVE = 126;
Keyboard.Keys.K_GREATER_THAN = 62;
Keyboard.Keys.K_LESS_THAN = 60;
Keyboard.Keys.K_QUESTION= 63;
Keyboard.Keys.K_OPEN_BRACE = 123;
Keyboard.Keys.K_OPEN_BRACKET = 91;
Keyboard.Keys.K_CLOSE_BRACE = 125;
Keyboard.Keys.K_CLOSE_BRACKET = 93;
Keyboard.Keys.K_AND = 124;
Keyboard.Keys.K_BACKWARD_SLASH= 92;
