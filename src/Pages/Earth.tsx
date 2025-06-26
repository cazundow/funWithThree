import { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import earth8k from '../assets/8k_earth_daymap.jpg'
import moonmap from '../assets/moonmap4k.jpg'
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
       
      const directionLight = new THREE.DirectionalLight(0xffffff)
      directionLight.position.set(-2, 0.5,1.5); 

      scene.add(directionLight)

    //   const spotLight = new THREE.SpotLight(0xffffff, 1); 
    //   spotLight.castShadow = true; 
    //   scene.add(spotLight)

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
      const mat = new THREE.MeshStandardMaterial({
        map: loader.load(earth8k), 
      })
      const earth = new THREE.Mesh(geo, mat)
      earthGroup.add(earth);

    //   const wireMat = new THREE.MeshBasicMaterial({
    //     color: 0xffffff, 
    //     wireframe: true
    //   })

    //   const wireMesh = new THREE.Mesh(geo, wireMat);
    //   earth.add(wireMesh)

      const controls = new OrbitControls(camera, renderer.domElement);
 

      const animate = (t = 0) => {
        // mesh.rotation.x += 0.01; 
        // mesh.rotation.y += 0.01;
        earthGroup.rotation.y = t * 0.0005
        controls.update();
        renderer.render(scene, camera); 
        window.requestAnimationFrame(animate)
      }
      animate()
    }
  }, [canvasRef, containerRef.current])

  return (
    <div ref={containerRef} className='bg-red-500 w-full h-full'>
        <canvas ref={canvasRef} id='canvas'/>
      </div>
  )
}

export default Earth