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
    var result = new Quaterion(this.__mat[0][0],this.__mat[0][1],this.__mat[0][2],this.__mat[0][3] );
    return result;
});

Matrix4f.prototype.getY=(function(){    
    var result = new Quaterion(this.__mat[1][0],this.__mat[1][1],this.__mat[1][2], this.__mat[1][4]);
    return result;
});

Matrix4f.prototype.getZ=(function(){    
    var result = new Quaterion(this.__mat[2][0],this.__mat[2][1],this.__mat[2][2],this.__mat[2][3] );
    return result;
});

Matrix4f.prototype.getW=(function(){    
    var result = new Quaterion(this.__mat[3][0],this.__mat[3][1],this.__mat[3][2],this.__mat[3][3] );
    return result;
});




Matrix4f.prototype.setX=(function(x,y,z,w){ 
     
    if(x instanceof Quaterion)
    {
      
        this.__mat[0][0]=x.x; this.__mat[0][1]=x.y; this.__mat[0][2]=x.z;  this.__mat[0][3]=x.w  ;
    }else{
        this.__mat[0][0] = x; this.__mat[0][1]= y; this.__mat[0][2] =z; this.__mat[0][3]=w ;
    }

    return this;
});

Matrix4f.prototype.setY=(function(x,y,z,w){    
     if(x instanceof Quaterion)
    {
        this.__mat[1][0]=x.x;this.__mat[1][1]=x.y;this.__mat[1][2]=x.z;   this.__mat[1][3]=x.w ;
    }else{
        this.__mat[1][0] = x; this.__mat[1][1]= y; this.__mat[1][2] =z;this.__mat[1][3] =w;
    }

    return this;
});

Matrix4f.prototype.setZ=(function(x,y,z,w){    
    if(x instanceof Quaterion)
    {
        this.__mat[2][0]=x.x;this.__mat[2][1]=x.y;this.__mat[2][2]=x.z;   this.__mat[2][3]=x.w;  
    }else{
        this.__mat[2][0] = x; this.__mat[2][1]= y; this.__mat[2][2] =z;this.__mat[2][3]=w; 
    }

    return this;
});


