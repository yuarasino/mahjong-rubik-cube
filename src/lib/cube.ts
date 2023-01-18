import { cloneDeep } from "lodash"
import { Dispatch, SetStateAction } from "react"

/**
 * キューブの初期配置
 *
 * ・・１２３４５６７８９ＡＢＣ・
 * ・・・・・・・・・・・・・・・
 * １・①②③・・・・・・・・・・
 * ２・④⑤⑥・・・・・・・・・・
 * ３・⑦⑧⑨・・・・・・・・・・
 * ４・１２３白白白發發發中中中・
 * ５・４５６白白白發發發中中中・
 * ６・７８９白白白發發發中中中・
 * ７・一二三・・・・・・・・・・
 * ８・四五六・・・・・・・・・・
 * ９・七八九・・・・・・・・・・
 * ・・・・・・・・・・・・・・・
 */
export const initialCharacter = [
  // 0: 筒
  ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨"],
  // 1: 索
  ["１", "２", "３", "４", "５", "６", "７", "８", "９"],
  // 2: 萬
  ["一", "二", "三", "四", "五", "六", "七", "八", "九"],
  // 3: 白
  ["白", "白", "白", "白", "白", "白", "白", "白", "白"],
  // 4: 發
  ["發", "發", "發", "發", "發", "發", "發", "發", "發"],
  // 5: 中
  ["中", "中", "中", "中", "中", "中", "中", "中", "中"],
]

/**
 * キューブの初期方向
 */
export const initialRotation = [
  // 0: 筒
  ["↑", "↑", "↑", "↑", "↑", "↑", "↑", "↑", "↑"],
  // 1: 索
  ["↑", "↑", "↑", "↑", "↑", "↑", "↑", "↑", "↑"],
  // 2: 萬
  ["↑", "↑", "↑", "↑", "↑", "↑", "↑", "↑", "↑"],
  // 3: 白
  ["↑", "↑", "↑", "↑", "↑", "↑", "↑", "↑", "↑"],
  // 4: 發
  ["↑", "↑", "↑", "↑", "↑", "↑", "↑", "↑", "↑"],
  // 5: 中
  ["↑", "↑", "↑", "↑", "↑", "↑", "↑", "↑", "↑"],
]

export const rot2deg = (rot: string): number => {
  const map = {
    "↑": 0,
    "→": 90,
    "↓": 180,
    "←": 270,
  } as { [key: string]: number }
  return map[rot]
}

export const deg2rot = (deg: number): string => {
  const map = {
    0: "↑",
    90: "→",
    180: "↓",
    270: "←",
  } as { [key: number]: string }
  return map[deg]
}

export const char2col = (char: string): string => {
  char = char.replace(/[一二三四五六七八九]/, "五")
  char = char.replace(/[１２３４５６７８９]/, "５")
  char = char.replace(/[①②③④⑤⑥⑦⑧⑨]/, "⑤")
  const map = {
    白: "#0000cc",
    發: "#00cc00",
    中: "#cc0000",
    五: "#990000",
    "５": "#009900",
    "⑤": "#000099",
  } as { [key: string]: string }
  return map[char]
}

export const zip = (arr1: any[], arr2: any[]) => {
  return arr1.map((_, i) => [arr1[i], arr2[i]])
}

const rotateCharMatF = (mat: string[]): string[] => {
  return [
    mat[6],
    mat[3],
    mat[0],
    mat[7],
    mat[4],
    mat[1],
    mat[8],
    mat[5],
    mat[2],
  ]
}

const rotateCharMatFd = (mat: string[]): string[] => {
  return [
    mat[2],
    mat[5],
    mat[8],
    mat[1],
    mat[4],
    mat[7],
    mat[0],
    mat[3],
    mat[6],
  ]
}

const rotateCharMatF2 = (mat: string[]): string[] => {
  return rotateCharMatF(rotateCharMatF(mat))
}

const rotateRotF = (m: string): string => {
  return deg2rot((rot2deg(m) + 90) % 360)
}

const rotateRotFd = (m: string): string => {
  return deg2rot((rot2deg(m) + 270) % 360)
}

const rotateRotF2 = (m: string): string => {
  return rotateRotF(rotateRotF(m))
}

const rotateRotMatF = (mat: string[]): string[] => {
  return mat.map((m) => rotateRotF(m))
}

const rotateRotMatFd = (mat: string[]): string[] => {
  return mat.map((m) => rotateRotFd(m))
}

const rotateRotMatF2 = (mat: string[]): string[] => {
  return rotateRotMatF(rotateRotMatF(mat))
}

