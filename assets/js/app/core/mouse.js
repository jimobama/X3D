


 var Mouse =(function(view){
  
     var __grap;
     var __isLocked;
      this.__call__=(function(self,view){  
        
        self.__construct(view);
     })(this,view);
 

 });
  Mouse.__instance=null;
 Mouse.createInstance=(function(view)
 {
     if(  Mouse.__instance===null)
           Mouse.__instance = new Mouse(view);
    
 });
 Mouse.IsMouseDown=false;
 Mouse.__position= new Vector2f();
 Mouse.prototype.__construct =(function(view){
    
     if(view ===null)return ;
       Mouse.__position= new Vector2f(Display.getInstance().getWidth()/2, Display.getInstance().getHeight()/2);
      __isLocked=false;
      __grap=false;
      
        if(view!== null)
            view.addEventListener("mousedown", (function(event){
             Mouse.IsMouseDown=true;
            
             Mouse.onMouseEvent(event.button,Mouse.KEY_PRESSED,new Vector2f(event.clientX,event.clientY));
          
          }));
          
          //mouse move
        document.addEventListener("mousemove", (function(event)
          {
          
             Mouse.onMouseMoveEvent(new Vector2f(event.clientX,event.clientY));
             
          }));
          
          //mouse up
          
        document.addEventListener("mouseup",(function(event)
           { 
              Mouse.IsMouseDown = false;
             
              Mouse.onMouseEvent(event.button,Mouse.KEY_RELEASED,new Vector2f(event.clientX,event.clientY));
             
           }));
           
           
 
 });

  Mouse.getGrap=(function(){
      return __grap;
  });
 Mouse.isGrap=(function(abool){
    __grap =abool;
  });

  


 Mouse.onMouseEvent=(function(button,action,vec2f){ 
     
       Mouse.__position=vec2f;
 });
Mouse.onMouseMoveEvent=(function(vec2f){
   Mouse.__position=vec2f;
});
Mouse.getPosition=(function(){
      return Mouse.__position;
  });

Mouse.lock =(function(){
    
    Display.getInstance().getView().style.cursor="none";
     document.body.style.cursor="none";
     this.__isLocked=true;

 });
 
 Mouse.isLock=(function(){
      
      return  __isLocked;
  });
     
  
 Mouse.unlock =(function(){
     
  Display.getInstance().getView().style.cursor="default";
  document.body.style.cursor="default";
  __isLocked=false;

 });
  
 Mouse.BUTTON1 = 0;
 Mouse.BUTTON2 = 1;
 Mouse.BUTTON3 = 2;
 Mouse.BUTTON4 = 3;
 Mouse.BUTTON5 = 4;
 Mouse.COUNT   = 5;
  Mouse.KEY_NONE=-1;
  Mouse.KEY_RELEASED =0;
 Mouse.KEY_PRESSED   = 1;