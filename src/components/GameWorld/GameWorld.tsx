import React from 'react'
import GameTiles from '../GameTiles/GameTiles'
import Floor from '../Floor/Floor'

const GameWorld: React.FC = () => (
  <>
    <ambientLight />
    <spotLight intensity={0.3} position={[-30, 30, 50]} angle={0.2} penumbra={1} castShadow />
    <Floor />
    <GameTiles />
  </>
)

export default GameWorld
