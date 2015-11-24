/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var Component =(function(shader){
    
    this.components;
    this.shader=null;
    this.__call__=(function(self,shader){        
        self.__construct(shader);
    })(this,shader);
});

Component.prototype.__construct=(function(shader){    
    this.components= new Array(); 
    this.shader=(shader instanceof Shader)?shader:(null);
});
Component.prototype.setShader=(function(shader){
     if(shader instanceof Shader) 
            this.shader=shader;
    
});
Component.prototype.addComponent=(function(component){
    if(component instanceof Component)
    {
        component.setShader(this.shader);
        this.components.push(component);
    }
});
Component.prototype.drawComponents=(function(){  
    if(this.shader===null) return ;
    for(var i=0; i <  this.components.length; i++)
    {  //draw each component on its own thread
        var comp = this.components[i];
       
    }
});

Component.prototype.draw=(function(){  
    this.drawComponents();
});