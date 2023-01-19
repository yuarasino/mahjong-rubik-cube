import { useState } from "react"

import { getResetCube, getAngle, getColor, getRotateCubeX, getRotateCubeXp, getRotateCubeY, getRotateCubeYp, getRotateCubeZp, getRotateCubeZ, getRotateCubeU, getRotateCubeUp, getRotateCubeF, getRotateCubeFp } from "@/lib/cube"
import styles from "@/styles/Cube.module.css"

const Cube = () => {
  const [cube, setCube] = useState(getResetCube())

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

  const rotateCubeU = () => {
    setCube(getRotateCubeU(cube))
  }
  const rotateCubeUp = () => {
    setCube(getRotateCubeUp(cube))
  }
  const rotateCubeF = () => {
    setCube(getRotateCubeF(cube))
  }
  const rotateCubeFp = () => {
    setCube(getRotateCubeFp(cube))
  }

  return (
    <div className={styles.cube}>
      {cube.map((face, index) => (
        <Face key={index} face={face} index={index} />
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
        key={"F"}
        transform="rotateY(90deg) rotateZ(180deg) translateX(60px) translateY(-120px)"
        onClick={rotateCubeF}
      />
      <RotationButton
        key={"Fp"}
        transform="rotateX(90deg) rotateZ(-90deg) translateX(-60px) translateY(-120px)"
        onClick={rotateCubeFp}
      />
    </div>
  )
}

const Face = ({ face, index }: { face: string[], index: number }) => {
  const style = {
    transform: "translateX(-50%) translateY(-50%) rotateX(-45deg) rotateY(-45deg)"
  }
  if (index === 0) {
    style.transform += "rotateX(90deg)"
  }
  else if (index === 1) {
    style.transform += ""
  }
  else if (index === 3) {
    style.transform += "rotateY(90deg)"
  }
  else {
    return <></>
  }
  return (
    <div className={styles.face} style={style}>
      {face.map((piece, index) => (
        <Piece key={index} piece={piece} />
      ))}
    </div>
  )
}

const Piece = ({ piece }: { piece: string }) => {
  const character = piece[0]
  const angle = getAngle(piece)
  const color = getColor(piece)
  const style = {
    color: color,
    transform: `rotateZ(${angle}deg)`,
  }
  return (
    <div className={styles.piece} style={style}>
      {character}
    </div>
  )
}

const SwitchButton = ({ transform, onClick }: { transform: string, onClick: () => void }) => {
  const style = {
    transform: "translateX(-50%) translateY(-50%) rotateX(-45deg) rotateY(-45deg)"
  }
  style.transform += transform
  return (
    <button className={styles.switch} style={style} onClick={onClick}>
      {"↑"}
    </button>
  )
}

const RotationButton = ({ transform, onClick }: { transform: string, onClick: () => void }) => {
  const style = {
    transform: "translateX(-50%) translateY(-50%) rotateX(-45deg) rotateY(-45deg)"
  }
  style.transform += transform
  return (
    <button className={styles.rotation} style={style} onClick={onClick}>
      {"↑"}
    </button>
  )
}

export default Cube
