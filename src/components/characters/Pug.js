// Auto-generated by https://github.com/react-spring/gltfjsx

import * as THREE from 'three'
import React, { useEffect, useRef, useState } from 'react'
import { useLoader, useFrame } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function Pug(props) {
  const group = useRef()
  const { nodes, materials, animations } = useLoader(GLTFLoader, '/Pug.glb')

  const actions = useRef()
  const [mixer] = useState(() => new THREE.AnimationMixer())
  useFrame((state, delta) => mixer.update(delta))
  useEffect(() => {
    actions.current = {
      Idle: mixer.clipAction(animations[0], group.current),
      PickUp: mixer.clipAction(animations[1], group.current),
      Punch: mixer.clipAction(animations[2], group.current),
      RecieveHit: mixer.clipAction(animations[3], group.current),
      Run: mixer.clipAction(animations[4], group.current),
      SitDown: mixer.clipAction(animations[5], group.current),
      Walk: mixer.clipAction(animations[6], group.current)
    }
    actions.current.Idle.play()
    return () => animations.forEach(clip => mixer.uncacheClip(clip))
  }, [])

  return (
    <group ref={group} {...props} dispose={null}>
      <scene name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Bone} />
          <group name="Body">
            <skinnedMesh
              material={materials.Skin}
              geometry={nodes['Cube.004_0'].geometry}
              skeleton={nodes['Cube.004_0'].skeleton}
              name="Cube.004_0"
            />
            <skinnedMesh
              material={materials.Black}
              geometry={nodes['Cube.004_1'].geometry}
              skeleton={nodes['Cube.004_1'].skeleton}
              name="Cube.004_1"
            />
            <skinnedMesh
              material={materials.Belt}
              geometry={nodes['Cube.004_2'].geometry}
              skeleton={nodes['Cube.004_2'].skeleton}
              name="Cube.004_2"
            />
            <skinnedMesh
              material={materials.Shirt}
              geometry={nodes['Cube.004_3'].geometry}
              skeleton={nodes['Cube.004_3'].skeleton}
              name="Cube.004_3"
            />
            <skinnedMesh
              material={materials.Details}
              geometry={nodes['Cube.004_4'].geometry}
              skeleton={nodes['Cube.004_4'].skeleton}
              name="Cube.004_4"
            />
            <skinnedMesh
              material={materials.Face}
              geometry={nodes['Cube.004_5'].geometry}
              skeleton={nodes['Cube.004_5'].skeleton}
              name="Cube.004_5"
            />
            <skinnedMesh
              material={materials.Beige}
              geometry={nodes['Cube.004_6'].geometry}
              skeleton={nodes['Cube.004_6'].skeleton}
              name="Cube.004_6"
            />
            <skinnedMesh
              material={materials.Brown}
              geometry={nodes['Cube.004_7'].geometry}
              skeleton={nodes['Cube.004_7'].skeleton}
              name="Cube.004_7"
            />
          </group>
        </group>
      </scene>
    </group>
  )
}