export const rotateXd = (
  character: string[][],
  rotation: string[][],
  setCharacter: Dispatch<SetStateAction<string[][]>>,
  setRotation: Dispatch<SetStateAction<string[][]>>
) => {
  const characterNext = cloneDeep(character)
  const rotationNext = cloneDeep(rotation)

  characterNext[0] = rotateCharMatF2(character[4])
  characterNext[1] = character[0]
  characterNext[2] = character[1]
  characterNext[3] = rotateCharMatFd(character[3])
  characterNext[4] = rotateCharMatF2(character[2])
  characterNext[5] = rotateCharMatF(character[5])

  rotationNext[0] = rotateRotMatF2(rotateCharMatF2(rotation[4]))
  rotationNext[1] = rotation[0]
  rotationNext[2] = rotation[1]
  rotationNext[3] = rotateRotMatFd(rotateCharMatFd(rotation[3]))
  rotationNext[4] = rotateRotMatF2(rotateCharMatF2(rotation[2]))
  rotationNext[5] = rotateRotMatF(rotateCharMatF(rotation[5]))

  setCharacter(characterNext)
  setRotation(rotationNext)
}

export const rotateX = (
  character: string[][],
  rotation: string[][],
  setCharacter: Dispatch<SetStateAction<string[][]>>,
  setRotation: Dispatch<SetStateAction<string[][]>>
) => {
  const characterNext = cloneDeep(character)
  const rotationNext = cloneDeep(rotation)

  characterNext[0] = character[1]
  characterNext[1] = character[2]
  characterNext[2] = rotateCharMatF2(character[4])
  characterNext[3] = rotateCharMatF(character[3])
  characterNext[4] = rotateCharMatF2(character[0])
  characterNext[5] = rotateCharMatFd(character[5])

  rotationNext[0] = rotation[1]
  rotationNext[1] = rotation[2]
  rotationNext[2] = rotateRotMatF2(rotateCharMatF2(rotation[4]))
  rotationNext[3] = rotateRotMatF(rotateCharMatF(rotation[3]))
  rotationNext[4] = rotateRotMatF2(rotateCharMatF2(rotation[0]))
  rotationNext[5] = rotateRotMatFd(rotateCharMatFd(rotation[5]))

  setCharacter(characterNext)
  setRotation(rotationNext)
}

export const rotateYd = (
  character: string[][],
  rotation: string[][],
  setCharacter: Dispatch<SetStateAction<string[][]>>,
  setRotation: Dispatch<SetStateAction<string[][]>>
) => {
  const characterNext = cloneDeep(character)
  const rotationNext = cloneDeep(rotation)

  characterNext[0] = rotateCharMatFd(character[0])
  characterNext[1] = character[5]
  characterNext[2] = rotateCharMatF(character[2])
  characterNext[3] = character[1]
  characterNext[4] = character[3]
  characterNext[5] = character[4]

  rotationNext[0] = rotateRotMatFd(rotateCharMatFd(rotation[0]))
  rotationNext[1] = rotation[5]
  rotationNext[2] = rotateRotMatF(rotateCharMatF(rotation[2]))
  rotationNext[3] = rotation[1]
  rotationNext[4] = rotation[3]
  rotationNext[5] = rotation[4]

  setCharacter(characterNext)
  setRotation(rotationNext)
}

export const rotateY = (
  character: string[][],
  rotation: string[][],
  setCharacter: Dispatch<SetStateAction<string[][]>>,
  setRotation: Dispatch<SetStateAction<string[][]>>
) => {
  const characterNext = cloneDeep(character)
  const rotationNext = cloneDeep(rotation)

  characterNext[0] = rotateCharMatF(character[0])
  characterNext[1] = character[3]
  characterNext[2] = rotateCharMatFd(character[2])
  characterNext[3] = character[4]
  characterNext[4] = character[5]
  characterNext[5] = character[1]

  rotationNext[0] = rotateRotMatF(rotateCharMatF(rotation[0]))
  rotationNext[1] = rotation[3]
  rotationNext[2] = rotateRotMatFd(rotateCharMatFd(rotation[2]))
  rotationNext[3] = rotation[4]
  rotationNext[4] = rotation[5]
  rotationNext[5] = rotation[1]

  setCharacter(characterNext)
  setRotation(rotationNext)
}

export const rotateZ = (
  character: string[][],
  rotation: string[][],
  setCharacter: Dispatch<SetStateAction<string[][]>>,
  setRotation: Dispatch<SetStateAction<string[][]>>
) => {
  const characterNext = cloneDeep(character)
  const rotationNext = cloneDeep(rotation)

  characterNext[0] = rotateCharMatF(character[5])
  characterNext[1] = rotateCharMatF(character[1])
  characterNext[2] = rotateCharMatF(character[3])
  characterNext[3] = rotateCharMatF(character[0])
  characterNext[4] = rotateCharMatFd(character[4])
  characterNext[5] = rotateCharMatF(character[2])

  rotationNext[0] = rotateRotMatF(rotateCharMatF(rotation[5]))
  rotationNext[1] = rotateRotMatF(rotateCharMatF(rotation[1]))
  rotationNext[2] = rotateRotMatF(rotateCharMatF(rotation[3]))
  rotationNext[3] = rotateRotMatF(rotateCharMatF(rotation[0]))
  rotationNext[4] = rotateRotMatFd(rotateCharMatFd(rotation[4]))
  rotationNext[5] = rotateRotMatF(rotateCharMatF(rotation[2]))

  setCharacter(characterNext)
  setRotation(rotationNext)
}

