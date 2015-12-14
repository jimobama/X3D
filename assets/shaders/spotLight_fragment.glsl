
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

struct Attenuation
{
	float constant;
	float linear;
	float exponent;
};

struct Material
{   vec3 ambient;
	vec3 specular;
	vec3  diffuse;
	float shiness;
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
};

struct SpotLight
{
  vec3 position;
  Attenuation attenu;
  BaseLight baseLight;
};

//Calculate the light reflection on the normal surface
vec4 calSpeculation(Material material, SpecularLight light , vec3 viewPos, vec3 fragPos, vec3 normal)
{
   vec4 result= vec4(0,0,0,0);
   vec3 viewDir =  normalize(viewPos - fragPos);
   vec3 reflectedDir =normalize(reflect(-light.direction,normal));
   float spaculatComponent = pow(max(dot(viewDir,reflectedDir),0.0),material.shiness);
   result += vec4(light.baseLight.color * light.baseLight.intensity * spaculatComponent,1) ;
   return  (result  * vec4(material.specular,1));
}

vec4 calDiffuseLight(Material material,DiffuseLight light, vec3 fragPos, vec3 normal)
{
  vec3 lightDir = normalize(light.position-fragPos);
  float diffImpact =max(dot(normal,lightDir),0.0);
  vec4  diffusedColor =  vec4(0,0,0,0);
  if(diffImpact>0.0)
     diffusedColor += vec4(light.baseLight.color,1) * light.baseLight.intensity * diffImpact ;
 
  return diffusedColor * vec4(material.diffuse,1);
}


vec4 calSpotLight (Material material,SpotLight light, vec3 viewPos, vec3 fragPos, vec3 normal){

	float dist =  distance(fragPos - light.position);
	
	float reduce =   light.baseLight.intensity 

  //calculate for the diffused
  DiffuseLight diffuseLight;
  diffuseLight.baseLight = light.baseLight;
  //infinte direction
  diffuseLight.position= normalize(fragPos + vec3(-light.direction));
  vec4 diffuseColor=calDiffuseLight(material,diffuseLight,fragPos,normal);
  
  //calculate Specular Light
   SpecularLight specularLight ;
   specularLight.baseLight = light.baseLight;
   specularLight.direction =normalize(light.direction);
   vec4 specularColor= calSpeculation(material,specularLight,viewPos,fragPos, normal);
  
  return specularColor + diffuseColor;
  
}
varying vec3 Normal0;
varying  vec2 vTextureCoord;
varying vec3 worldPos0;
uniform vec3 camPosition;

uniform  Material material;
uniform sampler2D tex;
uniform SpotLight spotLight;
void main() {
	 
     vec4 totalLight = vec4(0,0,0,0) ;
	  vec4  fragment_color =  texture2D(tex,vTextureCoord) * vec4(material.ambient,1);
	 totalLight =  calSpotLight(material,spotLight, camPosition, worldPos0,Normal0) ;//calDiffuseLight(material,diffusedLight,worldPos0,Normal0);
	 if(fragment_color != vec4(0,0,0,1)){
	    totalLight += fragment_color;
	   }
	 gl_FragColor = totalLight; //fragment_color  ;	
	
   
  }