Matrix4f.prototype.setW=(function(x,y,z,w){    
    if(x instanceof Quaterion)
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




Matrix4f.initTranslate=(function (vec3f){
    
    var mat4f=null;
    if(vec3f instanceof Vector3f){
        
       mat4f= new Matrix4f();   
        mat4f.identity();
       var mat= mat4f.get();    
       //Translate matrix for 2d vector
        mat[0][0] =1 ;mat[0][1]  =0; mat[0][2]  =0;  mat[0][3]  = vec3f.x;
        mat[1][0] =0 ;mat[1][1]  =1;  mat[1][2] =0;  mat[1][3]  = vec3f.y;
        mat[2][0] =0 ;mat[2][1]  =0; mat[2][2]  =1;  mat[2][3]  = vec3f.z;
        mat[3][0] =0 ;mat[3][1]  =0; mat[3][2]  =0;  mat[3][3]  =1;
        mat4f.set(mat);
       
    }    
    return mat4f;
    
});

Matrix4f.initScale=(function(vec3f){
      var mat3f=null;
      
      if(vec3f instanceof Vector3f){        
         mat3f= new Matrix4f();        
        var mat= mat3f.get();    
        //Translate matrix for 2d vector
        mat[0][0] =vec3f.x ;mat[0][1]  =0;       mat[0][2]  =0;        mat[0][3]  =0;
        mat[1][0] =0       ;mat[1][1]  =vec3f.y; mat[1][2]  =0;        mat[1][3]  =0;
        mat[2][0] =0       ;mat[2][1]  =0;       mat[2][2]  =vec3f.z  ;mat[2][3]  =0;
        mat[3][0] =0       ;mat[3][1]  =0;       mat[3][2]  =0;        mat[3][3]  =1;
        mat3f.set(mat);
    }    
    return mat3f; 
});

Matrix4f.initRotation=(function(vec3f){
   
    
    //get the matrix data
    
    //Rotate the roll
       var mat3fZ = new  Matrix4f();
        var matZ =mat3fZ.get();
        var roll = Vector2f.toRadian(vec3f.z);
        
        matZ[0][0] =Math.cos(roll) ;matZ[0][1]  =-Math.sin(roll);  matZ[0][2]  =0;        matZ[0][3]  =0;
        matZ[1][0] =Math.sin(roll) ;matZ[1][1]  = Math.cos(roll);  matZ[1][2]  =0;       matZ[1][3]   =0;
        matZ[2][0] =0              ;matZ[2][1]  =0;                matZ[2][2]  =1        ;matZ[2][3]  =0;
        matZ[3][0] =0              ;matZ[3][1]  =0;                matZ[3][2]  =0;        matZ[3][3]  =1;
        mat3fZ.set(matZ);
       
        
      //Rotate the yaw    
        var mat3fY  = new  Matrix4f();
        matY =mat3fY.get();
        var yaw = Vector2f.toRadian(vec3f.y);
      
        matY[0][0] =Math.cos(yaw);  matY[0][1]   =0;  matY[0][2]   =-Math.sin(yaw);   matY[0][3]  =0;
        matY[1][0] =0              ;matY[1][1]  = 1;  matY[1][2]   =0;                matY[1][3]  =0;
        matY[2][0] =Math.sin(yaw)  ;matY[2][1]  =0;   matY[2][2]   =Math.cos(yaw);    matY[2][3]  =0;
        matY[3][0] =0              ;matY[3][1]  =0;   matY[3][2]   =0;                matY[3][3]  =1;
        mat3fY.set(matY);
        
     
       //Rotate the pitch
        var mat3fX =  new  Matrix4f();
        matX =mat3fX.get();
        var pitch = Vector2f.toRadian(vec3f.x);
        matX[0][0] =1 ;matX[0][1]  =0;                 matX[0][2]   =0;                  matX[0][3]  =0;
        matX[1][0] =0 ;matX[1][1]  = Math.cos(pitch);  matX[1][2]   =-Math.sin(pitch);   matX[1][3]  =0;
        matX[2][0] =0 ;matX[2][1]  = Math.sin(pitch) ; matX[2][2]   = Math.cos(pitch);   matX[2][3]  =0;
        matX[3][0] =0 ;matX[3][1]  =0;                 matX[3][2]  =0;                   matX[3][3]  =1;
        mat3fX.set(matX);
      
       var rotation =mat3fY.mul(mat3fX.mul(mat3fZ)) ;
       
       
    return rotation; 
});

Matrix4f.initPersp=(function(fov,ratio, near, far){
   
    var persp = new Matrix4f();
    var halfTanFOV =  Math.tan(Vector2f.toRadian(fov/2));
    var range = far - near;
  
   var mat= persp.get();
       
        mat[0][0] =1.0/(halfTanFOV *ratio ) ;mat[0][1]  =0;               mat[0][2]  =0;                      mat[0][3]  =0;
        mat[1][0] =0                        ;mat[1][1]  =1.0/ halfTanFOV; mat[1][2]  =0;                      mat[1][3]  =0;
        mat[2][0] =0                        ;mat[2][1]  =0;               mat[2][2]  =(-near - far)/ range;   mat[2][3]  =2 * far * near/ range;
        mat[3][0] =0                        ;mat[3][1]  =0;               mat[3][2]  =1;                      mat[3][3]  =1;
        persp.set(mat);
    
    return persp;  
    
});

Matrix4f.lookAt=(function(position,target,up){
    
     var transform=null;
     if(position instanceof Vector3f  && up instanceof Vector3f  && target instanceof Vector3f){  
   
     var zDir= position.minus(target) ;
     zDir= zDir.normalize();
     var rDir = up.cross(zDir).normalize();
      var U = zDir.cross(rDir).normalize();
     var mat3f=null;
      mat3f= new Matrix4f();        
      var mat= mat3f.get();    
        //Translate matrix for 2d vector
       mat[0][0] =rDir.x      ;mat[0][1]  =rDir.y;      mat[0][2]=rDir.z;      mat[0][3]  = 0;
       mat[1][0] =U.x      ;mat[1][1]  =U.y;      mat[1][2]=U.z;      mat[1][3]  = 0;
       mat[2][0] =zDir.x ;mat[2][1]  =zDir.y; mat[2][2]=zDir.z; mat[2][3]  = 0;
       mat[3][0] =0      ;mat[3][1]  =0;      mat[3][2]=0;      mat[3][3]  = 1;
       mat3f.set(mat);
       
      var translation= Matrix4f.initTranslate(new Vector3f(-position.x,-position.y,-position.z));
       
     transform =  mat3f.mul(translation); 
       
    }   
    
    
    
    return transform; 
});


Matrix4f.prototype.transpose=(function(){
    
   var newX = new Quaterion(this.get1f(0,0),this.get1f(1,0),this.get1f(2,0),this.get1f(3,0));
   var newY = new Quaterion(this.get1f(0,1),this.get1f(1,1),this.get1f(2,1),this.get1f(3,1));
   var newZ = new Quaterion(this.get1f(0,2),this.get1f(1,2),this.get1f(2,2),this.get1f(3,2));
   var newW = new Quaterion(this.get1f(0,3),this.get1f(1,3),this.get1f(2,3),this.get1f(3,3));
   
   
   this.setX(newX);
   this.setY(newY);
   this.setZ(newZ);
   this.setW(newW);
   

   return this;
   
});

Matrix4f.value_ptr=(function(mat4f){
     
    var floatArray=[];
  
    if(mat4f instanceof Matrix4f)
    { 
      // alert("Transpose\n"+mat4f);
         mat4f.transpose();
        //alert("Transpose\n"+mat4f);
        for(var i=0; i < 4; i++)
        {
            
            for(var j=0; j< 4; j++)
            {                
                floatArray.push(mat4f.get1f(i,j));
            }
        }
    }
    var float32Arr= new Float32Array(floatArray);   
   return float32Arr;
});
