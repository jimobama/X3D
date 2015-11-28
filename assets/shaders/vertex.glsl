

#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

attribute vec3  position;
attribute vec2  textCoord;
varying vec2 vTextureCoord;
uniform   mat4  transform3D;
uniform   mat4  prespMatrix;
uniform   mat4  camaraMatrix;







 void main() {
   
    gl_Position =prespMatrix * camaraMatrix * transform3D * vec4(position ,1) ;
    vTextureCoord=textCoord;
       
}