export const rotateZd = (
  character: string[][],
  rotation: string[][],
  setCharacter: Dispatch<SetStateAction<string[][]>>,
  setRotation: Dispatch<SetStateAction<string[][]>>
) => {
  const characterNext = cloneDeep(character)
  const rotationNext = cloneDeep(rotation)

  characterNext[0] = rotateCharMatFd(character[3])
  characterNext[1] = rotateCharMatFd(character[1])
  characterNext[2] = rotateCharMatFd(character[5])
  characterNext[3] = rotateCharMatFd(character[2])
  characterNext[4] = rotateCharMatF(character[4])
  characterNext[5] = rotateCharMatFd(character[0])

  rotationNext[0] = rotateRotMatFd(rotateCharMatFd(rotation[3]))
  rotationNext[1] = rotateRotMatFd(rotateCharMatFd(rotation[1]))
  rotationNext[2] = rotateRotMatFd(rotateCharMatFd(rotation[5]))
  rotationNext[3] = rotateRotMatFd(rotateCharMatFd(rotation[2]))
  rotationNext[4] = rotateRotMatF(rotateCharMatF(rotation[4]))
  rotationNext[5] = rotateRotMatFd(rotateCharMatFd(rotation[0]))

  setCharacter(characterNext)
  setRotation(rotationNext)
}

export const rotateU = (
  character: string[][],
  rotation: string[][],
  setCharacter: Dispatch<SetStateAction<string[][]>>,
  setRotation: Dispatch<SetStateAction<string[][]>>
) => {
  const characterNext = cloneDeep(character)
  const rotationNext = cloneDeep(rotation)

  characterNext[0] = rotateCharMatF(character[0])
  rotationNext[0] = rotateRotMatF(rotation[0])
  characterNext[1][0] = character[3][0]
  characterNext[1][1] = character[3][1]
  characterNext[1][2] = character[3][2]
  characterNext[3][0] = character[4][0]
  characterNext[3][1] = character[4][1]
  characterNext[3][2] = character[4][2]
  characterNext[4][0] = character[5][0]
  characterNext[4][1] = character[5][1]
  characterNext[4][2] = character[5][2]
  characterNext[5][0] = character[1][0]
  characterNext[5][1] = character[1][1]
  characterNext[5][2] = character[1][2]

  setCharacter(characterNext)
  setRotation(rotationNext)
}

export const rotateUd = (
  character: string[][],
  rotation: string[][],
  setCharacter: Dispatch<SetStateAction<string[][]>>,
  setRotation: Dispatch<SetStateAction<string[][]>>
) => {
  const characterNext = cloneDeep(character)
  const rotationNext = cloneDeep(rotation)

  characterNext[0] = rotateCharMatFd(character[0])
  rotationNext[0] = rotateRotMatFd(rotation[0])
  characterNext[1][0] = character[5][0]
  characterNext[1][1] = character[5][1]
  characterNext[1][2] = character[5][2]
  characterNext[3][0] = character[1][0]
  characterNext[3][1] = character[1][1]
  characterNext[3][2] = character[1][2]
  characterNext[4][0] = character[3][0]
  characterNext[4][1] = character[3][1]
  characterNext[4][2] = character[3][2]
  characterNext[5][0] = character[4][0]
  characterNext[5][1] = character[4][1]
  characterNext[5][2] = character[4][2]

  setCharacter(characterNext)
  setRotation(rotationNext)
}

