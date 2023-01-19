import { cloneDeep } from "lodash"

/**
 * キューブの初期状態
 *
 * 中央の数字が面のインデックス(0-5)
 * 各面の中で左上の牌から順にインデックス(0-9)が振られる
 * ・・・・・・・・・・・・・・
 * ・筒筒筒・・・・・・・・・・
 * ・筒０筒・・・・・・・・・・
 * ・筒筒筒・・・・・・・・・・
 * ・索索索白白白發發發中中中・
 * ・索１索白３白發４發中５中・
 * ・索索索白白白發發發中中中・
 * ・萬萬萬・・・・・・・・・・
 * ・萬２萬・・・・・・・・・・
 * ・萬萬萬・・・・・・・・・・
 * ・・・・・・・・・・・・・・
 * また、牌の種類だけでなく向きも保持しておく必要がある
 * 初期配置ではすべて上向き
 */
const initialCube = [
  ["①↑", "②↑", "③↑", "④↑", "⑤↑", "⑥↑", "⑦↑", "⑧↑", "⑨↑"],
  ["１↑", "２↑", "３↑", "４↑", "５↑", "６↑", "７↑", "８↑", "９↑"],
  ["一↑", "二↑", "三↑", "四↑", "五↑", "六↑", "七↑", "八↑", "九↑"],
  ["白↑", "白↑", "白↑", "白↑", "白↑", "白↑", "白↑", "白↑", "白↑"],
  ["發↑", "發↑", "發↑", "發↑", "發↑", "發↑", "發↑", "發↑", "發↑"],
  ["中↑", "中↑", "中↑", "中↑", "中↑", "中↑", "中↑", "中↑", "中↑"],
]

/**
 * 各面が各面に対してどの方向でくっついているか
 */
const connectionMap = [
  ["↑", "↑", "↑", "→", "↓", "←"],
  ["↑", "↑", "↑", "↑", "↑", "↑"],
  ["↑", "↑", "↑", "←", "↓", "→"],
  ["←", "↑", "→", "↑", "↑", "↑"],
  ["↓", "↓", "↓", "↑", "↑", "↑"],
  ["→", "↑", "←", "↑", "↑", "↑"],
]

const rotateWithFace = (
  cube: string[][],
  cubeNext: string[][],
  face: number,
  prime: boolean
): string[][] => {
  const destinationMap = [
    [6, 3, 0, 7, 4, 1, 8, 5, 2],
    [2, 5, 8, 1, 4, 7, 0, 3, 6],
  ][prime ? 1 : 0]
  const directionMap = ["→↓←↑", "←↑→↓"][prime ? 1 : 0]
  for (let fromPiece = 0; fromPiece < 9; fromPiece++) {
    let toPiece = destinationMap.indexOf(fromPiece)
    let piece = cube[face][fromPiece]
    cubeNext[face][toPiece] = piece[0] + directionMap["↑→↓←".indexOf(piece[1])]
  }
  return cubeNext
}

const rotateWithConnection = (
  cube: string[][],
  cubeNext: string[][],
  fromFace: number,
  fromPices: number[],
  toFace: number
): string[][] => {
  const connection = connectionMap[fromFace][toFace]
  const destinationMap = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8],
    [6, 3, 0, 7, 4, 1, 8, 5, 2],
    [8, 7, 6, 5, 4, 3, 2, 1, 0],
    [2, 5, 8, 1, 4, 7, 0, 3, 6],
  ]["↑→↓←".indexOf(connection)]
  const directionMap = ["↑→↓←", "→↓←↑", "↓←↑→", "←↑→↓"][
    "↑→↓←".indexOf(connection)
  ]
  for (let fromPiece of fromPices) {
    let toPiece = destinationMap.indexOf(fromPiece)
    let piece = cube[fromFace][fromPiece]
    cubeNext[toFace][toPiece] =
      piece[0] + directionMap["↑→↓←".indexOf(piece[1])]
  }
  return cubeNext
}

