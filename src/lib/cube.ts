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

const rotateWithFace = (cube: string[][], cubeNext: string[][], face: number, prime: boolean): string[][] => {
  const destinationMap = [
    [6, 3, 0, 7, 4, 1, 8, 5, 2],
    [2, 5, 8, 1, 4, 7, 0, 3, 6],
  ][prime ? 1: 0]
  const directionMap = [
    "→↓←↑",
    "←↑→↓",
  ][prime ? 1: 0]
  for (let fromPiece=0; fromPiece<9; fromPiece++) {
    let toPiece = destinationMap.indexOf(fromPiece)
    let piece = cube[face][fromPiece]
    cubeNext[face][toPiece] = piece[0] + directionMap["↑→↓←".indexOf(piece[1])]
  }
  return cubeNext
}

const rotateWithConnection = (cube: string[][], cubeNext: string[][], fromFace: number, fromPices: number[], toFace: number): string[][] => {
  const connection = connectionMap[fromFace][toFace]
  const destinationMap = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8],
    [6, 3, 0, 7, 4, 1, 8, 5, 2],
    [8, 7, 6, 5, 4, 3, 2, 1, 0],
    [2, 5, 8, 1, 4, 7, 0, 3, 6],
  ]["↑→↓←".indexOf(connection)]
  const directionMap = [
    "↑→↓←",
    "→↓←↑",
    "↓←↑→",
    "←↑→↓",
  ]["↑→↓←".indexOf(connection)]
  for (let fromPiece of fromPices) {
    let toPiece = destinationMap.indexOf(fromPiece)
    let piece = cube[fromFace][fromPiece]
    cubeNext[toFace][toPiece] = piece[0] + directionMap["↑→↓←".indexOf(piece[1])]
  }
  return cubeNext
}

export const getResetCube = (): string[][] => {
  return cloneDeep(initialCube)
}

export const getShuffleCube = (): string[][] => {
  return cloneDeep(initialCube)
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
  return cube
}

export const getRotateCubeXp = (cube: string[][]): string[][] => {
  return cube
}

export const getRotateCubeY = (cube: string[][]): string[][] => {
  return cube
}

export const getRotateCubeYp = (cube: string[][]): string[][] => {
  return cube
}

export const getRotateCubeZ = (cube: string[][]): string[][] => {
  return cube
}

export const getRotateCubeZp = (cube: string[][]): string[][] => {
  return cube
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
