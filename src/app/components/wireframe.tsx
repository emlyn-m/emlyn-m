'use client';

import React, { Ref, useRef, useState } from 'react';

import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { LuminosityShader } from 'three/addons/shaders/LuminosityShader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

import { SobelShader } from './SobelShader.js';

async function configureRenderer(sceneRef: HTMLDivElement|null) {
    if (!sceneRef) { return; }

    let width = sceneRef.clientWidth;
    let height = sceneRef.clientHeight;
    const camera = new THREE.PerspectiveCamera( 100, width / height, 0.01, 10 );
    camera.position.z = 1;

    const scene = new THREE.Scene();
    const geometry = new THREE.BoxGeometry( 0.7, .7, .7 );
    const material = new THREE.MeshNormalMaterial(); 
    scene.background = new THREE.Color(0xffffff); 
    const _mesh = new THREE.Mesh( geometry, material ); 
    scene.add( _mesh );
    const renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( width, height );
      
    const composer = new EffectComposer( renderer );
    const renderPass = new RenderPass( scene, camera );
    composer.addPass( renderPass );

    const lumaPass = new ShaderPass(LuminosityShader);
    composer.addPass(lumaPass);
    
    const sobelPass = new ShaderPass( SobelShader );
    sobelPass.uniforms.resolution.value.set(width, height);
    composer.addPass( sobelPass )

    const asciiMaterial = new THREE.ShaderMaterial( {
        uniforms: {
            time: { value: 1.0 },
            resolution: { value: new THREE.Vector2(width, height) },
            tDiffuse: { value: null }
        },
        vertexShader: /* glsl */`
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform sampler2D tDiffuse;
            varying vec2 vUv;
            uniform vec2 resolution;

            float luma(vec3 color) {
                return .7 * color.r + .2 * color.g + .1 * color.b;
            }

            float renderAngle(vec2 angle, vec2 pos) {

                const float margin = 0.1;
                if (pos.x < margin || pos.y < margin) { return 1.0; }

                pos -= vec2(0.5, 0.5);
                float adot = abs((pos.x * angle.x) + (pos.y * angle.y));
                if (adot < .1) { return 0.0; }

                return 1.0;
            }


            void main() {


                const int cell_size_px = 5;
                const float threshold = .1;

                int ncells_x = int(resolution.x) / cell_size_px;
                int ncells_y = int(resolution.y) / cell_size_px;
                
                int qpos_x = (int(vUv.x * resolution.x) / cell_size_px);
                int qpos_y = (int(vUv.y * resolution.y) / cell_size_px);

                float offset_x = float(int(vUv.x * resolution.x) - (qpos_x * cell_size_px)) / float(cell_size_px);
                float offset_y = float(int(vUv.y * resolution.y) - (qpos_y * cell_size_px)) / float(cell_size_px);

                vec3 sampled_angle = vec3(0,0,0);
                for (int i=0; i < cell_size_px; i++) {
                    for (int j=0; j < cell_size_px; j++) {
                        vec2 sample_point = vec2((float(qpos_x) + (float(i)/float(cell_size_px))) / float(ncells_x), (float(qpos_y) + (float(j)/float(cell_size_px))) / float(ncells_y));
                        vec3 csample = texture2D(tDiffuse, sample_point).rgb;
                        if (csample.r > threshold) {
                            sampled_angle = csample.rgb;
                        }
                    }
                }

                if (sampled_angle.r > 0.0) { sampled_angle /= sampled_angle.r; }
                else { gl_FragColor = vec4(1,1,1,1); return; }

                float rendered_color = renderAngle(vec2(sampled_angle.g, sampled_angle.b), vec2(offset_x, offset_y));
                gl_FragColor = vec4(rendered_color, rendered_color, rendered_color, 1.0);
            }
        `
    } );
    const asciiPass = new ShaderPass( asciiMaterial );
    composer.addPass( asciiPass );

    const outputPass = new OutputPass();
    composer.addPass( outputPass );

    function animate(time: any) {

        _mesh.rotation.x = time / 1000;
        _mesh.rotation.y = time / 2000;

        composer.render();
    }
    renderer.setAnimationLoop( animate );

    sceneRef.replaceWith( renderer.domElement );
}

export default function Wireframe() {

    let [ sceneRef, setSceneRef ] = useState<HTMLDivElement|null>(null);
    let [ renderConfigured, setRenderConfigured ] = useState<boolean>(false);
    if (sceneRef && !renderConfigured ) { configureRenderer(sceneRef); setRenderConfigured(true); }


    return (
        <div ref={ newRef => setSceneRef(newRef) } className="bg-cyan-100 w-full h-full"></div>
    )
}