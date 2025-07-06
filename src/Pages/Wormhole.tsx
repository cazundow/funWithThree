import React, {useEffect, useRef} from 'react'
import * as THREE from 'three'

const Wormwhole = () => {
  const containerRef = useRef<HTMLDivElement>(null); 
  const canvasRef = useRef<HTMLCanvasElement>(null)

  
  useEffect(() => {
    if(canvasRef.current && containerRef.current) {
      const scene = new THREE.Scene(); 
      const camera = new THREE.PerspectiveCamera(
        75, 
        containerRef.current.clientWidth / containerRef.current.clientHeight, 
        0.1,
        1000
       );
       const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current, 
        antialias: true
       })
       renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
      containerRef.current.appendChild(renderer.domElement)

      const hemLights = new THREE.HemisphereLight(0xfffff, 0x444444); 
      scene.add(hemLights)

      const directionLight = new THREE.DirectionalLight(0xffffff, 0.5)
            scene.add(directionLight)

      const boxGeometry = new THREE.BoxGeometry(16,16,16); 
      const boxMaterial = new THREE.MeshNormalMaterial();
      const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial); 
      scene.add(boxMesh)

      const animate = (t = 0) => {
        window.requestAnimationFrame(animate)
        
        renderer.render(scene, camera); 
        
      }
      animate()

    }

  }, [canvasRef, containerRef.current])
  return (
    <div className='bg-red-500 w-full h-full' ref={containerRef}>
    <canvas ref={canvasRef} id='canvas' />
    </div>
  )
}

export default Wormwhole