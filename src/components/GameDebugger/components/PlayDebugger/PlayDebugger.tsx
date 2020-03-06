import React, { useEffect, useState } from 'react'
import { useActivePlayer, usePlayers } from '../../../../state/hooks'
import { useGameStateHandlerContext } from '../../../GameStateHandler/GameStateHandler'

const PlayDebugger: React.FC = () => {
  const { setActivePlayer, rollPlayerDice, startRound } = useGameStateHandlerContext()
  const players = usePlayers()
  const activePlayer = useActivePlayer()
  const [selectedPlayer, setSelectedPlayer] = useState('')
  const [selectedDice, setSelectedDice] = useState(1)

  const handleRollDice = () => {
    if (!selectedPlayer) return
    rollPlayerDice(selectedPlayer, selectedDice)
  }

  useEffect(() => {
    setSelectedPlayer(activePlayer)
  }, [activePlayer])

  return (
    <div>
      <div>
        <button onClick={startRound} type="button">
          start round
        </button>
      </div>
      <div>
        <select
          value={selectedPlayer}
          onChange={event => {
            setSelectedPlayer(event.target.value)
            setActivePlayer(event.target.value)
          }}
        >
          <option value="">-</option>
          {Object.entries(players).map(([key, player]) => {
            return (
              <option key={key} value={key}>
                {player.name}
              </option>
            )
          })}
        </select>
      </div>
      <div>
        {Array.from({ length: 6 }).map((item, index) => (
          <button
            onClick={() => {
              if (!selectedPlayer) return
              rollPlayerDice(selectedPlayer, index + 1)
            }}
            type="button"
          >
            {index + 1}
          </button>
        ))}
      </div>
      {/* <div> */}
      {/*  <select */}
      {/*    onChange={event => { */}
      {/*      setSelectedDice(parseInt(event.target.value, 10)) */}
      {/*    }} */}
      {/*    value={selectedDice} */}
      {/*  > */}
      {/*    {Array.from({ length: 6 }).map((item, index) => { */}
      {/*      return ( */}
      {/*        <option value={index + 1} key={index.toString()}> */}
      {/*          {index + 1} */}
      {/*        </option> */}
      {/*      ) */}
      {/*    })} */}
      {/*  </select> */}
      {/*  <button onClick={handleRollDice}>roll dice</button> */}
      {/* </div> */}
    </div>
  )
}

export default PlayDebugger
