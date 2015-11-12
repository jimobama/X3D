/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var Quaterion=(function(x,y,z,w){
    this.x=x;
    this.y=y;
    this.z=z;
    this.w=w;
    
});

Quaterion.prototype.add=(function(quat){
    
    if(quat instanceof Quaterion)
    {
        var x= this.x + quat.x;
        var y = this.y + quat.y;
        var z = this.z + quat.z;
        var w = this.w + quat.w;
        return new Quaterion(x,y,z,w);    
         
    }
    return new Quaterion();
    
});
Quaterion.prototype.toString=(function(){
    
    return  "x= "+this.x+",y= "+this.y+",z= "+this.z+",w= "+this.w;
    
});