export const getResetCube = (): string[][] => {
  const cubeNext = cloneDeep(initialCube)
  return cubeNext
}

export const getShuffleCube = (): string[][] => {
  let cubeNext = cloneDeep(initialCube)
  const getRotateCubeFuncs = [
    getRotateCubeR,
    getRotateCubeRp,
    getRotateCubeM,
    getRotateCubeMp,
    getRotateCubeL,
    getRotateCubeLp,
    getRotateCubeU,
    getRotateCubeUp,
    getRotateCubeE,
    getRotateCubeEp,
    getRotateCubeD,
    getRotateCubeDp,
    getRotateCubeF,
    getRotateCubeFp,
    getRotateCubeS,
    getRotateCubeSp,
    getRotateCubeB,
    getRotateCubeBp,
  ]
  for (let i = 0; i < 25; i++) {
    const randInt = Math.floor(Math.random() * getRotateCubeFuncs.length)
    cubeNext = getRotateCubeFuncs[randInt](cubeNext)
  }
  return cubeNext
}

export const getAngle = (piece: string): number => {
  const direction = piece[1]
  return "↑→↓←".indexOf(direction) * 90
}

export const getColor = (piece: string): string => {
  const character = piece[0]
    .replace(/[一二三四五六七八九]/, "五")
    .replace(/[１２３４５６７８９]/, "５")
    .replace(/[①②③④⑤⑥⑦⑧⑨]/, "⑤")
  return (
    {
      白: "#0000cc",
      發: "#00cc00",
      中: "#cc0000",
      五: "#990000",
      "５": "#009900",
      "⑤": "#000099",
    }[character] ?? "#000000"
  )
}

export const getRotateCubeX = (cube: string[][]): string[][] => {
  cube = getRotateCubeR(cube)
  cube = getRotateCubeMp(cube)
  cube = getRotateCubeLp(cube)
  return cube
}

export const getRotateCubeXp = (cube: string[][]): string[][] => {
  cube = getRotateCubeRp(cube)
  cube = getRotateCubeM(cube)
  cube = getRotateCubeL(cube)
  return cube
}

export const getRotateCubeY = (cube: string[][]): string[][] => {
  cube = getRotateCubeU(cube)
  cube = getRotateCubeEp(cube)
  cube = getRotateCubeDp(cube)
  return cube
}

export const getRotateCubeYp = (cube: string[][]): string[][] => {
  cube = getRotateCubeUp(cube)
  cube = getRotateCubeE(cube)
  cube = getRotateCubeD(cube)
  return cube
}

export const getRotateCubeZ = (cube: string[][]): string[][] => {
  cube = getRotateCubeF(cube)
  cube = getRotateCubeS(cube)
  cube = getRotateCubeBp(cube)
  return cube
}

export const getRotateCubeZp = (cube: string[][]): string[][] => {
  cube = getRotateCubeFp(cube)
  cube = getRotateCubeSp(cube)
  cube = getRotateCubeB(cube)
  return cube
}

export const getRotateCubeR = (cube: string[][]): string[][] => {
  let cubeNext = cloneDeep(cube)
  cubeNext = rotateWithFace(cube, cubeNext, 3, false)
  cubeNext = rotateWithConnection(cube, cubeNext, 1, [2, 5, 8], 0)
  cubeNext = rotateWithConnection(cube, cubeNext, 2, [2, 5, 8], 1)
  cubeNext = rotateWithConnection(cube, cubeNext, 4, [0, 3, 6], 2)
  cubeNext = rotateWithConnection(cube, cubeNext, 0, [2, 5, 8], 4)
  return cubeNext
}

export const getRotateCubeRp = (cube: string[][]): string[][] => {
  let cubeNext = cloneDeep(cube)
  cubeNext = rotateWithFace(cube, cubeNext, 3, true)
  cubeNext = rotateWithConnection(cube, cubeNext, 4, [0, 3, 6], 0)
  cubeNext = rotateWithConnection(cube, cubeNext, 0, [2, 5, 8], 1)
  cubeNext = rotateWithConnection(cube, cubeNext, 1, [2, 5, 8], 2)
  cubeNext = rotateWithConnection(cube, cubeNext, 2, [2, 5, 8], 4)
  return cubeNext
}

