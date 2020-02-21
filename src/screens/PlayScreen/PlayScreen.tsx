import React from 'react'
import * as THREE from 'three'
import { Canvas } from 'react-three-fiber'
import GameWorld from '../../components/GameWorld/GameWorld'
import { V3 } from '../../utils/types'
import GamePlayers from '../../components/GamePlayers/GamePlayers'
import GameUILayer from '../../components/GameUILayer/GameUILayer'
import GameDebugger from '../../components/GameDebugger/GameDebugger'
import CameraHandler from '../../components/CameraHandler/CameraHandler'
import { useCameraPosition } from '../../state/hooks'
import GameStateHandler from '../../components/GameStateHandler/GameStateHandler'

const centerV3 = new THREE.Vector3(0, 0, 0)

const lookAtV3 = new THREE.Vector3(0.75, 1.4, -2.5)

const position: V3 = [-4.5, 1, -2.5]

// const fov = 50
const fov = 35

// const position: V3 = [-3, 4, 3]

const PlayScreen: React.FC = () => {
  return (
    <GameStateHandler>
      <Canvas
        camera={{ fov, position }}
        shadowMap
        onCreated={({ camera }) => {
          // console.log('camera', camera)
          // const lookAt = new THREE.Vector3(camera.position.x + 4, camera.position.y - 0.4, camera.position.z)
          // console.log('lookAt', lookAt)
          // camera.lookAt(lookAt)
        }}
      >
        <CameraHandler />
        <GameWorld />
        <GamePlayers />
      </Canvas>
      <GameUILayer />
      <GameDebugger />
    </GameStateHandler>
  )
}

export default PlayScreen
