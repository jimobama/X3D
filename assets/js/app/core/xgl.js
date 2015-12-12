/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Object.__extends__ =(function(child, byparent){
    
    child.prototype=Object.create(byparent.prototype);
    child.prototype.__super =byparent.prototype;
    child.prototype.__super.__construct=byparent.prototype.__construct;
});

Object.prototype.__construct =(function(){    
 
});

Object.prototype.__call__ =(function(){    
 
});


var xgl =(function(){
    
    
    
});
xgl.inverse =(function(mat4f){
    
    var result =(new Matrix4f()).identity();
    
    
    return result;
});
 xgl.traslate =(function(axis){
     var mat4f=null;
    if(axis instanceof Vector3f){        
       mat4f= new Matrix4f();   
        mat4f.identity();
       var mat= mat4f.get();    
       //Translate matrix for 2d vector
        mat[0][0] =1 ;mat[0][1]  =0; mat[0][2]  =0;  mat[0][3]  = axis.x;
        mat[1][0] =0 ;mat[1][1]  =1;  mat[1][2] =0;  mat[1][3]  = axis.y;
        mat[2][0] =0 ;mat[2][1]  =0; mat[2][2]  =1;  mat[2][3]  = axis.z;
        mat[3][0] =0 ;mat[3][1]  =0; mat[3][2]  =0;  mat[3][3]  =1;
        mat4f.set(mat);       
    }    
    return mat4f;
    
    
});


 xgl.lookAt=(function(position,target,up){
    
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
       mat[0][0] =rDir.x   ;mat[0][1]  =rDir.y;      mat[0][2]=rDir.z;      mat[0][3]  = 0;
       mat[1][0] =U.x      ;mat[1][1]  =U.y;         mat[1][2]=U.z;         mat[1][3]  = 0;
       mat[2][0] =zDir.x   ;mat[2][1]  =zDir.y;      mat[2][2]=zDir.z;      mat[2][3]  = 0;
       mat[3][0] =0        ;mat[3][1]  =0;           mat[3][2]=0;           mat[3][3]  = 1;
       mat3f.set(mat);       
    var translation=  xgl.traslate(new Vector3f(-position.x,-position.y,-position.z));
       
     transform =  mat3f.mul(translation); 
       
    }   
    
    
    
    return transform; 
});
 
 
xgl.persp=(function(fov,ratio, near, far){
   
    var __persp = new Matrix4f();
    var halfTanFOV =  Math.tan(Vector2f.toRadian(fov/2));
    var range = far - near;
  
   var mat= __persp.get();
       
        mat[0][0] =1.0/(halfTanFOV *ratio ) ;mat[0][1]  =0;               mat[0][2]  =0;                      mat[0][3]  =0;
        mat[1][0] =0                        ;mat[1][1]  =1.0/ halfTanFOV; mat[1][2]  =0;                      mat[1][3]  =0;
        mat[2][0] =0                        ;mat[2][1]  =0;               mat[2][2]  =(-near - far)/ range;   mat[2][3]  =2 * far * near/ range;
        mat[3][0] =0                        ;mat[3][1]  =0;               mat[3][2]  =1;                      mat[3][3]  =1;
        __persp.set(mat);
    
    return __persp;  
    
});
xgl.rotationZ=(function(angle){
   
    
    //get the matrix data
    
    //Rotate the roll
       var mat3fZ = new  Matrix4f();
        var matZ =mat3fZ.get();
        var roll = Vector2f.toRadian(angle);
        
        matZ[0][0] =Math.cos(roll) ;matZ[0][1]  =-Math.sin(roll);  matZ[0][2]  =0;        matZ[0][3]  =0;
        matZ[1][0] =Math.sin(roll) ;matZ[1][1]  = Math.cos(roll);  matZ[1][2]  =0;       matZ[1][3]   =0;
        matZ[2][0] =0              ;matZ[2][1]  =0;                matZ[2][2]  =1        ;matZ[2][3]  =0;
        matZ[3][0] =0              ;matZ[3][1]  =0;                matZ[3][2]  =0;        matZ[3][3]  =1;
        mat3fZ.set(matZ);
       
   
    return mat3fZ; 
});

xgl.rotationX=(function(angle){
   
       //Rotate the pitch
        var mat3fX =  new  Matrix4f();
        matX =mat3fX.get();
        var pitch = Vector2f.toRadian(angle);
        matX[0][0] =1 ;matX[0][1]  =0;                 matX[0][2]   =0;                  matX[0][3]  =0;
        matX[1][0] =0 ;matX[1][1]  = Math.cos(pitch);  matX[1][2]   =-Math.sin(pitch);   matX[1][3]  =0;
        matX[2][0] =0 ;matX[2][1]  = Math.sin(pitch) ; matX[2][2]   = Math.cos(pitch);   matX[2][3]  =0;
        matX[3][0] =0 ;matX[3][1]  =0;                 matX[3][2]  =0;                   matX[3][3]  =1;
        mat3fX.set(matX);
       
    return  mat3fX; 
});


xgl.rotationY=(function(angle){
   
      //Rotate the yaw    
        var mat3fY  = new  Matrix4f();
       var  matY =mat3fY.get();
        var yaw = Vector2f.toRadian(angle);
      
        matY[0][0] =Math.cos(yaw);  matY[0][1]   =0;  matY[0][2]   =-Math.sin(yaw);   matY[0][3]  =0;
        matY[1][0] =0              ;matY[1][1]  = 1;  matY[1][2]   =0;                matY[1][3]  =0;
        matY[2][0] =Math.sin(yaw)  ;matY[2][1]  =0;   matY[2][2]   =Math.cos(yaw);    matY[2][3]  =0;
        matY[3][0] =0              ;matY[3][1]  =0;   matY[3][2]   =0;                matY[3][3]  =1;
        mat3fY.set(matY);
     return mat3fY ;
   
});

//leave it for now like that
xgl.rotation3fv=(function(vec){ 
    
    var rotation= new Matrix4f();
    rotation.identity();
    if(vec instanceof Vector3f){       
      var zrot = xgl.rotationZ(vec.z);
      var xrot = xgl.rotationX(vec.x);
      var yrot = xgl.rotationY(vec.y);     
      rotation = yrot.mul(xrot.mul(zrot));
      }
  
     return rotation;
   
});


xgl.scale3fv=(function(vec3f){
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


xgl.value_ptr=(function(mat){
     
    var float32Arr;
    if(mat instanceof Matrix3f)
    {
        float32Arr= xgl.value_ptrm3f(mat);
    }else if(mat instanceof Matrix4f){
        
          float32Arr= xgl.value_ptrm4f(mat);
    }
   return float32Arr;
});


xgl.value_ptrm4f=(function(mat4f){
     
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


xgl.value_ptrm3f=(function(mat3f){
     
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