uniform sampler2D uTexture;
uniform float uTime;
uniform float uDistortion;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  // UV distortion based on time and displacement amount
  vec2 distortedUv = vUv;
  distortedUv.x += sin(vUv.y * 10.0 + uTime) * uDistortion * 0.02;
  distortedUv.y += cos(vUv.x * 10.0 + uTime) * uDistortion * 0.02;

  vec4 texColor = texture2D(uTexture, distortedUv);

  // Rim lighting from normals
  vec3 viewDir = normalize(cameraPosition - vPosition);
  float rim = 1.0 - max(dot(viewDir, vNormal), 0.0);
  rim = pow(rim, 3.0);

  // Amber rim tint
  vec3 rimColor = vec3(0.91, 0.663, 0.302); // #e8a94d
  vec3 finalColor = texColor.rgb + rimColor * rim * 0.15;

  gl_FragColor = vec4(finalColor, texColor.a);
}
