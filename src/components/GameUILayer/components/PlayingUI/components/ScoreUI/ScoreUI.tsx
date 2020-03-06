import React from 'react'
import styled from 'styled-components'
import PlayerScore from './components/PlayerScore/PlayerScore'
import { useCurrentPendingTurnPlayer, usePlayers } from '../../../../../../state/hooks'
import { getPlayerCoins, getPlayerName, getPlayerScore, getPlayerScorePosition, sortPlayersByScore } from '../../../../../../state/state'

const Container = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
`

const ScoreUI: React.FC = () => {
  const players = usePlayers()
  const activePendingTurnPlayer = useCurrentPendingTurnPlayer()
  return (
    <Container>
      {sortPlayersByScore(players).map(player => {
        return (
          <PlayerScore
            key={player.key}
            pendingTurn={activePendingTurnPlayer === player.key}
            name={getPlayerName(player)}
            score={getPlayerScore(player)}
            coins={getPlayerCoins(player)}
            scorePosition={getPlayerScorePosition(player.key, players)}
            characterType={player.characterType}
          />
        )
      })}
    </Container>
  )
}

export default ScoreUI
