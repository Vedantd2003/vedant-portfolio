uniform float uTime;
uniform float uDisplacement;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

// Simple hash-based noise
float hash(vec3 p) {
  p = fract(p * 0.3183099 + 0.1);
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

// Smooth noise
float noise(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  vec3 u = f * f * (3.0 - 2.0 * f);

  return mix(
    mix(mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), u.x),
        mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), u.x), u.y),
    mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), u.x),
        mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), u.x), u.y),
    u.z
  );
}

void main() {
  vUv = uv;
  vNormal = normal;

  // Compute displacement along normal
  float n = noise(position * 1.5 + uTime * 0.3);
  float displacement = n * uDisplacement;

  vec3 displacedPosition = position + normal * displacement;
  vPosition = displacedPosition;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPosition, 1.0);
}
