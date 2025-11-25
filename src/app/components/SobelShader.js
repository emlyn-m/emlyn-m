import * as THREE from 'three';

export const SobelShader = {

    uniforms: {
        "tDiffuse": { value: null },
        "resolution": { value: new THREE.Vector2() }
    },

    vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0 );
        }
    `,

    fragmentShader: `
        varying vec2 vUv;
        uniform sampler2D tDiffuse;
        uniform vec2 resolution;

        void main() {

            vec2 texel = 1.0 / resolution;

            float tl = texture2D(tDiffuse, vUv + texel * vec2(-1.0, -1.0)).r;
            float  l = texture2D(tDiffuse, vUv + texel * vec2(-1.0,  0.0)).r;
            float bl = texture2D(tDiffuse, vUv + texel * vec2(-1.0,  1.0)).r;

            float  t = texture2D(tDiffuse, vUv + texel * vec2( 0.0, -1.0)).r;
            float  b = texture2D(tDiffuse, vUv + texel * vec2( 0.0,  1.0)).r;

            float tr = texture2D(tDiffuse, vUv + texel * vec2( 1.0, -1.0)).r;
            float  r = texture2D(tDiffuse, vUv + texel * vec2( 1.0,  0.0)).r;
            float br = texture2D(tDiffuse, vUv + texel * vec2( 1.0,  1.0)).r;

            float Gx = -tl - 2.0*l - bl + tr + 2.0*r + br;
            float Gy = -tl - 2.0*t - tr + bl + 2.0*b + br;

            float mag = length(vec2(Gx, Gy));

            gl_FragColor = vec4(mag, Gx, Gy, 1.0);
        }
    `
};