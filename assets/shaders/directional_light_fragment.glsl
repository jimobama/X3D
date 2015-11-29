#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
struct Material
{
    vec3 color;
	
};


varying  vec2 vTextureCoord;
uniform  Material material;
uniform sampler2D tex;
uniform vec3 ambientLight;

void main() {
     vec4 totalLight = vec4(ambientLight,1);
	 
     vec4 textureMaterial =texture2D(tex,vTextureCoord);
	 vec4  fragColor =  vec4(material.color,1);
	 if(textureMaterial !=vec4(0,0,0,1)){
	   
	   fragColor += textureMaterial;
     }	 
	 gl_FragColor = fragColor * totalLight  ;	
	
   
  }