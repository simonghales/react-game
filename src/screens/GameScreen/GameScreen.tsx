import React, { useEffect, useState } from 'react'
import { Canvas } from 'react-three-fiber'
import Box from '../../components/Box/Box'
import Controls from '../../components/Controls/Controls'
import Physics from '../../components/Physics/Physics'
import Ground from '../../components/Ground/Ground'
import { ablyChannel } from '../../ably/ably'

const GameScreen: React.FC = () => {
  const [extraBlocks, setExtraBlocks] = useState(0)

  useEffect(() => {
    ablyChannel.subscribe(message => {
      console.log(`⬅ Received`, JSON.stringify(message.data))
      const timeDifference = Date.now() - message.data.timestamp
      console.log('timeDifference', timeDifference)
      setExtraBlocks(state => state + 1)
    })
    return () => {
      ablyChannel.unsubscribe()
    }
  })

  const [groundLevel, setGroundLevel] = useState(3)
  useEffect(() => {
    setInterval(() => {
      setGroundLevel(state => {
        if (state > 0) {
          return state - 1
        }
        return state
      })
    }, 2000)
  }, [])
  const extraBoxes =
    groundLevel <= 1 ? (
      <>
        <Box position={[-1, 2, 0]} />
        <Box position={[1, 2, 0]} />
        <Box position={[1.8, 4, 0]} />
      </>
    ) : null
  return (
    <Canvas camera={{ position: [0, 1, 8] }} shadowMap>
      <Controls />
      <ambientLight />
      <spotLight intensity={0.6} position={[30, 30, 50]} angle={0.2} penumbra={1} castShadow />
      <Physics>
        <Box position={[-1.2, 2, 0]} />
        <Box position={[1.2, 2, 0]} />
        <Box position={[2, 4, 0]} />
        {extraBoxes}
        {Array.from({ length: extraBlocks }).map((item, index) => {
          return <Box position={[1.2, 4, 0]} key={index.toString()} />
        })}
        {Array.from({ length: groundLevel + 1 }).map((item, index) => {
          return <Ground position={[0, -10 + index * 3, 0]} key={index.toString()} />
        })}
      </Physics>
    </Canvas>
  )
}

export default GameScreen
