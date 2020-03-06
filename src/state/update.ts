import { getRoundFromRounds } from './state'
import { GameRoundState, IGameData, IGamePlayer, PlayerMoveState } from './gameState'

export const updateCurrentRoundState = (store: IGameData, state: GameRoundState): IGameData => {
  const { rounds, currentRound } = store
  const round = getRoundFromRounds(rounds, currentRound)
  const updatedRounds = {
    ...rounds
  }
  if (round) {
    updatedRounds[round.key] = {
      ...round,
      state
    }
  }
  return {
    ...store,
    rounds: updatedRounds
  }
}

export const updateCurrentRoundActivePlayer = (store: IGameData, playerKey: string): IGameData => {
  const { rounds, currentRound } = store
  const round = getRoundFromRounds(rounds, currentRound)
  const updatedRounds = {
    ...rounds
  }
  if (round) {
    updatedRounds[round.key] = {
      ...round,
      currentPlayerTurn: playerKey,
      playerMoves: {
        ...round.playerMoves,
        [playerKey]: {
          key: playerKey,
          state: PlayerMoveState.PENDING,
          diceRoll: null
        }
      }
    }
  }
  return {
    ...store,
    rounds: updatedRounds
  }
}

export const updateCurrentRoundActivePlayerRoll = (store: IGameData, diceRoll: number): IGameData => {
  const { rounds, currentRound } = store
  const round = getRoundFromRounds(rounds, currentRound)
  const updatedRounds = {
    ...rounds
  }
  if (round) {
    const playerMove = round.playerMoves[round.currentPlayerTurn]
    updatedRounds[round.key] = {
      ...round,
      playerMoves: {
        ...round.playerMoves,
        [round.currentPlayerTurn]: {
          ...playerMove,
          state: PlayerMoveState.MOVING,
          diceRoll
        }
      }
    }
  }
  return {
    ...store,
    rounds: updatedRounds
  }
}

export const updateCurrentRoundActivePlayerMoveCompleted = (store: IGameData): IGameData => {
  const { rounds, currentRound } = store
  const round = getRoundFromRounds(rounds, currentRound)
  const updatedRounds = {
    ...rounds
  }
  if (round) {
    const playerMove = round.playerMoves[round.currentPlayerTurn]
    updatedRounds[round.key] = {
      ...round,
      playerMoves: {
        ...round.playerMoves,
        [round.currentPlayerTurn]: {
          ...playerMove,
          state: PlayerMoveState.COMPLETED
        }
      }
    }
  }
  return {
    ...store,
    rounds: updatedRounds
  }
}

export const updatePlayerState = (store: IGameData, player: IGamePlayer): IGameData => {
  return {
    ...store,
    players: {
      ...store.players,
      [player.key]: player
    }
  }
}
