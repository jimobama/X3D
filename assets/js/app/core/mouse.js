


 var Mouse =(function(view){
  
     var  m__view ;
     var m__grap;
     var  m__position;
     var  m_mouse_events;
     var m_mouse_move;
     var  m__isLocked;
  
    
     this.__call__=(function(self,view){         
        self.__construct(view);
        self.__super =this;
        return self;
     })(this,view);
 

  
  
 });
 
 Mouse.prototype.__construct =(function(view){
     
     m__position= new Vector2f();
     m__view =view;
     m_mouse_events=(function(button, action, x,y){}); 
     m_mouse_move=(function(x,y){});
      m__isLocked=false;
      m__grap=false;
     this.__initialMouseEvents();
     
 });
 
  Mouse.prototype.getGrap=(function(){
      return m__grap;
  });
 Mouse.prototype.isGrap=(function(abool){
     m__grap =abool;
  });
  
  
 Mouse.prototype.__initialMouseEvents=(function(){
    
     if(m__view!== null)
     {
         
         //initialised all the mouse listeners
         
          
          
          m__view.addEventListener("mousedown", (function(event){ 
          m_mouse_events(event.button,Mouse.KEY_PRESSED,event.offsetX,event.offsetY);
          
          }));
          
          //mouse move
          m__view.addEventListener("mousemove", (function(event)
          {
                m__position.x=event.offsetX;
                m__position.y=event.offsetY;                
                m_mouse_move(event.offsetX, event.offsetY);
          }));
          
          //mouse up
          
           m__view.addEventListener("mouseup",(function(event)
           { 
               m_mouse_events(event.button,Mouse.KEY_RELEASED, event.offsetX,event.offsetY);
           }));
          
     }
      
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
 Mouse.prototype.setMouseEvent=(function(callback){ 
     m_mouse_events = callback;     
 });
Mouse.prototype.setMouseMove=(function(mouseMove){
    m_mouse_move=mouseMove;    
});

 Mouse.prototype.getPosition=(function(){
     return m__position;
 });
  Mouse.prototype.lock =(function(){
    
       m__view.style.cursor="none";       
       m__isLocked=true;

 });
 
  Mouse.prototype.isLock=(function(){
      
      return  m__isLocked;
  });
     
  
 Mouse.prototype.unlock =(function(){
     
   m__view.style.cursor="default";
   m__isLocked=false;

 });
 