export const getRotateCubeM = (cube: string[][]): string[][] => {
  let cubeNext = cloneDeep(cube)
  cubeNext = rotateWithConnection(cube, cubeNext, 4, [1, 4, 7], 0)
  cubeNext = rotateWithConnection(cube, cubeNext, 0, [1, 4, 7], 1)
  cubeNext = rotateWithConnection(cube, cubeNext, 1, [1, 4, 7], 2)
  cubeNext = rotateWithConnection(cube, cubeNext, 2, [1, 4, 7], 4)
  return cubeNext
}

export const getRotateCubeMp = (cube: string[][]): string[][] => {
  let cubeNext = cloneDeep(cube)
  cubeNext = rotateWithConnection(cube, cubeNext, 1, [1, 4, 7], 0)
  cubeNext = rotateWithConnection(cube, cubeNext, 2, [1, 4, 7], 1)
  cubeNext = rotateWithConnection(cube, cubeNext, 4, [1, 4, 7], 2)
  cubeNext = rotateWithConnection(cube, cubeNext, 0, [1, 4, 7], 4)
  return cubeNext
}

export const getRotateCubeL = (cube: string[][]): string[][] => {
  let cubeNext = cloneDeep(cube)
  cubeNext = rotateWithFace(cube, cubeNext, 5, false)
  cubeNext = rotateWithConnection(cube, cubeNext, 4, [2, 5, 8], 0)
  cubeNext = rotateWithConnection(cube, cubeNext, 0, [0, 3, 6], 1)
  cubeNext = rotateWithConnection(cube, cubeNext, 1, [0, 3, 6], 2)
  cubeNext = rotateWithConnection(cube, cubeNext, 2, [0, 3, 6], 4)
  return cubeNext
}

export const getRotateCubeLp = (cube: string[][]): string[][] => {
  let cubeNext = cloneDeep(cube)
  cubeNext = rotateWithFace(cube, cubeNext, 5, true)
  cubeNext = rotateWithConnection(cube, cubeNext, 1, [0, 3, 6], 0)
  cubeNext = rotateWithConnection(cube, cubeNext, 2, [0, 3, 6], 1)
  cubeNext = rotateWithConnection(cube, cubeNext, 4, [2, 5, 8], 2)
  cubeNext = rotateWithConnection(cube, cubeNext, 0, [0, 3, 6], 4)
  return cubeNext
}

export const getRotateCubeU = (cube: string[][]): string[][] => {
  let cubeNext = cloneDeep(cube)
  cubeNext = rotateWithFace(cube, cubeNext, 0, false)
  cubeNext = rotateWithConnection(cube, cubeNext, 3, [0, 1, 2], 1)
  cubeNext = rotateWithConnection(cube, cubeNext, 4, [0, 1, 2], 3)
  cubeNext = rotateWithConnection(cube, cubeNext, 5, [0, 1, 2], 4)
  cubeNext = rotateWithConnection(cube, cubeNext, 1, [0, 1, 2], 5)
  return cubeNext
}

export const getRotateCubeUp = (cube: string[][]): string[][] => {
  let cubeNext = cloneDeep(cube)
  cubeNext = rotateWithFace(cube, cubeNext, 0, true)
  cubeNext = rotateWithConnection(cube, cubeNext, 5, [0, 1, 2], 1)
  cubeNext = rotateWithConnection(cube, cubeNext, 1, [0, 1, 2], 3)
  cubeNext = rotateWithConnection(cube, cubeNext, 3, [0, 1, 2], 4)
  cubeNext = rotateWithConnection(cube, cubeNext, 4, [0, 1, 2], 5)
  return cubeNext
}

