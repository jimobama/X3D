/* 
The Xrender is the rendering engine that takes a scene graphics and render all its components nodes
 */


var XObject =(function(){
   this.__nodes;//nodes to another objects
   this.__components;//its components
   this.__xcontroller;
   
    this.__call__=(function(self){        
        self.__construct();        
    })(this);
    
});
Object.__extends__(XObject, XDrawable);

XObject.prototype.__construct=(function()
{
    //initialised the construct of the parents
     XDrawable.prototype.__construct();
     this.__nodes= new Array();
     this.__components=new Array();
     this.setTransform(new Transform3D(new Vector3f(0,0,0)));
     this.__xcontroller=null;
});
XObject.prototype.setController=(function(controller){
     this.__xcontroller= (controller instanceof XController)?controller:this.__xcontroller;
   
});

XObject.prototype.getController=(function(){
    return this.__xcontroller;
});


XObject.prototype.addObject=(function(node){
    
    if(node instanceof XObject)
    {
         node.setController(this.getController());
         node.setParent(this);
         this.__nodes.push(node);
         
    }
});


XObject.prototype.addComponent=(function(comp){
    
    if(comp instanceof XDrawable)
    {  
       
       comp.setParent(this);
       this.__components.push(comp);
    }
});

XObject.prototype.update=(function(elapseTime)
{
     
    for(var i=0; i <  this.__components.length;i++)
    {
        var comp =  this.__components[i];
        comp.update(elapseTime);
    }
    
});
XObject.prototype.input=(function()
{
   for(var i=0; i <  this.__components.length;i++)
    {
        var comp =  this.__components[i];
        comp.input();
    }
 
    
});

XObject.prototype.render=(function()
{   
   
    if(this.getController() ===null) return;
    
    for(var i=0; i <  this.__components.length;i++)
    {     
      
        var comp =  this.__components[i];
        if(comp.getShader()===null){
            comp.setShader(this.getShader());
             
        }
        if(comp.getShader()===null) continue;
     
        comp.render();
    } 
});

XObject.prototype.inputAll=(function(){
    
    this.input();
    for(var i=0; i < this.__nodes.length;i++)
    {
        var obj = this.__nodes[i];
         //set the parent shader if an object did not have a shader 
        obj.inputAll();
    }
 
});

XObject.prototype.updateAll=(function(timeframe){
   
   this.update(timeframe);
   for(var i=0; i < this.__nodes.length;i++)
    {
          
        var obj = this.__nodes[i];
        obj.updateAll(timeframe);
    }
});

XObject.prototype.renderAll=(function(){
 
  this.render();//render the its components
 
  for(var i=0; i < this.__nodes.length;i++)
    { 
      
        var obj = this.__nodes[i];       
        obj.setController(this.getController());
        if(!obj.hasShader()){
            obj.setShader(this.getShader());
        }
        obj.renderAll();
        
    }
});