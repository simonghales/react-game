import create from 'zustand'
import { DUMMY_GAME } from './dummy'
import { GameState, IGamePlayer, IGamePlayers, IGameRounds, IGameTiles } from './gameState'

export interface ILocalStoreData {
  activeTurn: {
    player: string
    passedTiles: string[]
    nextTile: string
    completed: boolean
  }
}

export interface ILocalStore extends ILocalStoreData {
  setActiveTurn: (playerKey: string, move: boolean, nextTileKey?: string) => void
  setActiveTurnCompleted: (playerKey: string) => void
  setPassedTiles: (tiles: string[]) => void
}

export const [useLocalStore] = create<ILocalStore>(set => ({
  activeTurn: {
    player: '',
    passedTiles: [],
    nextTile: '',
    completed: false
  },
  setActiveTurn: (playerKey: string, move: boolean, nextTileKey?: string) =>
    set(prevState => {
      return {
        ...prevState,
        activeTurn: {
          player: playerKey,
          passedTiles: [],
          nextTile: nextTileKey || '',
          completed: false
        }
      }
    }),
  setActiveTurnCompleted: (playerKey: string) =>
    set(prevState => {
      if (prevState.activeTurn.player !== playerKey) return prevState
      return {
        ...prevState,
        activeTurn: {
          ...prevState.activeTurn,
          completed: true
        }
      }
    }),
  setPassedTiles: (tiles: string[]) =>
    set(prevState => {
      return {
        ...prevState,
        activeTurn: {
          ...prevState.activeTurn,
          passedTiles: tiles
        }
      }
    })
}))

export interface IStoreData {
  players: IGamePlayers
  tiles: IGameTiles
  rounds: IGameRounds
  currentRound: string
  state: GameState
}

export interface IStore extends IStoreData {
  setStoreData: (data: Partial<IStoreData>) => void
  state: GameState
  setGameState: (state: GameState) => void
  setPlayerState: (player: IGamePlayer) => void
  setStoreState: (state: Partial<IStore>) => void
}

export const [useStore] = create<IStore>(set => ({
  players: DUMMY_GAME.players,
  rounds: DUMMY_GAME.rounds,
  tiles: DUMMY_GAME.tiles,
  state: DUMMY_GAME.state,
  currentRound: DUMMY_GAME.currentRound,
  setStoreData: (data: Partial<IStoreData>) => {
    return set(prevState => {
      return {
        ...prevState,
        ...data
      }
    })
  },
  setGameState: (state: GameState) =>
    set(prevState => {
      return {
        ...prevState,
        state
      }
    }),
  setPlayerState: (player: IGamePlayer) =>
    set(prevState => {
      return {
        ...prevState,
        players: {
          ...prevState.players,
          [player.key]: player
        }
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
