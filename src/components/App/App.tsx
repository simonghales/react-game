import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import GameScreen from '../../screens/GameScreen/GameScreen'
import ControllerScreen from '../../screens/ControllerScreen/ControllerScreen'

const App: React.FC = () => (
  <>
    <Router>
      <Switch>
        <Route path="/controller">
          <ControllerScreen />
        </Route>
        <Route path="/">
          <GameScreen />
        </Route>
      </Switch>
    </Router>
  </>
)

export default App
