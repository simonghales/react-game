/*
auto-generated by: https://github.com/react-spring/gltfjsx
*/

import * as THREE from 'three'
import React, { useEffect, useRef, useState } from 'react'
import { useLoader, useFrame } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useLoader(GLTFLoader, '/Cherry.glb')

  const actions = useRef()
  const [mixer] = useState(() => new THREE.AnimationMixer())
  useFrame((state, delta) => mixer.update(delta))
  useEffect(() => {
    actions.current = {
      CHERRY_Defeat: mixer.clipAction(animations[0], group.current),
      CHERRY_Idle: mixer.clipAction(animations[1], group.current),
      CHERRY_Run: mixer.clipAction(animations[2], group.current),
      CHERRY_Victory: mixer.clipAction(animations[3], group.current),
      CHERRY_Victory_2: mixer.clipAction(animations[4], group.current),
      CHERRY_Walking: mixer.clipAction(animations[5], group.current)
    }
    return () => animations.forEach(clip => mixer.uncacheClip(clip))
  }, [])

  return (
    <group ref={group} {...props} dispose={null}>
      <scene>
        <group scale={[7.01, 7.01, 7.01]}>
          <primitive object={} />
          <primitive object={} />
          <group>
            <skinnedMesh
              material={materials.Cherry}
              geometry={nodes.Icosphere_0.geometry}
              skeleton={nodes.Icosphere_0.skeleton}
            />
            <skinnedMesh
              material={materials.Stem}
              geometry={nodes.Icosphere_1.geometry}
              skeleton={nodes.Icosphere_1.skeleton}
            />
            <skinnedMesh
              material={materials.Black}
              geometry={nodes.Icosphere_2.geometry}
              skeleton={nodes.Icosphere_2.skeleton}
            />
          </group>
        </group>
        <group position={[0.88, 1.8, -1.41]}>
          <primitive object={} />
          <group>
            <skinnedMesh
              material={materials.BlackEyes}
              geometry={nodes['Cylinder.003_0'].geometry}
              skeleton={nodes['Cylinder.003_0'].skeleton}
            />
            <skinnedMesh
              material={materials.White}
              geometry={nodes['Cylinder.003_1'].geometry}
              skeleton={nodes['Cylinder.003_1'].skeleton}
            />
          </group>
        </group>
        <group position={[0.88, 1.8, 1.31]}>
          <primitive object={} />
          <group>
            <skinnedMesh
              material={materials.BlackEyes}
              geometry={nodes['Cylinder.001_0'].geometry}
              skeleton={nodes['Cylinder.001_0'].skeleton}
            />
            <skinnedMesh
              material={materials.White}
              geometry={nodes['Cylinder.001_1'].geometry}
              skeleton={nodes['Cylinder.001_1'].skeleton}
            />
          </group>
        </group>
      </scene>
    </group>
  )
}
