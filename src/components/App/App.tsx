import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useSpring } from 'react-spring'
import OldGameScreen from '../../screens/OldGameScreen/OldGameScreen'
import ControllerScreen from '../../screens/ControllerScreen/ControllerScreen'
import GameScreen from '../../screens/GameScreen/GameScreen'
import GameState from '../GameState/GameState'

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/controller">
            <ControllerScreen />
          </Route>
          <Route path="/">
            <GameState>
              <GameScreen />
            </GameState>
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default App
