import React from 'react'
import RoundStateListener from './components/RoundStateListener/RoundStateListener'
import { useGameRoundInProgress } from '../../../../state/hooks'

const useIncludeRoundStateListener = (): boolean => {
  const gameRoundInProgress = useGameRoundInProgress()
  return gameRoundInProgress
}

const GameStateManager: React.FC = () => {
  const includeRoundStateListener = useIncludeRoundStateListener()
  return <>{includeRoundStateListener && <RoundStateListener />}</>
}

export default GameStateManager
