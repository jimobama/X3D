


 var Mouse =(function(view){
  
     __view =view;
     __position= new Vector2f();
     __callbacks =new Array();
     __callbacks[Mouse.Events.ON_MOUSE_MOVE]=null;
     __callbacks[Mouse.Events.ON_MOUSE_LEAVE]=null;
     __callbacks[Mouse.Events.ON_MOUSE_ENTER]=null;
     __IsLocked=false;
    __IsDocumentLocked=false;
     this.IsLocked=false; 
     this.IsMouseEnter=false;
     
 
 });
 Mouse.Events=(function(){
     
     
 });
 Mouse.Events.ON_MOUSE_MOVE=0;
 Mouse.Events.ON_MOUSE_LEAVE=1;

      
 Mouse.BUTTON1 = 0;
 Mouse.BUTTON2 = 1;
 Mouse.BUTTON3 = 2;
 Mouse.BUTTON4 = 3;
 Mouse.BUTTON5 = 4;
 Mouse.COUNT   = 5;

 Mouse.prototype.onMouseDown =(function(Callback){     
       __view.addEventListener("mousedown",(function(event){
     
       var button= event.button;
       __position=new Vector2f(event.offsetX,event.offsetY);
        if(Callback)
        {
           Callback(button,__position) ;
        }else{
            console.log("@onMouseDown: Peremeter must be an function with this signature mouseDown(button ,Vector2f vec2f);");
        }
      }));
     
 });
 
 Mouse.prototype.getPosition=(function(){
     return __position;
 });
 
  Mouse.prototype.onMouseUp =(function(Callback){     
       __view.addEventListener("mouseup",(function(event){
       var button= event.button;
       __position=new Vector2f(event.offsetX,event.offsetY);
        if(Callback)
        {
            Callback(button);
        }else{
            console.log("@onMouseUp: Peremeter must be an function with this signature mouseDown(button , Vector2f vec2f);");
        }
      }),false);
     
 });
 
Mouse.prototype.onMouseMove =(function(Callback){ 
    
    
      __callbacks[Mouse.Events.ON_MOUSE_MOVE]=Callback;
     if(!__IsDocumentLocked){        
        __view.addEventListener("mousemove",this.__mouseLockEvent);
       }
      
     
 });
 
 
   Mouse.prototype.onMouseEnter =(function(Callback){ 
       __callbacks[Mouse.Events.ON_MOUSE_ENTER]=Callback;
       // document.removeEventListener("mousemove",this.documentLock,false);
        
      __view.addEventListener("mouseenter",(function(event){
           if(!this.IsMouseEnter)
           {
               //remove document events
           
           }
          var button= event.button;
         __position=new Vector2f(event.offsetX,event.offsetY);
        if(Callback)
        {
            Callback(__position);
        }else{
            console.log("@onMouseEnter: Peremeter must be an function with this signature mouseEnter(Vector2f vec2f);");
        }
      }),false);
     
 });
 
 
Mouse.prototype.onMouseLeave =(function(Callback){  
       __callbacks[Mouse.Events.ON_MOUSE_LEAVE]=Callback;
       __view.addEventListener("mouseleave",(function(event)
       {
       __position=new Vector2f(event.offsetX,event.offsetY);
        if(Callback)
        {
            Callback(__position);
        }else{
            console.log("@onMouseEnter: Peremeter must be an function with this signature mouseEnter(Vector2f vec2f);");
        }
      }),false);
     
 });

 Mouse.prototype.lock =(function(){
     
   __view.requestPointerLock =__view.requestPointerLock ||
                             __view.mozRequestPointerLock ||
                            __view.webkitRequestPointerLock;
 
    __view.requestPointerLock();
    document.addEventListener('pointerlockchange', this.__lockAlert, false);
    document.addEventListener('mozpointerlockchange', this.__lockAlert, false);
    document.addEventListener('webkitpointerlockchange',this.__lockAlert, false);
    this.IsLocked=true;
 
  
 });

  Mouse.prototype.__lockAlert=(function(){
  
      if(document.pointerLockElement === __view ||
        document.mozPointerLockElement === __view||
        document.webkitPointerLockElement === __view) {
       //locked
       __view.removeEventListener("mousemove",this.__mouseLockEvent);
        document.addEventListener("mouseove",this.__mouseLockEvent,false);
        __IsDocumentLocked=true;
       
      } else {
      //unlocked
        __view.addEventListener("mousemove",this.__mouseLockEvent);
       // document.removeEventListener("mouseove",__mouseLockEvent,false);
         document.removeEventListener("mouseove",this.__mouseLockEvent,false);
          __IsDocumentLocked=false;
          
     }  
      
      
  });
 
 
 Mouse.prototype.__mouseLockEvent=(function(e){
 
   if( __IsDocumentLocked){
   __position.x += e.movementX ||
                  e.mozMovementX ||
                  e.webkitMovementX ||
                  0;

  __position.y +=  e.movementY ||
                  e.mozMovementY ||
                  e.webkitMovementY  ||
                  0;
   }else{
       
    __position=new Vector2f(e.offsetX,e.offsetY);
       
   }    
          
   if(__callbacks[Mouse.Events.ON_MOUSE_MOVE]!==null)  
   {
     
       //console.log(__position);
       __callbacks[Mouse.Events.ON_MOUSE_MOVE](__position);
   }

 });
   
 
  Mouse.prototype.unlock =(function(){
     
  document.exitPointerLock =document.exitPointerLock   ||
                            document.mozExitPointerLock ||
                            document.webkitExitPointerLock;
    
   document.exitPointerLock();
   this.IsLocked=false;

 });
 
