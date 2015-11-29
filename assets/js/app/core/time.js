/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var Time = (function(){
   var __delta = 0.0;  
    
    
});

Time.getTime=(function(){
    
     var currentTime =  Date.now();
     return currentTime;    
});
Time.setDelta=(function(delta)
{
    
     __delta = delta;
     
     
});


Time.getDelta=(function()
{
    
     return __delta;
     
     
});

