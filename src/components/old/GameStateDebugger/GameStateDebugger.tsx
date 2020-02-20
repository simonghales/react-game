import React from 'react'
import styled from 'styled-components'
import { usePlayersArray } from '../../../hooks/player'
import PlayerDebugger from './components/PlayerDebugger/PlayerDebugger'

const Container = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  bottom: 20px;
  width: 100%;
  max-width: 200px;
  overflow-y: auto;
  opacity: 0.5;
  background-color: rgba(255, 255, 255, 0.5);
  transition: all 300ms ease;
  padding: 10px;

  &:hover {
    opacity: 1;
  }
`

const GameStateDebugger: React.FC = () => {
  const players = usePlayersArray()
  return (
    <Container>
      {players.map(([key, player]) => {
        return <PlayerDebugger key={key} playerKey={key} />
      })}
    </Container>
  )
}

export default GameStateDebugger
