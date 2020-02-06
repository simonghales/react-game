// Auto-generated by https://github.com/react-spring/gltfjsx

import * as THREE from 'three'
import React, { useEffect, useRef, useState } from 'react'
import { useLoader, useFrame } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useLoader(GLTFLoader, '/Knight_Male.glb')

  const actions = useRef()
  const [mixer] = useState(() => new THREE.AnimationMixer())
  useFrame((state, delta) => mixer.update(delta))
  useEffect(() => {
    actions.current = {
      Punch: mixer.clipAction(animations[0], group.current),
      SitDown: mixer.clipAction(animations[1], group.current),
      Walk: mixer.clipAction(animations[2], group.current),
      Idle: mixer.clipAction(animations[3], group.current),
      Run: mixer.clipAction(animations[4], group.current),
      PickUp: mixer.clipAction(animations[5], group.current),
      RecieveHit: mixer.clipAction(animations[6], group.current)
    }
    return () => animations.forEach(clip => mixer.uncacheClip(clip))
  }, [])

  return (
    <group ref={group} {...props} dispose={null}>
      <scene name="Scene">
        <group name="CharacterArmature">
          <group name="Bone" position={[0, 0, 0]} rotation={[0, 0, 0]}>
            <group name="FootL" position={[0.27, 0.02, -0.05]} rotation={[-1.56, 0, Math.PI]} />
            <group name="Body" position={[0, 0.97, 0.1]} rotation={[0, 0.01, 0]}>
              <group name="Hips" position={[0, -0.07, -0.05]} rotation={[-0.1, 0, 0]}>
                <group name="Abdomen" position={[0, 0.31, 0]} rotation={[0.15, 0, 0]}>
                  <group name="Torso" position={[0, 0.3, 0]} rotation={[-0.01, 0, 0]}>
                    <group name="Neck" position={[0, 0.48, 0]} rotation={[-0.06, 0, 0]}>
                      <group name="Head" position={[0, 0.13, 0]} rotation={[0, 0, 0]} />
                    </group>
                    <group name="ShoulderL" position={[0.13, 0.14, 0.01]} rotation={[-0.07, 0, -0.84]}>
                      <group name="UpperArmL" position={[0, 0.26, 0]} rotation={[-0.96, 0.41, -1.75]} scale={[1, 1, 1]}>
                        <group name="LowerArmL" position={[0, 0.53, 0]} rotation={[-0.02, 0.46, -0.26]}>
                          <group name="FistL" position={[0, 0.43, 0]} rotation={[0.03, 0.31, -0.02]} />
                        </group>
                      </group>
                    </group>
                    <group name="ShoulderR" position={[-0.14, 0.14, 0.01]} rotation={[-0.07, 0, 0.84]}>
                      <group name="UpperArmR" position={[0, 0.26, 0]} rotation={[-0.96, -0.41, 1.75]}>
                        <group name="LowerArmR" position={[0, 0.53, 0]} rotation={[-0.02, -0.46, 0.26]}>
                          <group name="FistR" position={[0, 0.43, 0]} rotation={[0.03, -0.31, 0.02]} />
                        </group>
                      </group>
                    </group>
                  </group>
                </group>
              </group>
              <group name="UpperLegL" position={[0.25, -0.02, -0.06]} rotation={[3.04, 0, -0.02]}>
                <group name="LowerLegL" position={[0, 0.45, 0]} rotation={[0.21, 0, 0.02]} />
              </group>
              <group name="UpperLegR" position={[-0.25, -0.02, -0.06]} rotation={[3.04, 0, 0.02]}>
                <group name="LowerLegR" position={[0, 0.45, 0]} rotation={[0.21, 0, -0.02]} />
              </group>
            </group>
            <group name="PoleTargetL" position={[0.26, 0.72, 0.96]} rotation={[0, 0, 0]} />
            <group name="FootR" position={[-0.26, 0.02, -0.05]} rotation={[-1.56, 0, Math.PI]} />
            <group name="PoleTargetR" position={[-0.26, 0.72, 0.96]} rotation={[0, 0, 0]} />
          </group>
        </group>
      </scene>
    </group>
  )
}
