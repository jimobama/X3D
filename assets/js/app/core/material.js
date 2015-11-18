/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var Material =(function(texture, color)
{
    this.__texture =   texture;
    this.__color   =   color;
    
});
Material.prototype.getColor=(function(){    
    return this.__color;
});
Material.prototype.getTexture=(function(){   
 return this.__texture;
});