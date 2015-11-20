

#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif



attribute vec3 normalCoords;
attribute vec3  position;
attribute vec2  textCoord;



varying vec3 normal0;
varying vec2 vTextureCoord;
varying vec3 worldPos0;


uniform  mat4 transform;
uniform  mat4 projection;


void main() {
    mat4 s= transform ;
    gl_Position =projection* vec4(position ,1) ;
    vTextureCoord=textCoord;
	normal0=  (transform * vec4(normalCoords,0.0)).xyz;
	worldPos0=(transform * vec4(position,1.0)).xyz;
   
	}