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

Quaterion.prototype.length=(function(){    
    return (Math.sqrt(this.x*this.x + this.y *this.y + this.z *this.z + this.w *this.w));
    
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

Quaterion.prototype.normalize=(function(){
     
   var len= this.length();
   var x= this.x  / len;
   var y = this.y / len;
   var z = this.x /len;
   var w = this.x / len;
  return new Quaterion(x,y,z,w);    
         
  
});


Quaterion.prototype.conjugate=(function(){
  return new Quaterion(- this.x,-this.y,-this.z,-this.w); 
});
Quaterion.prototype.mul=(function(scaler){
    
    var x,y,z,w;
    
    if(scaler instanceof Quaterion)
    {
         var r= scaler;
          
         w= this.w * r.w - this.x * r.x - this.y * r.y - this.z * r.z;
	 x = this.x * r.w + this.w * r.x + this.y * r.z - this.z * r.y;
	 y = this.y * r.w + this.w * r.y + this.z * r.x - this.x * r.z;
	 z = this.z * r.w + this.w * r.z + this.x * r.y - this.y * r.x;
        
    }else if(scaler instanceof Vector3f)
    {
        var r= scaler;
        w = -this.x * r.x - this.y * r.y - this.z * r.z;
	x = this.w  * r.x + this.y * r.z- this.z * r.y;
	y =  this.w * r.y + this.z * r.x - this.x* r.z;
	z =  this.w * r.z + this.x * r.y - this.y * r.x;
    }    
    else{
        x = this.x * scaler;
        y = this.y *scaler;
        z= this.z *scaler;
       w = this.w *scaler;
    }
       
    
    return new Quaterion(x,y,z,w);
    
});

Quaterion.prototype.dot=(function(quat){
     if(quat instanceof Quaterion)
    {
     var r=quat;
     return this.x * r.x + this.y * r.y + this.z * r.z+ this.w * r.w;
    } 
    return null;

});
Quaterion.prototype.inverse=(function(quat){
    
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