export const rotateF = (
  character: string[][],
  rotation: string[][],
  setCharacter: Dispatch<SetStateAction<string[][]>>,
  setRotation: Dispatch<SetStateAction<string[][]>>
) => {
  const characterNext = cloneDeep(character)
  const rotationNext = cloneDeep(rotation)

  characterNext[1] = rotateCharMatF(character[1])
  rotationNext[1] = rotateRotMatF(rotation[1])
  characterNext[0][6] = character[5][8]
  characterNext[0][7] = character[5][5]
  characterNext[0][8] = character[5][2]
  rotationNext[0][6] = rotateRotF(rotation[5][8])
  rotationNext[0][7] = rotateRotF(rotation[5][5])
  rotationNext[0][8] = rotateRotF(rotation[5][2])
  characterNext[2][0] = character[3][6]
  characterNext[2][1] = character[3][3]
  characterNext[2][2] = character[3][0]
  rotationNext[2][0] = rotateRotF(rotation[3][6])
  rotationNext[2][1] = rotateRotF(rotation[3][3])
  rotationNext[2][2] = rotateRotF(rotation[3][0])
  characterNext[3][0] = character[0][6]
  characterNext[3][3] = character[0][7]
  characterNext[3][6] = character[0][8]
  rotationNext[3][0] = rotateRotF(rotation[0][6])
  rotationNext[3][3] = rotateRotF(rotation[0][7])
  rotationNext[3][6] = rotateRotF(rotation[0][8])
  characterNext[5][2] = character[2][0]
  characterNext[5][5] = character[2][1]
  characterNext[5][8] = character[2][2]
  rotationNext[5][2] = rotateRotF(rotation[2][0])
  rotationNext[5][5] = rotateRotF(rotation[2][1])
  rotationNext[5][8] = rotateRotF(rotation[2][2])

  setCharacter(characterNext)
  setRotation(rotationNext)
}

export const rotateFd = (
  character: string[][],
  rotation: string[][],
  setCharacter: Dispatch<SetStateAction<string[][]>>,
  setRotation: Dispatch<SetStateAction<string[][]>>
) => {
  const characterNext = cloneDeep(character)
  const rotationNext = cloneDeep(rotation)

  characterNext[1] = rotateCharMatFd(character[1])
  rotationNext[1] = rotateRotMatFd(rotation[1])
  characterNext[0][6] = character[3][0]
  characterNext[0][7] = character[3][3]
  characterNext[0][8] = character[3][6]
  rotationNext[0][6] = rotateRotFd(rotation[3][0])
  rotationNext[0][7] = rotateRotFd(rotation[3][3])
  rotationNext[0][8] = rotateRotFd(rotation[3][6])
  characterNext[2][0] = character[5][2]
  characterNext[2][1] = character[5][5]
  characterNext[2][2] = character[5][8]
  rotationNext[2][0] = rotateRotFd(rotation[5][2])
  rotationNext[2][1] = rotateRotFd(rotation[5][5])
  rotationNext[2][2] = rotateRotFd(rotation[5][8])
  characterNext[3][0] = character[2][2]
  characterNext[3][3] = character[2][1]
  characterNext[3][6] = character[2][0]
  rotationNext[3][0] = rotateRotFd(rotation[2][2])
  rotationNext[3][3] = rotateRotFd(rotation[2][1])
  rotationNext[3][6] = rotateRotFd(rotation[2][0])
  characterNext[5][2] = character[0][8]
  characterNext[5][5] = character[0][7]
  characterNext[5][8] = character[0][6]
  rotationNext[5][2] = rotateRotFd(rotation[0][8])
  rotationNext[5][5] = rotateRotFd(rotation[0][7])
  rotationNext[5][8] = rotateRotFd(rotation[0][6])

  setCharacter(characterNext)
  setRotation(rotationNext)
}

export const rotateR = (
  character: string[][],
  rotation: string[][],
  setCharacter: Dispatch<SetStateAction<string[][]>>,
  setRotation: Dispatch<SetStateAction<string[][]>>
) => {
  const characterNext = cloneDeep(character)
  const rotationNext = cloneDeep(rotation)

  characterNext[3] = rotateCharMatF(character[3])
  rotationNext[3] = rotateRotMatF(rotation[3])
  characterNext[0][2] = character[1][2]
  characterNext[0][5] = character[1][5]
  characterNext[0][8] = character[1][8]
  characterNext[1][2] = character[2][2]
  characterNext[1][5] = character[2][5]
  characterNext[1][8] = character[2][8]
  characterNext[2][2] = character[4][6]
  characterNext[2][5] = character[4][3]
  characterNext[2][8] = character[4][0]
  rotationNext[2][2] = rotateRotF2(rotation[4][6])
  rotationNext[2][5] = rotateRotF2(rotation[4][3])
  rotationNext[2][8] = rotateRotF2(rotation[4][0])
  characterNext[4][0] = character[0][8]
  characterNext[4][3] = character[0][5]
  characterNext[4][6] = character[0][2]
  rotationNext[4][0] = rotateRotF2(rotation[0][8])
  rotationNext[4][3] = rotateRotF2(rotation[0][5])
  rotationNext[4][6] = rotateRotF2(rotation[0][2])

  setCharacter(characterNext)
  setRotation(rotationNext)
}

