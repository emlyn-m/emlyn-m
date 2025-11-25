'use client';

import React, { useState } from 'react';

import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { LuminosityShader } from 'three/addons/shaders/LuminosityShader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

import { SobelShader } from './SobelShader.js';
import { VertexId } from './shaders/vertex_shader';
import { FragQuantize, FragAscii } from './shaders/fragment_shader';


export interface WireframeProps {
    scale: number;
    pos: number[];
    objPath: string;
}

async function configureRenderer(sceneRef: HTMLDivElement|null, props: WireframeProps) {
    if (!sceneRef) { return; }

    const width = sceneRef.clientWidth;
    const height = sceneRef.clientHeight;
    const camera = new THREE.PerspectiveCamera( 100, width / height, 0.01, 10 );
    camera.position.z = 1;
    camera.position.y = .5;
    camera.rotation.x = -3.14/16;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff); 

    const loader = new OBJLoader();
    const _mesh = await loader.loadAsync( props.objPath );
    scene.add( _mesh );
    _mesh.position.set(props.pos[0], props.pos[1], props.pos[2]);
    _mesh.scale.set(props.scale, props.scale, props.scale);

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

    const quantizeMaterial = new THREE.ShaderMaterial( {
        uniforms: {
            resolution: { value: new THREE.Vector2(width, height) },
            tDiffuse: { value: null },
        },
        vertexShader: VertexId,
        fragmentShader: FragQuantize
    } );
    const quantizePass = new ShaderPass( quantizeMaterial );
    composer.addPass( quantizePass );

    const asciiMaterial = new THREE.ShaderMaterial( {
        uniforms: {
            time: { value: 1.0 },
            resolution: { value: new THREE.Vector2(width, height) },
            tDiffuse: { value: null }
        },
        vertexShader: VertexId,
        fragmentShader: FragAscii
    } );
    const asciiPass = new ShaderPass( asciiMaterial );
    composer.addPass( asciiPass );

    const outputPass = new OutputPass();
    composer.addPass( outputPass );

    function animate(time: number) {
        _mesh.rotation.y = time / 2000;

        composer.render();
    }
    renderer.setAnimationLoop( animate );

    window.addEventListener('resize', () => {

        const newWidth = sceneRef.clientWidth;
        const newHeight = sceneRef.clientHeight;

        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        sobelPass.uniforms.resolution.value.set(newWidth, newHeight);
        quantizePass.uniforms.resolution.value.set(newWidth, newHeight);
        asciiPass.uniforms.resolution.value.set(newWidth, newHeight);
        renderer.setSize(width, height);
        console.log(_mesh.scale);

        renderer.domElement.style.width = `${newWidth}px`;
        renderer.domElement.style.height = `${newHeight}px`;
        renderer.domElement.style.border = '10px solid red !important;';
        

    }, false);

    sceneRef.replaceChildren( renderer.domElement );
}


export default function Wireframe(props: WireframeProps) {

    const [ sceneRef, setSceneRef ] = useState<HTMLDivElement|null>(null);
    const [ renderConfigured, setRenderConfigured ] = useState<boolean>(false);


    if (sceneRef && !renderConfigured ) { 
        //...props, scale: props.scale * Math.min((sceneRef.clientWidth / 497), (sceneRef.clientHeight / 359))
        configureRenderer(sceneRef, props); 
        setRenderConfigured(true); 
    }


    return (
        <div ref={ newRef => setSceneRef(newRef) } className="w-full h-full overflow-hidden"></div>
    )
}