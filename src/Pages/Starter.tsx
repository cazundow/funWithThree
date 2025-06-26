import { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
const starter = () => {
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

      // const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); 
      // ambientLight.castShadow = true; 
      // scene.add(ambientLight); 

      const spotLight = new THREE.SpotLight(0xffffff, 1); 
      spotLight.castShadow = true; 
      scene.add(spotLight)

      const hemLights = new THREE.HemisphereLight(0xfffff, 0x000000); 
      scene.add(hemLights)

      // const boxGeometry = new THREE.BoxGeometry(16,16,16); 
      // const boxMaterial = new THREE.MeshNormalMaterial();
      // const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial); 
      // scene.add(boxMesh)
      const geo = new THREE.IcosahedronGeometry(1.0, 2)
      const mat = new THREE.MeshStandardMaterial({
        color: 0xccff, 
        flatShading: true
      })
      const mesh = new THREE.Mesh(geo, mat)
      scene.add(mesh);

      const wireMat = new THREE.MeshBasicMaterial({
        color: 0xffffff, 
        wireframe: true
      })

      const wireMesh = new THREE.Mesh(geo, wireMat);
      mesh.add(wireMesh)

      const controls = new OrbitControls(camera, renderer.domElement);
 

      const animate = (t = 0) => {
        // mesh.rotation.x += 0.01; 
        // mesh.rotation.y += 0.01;
        mesh.rotation.y = t * 0.0001
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

export default starter