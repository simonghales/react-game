import React, { useEffect, useRef, useState } from 'react'
import { easeQuadInOut } from 'd3-ease'
import { a, useSpring } from 'react-spring/three'
import GamePlayer from '../GamePlayer/GamePlayer'
import { useGetPositionSteps, usePlayerPosition, usePlayers, usePlayersArray } from '../../hooks/player'
import Character from '../Character/Character'
import { GamePlayerMdl, GameTileMdl } from '../../data/game'
import { V3 } from '../../utils/types'
import { radians } from '../../utils/angles'
import { useGameState } from '../GameState/GameState'

interface Props {
  player: GamePlayerMdl
}

const getRotation = (direction: string): V3 => {
  let yRotation = 0
  if (direction === 'west') {
    yRotation = radians(90)
  } else if (direction === 'east') {
    yRotation = radians(-90)
  } else if (direction === 'south') {
    yRotation = radians(180)
  }
  return [0, yRotation, 0]
}

const difference = 0.05

const hasPassedTile = (position: V3, tile: GameTileMdl, direction: string): boolean => {
  const [xPos, yPos, zPos] = position
  const [tileXPos, tileZPos] = tile.position
  if (direction === 'east') {
    if (zPos >= tileZPos - difference) {
      return true
    }
  } else if (direction === 'west') {
    if (zPos <= tileZPos + difference) {
      return true
    }
  } else if (direction === 'south') {
    if (xPos <= tileXPos + difference) {
      return true
    }
  } else if (direction === 'north') {
    if (xPos >= tileXPos - difference) {
      return true
    }
  }
  return false
}

const ease = easeQuadInOut

const Player: React.FC<Props> = ({ player }) => {
  const playerRef = useRef()
  const [getSteps] = useGetPositionSteps()
  const { setPlayerRef, setFollowingObjectRef, updatePassedTiles } = useGameState()
  const position = usePlayerPosition(player.key)[0] // todo - handle array
  const [updatingPosition, setUpdatingPosition] = useState(false)
  const [previousPosition, setPreviousPosition] = useState(position)
  const [direction, setDirection] = useState('north')
  // const springRef: any = useRef()
  const [passedTiles, setPassedTiles] = useState({})

  const activePlayer = player.key === '01'

  const onRest = (finalAnimation: boolean, newDirection?: string) => {
    if (finalAnimation) {
      setUpdatingPosition(false)
    }
    if (finalAnimation && !player.position) {
      setDirection('north')
    } else if (newDirection) {
      setDirection(newDirection)
    }
  }

  const [spring, set] = useSpring(() => ({
    position,
    config: { duration: 500, easing: ease }
  }))

  const [rotationSpring, setRotationSpring] = useSpring(() => ({
    rotation: [0, 0, 0],
    config: { mass: 0.2, friction: 5, tension: 20 }
  }))

  const passedTilesKeys = Object.keys(passedTiles)

  useEffect(() => {
    if (activePlayer) {
      updatePassedTiles(passedTilesKeys)
    }
  }, [passedTilesKeys.join(',')])

  useEffect(() => {
    if (player.key === '01' && playerRef.current) {
      setFollowingObjectRef(playerRef.current)
    }
    if (playerRef.current) {
      setPlayerRef(player.key, playerRef.current)
    }
    return () => {
      setPlayerRef(player.key, null)
    }
  }, [playerRef])

  useEffect(() => {
    setRotationSpring({
      rotation: getRotation(direction)
    })
  }, [direction])

  // useEffect(() => {
  //   springRef.current = spring
  // }, [spring])

  useEffect(() => {
    setPassedTiles({})

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const currentPosition: V3 = spring.position.source.map(item => item.value)
    const steps = getSteps(currentPosition, position, player)
    setDirection(steps[0].direction)

    const to = steps.map((step, index) => {
      const isFinal = index === steps.length - 1
      const nextDirection = isFinal ? step.direction : steps[index + 1].direction

      const onFrame = (value: any) => {
        step.tiles.forEach(tile => {
          if (hasPassedTile(value.position, tile, step.direction)) {
            setPassedTiles(latestState => {
              return {
                ...latestState,
                [tile.key]: tile
              }
            })
          }
        })
      }

      return {
        position: step.position,
        config: {
          duration: step.numberOfTiles * 500
        },
        onFrame,
        onRest: () => {
          onRest(index === steps.length - 1, nextDirection)
        }
      }
    })
    set({
      to
    })
    setPreviousPosition(position)
    if (position[0] !== previousPosition[0] || position[1] !== previousPosition[1] || position[2] !== previousPosition[2]) {
      setUpdatingPosition(true)
    }
    console.log('playerRef', playerRef)
  }, [...position])

  const { position: springPosition } = spring
  const { rotation: springRotation } = rotationSpring

  return (
    <a.group position={springPosition} rotation={springRotation} ref={playerRef}>
      <Character walking={updatingPosition} type={player.character} />
    </a.group>
  )
}

const GamePlayers: React.FC = () => {
  const players = usePlayersArray()
  return (
    <>
      {players.map(([key, player]) => {
        // return <GamePlayer player={player} key={key} />
        return <Player player={player} key={key} />
      })}
    </>
  )
}

export default GamePlayers
