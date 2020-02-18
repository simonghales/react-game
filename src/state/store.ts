import create from 'zustand'
import { DUMMY_GAME } from './dummy'
import { GameState, IGamePlayers, IGameTiles } from './gameState'

export interface IStore {
  players: IGamePlayers
  tiles: IGameTiles
  state: GameState
}

export const [useStore] = create<IStore>(set => ({
  players: DUMMY_GAME.players,
  tiles: DUMMY_GAME.tiles,
  state: DUMMY_GAME.state
}))

export interface IMiscStore {
  playerRefs: {
    [key: string]: any
  }
  setPlayerRef: (key: string, ref: any) => void
}

export const [useMiscStore] = create<IMiscStore>(set => ({
  playerRefs: {},
  setPlayerRef: (key: string, ref: any) =>
    set(state => {
      return {
        ...state,
        playerRefs: {
          ...state.playerRefs,
          [key]: ref
        }
      }
    })
}))
