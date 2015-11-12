


var Display =(function(canvasID){  
    
    this.__id=canvasID;
    var __view=null;
    var __gl=null;
    var __lasttime=0;
    var  __mouse;
    var __keyboard;
  
});

Display.prototype.getContext=(function(){
    
    return __gl;
});

Display.prototype.getId=(function(){
    
    return this.__id;
    
});
Display.prototype.getView=(function(){
    return __view;    
});
 Display.prototype.getKeyboard=(function(){
    
    return __keyboard;
});

Display.prototype.getMouse=(function(){
  return   __mouse;
});


Display.prototype.initialGL=(function(){
   __view= document.getElementById(this.getId()); 
   this.createContext();
    __mouse = new  Mouse(this.getView());
   __keyboard= new Keyboard(this.getView());
   this.setViewPort(this.getView().width,this.getView().height);  
   
 
   return this;
   
});

Display.prototype.setViewPort=function(width, height)
{
    var gl = this.getContext(); 
    gl.viewport(0,0,width, height);
    return this;   
};
 Display.prototype.resize=(function(width, height){
      var view = this.getView();
      if(view !==null)
      {
         
           var gl = this.getContext(); 
           if(width instanceof Vector2f)
           {
              view.height=  width.y;
              view.width=width.x;
           }else{
             view.width=width;
             view.height=height;
           }
         
          gl.viewport(0,0, view.width, view.height);
      }
     
     
 });
 
 
 Display.prototype.getHeight=(function(){
     
      var view = this.getView();      
      return view.height;
     
 });
 
  Display.prototype.getWidth=(function(){
     
      var view = this.getView();      
      return view.width;
     
 });

 Display.prototype.createContext=function(){

     var view = this.getView();
    
     if(view !=null){
        
            try {
                
              // Try to grab the standard context. If it fails, fallback to experimental.
             __gl = view.getContext("webgl") || view.getContext("experimental-webgl");
            
            }
            catch(e) {}

            // If we don't have a GL context, give up now
            if (!__gl) {
              alert("Unable to initialize WebGL. Your browser may not support it.");
            __gl = null;
            }
  
     } 
     
      return this;
 };
 


Display.prototype.update=(function(onrender){
   __lasttime=  Date.now();
   __renderCallBack=onrender;
   setInterval(this.drawUpdate,15);
  
});

Display.prototype.drawUpdate=(function(){
    
     var currentTime =  Date.now();
     var delta = currentTime - __lasttime;
     __lasttime = currentTime;
       //the on render method have the current elapse time
       if( __mouse.IsLocked){
            __view.style.cursor="none";
       }else{
           __view.style.cursor="default";
       }
       
       if(__renderCallBack){
        __renderCallBack(delta); 
       }
    
    
});