export const rotateRd = (
  character: string[][],
  rotation: string[][],
  setCharacter: Dispatch<SetStateAction<string[][]>>,
  setRotation: Dispatch<SetStateAction<string[][]>>
) => {
  const characterNext = cloneDeep(character)
  const rotationNext = cloneDeep(rotation)

  characterNext[3] = rotateCharMatFd(character[3])
  rotationNext[3] = rotateRotMatFd(rotation[3])
  characterNext[0][2] = character[4][6]
  characterNext[0][5] = character[4][3]
  characterNext[0][8] = character[4][0]
  rotationNext[0][2] = rotateRotF2(rotation[4][6])
  rotationNext[0][5] = rotateRotF2(rotation[4][3])
  rotationNext[0][8] = rotateRotF2(rotation[4][0])
  characterNext[1][2] = character[0][2]
  characterNext[1][5] = character[0][5]
  characterNext[1][8] = character[0][8]
  characterNext[2][2] = character[1][2]
  characterNext[2][5] = character[1][5]
  characterNext[2][8] = character[1][8]
  characterNext[4][0] = character[2][8]
  characterNext[4][3] = character[2][5]
  characterNext[4][6] = character[2][2]
  rotationNext[4][0] = rotateRotF2(rotation[2][8])
  rotationNext[4][3] = rotateRotF2(rotation[2][5])
  rotationNext[4][6] = rotateRotF2(rotation[2][2])

  setCharacter(characterNext)
  setRotation(rotationNext)
}

export const rotateD = (
  character: string[][],
  rotation: string[][],
  setCharacter: Dispatch<SetStateAction<string[][]>>,
  setRotation: Dispatch<SetStateAction<string[][]>>
) => {
  const characterNext = cloneDeep(character)
  const rotationNext = cloneDeep(rotation)

  characterNext[2] = rotateCharMatF(character[2])
  rotationNext[2] = rotateRotMatF(rotation[2])
  characterNext[1][6] = character[5][6]
  characterNext[1][7] = character[5][7]
  characterNext[1][8] = character[5][8]
  characterNext[3][6] = character[1][6]
  characterNext[3][7] = character[1][7]
  characterNext[3][8] = character[1][8]
  characterNext[4][6] = character[3][6]
  characterNext[4][7] = character[3][7]
  characterNext[4][8] = character[3][8]
  characterNext[5][6] = character[4][6]
  characterNext[5][7] = character[4][7]
  characterNext[5][8] = character[4][8]

  setCharacter(characterNext)
  setRotation(rotationNext)
}

export const rotateDd = (
  character: string[][],
  rotation: string[][],
  setCharacter: Dispatch<SetStateAction<string[][]>>,
  setRotation: Dispatch<SetStateAction<string[][]>>
) => {
  const characterNext = cloneDeep(character)
  const rotationNext = cloneDeep(rotation)

  characterNext[2] = rotateCharMatFd(character[2])
  rotationNext[2] = rotateRotMatFd(rotation[2])
  characterNext[1][6] = character[3][6]
  characterNext[1][7] = character[3][7]
  characterNext[1][8] = character[3][8]
  characterNext[3][6] = character[4][6]
  characterNext[3][7] = character[4][7]
  characterNext[3][8] = character[4][8]
  characterNext[4][6] = character[5][6]
  characterNext[4][7] = character[5][7]
  characterNext[4][8] = character[5][8]
  characterNext[5][6] = character[1][6]
  characterNext[5][7] = character[1][7]
  characterNext[5][8] = character[1][8]

  setCharacter(characterNext)
  setRotation(rotationNext)
}

export const rotateB = (
  character: string[][],
  rotation: string[][],
  setCharacter: Dispatch<SetStateAction<string[][]>>,
  setRotation: Dispatch<SetStateAction<string[][]>>
) => {
  const characterNext = cloneDeep(character)
  const rotationNext = cloneDeep(rotation)

  characterNext[4] = rotateCharMatF(character[4])
  rotationNext[4] = rotateRotMatF(rotation[4])
  characterNext[0][0] = character[3][2]
  characterNext[0][1] = character[3][5]
  characterNext[0][2] = character[3][8]
  rotationNext[0][0] = rotateRotFd(rotation[3][2])
  rotationNext[0][1] = rotateRotFd(rotation[3][5])
  rotationNext[0][2] = rotateRotFd(rotation[3][8])
  characterNext[2][6] = character[5][0]
  characterNext[2][7] = character[5][3]
  characterNext[2][8] = character[5][6]
  rotationNext[2][6] = rotateRotFd(rotation[5][0])
  rotationNext[2][7] = rotateRotFd(rotation[5][3])
  rotationNext[2][8] = rotateRotFd(rotation[5][6])
  characterNext[3][2] = character[2][8]
  characterNext[3][5] = character[2][7]
  characterNext[3][8] = character[2][6]
  rotationNext[3][2] = rotateRotFd(rotation[2][8])
  rotationNext[3][5] = rotateRotFd(rotation[2][7])
  rotationNext[3][8] = rotateRotFd(rotation[2][6])

  characterNext[5][0] = character[0][2]
  characterNext[5][3] = character[0][1]
  characterNext[5][6] = character[0][0]
  rotationNext[5][0] = rotateRotFd(rotation[0][2])
  rotationNext[5][3] = rotateRotFd(rotation[0][1])
  rotationNext[5][6] = rotateRotFd(rotation[0][0])

  setCharacter(characterNext)
  setRotation(rotationNext)
}

