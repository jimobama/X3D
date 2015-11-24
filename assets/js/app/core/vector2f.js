/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var Vector2f=(function(x, y){
   this.x;
   this.y;
    this.__call__=(function(self, x,y){
        self.__construct(x,y);
    })(this,x,y);
    
    
 });
Vector2f.prototype.__construct=(function(x,y){
    this.x=(typeof x !== 'undefined')?x:0;
    this.y=(typeof y !== 'undefined')?y:0;
    
});
Vector2f.prototype.length=(function(){     
     return (Math.sqrt((this.x*this.x + this.y * this.y)));
 });
 Vector2f.prototype.normalize=(function(){
    
     this.x= this.x/this.length();
     this.y= this.y/this.length();
     return this;     
     
 });
  Vector2f.prototype.add=(function(vec){
      
      var result =null;
      if(vec instanceof Vector2f )
      {
          result= new Vector2f( (this.x + vec.x), (vec.y + this.y));
          
      }
      return result;
  });
  
Vector2f.prototype.minus=(function(vec){    
         vec = vec.negate();
         return this.add(vec);   
    });
  
 Vector2f.prototype.negate=(function()
 {
     this.x =this.x*-1;
     this.y = this.y * -1;
     return this;
     
 });
 
 Vector2f.prototype.dot=(function(vec){    
      
     var x = this.x * vec.x;
     var y = this.y * vec.y;
     return x+y;     
     
 });
 /*
  * 
  */
 Vector2f.create=(function(length, angle){     
     //convert to angle to radian
     var theta = Vector2f.toRadian(angle);
    
     var cos= Math.cos(theta);
     var  sin= Math.sin(theta);
     var x=  cos *  length;
     var y = sin *  length;
     return new Vector2f(x,y);
 });
 
 
  Vector2f.prototype.getAngle=(function(){
     
    var radian =  Math.atan2(this.y, this.x);    
    var degree = Vector2f.toDegree(radian);    
    return degree;
    
 });
  Vector2f.toDegree=(function(rad){
      
      var angle = rad * 180 / Math.PI;
      return angle;      
  });
 
 
  Vector2f.prototype.unitX=(function(){
      
      this.x=this.x /this.length();
      return this;      
  });
  
 Vector2f.prototype.unitY=(function(){
      
      this.y=this.y /this.length();
      return this;      
  });
 Vector2f.prototype.scale=(function(scaler)
 {  
     var result=null;
    
     if(scaler instanceof Vector2f)
     {
       result=  new Vector2f(this.x * scaler.x , this.y * scaler.y);  
     }else{
        result=  new Vector2f(this.x * scaler , this.y * scaler);
     }
    
     return  result;
 });
 
  Vector2f.prototype.rotate=(function(angle)
  {
      //convert angle to radian
       var  radian =Vector2f.toRadian(angle);
       
       var  cos = Math.cos(radian);
       var  sin = Math.sin(radian);
	// The rotation equation is base on imaginary numbers
	//Rotation arround the angle
	this.x = this.x * cos - this.y * sin;
	this.y = this.x * sin + this.y * cos;	
	return this;
  });
    
 Vector2f.prototype.reflectX=(function()
 {
     this.y= -this.y;
     return this;
 });
 
 Vector2f.prototype.reflectY=(function()
 {
     this.x= -this.x;
     return this;
 });
 
 
 Vector2f.toRadian =(function(angle){
          
    var rad=  angle *   Math.PI / 180.0;
    return rad;
     
 }); 
 Vector2f.prototype.toString=(function(){
     
    return ("x = "+this.x +" y = "+this.y) ;
 });