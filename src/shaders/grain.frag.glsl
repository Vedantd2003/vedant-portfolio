precision highp float;

uniform float uTime;
uniform vec2 uResolution;

varying vec2 vUv;

// Hash-based pseudo-random function
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

// Film grain noise
float grain(vec2 uv, float t) {
  vec2 uvScaled = uv * uResolution;
  float noise = hash(uvScaled + vec2(t * 0.1, t * 0.17));
  return noise;
}

void main() {
  float g = grain(vUv, uTime);

  // Map 0-1 grain to -0.5..0.5 centered noise
  float grainValue = (g - 0.5) * 2.0;

  gl_FragColor = vec4(vec3(grainValue), 1.0);
}
