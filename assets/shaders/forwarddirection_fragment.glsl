#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

varying vec3 Normal0;
varying  vec2 vTextureCoord;
varying vec3 worldPos0;
uniform vec3 camPosition;

struct Material
{
    vec3 color;
	float  specularIntensity;
   float specularExponent;
};
struct BaseLight{
    vec3 color;
	float intensity;   
};

struct SpecularLight{
    BaseLight baseLight;
	float shiness;   
};


struct DirectionLight
{
 BaseLight baseLight;
 vec3 direction;
};




vec4 getDiffuseColor(BaseLight light, vec3 direction , vec3 normal, Material material)
{	
  float diffImpact =max(dot(normal,direction),0.0);
  vec4  diffusedColor =  vec4(0,0,0,0);
  vec4 specularColor =vec4(0,0,0,0);
  //calculate the light color
  diffusedColor = vec4(light.color,1) * light.intensity * diffImpact ;
  return diffusedColor;
}
vec4 getSpeculation(SpecularLight light, vec3 direction, vec3 viewPos, vec3 worldPos, vec3 normal)
{
vec4 result= vec4(0,0,0,0);

   vec3 viewDir = (viewPos - worldPos);
   vec3 reflectedDir =(-direction, normal );
   float spaculatComponent = pow(max(dot(viewDir,reflectedDir),0.0),light.shiness);
   result += light.baseLight.color * light.baseLight.intensity * spaculatComponent ;
   return result;
}


vec4 calcDirectionLight (DirectionLight directionLight, vec3 normal,Material material)
{
	
  return getDiffuseColor(directionLight.baseLight,directionLight.direction ,normal,material);
}





uniform  Material material;
uniform sampler2D tex;
uniform DirectionLight directionLight;

void main() {
    
   
     vec4 totalLight = vec4(0,0,0,0) ;
	 vec4  fragment_color =  texture2D(tex,vTextureCoord ) * vec4(material.color,1);
	 totalLight +=  calcDirectionLight(directionLight,Normal0,material);
	 gl_FragColor = fragment_color * totalLight; //fragment_color  ;	
	
   
  }