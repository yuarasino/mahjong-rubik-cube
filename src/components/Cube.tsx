import { DragEvent, useState } from "react"

import {
  getResetCube,
  getShuffleCube,
  getAngle,
  getColor,
  getRotateCubeX,
  getRotateCubeXp,
  getRotateCubeY,
  getRotateCubeYp,
  getRotateCubeZ,
  getRotateCubeZp,
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
  getRotateCubeDrag,
} from "@/lib/cube"
import styles from "@/styles/Cube.module.css"

type CubeData = string[][]
type DragData = { faceIndex: number; pieceIndex: number } | null

const Cube = () => {
  const [cube, setCube] = useState(getResetCube() as CubeData)
  const [drag, setDrag] = useState(null as DragData)

  const resetCube = () => {
    setCube(getResetCube())
  }
  const shuffleCube = () => {
    setCube(getShuffleCube())
  }

  const rotateCubeX = () => {
    setCube(getRotateCubeX(cube))
  }
  const rotateCubeXp = () => {
    setCube(getRotateCubeXp(cube))
  }
  const rotateCubeY = () => {
    setCube(getRotateCubeY(cube))
  }
  const rotateCubeYp = () => {
    setCube(getRotateCubeYp(cube))
  }
  const rotateCubeZ = () => {
    setCube(getRotateCubeZ(cube))
  }
  const rotateCubeZp = () => {
    setCube(getRotateCubeZp(cube))
  }

  const rotateCubeR = () => {
    setCube(getRotateCubeR(cube))
  }
  const rotateCubeRp = () => {
    setCube(getRotateCubeRp(cube))
  }
  const rotateCubeM = () => {
    setCube(getRotateCubeM(cube))
  }
  const rotateCubeMp = () => {
    setCube(getRotateCubeMp(cube))
  }
  const rotateCubeL = () => {
    setCube(getRotateCubeL(cube))
  }
  const rotateCubeLp = () => {
    setCube(getRotateCubeLp(cube))
  }
  const rotateCubeU = () => {
    setCube(getRotateCubeU(cube))
  }
  const rotateCubeUp = () => {
    setCube(getRotateCubeUp(cube))
  }
  const rotateCubeE = () => {
    setCube(getRotateCubeE(cube))
  }
  const rotateCubeEp = () => {
    setCube(getRotateCubeEp(cube))
  }
  const rotateCubeD = () => {
    setCube(getRotateCubeD(cube))
  }
  const rotateCubeDp = () => {
    setCube(getRotateCubeDp(cube))
  }
  const rotateCubeF = () => {
    setCube(getRotateCubeF(cube))
  }
  const rotateCubeFp = () => {
    setCube(getRotateCubeFp(cube))
  }
  const rotateCubeS = () => {
    setCube(getRotateCubeS(cube))
  }
  const rotateCubeSp = () => {
    setCube(getRotateCubeSp(cube))
  }
  const rotateCubeB = () => {
    setCube(getRotateCubeB(cube))
  }
  const rotateCubeBp = () => {
    setCube(getRotateCubeBp(cube))
  }

  const registerDrag = (data: DragData) => {
    setDrag(data)
  }
  const applyDrag = (data: DragData) => {
    if (drag === null || data === null) return
    if (
      drag.faceIndex === data.faceIndex &&
      drag.pieceIndex === data.pieceIndex
    )
      return
    setCube(getRotateCubeDrag(cube, drag, data))
    setDrag(null)
  }

  return (
    <div className={styles.cube}>
      {cube.map((face, faceIndex) => (
        <Face
          key={faceIndex}
          face={face}
          faceIndex={faceIndex}
          registerDrag={registerDrag}
          applyDrag={applyDrag}
        />
      ))}

      <SwitchButton
        key={"X"}
        transform="rotateX(90deg) translateY(-180px)"
        onClick={rotateCubeX}
      />
      <SwitchButton
        key={"Xp"}
        transform="rotateZ(180deg) translateY(-180px)"
        onClick={rotateCubeXp}
      />
      <SwitchButton
        key={"Y"}
        transform="rotateZ(-90deg) translateY(-180px)"
        onClick={rotateCubeY}
      />
      <SwitchButton
        key={"Yp"}
        transform="rotateY(90deg) rotateZ(90deg) translateY(-180px)"
        onClick={rotateCubeYp}
      />
      <SwitchButton
        key={"Z"}
        transform="rotateY(90deg) rotateZ(180deg) translateY(-180px)"
        onClick={rotateCubeZ}
      />
      <SwitchButton
        key={"Zp"}
        transform="rotateX(90deg) rotateZ(-90deg) translateY(-180px)"
        onClick={rotateCubeZp}
      />

      <RotationButton
        key={"R"}
        transform="rotateX(90deg) translateX(60px) translateY(-120px)"
        onClick={rotateCubeR}
      />
      <RotationButton
        key={"Rp"}
        transform="rotateZ(180deg) translateX(-60px) translateY(-120px)"
        onClick={rotateCubeRp}
      />
      <RotationButton
        key={"M"}
        transform="rotateZ(180deg) translateY(-120px)"
        onClick={rotateCubeM}
      />
      <RotationButton
        key={"Mp"}
        transform="rotateX(90deg) translateY(-120px)"
        onClick={rotateCubeMp}
      />
      <RotationButton
        key={"L"}
        transform="rotateZ(180deg) translateX(60px) translateY(-120px)"
        onClick={rotateCubeL}
      />
      <RotationButton
        key={"Lp"}
        transform="rotateX(90deg) translateX(-60px) translateY(-120px)"
        onClick={rotateCubeLp}
      />
      <RotationButton
        key={"U"}
        transform="rotateZ(-90deg) translateX(60px) translateY(-120px)"
        onClick={rotateCubeU}
      />
      <RotationButton
        key={"Up"}
        transform="rotateY(90deg) rotateZ(90deg) translateX(-60px) translateY(-120px)"
        onClick={rotateCubeUp}
      />
      <RotationButton
        key={"E"}
        transform="rotateY(90deg) rotateZ(90deg) translateY(-120px)"
        onClick={rotateCubeE}
      />
      <RotationButton
        key={"Ep"}
        transform="rotateZ(-90deg) translateY(-120px)"
        onClick={rotateCubeEp}
      />
      <RotationButton
        key={"D"}
        transform="rotateY(90deg) rotateZ(90deg) translateX(60px) translateY(-120px)"
        onClick={rotateCubeD}
      />
      <RotationButton
        key={"Dp"}
        transform="rotateZ(-90deg) translateX(-60px) translateY(-120px)"
        onClick={rotateCubeDp}
      />
      <RotationButton
        key={"F"}
        transform="rotateY(90deg) rotateZ(180deg) translateX(60px) translateY(-120px)"
        onClick={rotateCubeF}
      />
      <RotationButton
        key={"Fp"}
        transform="rotateX(90deg) rotateZ(-90deg) translateX(-60px) translateY(-120px)"
        onClick={rotateCubeFp}
      />
      <RotationButton
        key={"S"}
        transform="rotateY(90deg) rotateZ(180deg) translateY(-120px)"
        onClick={rotateCubeS}
      />
      <RotationButton
        key={"Sp"}
        transform="rotateX(90deg) rotateZ(-90deg) translateY(-120px)"
        onClick={rotateCubeSp}
      />
      <RotationButton
        key={"B"}
        transform="rotateX(90deg) rotateZ(-90deg) translateX(60px) translateY(-120px)"
        onClick={rotateCubeB}
      />
      <RotationButton
        key={"Bp"}
        transform="rotateY(90deg) rotateZ(180deg) translateX(-60px) translateY(-120px)"
        onClick={rotateCubeBp}
      />

      <ActionButton
        key={"Shuffle"}
        label={"シャッフル"}
        transform="translateX(-230px) translateY(-270px)"
        onClick={shuffleCube}
      />
      <ActionButton
        key={"Reset"}
        label={"リセット"}
        transform="translateX(230px) translateY(-270px)"
        onClick={resetCube}
      />
    </div>
  )
}

