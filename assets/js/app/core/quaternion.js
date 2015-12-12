/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var Quaternion=(function(x,y,z,w){
    this.x;
    this.y;
    this.z;
    this.w;
    this.__call__=(function(self,x,y,z,w){
        self.__construct(x,y,z,w);
    })(this,x,y,z,w);
    
});
Quaternion.prototype.__construct=(function(x,y,z,w){   
     if(x instanceof Vector2f){
        this.x=x.x;
        this.y=x.y;
        this.z= (typeof y !== 'undefined')?y:0; ;
        this.w =(typeof z !== 'undefined')?z:0; 
    }
    else if(x instanceof Vector3f){
        this.x=x.x;
        this.y=x.y;
        this.z=x.z;
        this.w = (typeof y !== 'undefined')?y:0; 
    }else{
    this.x=(typeof x !== 'undefined')?x:0;;
    this.y=(typeof y !== 'undefined')?y:0;;
    this.z=(typeof z !== 'undefined')?z:0;;
    this.w=(typeof w !== 'undefined')?w:0;;
  }
    
});


Quaternion.prototype.norm=(function(){    
    return (Math.sqrt(this.x*this.x + this.y *this.y + this.z *this.z + this.w *this.w));
    
});

Quaternion.prototype.add=(function(quat){
    
    if(quat instanceof Quaternion)
    {
        var x=  this.x + quat.x;
        var y = this.y + quat.y;
        var z = this.z + quat.z;
        var w = this.w + quat.w;
        return new Quaternion(x,y,z,w);    
         
    }
    return new Quaterion();
    
});

Quaternion.prototype.versor=(function(){
     
   var len= this.norm();
   var x=  this.x  / len;
   var y = this.y / len;
   var z = this.x /len;
   var w = this.x / len;
  return new Quaternion(x,y,z,w);    
         
  
});


Quaternion.prototype.conjugate=(function(){

    var w = this.w;
    var x= -this.x;
    var y= -this.y;
    var z= -this.z;
  return new Quaternion(x,y,z,w); 
});
Quaternion.prototype.scale=(function(scaler){
    
    var x,y,z,w;
    
   x = this.x * scaler;
   y = this.y *scaler;
   z= this.z *scaler;
   w = this.w *scaler;
    
       
    
    return new Quaternion(x,y,z,w);
    
});
Quaternion.prototype.cross=(function(q){
    
    if(q instanceof Quaternion)
        return this.qCross(q);
    if(q instanceof Vector3f)
        return this.qCross(new Quaternion(q,0));
    
    
});


Quaternion.prototype.qCross=(function(quat)
{
    var w=  this.w*quat.w - this.x*quat.x - this.y *quat.y - this.z* quat.z;
    var x = this.w * quat.x + this.x *quat.w + this.y * quat.z - this.z *quat.y;
    var y = this.w *quat.y -this.x * quat.z + this.y * quat.w + this.z *quat.x;
    var z = this.w * quat.z + this.x * quat.y - this.y * quat.x + this.z *quat.w;
    return new Quaternion(x,y,z,w);
});
Quaternion.prototype.dot=(function(quat){
   var r=null;
   if(quat instanceof Quaternion)
    {
      
    r=  this.x * quat.x + this.y * quat.y + this.z * quat.z+ this.w * quat.w;
    } 
    return r;

});


Quaternion.prototype.inverse=(function(){
   
    var conjugate = this.conjugate();
    
    var sqtNorm= this.norm() * this.norm();
    
     var x = conjugate.x / sqtNorm;
     var y = conjugate.y / sqtNorm;
     var z = conjugate.z / sqtNorm;
     var w = conjugate.w / sqtNorm;
     
     var result = new Quaternion(x,y,z,w);
   
    return  result;
    
});

Quaternion.prototype.isZero=(function(){
   
    return (this.x===0 && this.y===0 && this.z===0 && this.w===0);
    
});

Quaternion.prototype.div=(function(q){    
      
     var status= (q instanceof Quaternion);
     if(!status)return null;
     
     if(!q.isZero()){
       var result  = this.qCross(q.inverse());
     return (result); 
    }
    return this;
 });

Quaternion.prototype.toString=(function(){
    
    return  "x= "+this.x+",y= "+this.y+",z= "+this.z+",w= "+this.w;
    
});