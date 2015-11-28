/* 
The Xrender is the rendering engine that takes a scene graphics and render all its components nodes
 */


var XObject =(function(){
   this.__nodes;//nodes to another objects
   this.__components;//its components
   this.__shader;
    this.__call__=(function(self){        
        self.__construct();        
    })(this);
    
});
Object.__extends__(XObject, XComponent);

XObject.prototype.__construct=(function()
{
    //initialised the construct of the parents
     XComponent.prototype.__construct();
     this.__nodes= new Array();
     this.__components=new Array();
     this.__shader= null;
});

XObject.prototype.setShader=(function(shader){
    this.__shader =(shader instanceof Shader)?shader:null;
    
});

XObject.prototype.getShader=(function(){
    return this.__shader ;
});
XObject.prototype.addObject=(function(node){
    
    if(node instanceof XObject)
    {
       
         node.setParent(this);
         this.__nodes.push(node);
    }
});



XObject.prototype.addComponent=(function(comp){
    
    if(comp instanceof XComponent)
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
    for(var i=0; i <  this.__components.length;i++)
    {     
        var comp =  this.__components[i];
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
        if(obj.getShader()===null){
            obj.setShader(this.getShader());
        }
        obj.renderAll();
        
    }
});