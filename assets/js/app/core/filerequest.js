/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var FileRequest=(function(filepath)
{
    this.__httpObject=new XMLHttpRequest();
    try {this.__httpObject= new XMLHttpRequest(); } catch(e) {}
    try {this.__httpObject= new ActiveXObject("Msxml2.XMLHTTP.6.0"); } catch (e) {}
    try {this.__httpObject=  new ActiveXObject("Msxml2.XMLHTTP.3.0"); } catch (e) {}
    try {this.__httpObject=  new ActiveXObject("Msxml2.XMLHTTP"); } catch (e) {}
    try {this.__httpObject= new ActiveXObject("Microsoft.XMLHTTP"); } catch (e) {}
   this.__filename =filepath; 
});

FileRequest.prototype.getObject=function(){
     return  this.__httpObject;
 };

 
FileRequest.prototype.load=(function(){
      
      //make such the init function is called 
      if(this.getObject()==null){
         if(this.getObject()==null){
           alert("Broswer do not support any xmlhttrequest objects");
             return ;
         }
     }
    var xhr= this.getObject();
    var thSource="";
    if(xhr!==null)
        
     {
        xhr.open("GET",this.__filename,false);
        xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        xhr.send(null);
       thSource = xhr.responseText;      
     }     
 
      return thSource;
    
 });