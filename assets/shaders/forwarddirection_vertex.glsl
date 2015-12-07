

#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

attribute vec3  position;
attribute vec2  coord;
attribute vec3  normal;

varying vec2 vTextureCoord;
varying vec3 Normal0;
varying vec3 worldPos0;

struct  Transform
{
  mat4  worldMatrix;
  mat4  camMatrix;
  mat4  viewMatrix;
};


uniform  Transform transform;



 void main() {
    mat4 MVC= transform.viewMatrix * transform.camMatrix * transform.worldMatrix;
    gl_Position =MVC * vec4(position ,1) ;
    vTextureCoord=coord;
    Normal0=(transform.worldMatrix * vec4(normal ,0)).xyz; 
    worldPos0=(transform.worldMatrix * vec4(position ,1)).xyz;
}