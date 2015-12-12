/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var Matrix4f =(function(){
    
    
    
    
    this.__mat= new Array(4);
    for(var i=0; i < 4 ;i++)
    {
        this.__mat[i]= new Array(4);
         //initialised it
        for(var j=0; j < 4; j++){
            
            this.__mat[i][j]=0;
        }
    }
          
});


Matrix4f.prototype.identity=(function(){
    
   this.__mat[0][0] =1 ;this.__mat[0][1]  =0; this.__mat[0][2]  =0;this.__mat[0][3]  =0;
   this.__mat[1][0] =0 ;this.__mat[1][1]  =1; this.__mat[1][2]  =0;this.__mat[1][3]  =0;
   this.__mat[2][0] =0 ;this.__mat[2][1]  =0; this.__mat[2][2]  =1;this.__mat[2][3]  =0;
   this.__mat[3][0] =0 ;this.__mat[3][1]  =0; this.__mat[3][2]  =0;this.__mat[3][3]  =1;
   return this;
});

Matrix4f.prototype.set1f=(function(row,col,value){
    
     this.__mat[row][col]=value;
     return this;   
    
});

Matrix4f.prototype.get1f=(function(row,col){
     return this.__mat[row][col];
    
});




Matrix4f.prototype.getX=(function(){    
    var result = new Quaternion(this.__mat[0][0],this.__mat[0][1],this.__mat[0][2],this.__mat[0][3] );
    return result;
});

Matrix4f.prototype.getY=(function(){    
    var result = new Quaternion(this.__mat[1][0],this.__mat[1][1],this.__mat[1][2], this.__mat[1][4]);
    return result;
});

Matrix4f.prototype.getZ=(function(){    
    var result = new Quaternion(this.__mat[2][0],this.__mat[2][1],this.__mat[2][2],this.__mat[2][3] );
    return result;
});

Matrix4f.prototype.getW=(function(){    
    var result = new Quaternion(this.__mat[3][0],this.__mat[3][1],this.__mat[3][2],this.__mat[3][3] );
    return result;
});




Matrix4f.prototype.setX=(function(x,y,z,w){ 
     
    if(x instanceof Quaternion)
    {
      
        this.__mat[0][0]=x.x; this.__mat[0][1]=x.y; this.__mat[0][2]=x.z;  this.__mat[0][3]=x.w  ;
    }else{
        this.__mat[0][0] = x; this.__mat[0][1]= y; this.__mat[0][2] =z; this.__mat[0][3]=w ;
    }

    return this;
});

Matrix4f.prototype.setY=(function(x,y,z,w){    
     if(x instanceof Quaternion)
    {
        this.__mat[1][0]=x.x;this.__mat[1][1]=x.y;this.__mat[1][2]=x.z;   this.__mat[1][3]=x.w ;
    }else{
        this.__mat[1][0] = x; this.__mat[1][1]= y; this.__mat[1][2] =z;this.__mat[1][3] =w;
    }

    return this;
});

Matrix4f.prototype.setZ=(function(x,y,z,w){    
    if(x instanceof Quaternion)
    {
        this.__mat[2][0]=x.x;this.__mat[2][1]=x.y;this.__mat[2][2]=x.z;   this.__mat[2][3]=x.w;  
    }else{
        this.__mat[2][0] = x; this.__mat[2][1]= y; this.__mat[2][2] =z;this.__mat[2][3]=w; 
    }

    return this;
});


Matrix4f.prototype.setW=(function(x,y,z,w){    
    if(x instanceof Quaternion)
    {
       //alert("Qu\n"+ x.toString())
        this.__mat[3][0]=x.x;this.__mat[3][1]=x.y;this.__mat[3][2]=x.z;   this.__mat[3][3]=x.w;  
    }else{
        this.__mat[3][0] = x; this.__mat[3][1]= y; this.__mat[3][2] =z;this.__mat[3][3]=w; 
    }

    return this;
});





Matrix4f.prototype.get=(function(){    
    return this.__mat;    
});

Matrix4f.prototype.set=(function(matArray){ 
    if(matArray instanceof Array)
         this.__mat = matArray;  
     return this;
});

Matrix4f.prototype.toString=(function(){
    
    var tostr  = this.__mat[0][0] + "," + this.__mat[0][1] + "," + this.__mat[0][2] +", "+ this.__mat[0][3] +"\n" +
                 this.__mat[1][0] + "," + this.__mat[1][1] + "," + this.__mat[1][2] +", "+ this.__mat[1][3] +"\n" +
                 this.__mat[2][0] + "," + this.__mat[2][1] + "," + this.__mat[2][2] +", "+ this.__mat[2][3] +"\n" +
                 this.__mat[3][0] + "," + this.__mat[3][1] + "," + this.__mat[3][2] +", "+ this.__mat[3][3];
  
    return tostr;
});

//Operations
Matrix4f.prototype.mul=(function(mat4f){
    var result =null;
   if(mat4f instanceof Matrix4f){  
        
        result= new Matrix4f();
        result.identity();
        
        for(var i =0; i < 4; i++){
            
            for(var j =0; j<4 ;j++)
            {
                //calculate the multiplication here
                  result.set1f(i,j,    this.get1f(i,0)  *  mat4f.get1f(0,j) 
                                      +this.get1f(i,1) *  mat4f.get1f(1,j)
                                      +this.get1f(i,2) *  mat4f.get1f(2,j)
                                      +this.get1f(i,3) *  mat4f.get1f(3,j));
            }
        }
      
    }//end else
    
    return result;
});

Matrix4f.initRotationMatrix=(function(vec3){
    
     if(vec3 instanceof Vector3f)
         return (new Matrix4f()).identity().mul(new Quaternion(vec3,1));
     
     return (new Matrix4f()).identity();
});

Matrix4f.prototype.mulByQuaternion=(function(q){
    
    
    
});


Matrix4f.prototype.transpose=(function(){
    
   var newX = new Quaternion(this.get1f(0,0),this.get1f(1,0),this.get1f(2,0),this.get1f(3,0));
   var newY = new Quaternion(this.get1f(0,1),this.get1f(1,1),this.get1f(2,1),this.get1f(3,1));
   var newZ = new Quaternion(this.get1f(0,2),this.get1f(1,2),this.get1f(2,2),this.get1f(3,2));
   var newW = new Quaternion(this.get1f(0,3),this.get1f(1,3),this.get1f(2,3),this.get1f(3,3));
   this.setX(newX);
   this.setY(newY);
   this.setZ(newZ);
   this.setW(newW);
   return this;
   
});


