export enum GameCharacterType {
  BANANA = 'BANANA',
  CHERRY = 'CHERRY',
  PEACH = 'PEACH',
  DONUT = 'DONUT'
}

export interface IGamePlayer {
  key: string
  name: string
  score: number
  boardPosition: string
  boardPositionPath: string[]
  order: number
  characterType: GameCharacterType
  timestamps: {
    joined: number
    lastOnline: number
  }
}

export interface IGamePlayers {
  [key: string]: IGamePlayer
}

export enum GameTileType {
  DEFAULT = 'DEFAULT',
  BONUS1 = 'BONUS1',
  BONUS2 = 'BONUS2',
  NEGATIVE1 = 'NEGATIVE1',
  STAR = 'STAR'
}

export interface IGameTile {
  key: string
  starting: boolean
  position: [number, number]
  tileType: GameTileType
  connectedTiles: string[]
}

export interface IGameTiles {
  [key: string]: IGameTile
}

export enum GameRoundState {
  PENDING = 'PENDING',
  TURNS = 'TURNS',
  MINIGAME = 'MINIGAME',
  COMPLETED = 'COMPLETED'
}

export interface IGameRound {
  key: string
  order: number
  playerMoves: {}
  currentPlayerTurn: string
  minigame: string
  state: string
}

export interface IGameRounds {
  [key: string]: IGameRound
}

export interface IGameMiniGame {
  key: string
}

export interface IGameMiniGames {
  [key: string]: IGameMiniGame
}

export enum GameState {
  PENDING = 'PENDING',
  HUB = 'HUB',
  STARTING = 'STARTING',
  PLAYING = 'PLAYING',
  BONUSES = 'BONUSES',
  RESULTS = 'RESULTS'
}

export interface IGameData {
  players: IGamePlayers
  tiles: IGameTiles
  rounds: IGameRounds
  currentRound: string
  miniGames: IGameMiniGames
  state: GameState
}
