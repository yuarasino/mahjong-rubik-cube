import { cloneDeep } from "lodash"
import { useState } from "react"

import {
  initialCharacter,
  initialRotation,
  zip,
  rot2deg,
  char2col,
  rotateZd,
  rotateX,
  rotateYd,
  rotateZ,
  rotateXd,
  rotateY,
  rotateU,
  rotateUd,
  rotateF,
  rotateFd,
  rotateR,
  rotateRd,
  rotateD,
  rotateDd,
  rotateB,
  rotateBd,
  rotateL,
  rotateLd,
  rotateM,
  rotateMd,
  rotateE,
  rotateEd,
  rotateS,
  rotateSd,
  shuffle,
  reset,
} from "@/lib/cube"
import styles from "@/styles/Cube.module.css"

const Cube = () => {
  const [character, setCharacter] = useState(cloneDeep(initialCharacter))
  const [rotation, setRotation] = useState(cloneDeep(initialRotation))

  return (
    <div className={styles.cube}>
      {zip(character, rotation).map(([chars, rots], si) =>
        Surface(chars, rots, si)
      )}
      <SurfaceButton
        sbi={0}
        func={() => rotateXd(character, rotation, setCharacter, setRotation)}
        transform="translateX(-53px) translateY(210px) rotateX(-45deg) rotateY(-45deg) rotateZ(180deg)"
      />
      <SurfaceButton
        sbi={1}
        func={() => rotateX(character, rotation, setCharacter, setRotation)}
        transform="translateX(110px) translateY(-80px) rotateX(45deg) rotateY(0deg) rotateZ(45deg)"
      />
      <SurfaceButton
        sbi={2}
        func={() => rotateYd(character, rotation, setCharacter, setRotation)}
        transform="translateX(163px) translateY(10px) rotateX(-45deg) rotateY(45deg) rotateZ(90deg)"
      />
      <SurfaceButton
        sbi={3}
        func={() => rotateY(character, rotation, setCharacter, setRotation)}
        transform="translateX(-163px) translateY(10px) rotateX(-45deg) rotateY(-45deg) rotateZ(-90deg)"
      />
      <SurfaceButton
        sbi={4}
        func={() => rotateZ(character, rotation, setCharacter, setRotation)}
        transform="translateX(53px) translateY(210px) rotateX(-45deg) rotateY(45deg) rotateZ(180deg)"
      />
      <SurfaceButton
        sbi={5}
        func={() => rotateZd(character, rotation, setCharacter, setRotation)}
        transform="translateX(-110px) translateY(-80px) rotateX(45deg) rotateY(0deg) rotateZ(-45deg)"
      />
      <PieceButton
        pbi={0}
        func={() => rotateU(character, rotation, setCharacter, setRotation)}
        transform="translateX(-67px) translateY(6px) rotateX(-45deg) rotateY(-45deg) rotateZ(-90deg)"
      />
      <PieceButton
        pbi={1}
        func={() => rotateUd(character, rotation, setCharacter, setRotation)}
        transform="translateX(188px) translateY(6px) rotateX(-45deg) rotateY(45deg) rotateZ(90deg)"
      />
      <PieceButton
        pbi={2}
        func={() => rotateF(character, rotation, setCharacter, setRotation)}
        transform="translateX(82px) translateY(193px) rotateX(-45deg) rotateY(45deg) rotateZ(180deg)"
      />
      <PieceButton
        pbi={3}
        func={() => rotateFd(character, rotation, setCharacter, setRotation)}
        transform="translateX(-48px) translateY(-30px) rotateX(45deg) rotateY(0deg) rotateZ(-45deg)"
      />
      <PieceButton
        pbi={4}
        func={() => rotateR(character, rotation, setCharacter, setRotation)}
        transform="translateX(170px) translateY(-28px) rotateX(45deg) rotateY(0deg) rotateZ(45deg)"
      />
      <PieceButton
        pbi={5}
        func={() => rotateRd(character, rotation, setCharacter, setRotation)}
        transform="translateX(38px) translateY(193px) rotateX(-45deg) rotateY(-45deg) rotateZ(180deg)"
      />
      {/* ここから */}
      <PieceButton
        pbi={6}
        func={() => rotateD(character, rotation, setCharacter, setRotation)}
        transform="translateX(187px) translateY(74px) rotateX(-45deg) rotateY(45deg) rotateZ(90deg)"
      />
      <PieceButton
        pbi={7}
        func={() => rotateDd(character, rotation, setCharacter, setRotation)}
        transform="translateX(-65px) translateY(74px) rotateX(-45deg) rotateY(-45deg) rotateZ(-90deg)"
      />
      <PieceButton
        pbi={8}
        func={() => rotateB(character, rotation, setCharacter, setRotation)}
        transform="translateX(22px) translateY(-79px) rotateX(45deg) rotateY(0deg) rotateZ(-45deg)"
      />
      <PieceButton
        pbi={9}
        func={() => rotateBd(character, rotation, setCharacter, setRotation)}
        transform="translateX(150px) translateY(145px) rotateX(-45deg) rotateY(45deg) rotateZ(180deg)"
      />
      <PieceButton
        pbi={10}
        func={() => rotateL(character, rotation, setCharacter, setRotation)}
        transform="translateX(-30px) translateY(146px) rotateX(-45deg) rotateY(-45deg) rotateZ(180deg)"
      />
      <PieceButton
        pbi={11}
        func={() => rotateLd(character, rotation, setCharacter, setRotation)}
        transform="translateX(102px) translateY(-77px) rotateX(45deg) rotateY(0deg) rotateZ(45deg)"
      />
      <PieceButton
        pbi={12}
        func={() => rotateM(character, rotation, setCharacter, setRotation)}
        transform="translateX(4px) translateY(170px) rotateX(-45deg) rotateY(-45deg) rotateZ(180deg)"
      />
      <PieceButton
        pbi={13}
        func={() => rotateMd(character, rotation, setCharacter, setRotation)}
        transform="translateX(137px) translateY(-53px) rotateX(45deg) rotateY(0deg) rotateZ(45deg)"
      />
      <PieceButton
        pbi={14}
        func={() => rotateE(character, rotation, setCharacter, setRotation)}
        transform="translateX(188px) translateY(41px) rotateX(-45deg) rotateY(45deg) rotateZ(90deg)"
      />
      <PieceButton
        pbi={15}
        func={() => rotateEd(character, rotation, setCharacter, setRotation)}
        transform="translateX(-66px) translateY(41px) rotateX(-45deg) rotateY(-45deg) rotateZ(-90deg)"
      />
      <PieceButton
        pbi={16}
        func={() => rotateS(character, rotation, setCharacter, setRotation)}
        transform="translateX(117px) translateY(169px) rotateX(-45deg) rotateY(45deg) rotateZ(180deg)"
      />
      <PieceButton
        pbi={17}
        func={() => rotateSd(character, rotation, setCharacter, setRotation)}
        transform="translateX(-12px) translateY(-55px) rotateX(45deg) rotateY(0deg) rotateZ(-45deg)"
      />
      <UIButton
        ubi={0}
        text="シャッフル"
        func={() => shuffle(character, rotation, setCharacter, setRotation)}
        transform="translateX(-35px) translateY(300px)"
      />
      <UIButton
        ubi={1}
        text="リセット"
        func={() => reset(setCharacter, setRotation)}
        transform="translateX(85px) translateY(300px)"
      />
    </div>
  )
}

