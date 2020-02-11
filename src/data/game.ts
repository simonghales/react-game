export enum GameTileType {
  PLAIN = 'PLAIN',
  BONUS1 = 'BONUS1',
  BONUS2 = 'BONUS2',
  NEGATIVE1 = 'NEGATIVE1',
  STAR = 'STAR',
  CHALLENGE = 'CHALLENGE'
}

export interface GameTileMdl {
  key: string
  position: [number, number]
  type: GameTileType
  nextTiles: Array<string>
}

export interface GameTilesMdl {
  [key: string]: GameTileMdl
}

export enum GameCharacterType {
  BANANA = 'BANANA',
  CHERRY = 'CHERRY',
  PEACH = 'PEACH',
  DONUT = 'DONUT'
}

export interface GamePlayerMdl {
  key: string
  character: GameCharacterType
  position: string
  positionPath: string[]
  score: number
  order: number
  pendingMoves: number
}

export interface GamePlayersMdl {
  [key: string]: GamePlayerMdl
}

const PLAYER_00: GamePlayerMdl = {
  key: '00',
  character: GameCharacterType.BANANA,
  position: '',
  positionPath: [],
  pendingMoves: 0,
  score: 0,
  order: 0
}

const PLAYER_01: GamePlayerMdl = {
  key: '01',
  character: GameCharacterType.DONUT,
  position: '',
  positionPath: [],
  pendingMoves: 0,
  score: 0,
  order: 1
}

const PLAYER_02: GamePlayerMdl = {
  key: '02',
  character: GameCharacterType.PEACH,
  position: '',
  positionPath: [],
  pendingMoves: 0,
  score: 0,
  order: 1
}

export const GAME_PLAYERS: GamePlayersMdl = {
  [PLAYER_00.key]: PLAYER_00,
  [PLAYER_01.key]: PLAYER_01,
  [PLAYER_02.key]: PLAYER_02
}

const GAME_TILE_00: GameTileMdl = {
  key: '00',
  position: [0, 0],
  type: GameTileType.BONUS2,
  nextTiles: ['01']
}

const GAME_TILE_01: GameTileMdl = {
  key: '01',
  position: [0, 1],
  type: GameTileType.BONUS1,
  nextTiles: ['02']
}

const GAME_TILE_02: GameTileMdl = {
  key: '02',
  position: [0, 2],
  type: GameTileType.BONUS1,
  nextTiles: ['03']
}

const GAME_TILE_03: GameTileMdl = {
  key: '03',
  position: [0, 3],
  type: GameTileType.BONUS1,
  nextTiles: ['04']
}

const GAME_TILE_04: GameTileMdl = {
  key: '04',
  position: [1, 3],
  type: GameTileType.BONUS1,
  nextTiles: ['05']
}

const GAME_TILE_05: GameTileMdl = {
  key: '05',
  position: [2, 3],
  type: GameTileType.NEGATIVE1,
  nextTiles: ['06']
}

const GAME_TILE_06: GameTileMdl = {
  key: '06',
  position: [3, 3],
  type: GameTileType.BONUS1,
  nextTiles: ['07']
}

const GAME_TILE_07: GameTileMdl = {
  key: '07',
  position: [3, 2],
  type: GameTileType.BONUS2,
  nextTiles: ['08']
}

const GAME_TILE_08: GameTileMdl = {
  key: '08',
  position: [3, 1],
  type: GameTileType.STAR,
  nextTiles: ['09']
}

const GAME_TILE_09: GameTileMdl = {
  key: '09',
  position: [3, 0],
  type: GameTileType.PLAIN,
  nextTiles: ['10']
}

const GAME_TILE_10: GameTileMdl = {
  key: '10',
  position: [2, 0],
  type: GameTileType.CHALLENGE,
  nextTiles: ['11']
}

const GAME_TILE_11: GameTileMdl = {
  key: '11',
  position: [1, 0],
  type: GameTileType.NEGATIVE1,
  nextTiles: ['00']
}

export const GAME_TILES: GameTilesMdl = {
  [GAME_TILE_00.key]: GAME_TILE_00,
  [GAME_TILE_01.key]: GAME_TILE_01,
  [GAME_TILE_02.key]: GAME_TILE_02,
  [GAME_TILE_03.key]: GAME_TILE_03,
  [GAME_TILE_04.key]: GAME_TILE_04,
  [GAME_TILE_05.key]: GAME_TILE_05,
  [GAME_TILE_06.key]: GAME_TILE_06,
  [GAME_TILE_07.key]: GAME_TILE_07,
  [GAME_TILE_08.key]: GAME_TILE_08,
  [GAME_TILE_09.key]: GAME_TILE_09,
  [GAME_TILE_10.key]: GAME_TILE_10,
  [GAME_TILE_11.key]: GAME_TILE_11
}
