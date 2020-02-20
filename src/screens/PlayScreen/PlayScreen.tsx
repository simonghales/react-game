import React from 'react'
import * as THREE from 'three'
import { Canvas } from 'react-three-fiber'
import GameWorld from '../../components/GameWorld/GameWorld'
import { V3 } from '../../utils/types'
import GamePlayers from '../../components/GamePlayers/GamePlayers'
import GameUILayer from '../../components/GameUILayer/GameUILayer'
import GameDebugger from '../../components/GameDebugger/GameDebugger'

const centerV3 = new THREE.Vector3(0, 0, 0)

const lookAtV3 = new THREE.Vector3(0.75, 1.4, -2.5)

const position: V3 = [-4.5, 1, -2.5]

// const fov = 50
const fov = 35

// const position: V3 = [-3, 4, 3]

const PlayScreen: React.FC = () => (
  <>
    <Canvas
      camera={{ fov, position }}
      shadowMap
      onCreated={({ camera }) => {
        camera.lookAt(lookAtV3)
      }}
    >
      <GameWorld />
      <GamePlayers />
    </Canvas>
    <GameUILayer />
    <GameDebugger />
  </>
)

export default PlayScreen
