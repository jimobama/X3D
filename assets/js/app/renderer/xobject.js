/* 
The Xrender is the rendering engine that takes a scene graphics and render all its components nodes
 */


var XObject =(function(){
   this.__nodes;//nodes to another objects
   this.__components;//its components
   this.__transform ;
   this.__parentObject =null;
    
    this.__call__=(function(self){        
        self.__construct();        
    })(this);
    
});
XObject.prototype.__construct=(function()
{
        
     this.__nodes= new Array();
     this.__components=new Array();
     this.__transform= new Transform3D(new Vector3f(0,0,-3));
     this.__parentObject= null;
      
});

XObject.prototype.setParent=(function(parent){
    
   
    this.__parentObject =(parent instanceof XObject)?parent:null;
    
    
});

XObject.prototype.setTransformation=(function(transform){
    
    this.__transform=(transform instanceof Transform3D)?transform:null;    

   
});

XObject.prototype.getTransformation=(function(){   
    
     return this.__transform;
    
});

XObject.prototype.transformAllChildren=(function(){
    
        
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
       this.__components.push(comp);
    }
});

XObject.prototype.updateComponents=(function(elapseTime)
{
     
    for(var i=0; i <  this.__components.length;i++)
    {
      
        var comp =  this.__components[i];
        comp.update(elapseTime,this.__transform);
    }
    
});
XObject.prototype.inputComponents=(function()
{
   for(var i=0; i <  this.__components.length;i++)
    {
        var comp =  this.__components[i];
        comp.input(this.__transform);
    }
 
    
});

XObject.prototype.renderComponents=(function()
{
    for(var i=0; i <  this.__components.length;i++)
    {        
        var comp =  this.__components[i];
        comp.render(this.__transform);
       
    } 
});

XObject.prototype.input=(function(){
    
    this.inputComponents();
    for(var i=0; i < this.__nodes.length;i++)
    {
        var comp = this.__nodes[i];
        comp.input();
    }
 
});

XObject.prototype.update=(function(timeframe){
   
    this.updateComponents(timeframe);
   for(var i=0; i < this.__nodes.length;i++)
    {
        var comp = this.__nodes[i];
        comp.update(timeframe);
    }
});

XObject.prototype.render=(function(){
   
  this.renderComponents();//render the its components
  for(var i=0; i < this.__nodes.length;i++)
    { 
        var comp = this.__nodes[i];
        comp.render();
    }
});