import React, { Suspense } from 'react'
import { Canvas } from 'react-three-fiber'
import Controls from '../../components/Controls/Controls'
import Floor from '../../components/Floor/Floor'
import GameTiles from '../../components/GameTiles/GameTiles'
import Banana from '../../components/characters/Banana/Banana'
import Donut from '../../components/characters/Donut/Donut'
import BlueBerry from '../../components/characters/BlueBerry/Blueberry'
import DragonFruit from '../../components/characters/DragonFruit/DragonFruit'
import Pug from '../../components/characters/Pug'

const GameScreen: React.FC = () => (
  <Canvas camera={{ position: [0, 1, 8] }} shadowMap>
    <Controls />
    <ambientLight />
    <spotLight intensity={0.3} position={[30, 30, 50]} angle={0.2} penumbra={1} castShadow />
    <Floor />
    <GameTiles />
    <Suspense fallback={null}>
      <Banana position={[-1, 0, 0]} />
    </Suspense>
    <Suspense fallback={null}>
      <Donut position={[-1.8, 0, 0]} />
    </Suspense>
    {/* <Suspense fallback={null}> */}
    {/*  <BlueBerry position={[0, 0, 0]} /> */}
    {/* </Suspense> */}
  </Canvas>
)

export default GameScreen