export const rotateBd = (
  character: string[][],
  rotation: string[][],
  setCharacter: Dispatch<SetStateAction<string[][]>>,
  setRotation: Dispatch<SetStateAction<string[][]>>
) => {
  const characterNext = cloneDeep(character)
  const rotationNext = cloneDeep(rotation)

  // characterNext[3] = rotateCharMatFd(character[3])
  // rotationNext[3] = rotateRotMatFd(rotation[3])
  // characterNext[0][2] = character[4][6]
  // characterNext[0][5] = character[4][3]
  // characterNext[0][8] = character[4][0]
  // rotationNext[0][2] = rotateRotF2(rotation[4][6])
  // rotationNext[0][5] = rotateRotF2(rotation[4][3])
  // rotationNext[0][8] = rotateRotF2(rotation[4][0])
  // characterNext[1][2] = character[0][2]
  // characterNext[1][5] = character[0][5]
  // characterNext[1][8] = character[0][8]
  // characterNext[2][2] = character[1][2]
  // characterNext[2][5] = character[1][5]
  // characterNext[2][8] = character[1][8]
  // characterNext[4][0] = character[2][8]
  // characterNext[4][3] = character[2][5]
  // characterNext[4][6] = character[2][2]
  // rotationNext[4][0] = rotateRotF2(rotation[2][8])
  // rotationNext[4][3] = rotateRotF2(rotation[2][5])
  // rotationNext[4][6] = rotateRotF2(rotation[2][2])

  setCharacter(characterNext)
  setRotation(rotationNext)
}

export const rotateL = (
  character: string[][],
  rotation: string[][],
  setCharacter: Dispatch<SetStateAction<string[][]>>,
  setRotation: Dispatch<SetStateAction<string[][]>>
) => {
  const characterNext = cloneDeep(character)
  const rotationNext = cloneDeep(rotation)

  // characterNext[3] = rotateCharMatFd(character[3])
  // rotationNext[3] = rotateRotMatFd(rotation[3])
  // characterNext[0][2] = character[4][6]
  // characterNext[0][5] = character[4][3]
  // characterNext[0][8] = character[4][0]
  // rotationNext[0][2] = rotateRotF2(rotation[4][6])
  // rotationNext[0][5] = rotateRotF2(rotation[4][3])
  // rotationNext[0][8] = rotateRotF2(rotation[4][0])
  // characterNext[1][2] = character[0][2]
  // characterNext[1][5] = character[0][5]
  // characterNext[1][8] = character[0][8]
  // characterNext[2][2] = character[1][2]
  // characterNext[2][5] = character[1][5]
  // characterNext[2][8] = character[1][8]
  // characterNext[4][0] = character[2][8]
  // characterNext[4][3] = character[2][5]
  // characterNext[4][6] = character[2][2]
  // rotationNext[4][0] = rotateRotF2(rotation[2][8])
  // rotationNext[4][3] = rotateRotF2(rotation[2][5])
  // rotationNext[4][6] = rotateRotF2(rotation[2][2])

  setCharacter(characterNext)
  setRotation(rotationNext)
}

export const rotateLd = (
  character: string[][],
  rotation: string[][],
  setCharacter: Dispatch<SetStateAction<string[][]>>,
  setRotation: Dispatch<SetStateAction<string[][]>>
) => {
  const characterNext = cloneDeep(character)
  const rotationNext = cloneDeep(rotation)

  // characterNext[3] = rotateCharMatFd(character[3])
  // rotationNext[3] = rotateRotMatFd(rotation[3])
  // characterNext[0][2] = character[4][6]
  // characterNext[0][5] = character[4][3]
  // characterNext[0][8] = character[4][0]
  // rotationNext[0][2] = rotateRotF2(rotation[4][6])
  // rotationNext[0][5] = rotateRotF2(rotation[4][3])
  // rotationNext[0][8] = rotateRotF2(rotation[4][0])
  // characterNext[1][2] = character[0][2]
  // characterNext[1][5] = character[0][5]
  // characterNext[1][8] = character[0][8]
  // characterNext[2][2] = character[1][2]
  // characterNext[2][5] = character[1][5]
  // characterNext[2][8] = character[1][8]
  // characterNext[4][0] = character[2][8]
  // characterNext[4][3] = character[2][5]
  // characterNext[4][6] = character[2][2]
  // rotationNext[4][0] = rotateRotF2(rotation[2][8])
  // rotationNext[4][3] = rotateRotF2(rotation[2][5])
  // rotationNext[4][6] = rotateRotF2(rotation[2][2])

  setCharacter(characterNext)
  setRotation(rotationNext)
}

