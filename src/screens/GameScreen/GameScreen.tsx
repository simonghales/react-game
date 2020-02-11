import React, { Suspense } from 'react'
import { Canvas } from 'react-three-fiber'
import { useSpring } from 'react-spring'
import Controls from '../../components/Controls/Controls'
import Floor from '../../components/Floor/Floor'
import GameTiles from '../../components/GameTiles/GameTiles'
import Banana from '../../components/characters/Banana/Banana'
import Donut from '../../components/characters/Donut/Donut'
import BlueBerry from '../../components/characters/BlueBerry/Blueberry'
import DragonFruit from '../../components/characters/DragonFruit/DragonFruit'
import Pug from '../../components/characters/Pug'
import GamePlayers from '../../components/GamePlayers/GamePlayers'
import GameState, { useGameState, GameStateContext } from '../../components/GameState/GameState'
import Peach from '../../components/characters/Peach/Peach'
import GameStateDebugger from '../../components/GameStateDebugger/GameStateDebugger'

const GameScreen: React.FC = () => {
  const state = useGameState() // todo - use zustand
  return (
    <>
      <Canvas camera={{ position: [0, 1, 8] }} shadowMap>
        <GameStateContext.Provider value={state}>
          <Controls />
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
        </GameStateContext.Provider>
      </Canvas>
      <GameStateDebugger />
    </>
  )
}

export default GameScreen
