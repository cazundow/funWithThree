import { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import earth8k from '../assets/8k_earth_daymap.jpg'
import earthNight from '../assets/earthlights1k.jpg'
import earthSpecular from '../assets/8k_earth_specular_map.jpg'
import cloadMap from '../assets/8k_earth_clouds.jpg'
import cloudsAlpha from '../assets/05_earthcloudmaptrans.jpg'
const Earth = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
    if(canvasRef.current && containerRef.current){
      const scene = new THREE.Scene(); 
      const camera = new THREE.PerspectiveCamera(
        75, 
        containerRef.current.clientWidth / containerRef.current.clientHeight, 
        0.1,
        10
      )
      camera.position.z = 2;
      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current, 
        antialias: true
      })
      renderer.setSize(containerRef.current.clientWidth , containerRef.current.clientHeight)
      containerRef.current.appendChild(renderer.domElement); 

    //   const ambientLight = new THREE.AmbientLight(0xffffff, 1); 
    //   ambientLight.castShadow = true; 
    //   scene.add(ambientLight); 
       
      const directionLight = new THREE.DirectionalLight(0xffffff, 0.5)
      directionLight.position.set(-2, 0.5,1.5); 
      scene.add(directionLight)


    //   const hemLights = new THREE.HemisphereLight(0xfffff); 
    //   scene.add(hemLights)
      const earthGroup = new THREE.Group();
      earthGroup.rotation.z = 23.4 * Math.PI / 180
      scene.add(earthGroup)
      // const boxGeometry = new THREE.BoxGeometry(16,16,16); 
      // const boxMaterial = new THREE.MeshNormalMaterial();
      // const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial); 
      // scene.add(boxMesh)
      const loader = new THREE.TextureLoader()
      const geo = new THREE.IcosahedronGeometry(0.5, 12); 
      const mat = new THREE.MeshPhongMaterial({
        map: loader.load(earth8k), 
        specularMap: loader.load(earthSpecular)

      })
      const earth = new THREE.Mesh(geo, mat)
      earthGroup.add(earth);

    const lightsMat = new THREE.MeshBasicMaterial({
        map: loader.load(earthNight),
        blending: THREE.AdditiveBlending,
    });
    const lightsMesh = new THREE.Mesh(geo, lightsMat);
    earthGroup.add(lightsMesh);
    
    const cloudsMat = new THREE.MeshStandardMaterial({
    map: loader.load(cloadMap),
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    alphaMap: loader.load(cloudsAlpha),
    alphaTest: 0.3,
    });
    const cloudsMesh = new THREE.Mesh(geo, cloudsMat);
    cloudsMesh.scale.setScalar(1.003);
    earthGroup.add(cloudsMesh);

      const controls = new OrbitControls(camera, renderer.domElement);
 

      const animate = (t = 0) => {
        window.requestAnimationFrame(animate)
        // mesh.rotation.x += 0.01; 
        // mesh.rotation.y += 0.01;
        earthGroup.rotation.y += 0.002
        // lightsMesh.rotation.y += 0.002;
        cloudsMesh.rotation.y += 0.0023;
        controls.update();
        renderer.render(scene, camera); 
        
      }
      animate()
    }
  }, [canvasRef.current, containerRef.current])

  return (
    <div ref={containerRef} className='bg-red-500 w-full h-full'>
        <canvas ref={canvasRef} id='canvas'/>
      </div>
  )
}

export default Earth