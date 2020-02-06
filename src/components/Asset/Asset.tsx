// @ts-nocheck
import React, { useEffect, useRef } from 'react'
import { useLoader } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

interface Props {
  url: string
}

const Asset: React.FC<Props> = ({ url, ...props }) => {
  // const group = useRef()

  const gltf = useLoader(GLTFLoader, url)

  useEffect(() => {
    console.log('gltf', gltf)
  }, [gltf])

  // return (
  //   <group ref={group} {...props}>
  //     <scene name="Scene">
  //       <object3D name="RootNode_(gltf_orientation_matrix)" rotation={[-1.5707963267948963, 0, 0]}>
  //         <object3D name="RootNode_(model_correction_matrix)">
  //           <object3D name="Root">
  //             <object3D
  //               name="planet001"
  //               position={[-0.0032900000000000013, 0.023690000000000006, -6.33114]}
  //               rotation={[0.23801904073457583, -0.5453875094307201, 0.5622765917510457]}
  //               scale={[7.0000020953568285, 6.999997807471086, 6.999999297157107]}
  //             >
  //               <mesh name="planet001">
  //                 <bufferGeometry attach="geometry" {...gltf.__$[5].geometry} />
  //                 <meshStandardMaterial attach="material" {...gltf.__$[5].material} name="scene" roughness={1} />
  //               </mesh>
  //               <mesh name="planet001" receiveShadow castShadow>
  //                 <bufferGeometry attach="geometry" {...gltf.__$[6].geometry} />
  //                 <meshStandardMaterial attach="material" {...gltf.__$[6].material} name="scene" roughness={1} />
  //               </mesh>
  //             </object3D>
  //           </object3D>
  //         </object3D>
  //       </object3D>
  //     </scene>
  //   </group>
  // )

  return <primitive object={gltf.scene} />
}

export default Asset