export const getRotateCubeE = (cube: string[][]): string[][] => {
  let cubeNext = cloneDeep(cube)
  cubeNext = rotateWithConnection(cube, cubeNext, 5, [3, 4, 5], 1)
  cubeNext = rotateWithConnection(cube, cubeNext, 1, [3, 4, 5], 3)
  cubeNext = rotateWithConnection(cube, cubeNext, 3, [3, 4, 5], 4)
  cubeNext = rotateWithConnection(cube, cubeNext, 4, [3, 4, 5], 5)
  return cubeNext
}

export const getRotateCubeEp = (cube: string[][]): string[][] => {
  let cubeNext = cloneDeep(cube)
  cubeNext = rotateWithConnection(cube, cubeNext, 3, [3, 4, 5], 1)
  cubeNext = rotateWithConnection(cube, cubeNext, 4, [3, 4, 5], 3)
  cubeNext = rotateWithConnection(cube, cubeNext, 5, [3, 4, 5], 4)
  cubeNext = rotateWithConnection(cube, cubeNext, 1, [3, 4, 5], 5)
  return cubeNext
}

export const getRotateCubeD = (cube: string[][]): string[][] => {
  let cubeNext = cloneDeep(cube)
  cubeNext = rotateWithFace(cube, cubeNext, 2, false)
  cubeNext = rotateWithConnection(cube, cubeNext, 5, [6, 7, 8], 1)
  cubeNext = rotateWithConnection(cube, cubeNext, 1, [6, 7, 8], 3)
  cubeNext = rotateWithConnection(cube, cubeNext, 3, [6, 7, 8], 4)
  cubeNext = rotateWithConnection(cube, cubeNext, 4, [6, 7, 8], 5)
  return cubeNext
}

export const getRotateCubeDp = (cube: string[][]): string[][] => {
  let cubeNext = cloneDeep(cube)
  cubeNext = rotateWithFace(cube, cubeNext, 2, true)
  cubeNext = rotateWithConnection(cube, cubeNext, 3, [6, 7, 8], 1)
  cubeNext = rotateWithConnection(cube, cubeNext, 4, [6, 7, 8], 3)
  cubeNext = rotateWithConnection(cube, cubeNext, 5, [6, 7, 8], 4)
  cubeNext = rotateWithConnection(cube, cubeNext, 1, [6, 7, 8], 5)
  return cubeNext
}

export const getRotateCubeF = (cube: string[][]): string[][] => {
  let cubeNext = cloneDeep(cube)
  cubeNext = rotateWithFace(cube, cubeNext, 1, false)
  cubeNext = rotateWithConnection(cube, cubeNext, 5, [2, 5, 8], 0)
  cubeNext = rotateWithConnection(cube, cubeNext, 3, [0, 3, 6], 2)
  cubeNext = rotateWithConnection(cube, cubeNext, 0, [6, 7, 8], 3)
  cubeNext = rotateWithConnection(cube, cubeNext, 2, [0, 1, 2], 5)
  return cubeNext
}

export const getRotateCubeFp = (cube: string[][]): string[][] => {
  let cubeNext = cloneDeep(cube)
  cubeNext = rotateWithFace(cube, cubeNext, 1, true)
  cubeNext = rotateWithConnection(cube, cubeNext, 3, [0, 3, 6], 0)
  cubeNext = rotateWithConnection(cube, cubeNext, 5, [2, 5, 8], 2)
  cubeNext = rotateWithConnection(cube, cubeNext, 2, [0, 1, 2], 3)
  cubeNext = rotateWithConnection(cube, cubeNext, 0, [6, 7, 8], 5)
  return cubeNext
}

export const getRotateCubeS = (cube: string[][]): string[][] => {
  let cubeNext = cloneDeep(cube)
  cubeNext = rotateWithConnection(cube, cubeNext, 5, [1, 4, 7], 0)
  cubeNext = rotateWithConnection(cube, cubeNext, 3, [1, 4, 7], 2)
  cubeNext = rotateWithConnection(cube, cubeNext, 0, [3, 4, 5], 3)
  cubeNext = rotateWithConnection(cube, cubeNext, 2, [3, 4, 5], 5)
  return cubeNext
}

