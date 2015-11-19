#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

struct Material{
   vec3 color;
   sampler2D texture;

};

struct Light 
{
   vec3 position;
   float intensity;
};



varying  vec2 vTextureCoord;
uniform sampler2D texture;
uniform vec3 color;




void main() {

     vec4 texture =texture2D(texture,vTextureCoord);
	 vec4  fragment_color =  vec4(color,1);
	 if(texture !=vec4(0,0,0,1)){
	   fragment_color =  texture  * fragment_color;	
     }	 
	 gl_FragColor = fragment_color  ;	
	
   
  }