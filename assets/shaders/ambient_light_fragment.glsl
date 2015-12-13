#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

struct BaseLight{
    vec3 color;
	float intensity;   
};

struct Material
{   vec3 ambient;
	vec3 specular;
	vec3  diffuse;
	float shiness;
	sampler2D am;
};


varying  vec2 vTextureCoord;
uniform  Material material;
uniform BaseLight baseLight;

uniform sampler2D tex;


void main() {
     vec4 totalLight = vec4(baseLight.color * material.ambient ,1) ;
	 
     vec4 textureMaterial =texture2D(tex,vTextureCoord);
	 if(textureMaterial !=vec4(0,0,0,1)){	   
	   totalLight += textureMaterial;
     }	 
	 gl_FragColor =totalLight  * baseLight.intensity;	
	
   
  }