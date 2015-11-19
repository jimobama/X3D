#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif


struct BaseLight{
    vec3 color;
	float intensity;   
};

struct DirectionLight
{
 BaseLight baseLight;
 vec3 direction;
};



varying vec3 normal0;
varying vec3 basicColor0;
uniform vec3 ambientLight;
varying  vec2 vTextureCoord;
varying vec3 worldPos0;
uniform sampler2D texture;
uniform vec3 camPosition;
uniform float specularIntensity;
uniform float specularExponent;

uniform DirectionLight directionLight;
vec4 calcLight(BaseLight light, vec3 direction , vec3 normal)
{
  float diffusedFactor = dot(normal,-direction) ;
  
  vec4  diffusedColor =  vec4(0,0,0,0);
  vec4 specularColor =vec4(0,0,0,0);
   
  if( diffusedFactor > 0.0 )
  {
      diffusedColor = vec4(light.color,1) * light.intensity * diffusedFactor;
	  vec3 directionToEye = normalize(camPosition - worldPos0);
	  vec3 reflection = normalize(reflect(-direction,normal));
	  
	  float specularFactor = dot(reflection ,directionToEye);
	  specularFactor= pow(specularFactor,specularExponent);
	 
	  if(specularFactor > 0.0)
	  {
	     specularColor = vec4(light.color,1)* specularIntensity* specularFactor;
	  
	  }
  }
  return diffusedColor + specularColor;
}

vec4 calcDirectionLight (DirectionLight directionLight, vec3 normal)
{
  return calcLight(directionLight.baseLight,directionLight.direction ,normal);
}




void main() {



     vec4 totalLight =vec4(ambientLight,1) ;
     vec4 texture =texture2D(texture,vTextureCoord);
	  vec4  fragment_color =  vec4(basicColor0,1);
	 if(texture !=vec4(0,0,0,1)){
	   fragment_color =  texture  * fragment_color;	
     }	 
	 totalLight +=  calcDirectionLight(directionLight,normal0);
	 gl_FragColor = fragment_color * totalLight  ;	
	
   
  }