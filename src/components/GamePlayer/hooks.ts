import { useSpring } from 'react-spring/three'
import { useGameState, useIsActivePlayer } from '../../state/hooks'
import { isGameStateHubRelated } from '../../state/state'

const useGamePlayerScaleState = (playerKey: string): number => {
  const state = useGameState()
  const hubState = isGameStateHubRelated(state)
  const isActivePlayer = useIsActivePlayer(playerKey)
  if (hubState) {
    return 1
  }
  return isActivePlayer ? 1.2 : 0.5
}

export const useGamePlayerScale = (playerKey: string) => {
  const scale = useGamePlayerScaleState(playerKey)

  const scaleSpring = useSpring({
    scale: [scale, scale, scale],
    config: { mass: 0.2, friction: 5, tension: 50 }
  })

  return scaleSpring.scale
}
