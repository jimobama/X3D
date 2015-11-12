/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var Matrix3f=(function(){
    
    this.__mat= new Array(3);
    for(var i=0; i < 3 ;i++)
    {
        this.__mat[i]= new Array(3);
         //initialised it
        for(var j=0; j < 3; j++){
            
            this.__mat[i][j]=0;
        }
    }
});

Matrix3f.prototype.identity=(function(){
    
   this.__mat[0][0] =1 ;this.__mat[0][1]  =0; this.__mat[0][2]  =0;
   this.__mat[1][0] =0 ;this.__mat[1][1]  =1; this.__mat[1][2]  =0;
   this.__mat[2][0] =0 ;this.__mat[2][1]  =0; this.__mat[2][2]  =1;
  return this;
});

Matrix3f.prototype.mul=(function(mat4f){
    var result =null;
   if(mat4f instanceof Matrix3f){  
        
        result= new Matrix3f();
        result.identity();
        
        for(var i =0; i < 3; i++){
            
            for(var j =0; j<3 ;j++)
            {
                //calculate the multiplication here
                  result.set1f(i,j,   this.get1f(i,0) *   mat4f.get1f(0,j) 
                                      +this.get1f(i,1) *  mat4f.get1f(1,j)
                                      +this.get1f(i,2) *  mat4f.get1f(2,j)
                              );
            }
        }
      
    }//end else
    
    return result;
});




Matrix3f.prototype.set1f=(function(row,col,value){
    
     this.__mat[row][col]=value;
     return this;   
    
});

Matrix3f.prototype.get1f=(function(row,col){
     return this.__mat[row][col];
    
});

Matrix3f.prototype.getX=(function(){    
    var result = new Vector3f(this.__mat[0][0],this.__mat[0][1],this.__mat[0][2] );
    return result;
});

Matrix3f.prototype.getY=(function(){    
    var result = new Vector3f(this.__mat[1][0],this.__mat[1][1],this.__mat[1][2]);
    return result;
});

Matrix3f.prototype.getZ=(function(){    
    var result = new Vector3f(this.__mat[2][0],this.__mat[2][1],this.__mat[2][2]);
    return result;
});


Matrix3f.prototype.setX=(function(x,y,z){ 
    if(x instanceof Vector3f)
    {
        this.__mat[0][0]=x.x;this.__mat[0][1]=x.y;this.__mat[0][2]=x.z;  
    }else{
        this.__mat[0][0] = x; this.__mat[0][1]= y; this.__mat[0][2] =z;  
    }

    return this;
});

Matrix3f.prototype.setY=(function(x,y,z){    
     if(x instanceof  Vector3f)
    {
        this.__mat[1][0]=x.x;this.__mat[1][1]=x.y;this.__mat[1][2]=x.z; 
    }else{
        this.__mat[1][0] = x; this.__mat[1][1]= y; this.__mat[1][2] =z;
    }

    return this;
});

Matrix3f.prototype.setZ=(function(x,y,z){    
    if(x instanceof Vector3f)
    {
        this.__mat[2][0]=x.x;this.__mat[2][1]=x.y;this.__mat[2][2]=x.z;  
    }else{
        this.__mat[2][0] = x; this.__mat[2][1]= y; this.__mat[2][2] =z;
    }

    return this;
});

Matrix3f.prototype.get=(function(){    
    return this.__mat;    
});

Matrix3f.prototype.set=(function(matArray){ 
    if(matArray instanceof Array)
         this.__mat = matArray;  
     return this;
});

Matrix3f.prototype.toString=(function(){
    
    var tostr  = this.__mat[0][0] + "," + this.__mat[0][1] + "," + this.__mat[0][2] + "\n" +
                 this.__mat[1][0] + "," + this.__mat[1][1] + "," + this.__mat[1][2] + "\n" +
                 this.__mat[2][0] + "," + this.__mat[2][1] + "," + this.__mat[2][2] ;
  
    return tostr;
});


Matrix3f.value_ptr=(function(mat3f){
     
    var floatArray=[];
   
    if(mat3f instanceof Matrix3f)
    {
        //the matrix need to first transpose before opengl can accept it
        mat3f.transpose();
          
        for(var i=0; i < 3; i++)
        {
            
            for(var j=0; j< 3; j++)
            {                
                floatArray.push(mat3f.get1f(i,j));
            }
        }
        
    }
    var float32Arr= new Float32Array(floatArray);  
   return float32Arr;
});

Matrix3f.prototype.transpose=(function(){
    
   var newX = new Vector3f(this.get1f(0,0),this.get1f(1,0),this.get1f(2,0));
 
   var newY = new Vector3f(this.get1f(0,1),this.get1f(1,1),this.get1f(2,1));
   var newZ = new Vector3f(this.get1f(0,2),this.get1f(1,2),this.get1f(2,2));
   
   this.setX(newX);
   this.setY(newY);
   this.setZ(newZ);
   return this;
   
});

Matrix3f.initTranslate=(function (vec2f){
    
    var mat3f=null;
    if(vec2f instanceof Vector2f){
        
       mat3f= new Matrix3f();
       mat3f.identity();
       var mat= mat3f.get();    
       //Translate matrix for 2d vector
        mat[0][0] =1 ;mat[0][1]  =0; mat[0][2]  = vec2f.x;
        mat[1][0] =0 ;mat[1][1]  =1; mat[1][2]  = vec2f.y;
        mat[2][0] =0 ;mat[2][1]  =0; mat[2][2]  = 1;
        
        mat3f.set(mat);
       
    }    
    return mat3f;
    
});

Matrix3f.initScale=(function(vec2f){
      var mat3f = new Matrix3f();  
      mat3f.identity();
      
      if(vec2f instanceof Vector2f){
            
        var mat= mat3f.get();    
        //Translate matrix for 2d vector
        mat[0][0] =vec2f.x ;mat[0][1]  =0;        mat[0][2]  =0;   
        mat[1][0] =0       ;mat[1][1]  =vec2f.y ; mat[1][2]  =0;   
        mat[2][0] =0       ;mat[2][1]  =0;        mat[2][2]  =1 ;
        mat3f.set(mat);
    }    
    return mat3f; 
});


Matrix3f.initRotation=(function(angle){
        var mat3f= new Matrix3f();
        mat3f.identity();
        var cos= Math.cos(Vector2f.toRadian(angle));
        var sin= Math.sin(Vector2f.toRadian(angle));
       
        var mat=mat3f.get();
        
        mat[0][0] =cos        ;mat[0][1]  =-sin; mat[0][2]   =0;        
        mat[1][0] =sin        ;mat[1][1]  = cos;  mat[1][2]  =0;       
        mat[2][0] =0          ;mat[2][1]  = 0;    mat[2][2]  =1; 
        mat3f.set(mat);
   
        
    return mat3f; 
});

