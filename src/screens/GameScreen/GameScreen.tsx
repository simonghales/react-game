import React, { Suspense } from 'react'
import { Canvas } from 'react-three-fiber'
import { useSpring } from 'react-spring'
import * as THREE from 'three'
import Controls from '../../components/Controls/Controls'
import Floor from '../../components/Floor/Floor'
import GameTiles from '../../components/old/GameTiles/GameTiles'
import Banana from '../../components/characters/Banana/Banana'
import Donut from '../../components/characters/Donut/Donut'
import BlueBerry from '../../components/characters/BlueBerry/Blueberry'
import DragonFruit from '../../components/characters/DragonFruit/DragonFruit'
import Pug from '../../components/characters/Pug'
import GamePlayers from '../../components/old/GamePlayers/GamePlayers'
import GameState, { useGameState, GameStateContext } from '../../components/GameState/GameState'
import Peach from '../../components/characters/Peach/Peach'
import GameStateDebugger from '../../components/GameStateDebugger/GameStateDebugger'
import { radians } from '../../utils/angles'
import CameraController from '../../components/CameraController/CameraController'
import GameUILayer from '../../components/GameUILayer/GameUILayer'
import { DUMMY_GAME } from '../../state/dummy'

/*

_x: -1.5840896870168877
​​
_y: -0.7180890459093253
​​
_z: -1.5909990765304907

 */

console.log('DUMMY_GAME', DUMMY_GAME)

const centerV3 = new THREE.Vector3(0, 0, 0)

const GameScreen: React.FC = () => {
  const state = useGameState() // todo - use zustand
  return (
    <>
      <Canvas
        camera={{ fov: 50, position: [-3, 4, 3], rotation: [0, radians(-90), 0] }}
        shadowMap
        onCreated={({ camera }) => {
          console.log('camera', camera)
          camera.lookAt(centerV3)
          // camera.rotation.order = ''
        }}
      >
        <GameStateContext.Provider value={state}>
          {/* <Controls /> */}
          <ambientLight />
          <spotLight intensity={0.3} position={[30, 30, 50]} angle={0.2} penumbra={1} castShadow />
          <Floor />
          <GameTiles />
          <GamePlayers />
          {/*  <Suspense fallback={null}> */}
          {/*    <Peach position={[-1.8, 0, 0]} /> */}
          {/* </Suspense> */}
          {/* <Suspense fallback={null}> */}
          {/*  <Banana position={[0, 0, 0]} /> */}
          {/* </Suspense> */}
          <CameraController />
        </GameStateContext.Provider>
      </Canvas>
      <GameUILayer />
      <GameStateDebugger />
    </>
  )
}

export default GameScreen