export const getRotateCubeSp = (cube: string[][]): string[][] => {
  let cubeNext = cloneDeep(cube)
  cubeNext = rotateWithConnection(cube, cubeNext, 3, [1, 4, 7], 0)
  cubeNext = rotateWithConnection(cube, cubeNext, 5, [1, 4, 7], 2)
  cubeNext = rotateWithConnection(cube, cubeNext, 2, [3, 4, 5], 3)
  cubeNext = rotateWithConnection(cube, cubeNext, 0, [3, 4, 5], 5)
  return cubeNext
}

export const getRotateCubeB = (cube: string[][]): string[][] => {
  let cubeNext = cloneDeep(cube)
  cubeNext = rotateWithFace(cube, cubeNext, 4, false)
  cubeNext = rotateWithConnection(cube, cubeNext, 3, [2, 5, 8], 0)
  cubeNext = rotateWithConnection(cube, cubeNext, 5, [0, 3, 6], 2)
  cubeNext = rotateWithConnection(cube, cubeNext, 2, [6, 7, 8], 3)
  cubeNext = rotateWithConnection(cube, cubeNext, 0, [0, 1, 2], 5)
  return cubeNext
}

export const getRotateCubeBp = (cube: string[][]): string[][] => {
  let cubeNext = cloneDeep(cube)
  cubeNext = rotateWithFace(cube, cubeNext, 4, true)
  cubeNext = rotateWithConnection(cube, cubeNext, 5, [0, 3, 6], 0)
  cubeNext = rotateWithConnection(cube, cubeNext, 3, [2, 5, 8], 2)
  cubeNext = rotateWithConnection(cube, cubeNext, 0, [0, 1, 2], 3)
  cubeNext = rotateWithConnection(cube, cubeNext, 2, [6, 7, 8], 5)
  return cubeNext
}

