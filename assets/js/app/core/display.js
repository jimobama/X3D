


var Display =(function(canvasID){  
    
    
    this.__view;
    this.__gl;
    this.__mouse;
    this.__keyboard;
    this.__call__=(function(self, canvasId){        
        self.__construct(canvasId);
    })(this,canvasID);
  
});
Display.prototype.__construct=(function(canvasId){
    
    this.__view=null;
    this.__gl=null;
    this.__mouse=null;
    this.__keyboard=null;
    
   this.__view= document.getElementById(canvasId); 
   if(this.__view ===null)return ;
   this.__createContext();
   this.__mouse = new  Mouse(this.getView());
   this.__keyboard= new Keyboard(this.getView());
   this.setViewPort(this.getView().width,this.getView().height);
});

Display.prototype.getContext=(function(){
    
    return this.__gl;
});


Display.prototype.getView=(function(){
    return this.__view;    
});
 Display.prototype.getKeyboard=(function(){
    
    return this.__keyboard;
});

Display.prototype.getMouse=(function(){
  return   this.__mouse;
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

 Display.prototype.__createContext=function(){
     var view = this.getView();
     if(view !=null){
            try {
                
              // Try to grab the standard context. If it fails, fallback to experimental.
             this.__gl = view.getContext("webgl") || view.getContext("experimental-webgl");
            
            }
            catch(e) {}

            // If we don't have a GL context, give up now
            if (!this.__gl) {
              console.log("Unable to initialize WebGL. Your browser may not support it.");
            this.__gl = null;
            }
  
     } 
      return this;
 };
 