export const rotateM = (
  character: string[][],
  rotation: string[][],
  setCharacter: Dispatch<SetStateAction<string[][]>>,
  setRotation: Dispatch<SetStateAction<string[][]>>
) => {
  const characterNext = cloneDeep(character)
  const rotationNext = cloneDeep(rotation)

  // characterNext[3] = rotateCharMatFd(character[3])
  // rotationNext[3] = rotateRotMatFd(rotation[3])
  // characterNext[0][2] = character[4][6]
  // characterNext[0][5] = character[4][3]
  // characterNext[0][8] = character[4][0]
  // rotationNext[0][2] = rotateRotF2(rotation[4][6])
  // rotationNext[0][5] = rotateRotF2(rotation[4][3])
  // rotationNext[0][8] = rotateRotF2(rotation[4][0])
  // characterNext[1][2] = character[0][2]
  // characterNext[1][5] = character[0][5]
  // characterNext[1][8] = character[0][8]
  // characterNext[2][2] = character[1][2]
  // characterNext[2][5] = character[1][5]
  // characterNext[2][8] = character[1][8]
  // characterNext[4][0] = character[2][8]
  // characterNext[4][3] = character[2][5]
  // characterNext[4][6] = character[2][2]
  // rotationNext[4][0] = rotateRotF2(rotation[2][8])
  // rotationNext[4][3] = rotateRotF2(rotation[2][5])
  // rotationNext[4][6] = rotateRotF2(rotation[2][2])

  setCharacter(characterNext)
  setRotation(rotationNext)
}

export const rotateMd = (
  character: string[][],
  rotation: string[][],
  setCharacter: Dispatch<SetStateAction<string[][]>>,
  setRotation: Dispatch<SetStateAction<string[][]>>
) => {
  const characterNext = cloneDeep(character)
  const rotationNext = cloneDeep(rotation)

  // characterNext[3] = rotateCharMatFd(character[3])
  // rotationNext[3] = rotateRotMatFd(rotation[3])
  // characterNext[0][2] = character[4][6]
  // characterNext[0][5] = character[4][3]
  // characterNext[0][8] = character[4][0]
  // rotationNext[0][2] = rotateRotF2(rotation[4][6])
  // rotationNext[0][5] = rotateRotF2(rotation[4][3])
  // rotationNext[0][8] = rotateRotF2(rotation[4][0])
  // characterNext[1][2] = character[0][2]
  // characterNext[1][5] = character[0][5]
  // characterNext[1][8] = character[0][8]
  // characterNext[2][2] = character[1][2]
  // characterNext[2][5] = character[1][5]
  // characterNext[2][8] = character[1][8]
  // characterNext[4][0] = character[2][8]
  // characterNext[4][3] = character[2][5]
  // characterNext[4][6] = character[2][2]
  // rotationNext[4][0] = rotateRotF2(rotation[2][8])
  // rotationNext[4][3] = rotateRotF2(rotation[2][5])
  // rotationNext[4][6] = rotateRotF2(rotation[2][2])

  setCharacter(characterNext)
  setRotation(rotationNext)
}

export const rotateE = (
  character: string[][],
  rotation: string[][],
  setCharacter: Dispatch<SetStateAction<string[][]>>,
  setRotation: Dispatch<SetStateAction<string[][]>>
) => {
  const characterNext = cloneDeep(character)
  const rotationNext = cloneDeep(rotation)

  // characterNext[3] = rotateCharMatFd(character[3])
  // rotationNext[3] = rotateRotMatFd(rotation[3])
  // characterNext[0][2] = character[4][6]
  // characterNext[0][5] = character[4][3]
  // characterNext[0][8] = character[4][0]
  // rotationNext[0][2] = rotateRotF2(rotation[4][6])
  // rotationNext[0][5] = rotateRotF2(rotation[4][3])
  // rotationNext[0][8] = rotateRotF2(rotation[4][0])
  // characterNext[1][2] = character[0][2]
  // characterNext[1][5] = character[0][5]
  // characterNext[1][8] = character[0][8]
  // characterNext[2][2] = character[1][2]
  // characterNext[2][5] = character[1][5]
  // characterNext[2][8] = character[1][8]
  // characterNext[4][0] = character[2][8]
  // characterNext[4][3] = character[2][5]
  // characterNext[4][6] = character[2][2]
  // rotationNext[4][0] = rotateRotF2(rotation[2][8])
  // rotationNext[4][3] = rotateRotF2(rotation[2][5])
  // rotationNext[4][6] = rotateRotF2(rotation[2][2])

  setCharacter(characterNext)
  setRotation(rotationNext)
}

