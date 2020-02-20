import {
  GameCharacterType,
  GameRoundState,
  GameState,
  GameTileType,
  IGameData,
  IGameMiniGames,
  IGamePlayers,
  IGameRounds,
  IGameTile,
  IGameTiles
} from './gameState'

const getTotalTiles = (width: number, height: number): number => {
  return (width + height) * 2 - 4
}

const generateTiles = (width: number, height: number): IGameTiles => {
  const tiles: IGameTiles = {}
  const totalTiles = getTotalTiles(width, height)

  let xPos = 0
  let direction = 'east'
  let yPos = 0

  Array.from({ length: totalTiles }).forEach((item, index) => {
    // todo - create tile, calculate xPos and yPos based upon index...

    const nextTile = index < totalTiles - 1 ? index + 1 : 0

    const tile: IGameTile = {
      key: index.toString(),
      position: [xPos, yPos],
      tileType: GameTileType.DEFAULT,
      connectedTiles: [nextTile.toString()]
    }

    tiles[tile.key] = tile

    // add tile

    if (direction === 'east') {
      if (xPos < width - 1) {
        xPos += 1
      } else {
        direction = 'north'
        yPos += 1
      }
    } else if (direction === 'north') {
      if (yPos < height - 1) {
        yPos += 1
      } else {
        direction = 'west'
        xPos -= 1
      }
    } else if (direction === 'west') {
      if (xPos > 0) {
        xPos -= 1
      } else {
        direction = 'south'
        yPos -= 1
      }
    } else if (direction === 'south') {
      if (yPos > 0) {
        yPos -= 1
      } else {
        // finished...
      }
    }

    /*
    
    width = 4
    height = 3
    
    0 => 0, 0
    1 => 1, 0
    2 => 2, 0
    3 => 3, 0
    4 => 3, 1
    5 => 3, 2
    6 => 2, 2
    7 => 1, 2
    8 => 0, 2
    9 => 0, 1
    
     */
  })

  return tiles
}

// const DUMMY_TILES: IGameTiles = generateTiles(7, 4)
const DUMMY_TILES: IGameTiles = {
  '0': {
    key: '0',
    position: [0, 0],
    tileType: GameTileType.BONUS2,
    connectedTiles: ['1']
  },
  '1': {
    key: '1',
    position: [1, 0],
    tileType: GameTileType.BONUS2,
    connectedTiles: ['2']
  },
  '2': {
    key: '2',
    position: [2, 0],
    tileType: GameTileType.BONUS2,
    connectedTiles: ['3']
  },
  '3': {
    key: '3',
    position: [3, 0],
    tileType: GameTileType.BONUS1,
    connectedTiles: ['4']
  },
  '4': {
    key: '4',
    position: [4, 0],
    tileType: GameTileType.DEFAULT,
    connectedTiles: ['5']
  },
  '5': {
    key: '5',
    position: [5, 0],
    tileType: GameTileType.DEFAULT,
    connectedTiles: ['6']
  },
  '6': {
    key: '6',
    position: [6, 0],
    tileType: GameTileType.BONUS2,
    connectedTiles: ['7']
  },
  '7': {
    key: '7',
    position: [6, 1],
    tileType: GameTileType.BONUS2,
    connectedTiles: ['8']
  },
  '8': {
    key: '8',
    position: [6, 2],
    tileType: GameTileType.BONUS1,
    connectedTiles: ['9']
  },
  '9': {
    key: '9',
    position: [6, 3],
    tileType: GameTileType.BONUS1,
    connectedTiles: ['10']
  },
  '10': {
    key: '10',
    position: [5, 3],
    tileType: GameTileType.DEFAULT,
    connectedTiles: ['11']
  },
  '11': {
    key: '11',
    position: [4, 3],
    tileType: GameTileType.NEGATIVE1,
    connectedTiles: ['12']
  },
  '12': {
    key: '12',
    position: [3, 3],
    tileType: GameTileType.BONUS2,
    connectedTiles: ['13']
  },
  '13': {
    key: '13',
    position: [2, 3],
    tileType: GameTileType.BONUS1,
    connectedTiles: ['14']
  },
  '14': {
    key: '14',
    position: [1, 3],
    tileType: GameTileType.BONUS2,
    connectedTiles: ['15']
  },
  '15': {
    key: '15',
    position: [0, 3],
    tileType: GameTileType.BONUS2,
    connectedTiles: ['16']
  },
  '16': {
    key: '16',
    position: [0, 2],
    tileType: GameTileType.STAR,
    connectedTiles: ['17']
  },
  '17': {
    key: '17',
    position: [0, 1],
    tileType: GameTileType.NEGATIVE1,
    connectedTiles: ['0']
  }
}

