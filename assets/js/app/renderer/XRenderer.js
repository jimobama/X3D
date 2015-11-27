/* 
 This is the render engine and should be able to have just one method render
 */


var XRenderer =(function(object){
   this.__rootObject =object;
   this.__call__=(function(self,object){       
       self.__construct(object);
   })(this, object);
    
});
XRenderer.prototype.__construct=(function(xobject){    
    this.__object=xobject;  
    
    
});
XRenderer.prototype.render=(function(){
   if( this.__object instanceof XObject)
   {
       
       this.__rootObject.render();
   }
    
});