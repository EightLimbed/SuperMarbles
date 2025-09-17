#version 430 core
out vec4 FragColor;

// player position
uniform float pPosX;
uniform float pPosY;
uniform float pPosZ;

//player direction
uniform float pDirX;
uniform float pDirY;
uniform float pDirZ;

float getPlanet(vec3 p) {
    vec3 s = vec3(0.5,0.5,0.5);
    vec3 ID = round(p/s);
    vec3 q = p - s*clamp(ID,-3.0,3.0);
    return length(q)-0.1;
}

// camera shizzle
vec3 getRayDir(vec2 fragCoord, vec2 res, vec3 lookAt, float zoom) {
    vec2 uv = (fragCoord - 0.5 * res) / res.y;
    vec3 f = normalize(lookAt);
    vec3 r = normalize(cross(vec3(0,1,0), f));
    vec3 u = cross(f,r);
    return normalize(f + zoom * (uv.x*r + uv.y*u));
}

float lightMarch(vec3 ro, vec3 lightPos) {
    vec3 rd = normalize(lightPos-ro);
    float t = 0.0;
    for (int i = 0; i < 128; i++) {
        vec3 p = ro + t * rd;
        float d = getPlanet(p);
        float tL = length(lightPos-p);
        if (d < 0.0001) return (t+tL)+1.0; // ray hits something before light source
        if (tL<d) return (t+tL); // ray intersects light source
        if (t > 40.0) return (t+tL); // ray travels too far
        t += d;
    }
}

// main raymarching loop
void main() {
    // camera setup
    FragColor = vec4(0.0);
    vec3 ro = vec3(pPosX,pPosY,pPosZ);
    vec3 lookAt = vec3(pDirX, pDirY, pDirZ);
    vec3 rd = getRayDir(gl_FragCoord.xy, vec2(800,600), lookAt, 1.0);

    float t = 0.0;

    for (int i = 0; i < 128; i++) {
        vec3 p = ro + t * rd;
        float d = getPlanet(p);
        if (d < 0.001) {
            // does lighting if hits
            float tL = lightMarch(p, vec3(3.5));
            //FragColor = vec4(vec3(tL,tL,tL),1.0);
            FragColor = vec4(vec3(0.7,1.0,1.0)-vec3(tL/10.0),1.0);
            break;
        }
        t += d;
        if (t > 40.0) break;
    }
}