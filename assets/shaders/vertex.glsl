precision highp float;
attribute vec3  position;
attribute vec2  textCoord;

varying highp vec2 vTextureCoord;

uniform  mat4 transform3D;
uniform  mat4  camera;



 void main() {
   
    gl_Position = camera * transform3D * vec4(position ,1) ;
    vTextureCoord=textCoord;
       
}