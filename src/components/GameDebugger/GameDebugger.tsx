import React, { useState } from 'react'
import styled from 'styled-components'
import GameStateDebugger from './components/GameStateDebugger/GameStateDebugger'
import PlayDebugger from './components/PlayDebugger/PlayDebugger'

const Container = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
`

const GameDebugger: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <Container>
      {isOpen ? (
        <div>
          <GameStateDebugger />
          <PlayDebugger />
        </div>
      ) : (
        <div onClick={() => setIsOpen(true)}>debug</div>
      )}
    </Container>
  )
}

export default GameDebugger
