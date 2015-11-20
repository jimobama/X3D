/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var Attenuation =(function(constant,linear,exponent){
    
    var __constant;
    var __exponent;
    var __linear;
    
    this.__call__=(function(self,constant,linear,exponent){
        
        self.__construct(constant,linear,exponent);
        
    })(this,constant,linear,exponent);
    
});

Attenuation.prototype.__construct=(function(constant,linear,exponent)
{
     __constant =constant;
     __exponent =exponent;
     __linear = linear;
   
});

Attenuation.prototype.getConstant=(function(){
    return __exponent;
});
Attenuation.prototype.getExponent=(function(){
    return __constant;
});
Attenuation.prototype.getLinear=(function(){
    return __linear;
});
