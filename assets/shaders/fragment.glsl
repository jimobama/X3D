
precision highp float;
varying highp vec2 vTextureCoord;
uniform vec3 mColor;

      
uniform sampler2D uSampler;


void main() {

   
	
    gl_FragColor = texture2D(uSampler,vec2(vTextureCoord.s, vTextureCoord.t))  ;
  }