export const rotateEd = (
  character: string[][],
  rotation: string[][],
  setCharacter: Dispatch<SetStateAction<string[][]>>,
  setRotation: Dispatch<SetStateAction<string[][]>>
) => {
  const characterNext = cloneDeep(character)
  const rotationNext = cloneDeep(rotation)

  // characterNext[3] = rotateCharMatFd(character[3])
  // rotationNext[3] = rotateRotMatFd(rotation[3])
  // characterNext[0][2] = character[4][6]
  // characterNext[0][5] = character[4][3]
  // characterNext[0][8] = character[4][0]
  // rotationNext[0][2] = rotateRotF2(rotation[4][6])
  // rotationNext[0][5] = rotateRotF2(rotation[4][3])
  // rotationNext[0][8] = rotateRotF2(rotation[4][0])
  // characterNext[1][2] = character[0][2]
  // characterNext[1][5] = character[0][5]
  // characterNext[1][8] = character[0][8]
  // characterNext[2][2] = character[1][2]
  // characterNext[2][5] = character[1][5]
  // characterNext[2][8] = character[1][8]
  // characterNext[4][0] = character[2][8]
  // characterNext[4][3] = character[2][5]
  // characterNext[4][6] = character[2][2]
  // rotationNext[4][0] = rotateRotF2(rotation[2][8])
  // rotationNext[4][3] = rotateRotF2(rotation[2][5])
  // rotationNext[4][6] = rotateRotF2(rotation[2][2])

  setCharacter(characterNext)
  setRotation(rotationNext)
}

export const rotateS = (
  character: string[][],
  rotation: string[][],
  setCharacter: Dispatch<SetStateAction<string[][]>>,
  setRotation: Dispatch<SetStateAction<string[][]>>
) => {
  const characterNext = cloneDeep(character)
  const rotationNext = cloneDeep(rotation)

  // characterNext[3] = rotateCharMatFd(character[3])
  // rotationNext[3] = rotateRotMatFd(rotation[3])
  // characterNext[0][2] = character[4][6]
  // characterNext[0][5] = character[4][3]
  // characterNext[0][8] = character[4][0]
  // rotationNext[0][2] = rotateRotF2(rotation[4][6])
  // rotationNext[0][5] = rotateRotF2(rotation[4][3])
  // rotationNext[0][8] = rotateRotF2(rotation[4][0])
  // characterNext[1][2] = character[0][2]
  // characterNext[1][5] = character[0][5]
  // characterNext[1][8] = character[0][8]
  // characterNext[2][2] = character[1][2]
  // characterNext[2][5] = character[1][5]
  // characterNext[2][8] = character[1][8]
  // characterNext[4][0] = character[2][8]
  // characterNext[4][3] = character[2][5]
  // characterNext[4][6] = character[2][2]
  // rotationNext[4][0] = rotateRotF2(rotation[2][8])
  // rotationNext[4][3] = rotateRotF2(rotation[2][5])
  // rotationNext[4][6] = rotateRotF2(rotation[2][2])

  setCharacter(characterNext)
  setRotation(rotationNext)
}

export const rotateSd = (
  character: string[][],
  rotation: string[][],
  setCharacter: Dispatch<SetStateAction<string[][]>>,
  setRotation: Dispatch<SetStateAction<string[][]>>
) => {
  const characterNext = cloneDeep(character)
  const rotationNext = cloneDeep(rotation)

  // characterNext[3] = rotateCharMatFd(character[3])
  // rotationNext[3] = rotateRotMatFd(rotation[3])
  // characterNext[0][2] = character[4][6]
  // characterNext[0][5] = character[4][3]
  // characterNext[0][8] = character[4][0]
  // rotationNext[0][2] = rotateRotF2(rotation[4][6])
  // rotationNext[0][5] = rotateRotF2(rotation[4][3])
  // rotationNext[0][8] = rotateRotF2(rotation[4][0])
  // characterNext[1][2] = character[0][2]
  // characterNext[1][5] = character[0][5]
  // characterNext[1][8] = character[0][8]
  // characterNext[2][2] = character[1][2]
  // characterNext[2][5] = character[1][5]
  // characterNext[2][8] = character[1][8]
  // characterNext[4][0] = character[2][8]
  // characterNext[4][3] = character[2][5]
  // characterNext[4][6] = character[2][2]
  // rotationNext[4][0] = rotateRotF2(rotation[2][8])
  // rotationNext[4][3] = rotateRotF2(rotation[2][5])
  // rotationNext[4][6] = rotateRotF2(rotation[2][2])

  setCharacter(characterNext)
  setRotation(rotationNext)
}
