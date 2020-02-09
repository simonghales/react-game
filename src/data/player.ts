import { GamePlayerMdl, GamePlayersMdl } from './game'

export const getPlayerFromPlayers = (playerKey: string, players: GamePlayersMdl): GamePlayerMdl => {
  const player = players[playerKey]
  if (!player) {
    throw new Error(`Player Key ${playerKey} does not exist within players.`)
  }
  return player
}