const Surface = (chars: string[], rots: string[], si: number) => {
  const style = { transform: "" }
  if (si === 0) {
    style.transform =
      "translateY(-63px) rotateX(45deg) rotateY(0deg) rotateZ(45deg)"
  } else if (si === 1) {
    style.transform =
      "translateX(-53px) translateY(27px) rotateX(-45deg) rotateY(-45deg) rotateZ(0deg)"
  } else if (si === 3) {
    style.transform =
      "translateX(53px) translateY(27px) rotateX(-45deg) rotateY(45deg) rotateZ(0deg)"
  } else {
    return undefined
  }
  return (
    <div key={`si_${si}`} className={styles.surface} style={style}>
      {zip(chars, rots).map(([char, rot], pi) => Piece(char, rot, si, pi))}
    </div>
  )
}

const Piece = (char: string, rot: string, si: number, pi: number) => {
  const style = { transform: "", color: "" }
  style.transform = `rotateZ(${rot2deg(rot)}deg)`
  style.color = char2col(char)
  return (
    <div key={`si_${si}_pi_${pi}`} className={styles.piece} style={style}>
      <span>{char}</span>
    </div>
  )
}

const SurfaceButton = ({
  sbi,
  transform,
  func,
}: {
  sbi: number
  transform: string
  func: () => void
}) => {
  const style = { transform: transform }
  return (
    <button
      key={`sbi_${sbi}`}
      className={styles.surfaceButton}
      onClick={func}
      style={style}
    >
      <span>↑</span>
    </button>
  )
}

const PieceButton = ({
  pbi,
  transform,
  func,
}: {
  pbi: number
  transform: string
  func: () => void
}) => {
  const style = { transform: transform }
  return (
    <button
      key={`pbi_${pbi}`}
      className={styles.pieceButton}
      onClick={func}
      style={style}
    >
      <span>↑</span>
    </button>
  )
}

const UIButton = ({
  ubi,
  text,
  transform,
  func,
}: {
  ubi: number
  text: string
  transform: string
  func: () => void
}) => {
  const style = { transform: transform }
  return (
    <button
      key={`ubi_${ubi}`}
      className={styles.uiButton}
      onClick={func}
      style={style}
    >
      <span>{text}</span>
    </button>
  )
}

export default Cube