export const getRotateCubeDrag = (
  cube: string[][],
  fromDrag: { faceIndex: number; pieceIndex: number },
  toDrag: { faceIndex: number; pieceIndex: number }
): string[][] => {
  if (fromDrag.faceIndex === 0) {
    if (fromDrag.pieceIndex === 0) {
      if (toDrag.faceIndex === 0 && toDrag.pieceIndex === 1)
        cube = getRotateCubeBp(cube)
      if (toDrag.faceIndex === 0 && toDrag.pieceIndex === 3)
        cube = getRotateCubeL(cube)
    }
    if (fromDrag.pieceIndex === 1) {
      if (toDrag.faceIndex === 0 && toDrag.pieceIndex === 0)
        cube = getRotateCubeB(cube)
      if (toDrag.faceIndex === 0 && toDrag.pieceIndex === 2)
        cube = getRotateCubeBp(cube)
      if (toDrag.faceIndex === 0 && toDrag.pieceIndex === 4)
        cube = getRotateCubeM(cube)
    }
    if (fromDrag.pieceIndex === 2) {
      if (toDrag.faceIndex === 0 && toDrag.pieceIndex === 1)
        cube = getRotateCubeB(cube)
      if (toDrag.faceIndex === 0 && toDrag.pieceIndex === 5)
        cube = getRotateCubeRp(cube)
      if (toDrag.faceIndex === 3 && toDrag.pieceIndex === 2)
        cube = getRotateCubeBp(cube)
    }
    if (fromDrag.pieceIndex === 3) {
      if (toDrag.faceIndex === 0 && toDrag.pieceIndex === 0)
        cube = getRotateCubeLp(cube)
      if (toDrag.faceIndex === 0 && toDrag.pieceIndex === 4)
        cube = getRotateCubeS(cube)
      if (toDrag.faceIndex === 0 && toDrag.pieceIndex === 6)
        cube = getRotateCubeL(cube)
    }
    if (fromDrag.pieceIndex === 4) {
      if (toDrag.faceIndex === 0 && toDrag.pieceIndex === 1)
        cube = getRotateCubeMp(cube)
      if (toDrag.faceIndex === 0 && toDrag.pieceIndex === 3)
        cube = getRotateCubeSp(cube)
      if (toDrag.faceIndex === 0 && toDrag.pieceIndex === 5)
        cube = getRotateCubeS(cube)
      if (toDrag.faceIndex === 0 && toDrag.pieceIndex === 7)
        cube = getRotateCubeM(cube)
    }
    if (fromDrag.pieceIndex === 5) {
      if (toDrag.faceIndex === 0 && toDrag.pieceIndex === 2)
        cube = getRotateCubeR(cube)
      if (toDrag.faceIndex === 0 && toDrag.pieceIndex === 4)
        cube = getRotateCubeSp(cube)
      if (toDrag.faceIndex === 0 && toDrag.pieceIndex === 8)
        cube = getRotateCubeRp(cube)
      if (toDrag.faceIndex === 3 && toDrag.pieceIndex === 1)
        cube = getRotateCubeS(cube)
    }
    if (fromDrag.pieceIndex === 6) {
      if (toDrag.faceIndex === 0 && toDrag.pieceIndex === 3)
        cube = getRotateCubeLp(cube)
      if (toDrag.faceIndex === 0 && toDrag.pieceIndex === 7)
        cube = getRotateCubeF(cube)
      if (toDrag.faceIndex === 1 && toDrag.pieceIndex === 0)
        cube = getRotateCubeL(cube)
    }
    if (fromDrag.pieceIndex === 7) {
      if (toDrag.faceIndex === 0 && toDrag.pieceIndex === 4)
        cube = getRotateCubeMp(cube)
      if (toDrag.faceIndex === 0 && toDrag.pieceIndex === 6)
        cube = getRotateCubeFp(cube)
      if (toDrag.faceIndex === 0 && toDrag.pieceIndex === 8)
        cube = getRotateCubeF(cube)
      if (toDrag.faceIndex === 1 && toDrag.pieceIndex === 1)
        cube = getRotateCubeM(cube)
    }
    if (fromDrag.pieceIndex === 8) {
      if (toDrag.faceIndex === 0 && toDrag.pieceIndex === 5)
        cube = getRotateCubeR(cube)
      if (toDrag.faceIndex === 0 && toDrag.pieceIndex === 7)
        cube = getRotateCubeFp(cube)
      if (toDrag.faceIndex === 1 && toDrag.pieceIndex === 2)
        cube = getRotateCubeRp(cube)
      if (toDrag.faceIndex === 3 && toDrag.pieceIndex === 0)
        cube = getRotateCubeF(cube)
    }
  }
  if (fromDrag.faceIndex === 1) {
    if (fromDrag.pieceIndex === 0) {
      if (toDrag.faceIndex === 0 && toDrag.pieceIndex === 6)
        cube = getRotateCubeLp(cube)
      if (toDrag.faceIndex === 1 && toDrag.pieceIndex === 1)
        cube = getRotateCubeUp(cube)
      if (toDrag.faceIndex === 1 && toDrag.pieceIndex === 3)
        cube = getRotateCubeL(cube)
    }
    if (fromDrag.pieceIndex === 1) {
      if (toDrag.faceIndex === 0 && toDrag.pieceIndex === 7)
        cube = getRotateCubeMp(cube)
      if (toDrag.faceIndex === 1 && toDrag.pieceIndex === 0)
        cube = getRotateCubeU(cube)
      if (toDrag.faceIndex === 1 && toDrag.pieceIndex === 2)
        cube = getRotateCubeUp(cube)
      if (toDrag.faceIndex === 1 && toDrag.pieceIndex === 4)
        cube = getRotateCubeM(cube)
    }
    if (fromDrag.pieceIndex === 2) {
      if (toDrag.faceIndex === 0 && toDrag.pieceIndex === 8)
        cube = getRotateCubeR(cube)
      if (toDrag.faceIndex === 1 && toDrag.pieceIndex === 1)
        cube = getRotateCubeU(cube)
      if (toDrag.faceIndex === 1 && toDrag.pieceIndex === 5)
        cube = getRotateCubeRp(cube)
      if (toDrag.faceIndex === 3 && toDrag.pieceIndex === 0)
        cube = getRotateCubeUp(cube)
    }
    if (fromDrag.pieceIndex === 3) {
      if (toDrag.faceIndex === 1 && toDrag.pieceIndex === 0)
        cube = getRotateCubeLp(cube)
      if (toDrag.faceIndex === 1 && toDrag.pieceIndex === 4)
        cube = getRotateCubeE(cube)
      if (toDrag.faceIndex === 1 && toDrag.pieceIndex === 6)
        cube = getRotateCubeL(cube)
    }
    if (fromDrag.pieceIndex === 4) {
      if (toDrag.faceIndex === 1 && toDrag.pieceIndex === 1)
        cube = getRotateCubeLp(cube)
      if (toDrag.faceIndex === 1 && toDrag.pieceIndex === 3)
        cube = getRotateCubeEp(cube)
      if (toDrag.faceIndex === 1 && toDrag.pieceIndex === 5)
        cube = getRotateCubeE(cube)
      if (toDrag.faceIndex === 1 && toDrag.pieceIndex === 7)
        cube = getRotateCubeL(cube)
    }
    if (fromDrag.pieceIndex === 5) {
      if (toDrag.faceIndex === 1 && toDrag.pieceIndex === 2)
        cube = getRotateCubeR(cube)
      if (toDrag.faceIndex === 1 && toDrag.pieceIndex === 4)
        cube = getRotateCubeEp(cube)
      if (toDrag.faceIndex === 1 && toDrag.pieceIndex === 8)
        cube = getRotateCubeRp(cube)
      if (toDrag.faceIndex === 3 && toDrag.pieceIndex === 3)
        cube = getRotateCubeE(cube)
    }
    if (fromDrag.pieceIndex === 6) {
      if (toDrag.faceIndex === 1 && toDrag.pieceIndex === 3)
        cube = getRotateCubeLp(cube)
      if (toDrag.faceIndex === 1 && toDrag.pieceIndex === 7)
        cube = getRotateCubeD(cube)
    }
    if (fromDrag.pieceIndex === 7) {
      if (toDrag.faceIndex === 1 && toDrag.pieceIndex === 4)
        cube = getRotateCubeMp(cube)
      if (toDrag.faceIndex === 1 && toDrag.pieceIndex === 6)
        cube = getRotateCubeDp(cube)
      if (toDrag.faceIndex === 1 && toDrag.pieceIndex === 8)
        cube = getRotateCubeD(cube)
    }
    if (fromDrag.pieceIndex === 8) {
      if (toDrag.faceIndex === 1 && toDrag.pieceIndex === 5)
        cube = getRotateCubeR(cube)
      if (toDrag.faceIndex === 1 && toDrag.pieceIndex === 7)
        cube = getRotateCubeDp(cube)
      if (toDrag.faceIndex === 3 && toDrag.pieceIndex === 6)
        cube = getRotateCubeD(cube)
    }
  }
  if (fromDrag.faceIndex === 3) {
    if (fromDrag.pieceIndex === 0) {
      if (toDrag.faceIndex === 0 && toDrag.pieceIndex === 8)
        cube = getRotateCubeFp(cube)
      if (toDrag.faceIndex === 1 && toDrag.pieceIndex === 2)
        cube = getRotateCubeU(cube)
      if (toDrag.faceIndex === 3 && toDrag.pieceIndex === 1)
        cube = getRotateCubeUp(cube)
      if (toDrag.faceIndex === 3 && toDrag.pieceIndex === 3)
        cube = getRotateCubeF(cube)
    }
    if (fromDrag.pieceIndex === 1) {
      if (toDrag.faceIndex === 0 && toDrag.pieceIndex === 5)
        cube = getRotateCubeSp(cube)
      if (toDrag.faceIndex === 3 && toDrag.pieceIndex === 0)
        cube = getRotateCubeU(cube)
      if (toDrag.faceIndex === 3 && toDrag.pieceIndex === 2)
        cube = getRotateCubeUp(cube)
      if (toDrag.faceIndex === 3 && toDrag.pieceIndex === 4)
        cube = getRotateCubeS(cube)
    }
    if (fromDrag.pieceIndex === 2) {
      if (toDrag.faceIndex === 0 && toDrag.pieceIndex === 2)
        cube = getRotateCubeB(cube)
      if (toDrag.faceIndex === 3 && toDrag.pieceIndex === 1)
        cube = getRotateCubeU(cube)
      if (toDrag.faceIndex === 3 && toDrag.pieceIndex === 5)
        cube = getRotateCubeBp(cube)
    }
    if (fromDrag.pieceIndex === 3) {
      if (toDrag.faceIndex === 1 && toDrag.pieceIndex === 5)
        cube = getRotateCubeEp(cube)
      if (toDrag.faceIndex === 3 && toDrag.pieceIndex === 0)
        cube = getRotateCubeFp(cube)
      if (toDrag.faceIndex === 3 && toDrag.pieceIndex === 4)
        cube = getRotateCubeE(cube)
      if (toDrag.faceIndex === 3 && toDrag.pieceIndex === 6)
        cube = getRotateCubeF(cube)
    }
    if (fromDrag.pieceIndex === 4) {
      if (toDrag.faceIndex === 3 && toDrag.pieceIndex === 1)
        cube = getRotateCubeSp(cube)
      if (toDrag.faceIndex === 3 && toDrag.pieceIndex === 3)
        cube = getRotateCubeEp(cube)
      if (toDrag.faceIndex === 3 && toDrag.pieceIndex === 5)
        cube = getRotateCubeE(cube)
      if (toDrag.faceIndex === 3 && toDrag.pieceIndex === 7)
        cube = getRotateCubeS(cube)
    }
    if (fromDrag.pieceIndex === 5) {
      if (toDrag.faceIndex === 3 && toDrag.pieceIndex === 2)
        cube = getRotateCubeB(cube)
      if (toDrag.faceIndex === 3 && toDrag.pieceIndex === 4)
        cube = getRotateCubeEp(cube)
      if (toDrag.faceIndex === 3 && toDrag.pieceIndex === 8)
        cube = getRotateCubeBp(cube)
    }
    if (fromDrag.pieceIndex === 6) {
      if (toDrag.faceIndex === 1 && toDrag.pieceIndex === 8)
        cube = getRotateCubeDp(cube)
      if (toDrag.faceIndex === 3 && toDrag.pieceIndex === 3)
        cube = getRotateCubeFp(cube)
      if (toDrag.faceIndex === 3 && toDrag.pieceIndex === 7)
        cube = getRotateCubeD(cube)
    }
    if (fromDrag.pieceIndex === 7) {
      if (toDrag.faceIndex === 3 && toDrag.pieceIndex === 4)
        cube = getRotateCubeSp(cube)
      if (toDrag.faceIndex === 3 && toDrag.pieceIndex === 6)
        cube = getRotateCubeDp(cube)
      if (toDrag.faceIndex === 3 && toDrag.pieceIndex === 8)
        cube = getRotateCubeD(cube)
    }
    if (fromDrag.pieceIndex === 8) {
      if (toDrag.faceIndex === 3 && toDrag.pieceIndex === 5)
        cube = getRotateCubeB(cube)
      if (toDrag.faceIndex === 3 && toDrag.pieceIndex === 7)
        cube = getRotateCubeDp(cube)
    }
  }
  return cube
}
