import React, { useMemo } from 'react'
import { a, useSpring } from 'react-spring/three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'
import { useLoader } from 'react-three-fiber'
import speechBubbleSvg from '../../../../assets/svgs/bubble.svg'
import { radians } from '../../../../utils/angles'

const scale = 0.003

const ChatBubbleShape: React.FC = React.memo(() => {
  const svg = useLoader(SVGLoader, speechBubbleSvg)

  const preppedShape = svg.paths.flatMap((path, index) => path.toShapes(true))

  if (!svg) {
    return null
  }

  console.log('svg', svg, preppedShape)

  return (
    <a.mesh scale={[scale, scale, scale]} position={[0.1, 0.18, -0.25]} rotation={[0, radians(90), radians(180)]}>
      <a.meshPhongMaterial attach="material" color="#FFFFFF" opacity={1} depthWrite={false} transparent />
      <shapeBufferGeometry attach="geometry" args={[preppedShape]} />
    </a.mesh>
  )
})

export default ChatBubbleShape