console.log('DUMMY_TILES', DUMMY_TILES)

/*

w = 4
h = 3
total = 10

w * 2 + ((h - 2) * 2)

1 1 1 1
1     1
1 1 1 1

w = 5
h = 3
total = 12



1 1 1 1 1
1       1
1 1 1 1 1

1 1 1
1   1
1 1 1

3 + 3 + 1 + 1

8

1 1 1 1
1     1
1     1
1 1 1 1

12

4 + 4 + 2 + 2

grid of 5...

what's the total?

5 + 5 + 3 + 3

5 * 2 + (5 - 2) + (5 - 2)

5 + 4 + 4 + 3

a + (a - 1) + (a - 1) + (a - 2)

(n-1)*4

1 1 1 1 1 1
1         1
1         1
1         1
1         1
1 1 1 1 1 1


 */

const DUMMY_MINIGAMES: IGameMiniGames = {
  '00': {
    key: '00'
  },
  '01': {
    key: '01'
  },
  '02': {
    key: '02'
  }
}

const DUMMY_ROUNDS: IGameRounds = {
  '00': {
    key: '00',
    order: 0,
    playerMoves: {},
    currentPlayerTurn: '',
    minigame: DUMMY_MINIGAMES['00'].key,
    state: GameRoundState.PENDING
  },
  '01': {
    key: '01',
    order: 1,
    playerMoves: {},
    currentPlayerTurn: '',
    minigame: DUMMY_MINIGAMES['01'].key,
    state: GameRoundState.PENDING
  },
  '02': {
    key: '02',
    order: 2,
    playerMoves: {},
    currentPlayerTurn: '',
    minigame: DUMMY_MINIGAMES['02'].key,
    state: GameRoundState.PENDING
  }
}

const DUMMY_PLAYERS: IGamePlayers = {
  '00': {
    key: '00',
    name: 'Simon',
    score: 0,
    order: 0,
    boardPosition: '',
    characterType: GameCharacterType.DONUT,
    timestamps: {
      joined: 0,
      lastOnline: 0
    }
  },
  '01': {
    key: '01',
    name: 'Chiao',
    score: 0,
    order: 1,
    boardPosition: '',
    characterType: GameCharacterType.BANANA,
    timestamps: {
      joined: 0,
      lastOnline: 0
    }
  },
  '02': {
    key: '02',
    name: 'P3',
    score: 0,
    order: 1,
    boardPosition: '',
    characterType: GameCharacterType.PEACH,
    timestamps: {
      joined: 0,
      lastOnline: 0
    }
  }
  // '03': {
  //   key: '03',
  //   name: 'P4',
  //   score: 0,
  //   order: 1,
  //   boardPosition: '',
  //   characterType: GameCharacterType.PEACH,
  //   timestamps: {
  //     joined: 0,
  //     lastOnline: 0
  //   }
  // }
}

export const DUMMY_GAME: IGameData = {
  players: DUMMY_PLAYERS,
  tiles: DUMMY_TILES,
  rounds: DUMMY_ROUNDS,
  currentRound: '',
  miniGames: DUMMY_MINIGAMES,
  state: GameState.STARTING
}
