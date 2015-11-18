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
  this.x= this.x  / len;
  this.x = this.y / len;
  this.x = this.x /len;
  this.x = this.x / len;
 return this;    
         
  
});


Quaterion.prototype.conjugate=(function(){
    
 
        this.x=  -this.x;
       this.y = - this.y ;
       this.z = -this.z ;
       this.w = -this.w ;
       return this; 
 
    
});
Quaterion.prototype.mul=(function(scaler){
    
    if(scaler instanceof Quaterion)
    {
         var r= scaler;
          
         this.w= this.w * r.w - this.x * r.x - this.y * r.y - this.z * r.z;
	 this.x = this.x * r.w + this.w * r.x + this.y * r.z - this.z * r.y;
	 this.y = this.y * r.w + this.w * r.y + this.z * r.x - this.x * r.z;
	 this.z = this.z * r.w + this.w * r.z + this.x * r.y - this.y * r.x;
        
    }else if(scaler instanceof Vector3f)
    {
        var r= scaler;
        this.w = -this.x * r.x - this.y * r.y - this.z * r.z;
	this.x = this.w  * r.x + this.y * r.z- this.z * r.y;
	this.y =  this.w * r.y + this.z * r.x - this.x* r.z;
	this.z =  this.w * r.z + this.x * r.y - this.y * r.x;
    }    
    else{
        this.x = this.x * scaler;
        this.y = this.y *scaler;
        this.z = this.z *scaler;
        this.w = this.w *scaler;
    }
        
      
    
    return this;
    
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