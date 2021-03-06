// Auto-generated by https://github.com/react-spring/gltfjsx

import * as THREE from 'three'
import React, { useEffect, useRef, useState } from 'react'
import { useLoader, useFrame } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { blackMaterial, brownMaterial, whiteMaterial, yellowMaterial } from '../../../threejs/materials'

export default function Banana({ walking, ...props }) {
  const group = useRef()
  const gltf = useLoader(GLTFLoader, '/Banana.glb')
  const { nodes, materials, animations } = gltf

  const actions = useRef()
  const [mixer] = useState(() => new THREE.AnimationMixer())
  useFrame((state, delta) => mixer.update(delta))
  useEffect(() => {
    actions.current = {
      BANANA_Defeat: mixer.clipAction(animations[0], group.current),
      BANANA_Defeat_2: mixer.clipAction(animations[1], group.current),
      BANANA_Idle: mixer.clipAction(animations[2], group.current),
      BANANA_Run: mixer.clipAction(animations[3], group.current),
      BANANA_Victory: mixer.clipAction(animations[4], group.current),
      BANANA_Victory_2: mixer.clipAction(animations[5], group.current),
      BANANA_Walking: mixer.clipAction(animations[6], group.current)
    }
    return () => animations.forEach(clip => mixer.uncacheClip(clip))
  }, [])

  useEffect(() => {
    mixer.stopAllAction()
    if (walking) {
      actions.current.BANANA_Walking.play()
    } else {
      actions.current.BANANA_Idle.play()
    }
  }, [walking])

  return (
    <group ref={group} position={[0, 0, 0]} {...props} dispose={null}>
      <scene name="Scene">
        <group name="HumanArmature" scale={[0.8, 0.8, 0.8]}>
          <primitive object={nodes.Bone} />
          <group name="Banana">
            <skinnedMesh
              receiveShadow
              castShadow
              material={yellowMaterial}
              geometry={nodes['Cylinder.012_0'].geometry}
              skeleton={nodes['Cylinder.012_0'].skeleton}
              name="Cylinder.012_0"
            />
            <skinnedMesh
              receiveShadow
              castShadow
              material={brownMaterial}
              geometry={nodes['Cylinder.012_1'].geometry}
              skeleton={nodes['Cylinder.012_1'].skeleton}
              name="Cylinder.012_1"
            />
            <skinnedMesh
              receiveShadow
              castShadow
              material={blackMaterial}
              geometry={nodes['Cylinder.012_2'].geometry}
              skeleton={nodes['Cylinder.012_2'].skeleton}
              name="Cylinder.012_2"
            />
            <skinnedMesh
              receiveShadow
              castShadow
              material={whiteMaterial}
              geometry={nodes['Cylinder.012_3'].geometry}
              skeleton={nodes['Cylinder.012_3'].skeleton}
              name="Cylinder.012_3"
            />
          </group>
        </group>
      </scene>
    </group>
  )
}
