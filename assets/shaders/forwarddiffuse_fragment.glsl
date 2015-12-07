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




struct DiffuseLight
{
 BaseLight baseLight;
 vec3 position;
};


struct SpecularLight{
    BaseLight baseLight;
	vec3 direction;
	float shiness;   
};

//Calculate the light reflection on the normal surface
vec4 calSpeculation(SpecularLight light , vec3 viewPos, vec3 fragPos, vec3 normal)
{
   vec4 result= vec4(0,0,0,0);
   vec3 viewDir =  normalize(viewPos - fragPos);
   vec3 reflectedDir =normalize(reflect(-light.direction,normal));
   float spaculatComponent = pow(max(dot(viewDir,reflectedDir),0.0),light.shiness);
   result += vec4(light.baseLight.color * light.baseLight.intensity * spaculatComponent,1) ;
   return result;
}

vec4 calDiffuseLight(DiffuseLight light, vec3 fragPos, vec3 normal)
{
  vec3 lightDir = normalize(light.position-fragPos);
  float diffImpact =max(dot(normal,lightDir),0.0);
 
  vec4  diffusedColor =  vec4(0,0,0,0);
  if(diffImpact>0.0)
     diffusedColor += vec4(light.baseLight.color,1) * light.baseLight.intensity * diffImpact ;
 
  return diffusedColor;
}


varying vec3 Normal0;
varying  vec2 vTextureCoord;
varying vec3 worldPos0;
uniform vec3 camPosition;

uniform  Material material;
uniform sampler2D tex;
uniform DiffuseLight diffusedLight;

void main() {
    
     SpecularLight slight;
	 slight.baseLight = diffusedLight.baseLight;
	 //get the vector between the fragpos and the light to get the direction of the light ray
	 slight.direction=(diffusedLight.position-worldPos0);
	 slight.shiness= 32.0;
	 
     vec4 totalLight = vec4(0,0,0,0) ;
	 vec4  fragment_color =  texture2D(tex,vTextureCoord,0.0001) + vec4(material.color,1);
	 totalLight +=  calDiffuseLight(diffusedLight,worldPos0,Normal0);
	 totalLight +=  calSpeculation(slight,camPosition,worldPos0, Normal0);
	  
	 //calculate the light specular tions
	
	  
	// totalLight += calSpeculation(SpecularLight light vec3 viewPos, vec3 fragPos, vec3 normal);
	 gl_FragColor = fragment_color * totalLight; //fragment_color  ;	
	
   
  }