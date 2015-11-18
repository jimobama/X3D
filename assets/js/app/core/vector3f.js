/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*
 * 
 * @param {type} x-axis 
 * @param {type} y-axis
 * @param {type} z-axis
 * @returns {Vector3f}
 */
var Vector3f = (function(x,y,z)
{
    if(x instanceof Vector2f){
        this.x=(typeof x.x !== 'undefined')?x.x:0;
        this.y=(typeof x.y !== 'undefined')?x.y:0;;
        this.z=(typeof z !== 'undefined')?z:1;
    }else{  
        this.x=(typeof x !== 'undefined')?x:0;
        this.y=(typeof y !== 'undefined')?y:0;;
        this.z=(typeof z !== 'undefined')?z:0;
    }
    
});
/*
 * 
 * @returns {Number}
 */
Vector3f.prototype.length=(function()
{ 
   
   var zagma = (this.x * this.x) + (this.y * this.y) + (this.z * this.z);
   
 
    return (Math.sqrt(zagma));
   
});

/*
 * 
 * @param {type} vec3
 * @returns {Vector3f}
 * Addition of vector3 
 */
Vector3f.prototype.add=(function(vec3)
{
    var result=null;
    if((vec3 instanceof Vector3f)){
      
      result=new  Vector3f(this.x + vec3.x, this.y + vec3.y , this.z + vec3.z);
    }  
  return result;
   
});
Vector3f.prototype.mul=(function(scaler)
{
    
  var x = this.x * scaler;
  var y = this.y * scaler;
  var z = this.z * scaler;
  return new Vector3f(x,y,z);
   
});

Vector3f.prototype.minus=(function(vec3)
{
    var result=null;
    if((vec3 instanceof Vector3f)){
      vec3 = vec3.negate();// negate the vector 
      result= this.add(vec3);
    }  
  return result;
   
});

Vector3f.prototype.negate=(function()
{ 
 var result=  new Vector3f(this.x * -1, this.y *-1, this.z * -1 );
 return result;
   
});




Vector3f.prototype.rotateZ=(function(angle, axis){
    //To rotate x-axis will plug our y and z values as the x and y used the normal two 2d to make the rotation    
   var  zAxis =  new Vector2f(this.x,this.y);
   var  zRotation =zAxis.rotate(angle);
   //convert to vector 3f with unit 
   var    z = new  Vector3f(zRotation, 1);
  return z;
    
});


Vector3f.unitX=(function(){    
    return new Vector3f(1,0,0);
});
Vector3f.unitY=(function(){    
    return new Vector3f(0,1,0);
});
Vector3f.unitZ=(function(){    
    return new Vector3f(0,0,1);
});

Vector3f.prototype.cross=(function(vec3f){
    var result =null;
    
   
    if(vec3f instanceof Vector3f)
    {
        var xR = this.y * vec3f.z - this.z * vec3f.y;
        var yR = this.z *vec3f.x - this.x * vec3f.z;
        var zR = this.x * vec3f.y - this.y * vec3f.x;
        result= new Vector3f(xR,yR,zR);
        
    }
 
    return result;
    
});

/*
 * 
 */
Vector3f.prototype.dot=(function(vec3f){
    var result=0.0;
    if(vec3f instanceof Vector3f){
        result = this.x * vec3f.x + this.y * vec3f.y + this.z * vec3f.z;
    }
    return result;
});




Vector3f.prototype.normalize=function()
{ 
    var len=(this.length() !== 0)?this.length():1;   
    var xAxis = this.x/len;
    var yAxis = this.y/len;
    var zAxis = this.z/len;
    var result=  new  Vector3f( xAxis,yAxis, zAxis);
    return result;
}
Vector3f.prototype.toString=(function(){
    
    return ("[x = "+this.x+" y = "+this.y+" z= "+this.z+"]");
});