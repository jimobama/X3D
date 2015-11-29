

#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif


struct  Transform
{
  mat4  worldMatrix;
  mat4  camMatrix;
  mat4  viewMatrix;
};

attribute vec3 normalCoords;
attribute vec3  position;
attribute vec2  textCoord;



varying vec3 normal0;
varying vec2 vTextureCoord;
varying vec3 worldPos0;
uniform  mat4 transform;
uniform  mat4 projection;
Transform transform;



void main() {
  
    gl_Position =transform.viewMatrix * transform.camMatrix * transform.worldMatrix * vec4(position ,1) ;
    vTextureCoord=textCoord;
	normal0=  (transform.worldMatrix * vec4(normalCoords,0.0)).xyz;
	worldPos0=(transform.worldMatrix * vec4(position,1.0)).xyz;
  
	}