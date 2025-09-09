#version 430 core
out vec4 FragColor;

uniform float pPosX;
uniform float pPosY;
uniform float pPosZ;

float getPlanet(vec3 p) {
    return length(p)-1.0;
}

// camera shizzle
vec3 getRayDir(vec2 fragCoord, vec2 res, vec3 ro, vec3 lookAt, float zoom) {
    vec2 uv = (fragCoord - 0.5 * res) / res.y;
    vec3 f = normalize(lookAt - ro);
    vec3 r = normalize(cross(vec3(0,1,0), f));
    vec3 u = cross(f,r);
    return normalize(f + zoom * (uv.x*r + uv.y*u));
}

void main() {
    // camera setup
    FragColor = vec4(0.0);
    vec3 ro = vec3(pPosX,pPosY,pPosZ)*0.05;
    vec3 lookAt = vec3(0.0, 0.0, 0.0);
    vec3 rd = getRayDir(gl_FragCoord.xy, vec2(800,600), ro, lookAt, 1.0);

    float t = 0.0;

    for (int i = 0; i < 128; i++) {
        vec3 p = ro + t * rd;
        float d = getPlanet(p);
        if (d < 0.001) {
            FragColor = vec4(vec3(0.7,1.2,1.2)-vec3(t/5.0),1.0);
            break;
        }
        t += d;
        if (t > 40.0) break;
    }
}