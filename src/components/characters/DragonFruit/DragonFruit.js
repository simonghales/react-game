// Auto-generated by https://github.com/react-spring/gltfjsx

import * as THREE from 'three'
import React, { useEffect, useRef, useState } from 'react'
import { useLoader, useFrame } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function DragonFruit(props) {
  const group = useRef()
  const { nodes, materials, animations } = useLoader(GLTFLoader, '/DragonFruit.glb')

  const actions = useRef()
  const [mixer] = useState(() => new THREE.AnimationMixer())
  useFrame((state, delta) => mixer.update(delta))
  useEffect(() => {
    actions.current = {
      DRAGON_Defeat: mixer.clipAction(animations[0], group.current),
      DRAGON_Idle: mixer.clipAction(animations[1], group.current),
      DRAGON_Run: mixer.clipAction(animations[2], group.current),
      DRAGON_Victory: mixer.clipAction(animations[3], group.current),
      DRAGON_Victory_2: mixer.clipAction(animations[4], group.current),
      DRAGON_Walking: mixer.clipAction(animations[5], group.current)
    }
    actions.current.DRAGON_Idle.play()
    return () => animations.forEach(clip => mixer.uncacheClip(clip))
  }, [])

  return (
    <group ref={group} {...props} dispose={null}>
      <scene name="Scene">
        <group name="HumanArmature" scale={[7.01, 7.01, 7.01]}>
          <primitive object={nodes.Bone} />
          <group name="Sphere">
            <skinnedMesh
              material={materials['Material.003']}
              geometry={nodes.Sphere_0.geometry}
              skeleton={nodes.Sphere_0.skeleton}
              name="Sphere_0"
            />
            <skinnedMesh
              material={materials['Material.004']}
              geometry={nodes.Sphere_1.geometry}
              skeleton={nodes.Sphere_1.skeleton}
              name="Sphere_1"
            />
            <skinnedMesh
              material={materials['Material.011']}
              geometry={nodes.Sphere_2.geometry}
              skeleton={nodes.Sphere_2.skeleton}
              name="Sphere_2"
            />
          </group>
        </group>
        <group name="EyeArmature" position={[0, 3.87, 0]}>
          <primitive object={nodes.Bone} />
          <group name="Eyes">
            <skinnedMesh
              material={materials['Material.013']}
              geometry={nodes['Cylinder.001_0'].geometry}
              skeleton={nodes['Cylinder.001_0'].skeleton}
              name="Cylinder.001_0"
            />
            <skinnedMesh
              material={materials['Material.012']}
              geometry={nodes['Cylinder.001_1'].geometry}
              skeleton={nodes['Cylinder.001_1'].skeleton}
              name="Cylinder.001_1"
            />
          </group>
        </group>
      </scene>
    </group>
  )
}