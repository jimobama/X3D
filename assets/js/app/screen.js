/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var Screen = (function(){
   this.position= new Vector2f();
   this.size =new Vector2f(window.screen.width, window.screen.height);
   
    
    
});

Screen.prototype.getSize=(function(){
    
    return this.size;    
});



