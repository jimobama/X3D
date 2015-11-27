#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
const int MAX_POINT_LIGHT=4;
#ifndef FALSE
#define FALSE 0;
#endif
#ifndef TRUE
#define TRUE 1
#endif

uniform vec3 camPosition;
varying vec3 worldPos0;

struct BaseLight{
    vec3 color;
	float intensity;   
};

struct DirectionLight
{
 BaseLight baseLight;
 vec3 direction;
};
//hold information how quickly light turn off
struct Attenuation
{
	float constant;
	float linear;
	float exponent;
};

struct PointLight
{
	
	BaseLight baseLight;
	Attenuation attenu;
	vec3 position;
	
};

struct Material
{
	
	vec3 color;
	vec3 ambientColor;
	float specularIntensity;
    float specularExponent;
	
};


float  getDiffuseIntenistyColor(vec3 normal, vec3 direction){
	
	float cos = dot(normal,direction);
	return  max(cos,0.0);
	
}

vec3 getLightDirection(vec3 positionOfLight, vec3 wordPos)
{
	vec3 direction = positionOfLight - wordPos;
	return direction;
	
}


//calculate the Light basic
vec4 calcLight(BaseLight light, vec3 direction , vec3 normal, Material material)
{
  float intensity =getDiffuseIntenistyColor(normal,direction);
  
  
  vec4  diffusedColor =  vec4(0,0,0,0);
  vec4 specularColor =vec4(0,0,0,0);
  
  if( intensity  > 0.0 )
  {
      diffusedColor = vec4(light.color,1) * intensity * light.intensity;
	  vec3 directionToEye = normalize(camPosition - worldPos0);
	  vec3 reflection = normalize(reflect(direction,normal));
	  
	  float specularFactor = dot(reflection ,directionToEye);
	  specularFactor= pow(specularFactor,material.specularExponent);
	 
	  if(specularFactor > 0.0)
	  {
	     specularColor += vec4(light.color,1) * material.specularIntensity * specularFactor;
	  
	  }
  }
  return diffusedColor + specularColor;
}

vec4 calcDirectionLight (DirectionLight directionLight, vec3 normal,Material material)
{
	
  return calcLight(directionLight.baseLight,directionLight.direction ,normal,material);
}

vec4 calPointLight (PointLight light, vec3 normal,Material material)
{
	
	vec3 lightDirection = getLightDirection(light.position,worldPos0 );
	float distanceToPoint = length(lightDirection);
	lightDirection= normalize(lightDirection);
	vec4 color = calcLight(light.baseLight,lightDirection,normal, material);
	//calculate the attenuation
	float attenuation = light.attenu.constant  +  distanceToPoint
	                    * light.attenu.linear + light.attenu.exponent * distanceToPoint * distanceToPoint + 0.00001;
						
	return  color / attenuation;					
}


int isEmpty(vec4 empty) {
	
	if(empty == vec4(0,0,0,1) || empty==vec4(0,0,0,0))
		return TRUE;
	return FALSE;
	
}
uniform  sampler2D texture;
uniform Material material;
uniform PointLight pointLights[MAX_POINT_LIGHT];
uniform DirectionLight directionLight;
varying vec3 normal0;
uniform vec3 ambientLight;
varying  vec2 vTextureCoord;





void main() {


     vec3 d= ambientLight;
     vec4 totalLight = vec4(material.ambientColor,1) ;
	 vec4  fragment_color =  vec4(material.color,1);
	 vec4 test=vec4(0,0,0,0);
     vec4 textureMaterial =texture2D(texture,vTextureCoord);
	 //check if the texturematerial is null
	 if(textureMaterial !=vec4(0,0,0,1) && textureMaterial !=vec4(0,0,0,0) ){		 
	   textureMaterial +=  fragment_color ;	
	   fragment_color = textureMaterial;
     }	 
	 totalLight +=  calcDirectionLight(directionLight,normal0,material);
	 
	 for(int i=0; i < MAX_POINT_LIGHT ; i++ )
	 {
		totalLight += calPointLight(pointLights[i],normal0,material);
	 }
	 
	
	gl_FragColor = fragment_color * totalLight; //fragment_color  ;	
	
   
  }