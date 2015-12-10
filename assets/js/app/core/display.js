


var Display =(function(view){  
    
   
    this.__call__=(function(self, canvasId){        
        self.__construct(canvasId);
    })(this,view);
  
});
Display.view=null;
Display.__instance=null;
Display.getInstance=(function(){
    
    if(Display.__instance===null){
       Display.createInstance(Display.view);
    }
  return Display.__instance;
    
});

Display.createInstance=(function(view){

    if(Display.__instance===null && view !==null){            
        Display.view=view;
        Display.__instance=new Display(view);        
    }
  
});




Display.prototype.__construct=(function(view){
  
    if(view===null)return ;
        Display.view=view;
     
    this.__createContext();
    
  
   this.setViewPort(this.getView().width,this.getView().height);
});

Display.prototype.getContext=(function(){
    
    return  window.gl;
});


Display.prototype.getView=(function(){
    return Display.view;    
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
      if(view===0)return 0.0;
      return view.height;
     
 });
 
  Display.prototype.getWidth=(function(){
     
      var view = this.getView();  
      
      if(view===0)return 0.0;
      return view.width;
     
 });
 Display.gl=null;
 Display.prototype.__createContext=function(){
     var view = this.getView();
     
     if(view !=null){
            try {
                
              // Try to grab the standard context. If it fails, fallback to experimental.
            window.gl = view.getContext("webgl") || view.getContext("experimental-webgl");
            Display.gl=  window.gl;
            }
            catch(e) {}

            // If we don't have a GL context, give up now
            if (! window.gl) {
              console.log("Unable to initialize WebGL. Your browser may not support it.");
             window.gl = null;
            }
  
     } 
      return this;
 };
 



