/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var Matrix2f=(function(){
    
    this.__mat =new Array(2);
    for (var i=0; i < 2; i++)
    {
       this.__mat[i]=new Array(2);
       
        for(var j=0; j<2 ; j++)
        {
            this.__mat[i][j]=0;
        }
    }
  
  //initialised it
   
    
});
Matrix2f.prototype.toString=(function(){
    
    var string_v=   this.__mat[0][0] +" , " +  this.__mat[0][1]+ "\n" + this.__mat[1][0] +" , "+  this.__mat[1][1];
    return string_v;
    
});
Matrix2f.prototype.identity=(function(){ 
    
  this.__mat[0][0]=1;  this.__mat[0][1]=0;
  this.__mat[1][0]=0;  this.__mat[1][1]=1;
   return this;   
});
Matrix2f.prototype.set=(function(mat){
    
    if(mat instanceof Matrix2f)
    {
        this.__mat=mat;
    }
});


Matrix2f.prototype.get=(function(){
    return this.__mat;
});



Matrix2f.prototype.set1f=(function(row,col,val){  

   this.__mat[row][col]=val;
   return this;    
});

Matrix2f.prototype.get1f=(function(row,col){    
  return  this.__mat[row][col];
});


Matrix2f.prototype.setX=(function(x,y){
    if(x instanceof Vector2f){
        this.__mat[0][0]=x.x;   this.__mat[0][1]=x.y;   
    }else{
        this.__mat[0][0]=x;  this. __mat[0][1]=y;
    }
});

Matrix2f.prototype.getX=(function(){
   
     var result=   new Vector2f( this.__mat[0][0],   this.__mat[0][1]);   
     return result;   
});


Matrix2f.prototype.setY=(function(x,y){
    if(x instanceof Vector2f){
        this.__mat[1][0]=x.x;   this.__mat[1][1]=x.y;   
    }else{
       this.__mat[1][0]=x;   this.__mat[1][1]=y;
    }
});

Matrix2f.prototype.getY=(function(){
   
     var result=   new Vector2f( this.__mat[1][0],   this.__mat[1][1]);   
     return result;   
});


Matrix2f.prototype.add=(function(mat2){
    //check if the matrix param is matrix2f else return null
    if(!(mat2 instanceof Matrix2f)) return null;
    var result = Matrix2f.identity();
    
    
    for(var i=0; i<2; i++)
    {
      for(var j=0; j <2 ; j++)
      {
          var value =  this.__mat[i][j] + mat2.get1f(i,j);
          //alert(__mat[i][j]);
          result.set1f(i,j, value);
      }
    }
    return result;
    
});

Matrix2f.prototype.minus =(function (mat2f){    
    mat2f = mat2f.scale(-1);
   
   return  this.add(mat2f );
    
});

Matrix2f.prototype.mul2fv2=(function(v2){
    
    var result= null;
    if(v2 instanceof Vector2f){        
        result =new Vector2f(this.get1f(0,0) * v2.x  +  this.get1f(0,1) * v2.y ,
                             this.get1f(1,0) * v2.x  +  this.get1f(1,1) * v2.y);
        
    }
    
    return result;
    
});
Matrix2f.prototype.determinant=(function(){
    
    var det=  this.__mat[0][0]* this.__mat[1][1] -  this.__mat[0][1] * this.__mat[1][0];
    return det;
});

Matrix2f.prototype.transpose=(function(){

    var newX =new Vector2f(this.getX().x,this.getY().x);
    var newY =new Vector2f(this.getX().y,this.getY().y); 
    this.setX(newX);
    this.setY(newY);
    return this;
});
Matrix2f.prototype.inverse=(function(){
    
    var identity = (new Matrix2f()).identity();
    return identity;
    
});

Matrix2f.prototype.mul=(function(mat2f){
     var result =null;
    if(mat2f instanceof Matrix2f)
    {
       result=new Matrix2f();
      
        for(var i=0; i < 2; i++){
            
            for(var j=0; j< 2; j++)
            {
                result.set1f(i,j,   this.get1f(i,0) *  mat2f.get1f(0,j) 
                                   +this.get1f(i,1) *  mat2f.get1f(1,j) );
            }
        }
   
    }else if(mat2f instanceof Vector2f){        
        result = this.mul2fv2(mat2f);
    }
    
    return result;
});

Matrix2f.value_ptr=(function(mat2f){
    
    var floatArray=[];
    if(mat2f instanceof Matrix2f)
    {
        for(var i=0; i < 2; i++)
        {
            for(var j=0; j< 2; j++)
            {                
                floatArray.push(mat2f.get1f(i,j));
            }
        }
        
    }
    
    return new Float32Array(floatArray);
});




Matrix2f.rotate=(function (angle){
    
    var mat2f= new  Matrix2f();
    var m =  mat2f.get();
    var cos =Math.cos(Vector2f.toRadian(angle));
    var sin =Math.sin(Vector2f.toRadian(angle));
    
      m[0][0] =cos;  m[0][1]= -sin;
      m[1][0] =sin;  m[1][1]=  cos;
      
      mat2f.set(m);
     return mat2f;
});


Matrix2f.traslate=(function(position , units)
{
    var result = null;
    if(position instanceof Vector2f  && units instanceof Vector2f)
    {
        //create an initialised matrix for transformation
        var posMat=  Matrix3f.initTranslate(new Vector3f(position,1.0)); 
        alert(posMat);
        var translate = Matrix3f.initTranslate(new Vector3f(units,1));        
        alert(translate);
         result = translate.mul(posMat);
        //it will return a vector
    }
    
    return result;
});
