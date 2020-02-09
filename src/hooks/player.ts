import { V3 } from '../utils/types'
import { GAME_PLAYERS, GamePlayerMdl, GamePlayersMdl } from '../data/game'
import { useGameState } from '../components/GameState/GameState'
import { getPlayerFromPlayers } from '../data/player'

export const usePlayers = (): GamePlayersMdl => {
  const state = useGameState()
  return state.players
}

export const usePlayer = (playerKey: string): GamePlayerMdl => {
  const players = GAME_PLAYERS
  return getPlayerFromPlayers(playerKey, players)
}

export const sortPlayersByOrder = (playerA: GamePlayerMdl, playerB: GamePlayerMdl) => {
  return playerA.order - playerB.order
}

export const getWaitingPlayers = (players: GamePlayersMdl): GamePlayerMdl[] => {
  return Object.values(players)
    .filter(player => {
      return !player.position
    })
    .sort(sortPlayersByOrder)
}

export const getWaitingPosition = (player: GamePlayerMdl, players: GamePlayersMdl): V3 => {
  const waitingPlayers = getWaitingPlayers(players)
  const waitingIndex = waitingPlayers.findIndex(findPlayer => {
    return findPlayer.key === player.key
  })
  const x = -1 - waitingIndex * 0.8
  return [x, 0, 0]
}

export const usePlayerPosition = (playerKey: string): V3 => {
  const players = usePlayers()
  const player = usePlayer(playerKey)
  if (!player.position) {
    return getWaitingPosition(player, players)
  }
  const position = [0, 0, 0]
  return position
}