const Face = ({
  face,
  faceIndex,
  registerDrag,
  applyDrag,
}: {
  face: string[]
  faceIndex: number
  registerDrag: (data: DragData) => void
  applyDrag: (data: DragData) => void
}) => {
  const style = {
    transform:
      "translateX(-50%) translateY(-50%) rotateX(-45deg) rotateY(-45deg)",
  }
  if (faceIndex === 0) {
    style.transform += "rotateX(90deg)"
  } else if (faceIndex === 1) {
    style.transform += ""
  } else if (faceIndex === 3) {
    style.transform += "rotateY(90deg)"
  } else {
    return <></>
  }
  return (
    <div className={styles.face} style={style}>
      {face.map((piece, pieceIndex) => (
        <Piece
          key={pieceIndex}
          piece={piece}
          faceIndex={faceIndex}
          pieceIndex={pieceIndex}
          registerDrag={registerDrag}
          applyDrag={applyDrag}
        />
      ))}
    </div>
  )
}

const Piece = ({
  piece,
  faceIndex,
  pieceIndex,
  registerDrag,
  applyDrag,
}: {
  piece: string
  faceIndex: number
  pieceIndex: number
  registerDrag: (data: DragData) => void
  applyDrag: (data: DragData) => void
}) => {
  const character = piece[0]
  const angle = getAngle(piece)
  const color = getColor(piece)
  const style = {
    color: color,
    transform: `rotateZ(${angle}deg)`,
  }
  const onDragStart = (e: DragEvent<HTMLDivElement>) => {
    const data = { faceIndex, pieceIndex }
    const image = new Image()
    e.dataTransfer.setDragImage(image, 0, 0)
    registerDrag(data)
  }
  const onDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const data = { faceIndex, pieceIndex }
    applyDrag(data)
  }
  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }
  const onDragEnd = () => {
    registerDrag(null)
  }
  return (
    <div
      className={styles.piece}
      style={style}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      draggable
    >
      {character}
    </div>
  )
}

const SwitchButton = ({
  transform,
  onClick,
}: {
  transform: string
  onClick: () => void
}) => {
  const style = {
    transform:
      "translateX(-50%) translateY(-50%) rotateX(-45deg) rotateY(-45deg)",
  }
  style.transform += transform
  return (
    <button
      type="button"
      className={styles.switch}
      style={style}
      onClick={onClick}
    >
      {"↑"}
    </button>
  )
}

const RotationButton = ({
  transform,
  onClick,
}: {
  transform: string
  onClick: () => void
}) => {
  const style = {
    transform:
      "translateX(-50%) translateY(-50%) rotateX(-45deg) rotateY(-45deg)",
  }
  style.transform += transform
  return (
    <button
      type="button"
      className={styles.rotation}
      style={style}
      onClick={onClick}
    >
      {"↑"}
    </button>
  )
}

const ActionButton = ({
  label,
  transform,
  onClick,
}: {
  label: string
  transform: string
  onClick: () => void
}) => {
  const style = {
    transform: "translateX(-50%) translateY(-50%)",
  }
  style.transform += transform
  return (
    <button
      type="button"
      className={styles.action}
      style={style}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export default Cube
