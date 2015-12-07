#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif



struct Material
{
    vec3 color;

};
struct BaseLight{
    vec3 color;
	float intensity;   
};

struct SpecularLight{
    BaseLight baseLight;
	float shiness;   
};


vec4 calSpeculation(SpecularLight light, vec3 direction, vec3 viewPos, vec3 worldPos, vec3 normal)
{
   vec4 result= vec4(0,0,0,0);
   vec3 viewDir = (viewPos - worldPos);
   vec3 reflectedDir = normalize(reflect(-direction, normal ));
   float spaculatComponent = pow(max(dot(viewDir,reflectedDir),0.0),light.shiness);
   result += vec4(light.baseLight.color * light.baseLight.intensity * spaculatComponent,1) ;
   return result;
}



varying vec3 Normal0;
varying  vec2 vTextureCoord;
varying vec3 worldPos0;
uniform vec3 camPosition;

uniform  Material material;
uniform sampler2D tex;
uniform DiffuseLight diffusedLight;

void main() {
    
   
     vec4 totalLight = vec4(0,0,0,0) ;
	 vec4  fragment_color =  texture2D(tex,vTextureCoord ) * vec4(material.color,1);
	 totalLight +=  calSpeculation(diffusedLight,worldPos0,Normal0);
	 gl_FragColor = fragment_color * totalLight; //fragment_color  ;	
	
   
  }