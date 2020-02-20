import create from 'zustand'
import { DUMMY_GAME } from './dummy'
import { GameState, IGamePlayers, IGameTiles } from './gameState'

export interface IStore {
  players: IGamePlayers
  tiles: IGameTiles
  state: GameState
  setGameState: (state: GameState) => void
  setStoreState: (state: Partial<IStore>) => void
}

export const [useStore] = create<IStore>(set => ({
  players: DUMMY_GAME.players,
  tiles: DUMMY_GAME.tiles,
  state: DUMMY_GAME.state,
  setGameState: (state: GameState) =>
    set(prevState => {
      return {
        ...prevState,
        state
      }
    }),
  setStoreState: (state: Partial<IStore>) =>
    set((prevState: any) => {
      return {
        ...prevState,
        state
      }
    })
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
