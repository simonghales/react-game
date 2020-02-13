import React from 'react'
import styled from 'styled-components'
import StepsCount from './components/StepsCount/StepsCount'
import { useGameState } from '../GameState/GameState'

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const GameUILayer: React.FC = () => {
  return (
    <Container>
      <StepsCount />
    </Container>
  )
}

export default GameUILayer
