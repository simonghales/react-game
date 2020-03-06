import React from 'react'
import { SwitchTransition, Transition } from 'react-transition-group'
import styled from 'styled-components'
import HubUI from './components/HubUI/HubUI'
import { useGameState } from '../../state/hooks'
import { GameState } from '../../state/gameState'
import PlayingUI from './components/PlayingUI/PlayingUI'

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const FadeDiv: any = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: 0.5s;
  opacity: ${({ state }: any) => (state === 'entered' ? 1 : 0)};
  display: ${({ state }: any) => (state === 'exited' ? 'none' : 'block')};
  transform: translateY(${({ state }: any) => (state === 'entered' ? '0%' : '-10%')});
`

const FadeTransition = ({ children, ...rest }: any) => {
  return <Transition {...rest}>{state => <FadeDiv state={state}>{children}</FadeDiv>}</Transition>
}

const GameUILayer: React.FC = () => {
  const gameState = useGameState()
  let uiComponentKey = ''
  let uiComponent: any = null
  switch (gameState) {
    case GameState.PENDING:
    case GameState.HUB:
      uiComponentKey = 'HUB'
      uiComponent = <HubUI />
      break
    case GameState.PLAYING:
      uiComponentKey = 'PLAYING'
      uiComponent = <PlayingUI />
      break
    default:
      uiComponentKey = ''
      uiComponent = null
  }
  return (
    <Container>
      <SwitchTransition>
        <FadeTransition key={uiComponentKey} timeout={250} unmountOnExit mountOnEnter>
          {uiComponent}
        </FadeTransition>
      </SwitchTransition>
    </Container>
  )
}

export default GameUILayer
