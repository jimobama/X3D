


 var Mouse =(function(view){
     var __lastPosition;
     var __button__press;
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
    __button__press=new Array();
     if(view ===null)return ;
       Mouse.__position= new Vector2f(Display.getInstance().getWidth()/2, Display.getInstance().getHeight()/2);
      __isLocked=false;
        var  xCenter=Display.getInstance().getWidth()/2;
        var  yCenter=Display.getInstance().getHeight()/2;
      __lastPosition=new Vector2f( xCenter, yCenter);
      __grap=false;
      
        if(view!== null)
            view.addEventListener("mousedown", (function(event){
             Mouse.IsMouseDown=true;
             Mouse.onMouseEvent(event.button,Mouse.KEY_PRESSED,new Vector2f(event.clientX,event.clientY));
          
          }));
          
          //mouse move
        document.addEventListener("mousemove", (function(event)
          {
             Mouse.isGrap(Mouse.IsMouseDown);
             Mouse.onMouseMoveEvent(new Vector2f(event.clientX,event.clientY));
             
          }));
          //mouse up
        document.addEventListener("mouseup",(function(event)
           { 
              Mouse.IsMouseDown = false;
              Mouse.isGrap(Mouse.IsMouseDown);
              Mouse.onMouseEvent(event.button,Mouse.KEY_RELEASED,new Vector2f(event.clientX,event.clientY));
             
           }));
           
      //adding the event listerner for Mozilla
    if(window.addEventListener)
        document.addEventListener('DOMMouseScroll', Mouse.onWheelScrollEvent, false);
    else   //for IE/OPERA etc
      document.onmousewheel =  Mouse.onWheelScroll;        
 
 });
   Mouse.setLastPosition=(function(pos){  
       if(pos instanceof Vector2f)
       __lastPosition=pos;
  });
  Mouse.getLastPosition=(function(){      
      return __lastPosition;
  });
  Mouse.getGrap=(function(){
      return __grap;
  });
 Mouse.isGrap=(function(abool){
    __grap =abool;
  });

Mouse.onWheelScrollEvent=(function(event){
 
   event =(!event)?window.event:event; 
  var delta =(!event.wheelDelta)?(-event.detail/2):(event.wheelDelta/60);
  
  if( delta>0){
       delta=1;
  }else{
       delta=-1;
  }
 Mouse.onWheelScroll(delta);
});
 Mouse.onWheelScroll=(function(offset){
   
 });

 Mouse.isKeyPress=(function(button)
 {
   return   __button__press[button];
 });

 Mouse.onMouseEvent=(function(button,action,vec2f){      
       Mouse.__position=vec2f;
       if(action===Mouse.KEY_PRESSED)
        __button__press[button]=true;
      else if(action===Mouse.KEY_RELEASED)
         __button__press[button]=false;
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