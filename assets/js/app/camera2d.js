/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var Camera2D =(function(pos){
   this.__position = (pos instanceof Vector2f)?pos:(new Vector2f());
   this.__ortho   = (new Matrix3f()).identity();
    
    
});
 Camera2D.prototype.seOrthographic=(function(x,y, width, height)
 {
    
     var x_new = (width - x);
     var y_new = (height- y);
     var aspect = x_new/y_new;
   
   
     var vpos= new Vector2f(2/x_new  ,2/y_new );
  
     vpos.normalize();
   
     var mat =  this.__ortho.get();
      
      mat[0][0] = vpos.x   ;mat[0][1]  = 0;            mat[0][2]  =   0;        
      mat[1][0] = 0        ;mat[1][1]  = vpos.x;       mat[1][2]  =   0;       
      mat[2][0] = 0        ;mat[2][1]  = 0;            mat[2][2]  =  1; 
     this.__ortho.set(mat);
     
     
 });
 Camera2D.prototype.getOrthographic=(function(){
     
         
     return this.__ortho;
     
 });
 
 
 Camera2D.prototype.getView=(function(){
      
      
      
  });