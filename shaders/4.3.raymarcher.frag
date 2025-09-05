#version 430 core
out vec4 FragColor;

uniform float iTime;

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
    float radius = 5.0;
    float angle = iTime * 0.6;
    vec3 ro = vec3(radius*cos(angle), 0.6, radius*sin(angle));
    vec3 lookAt = vec3(0.0, 0.0, 0.0);
    vec3 rd = getRayDir(gl_FragCoord.xy, vec2(800,600), ro, lookAt, 1.0);

    FragColor = vec4(0.5, 1.0); // shade based on hit
}