

#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

attribute vec3  position;
attribute vec2  textCoord;
varying vec2 vTextureCoord;


struct  Transform
{
  mat4  worldMatrix;
  mat4  camMatrix;
  mat4  viewMatrix;
};


uniform  Transform transform;







 void main() {
    
    gl_Position =transform.viewMatrix * transform.camMatrix * transform.worldMatrix * vec4(position ,1) ;
    vTextureCoord=textCoord;
       
}