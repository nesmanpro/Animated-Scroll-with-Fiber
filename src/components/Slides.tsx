"use client"

import { ImageProps, Image as DImage, useScroll } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { useRef } from "react"
import { Group, MathUtils } from "three"

function DreiImage(props: ImageProps) {
  const ref = useRef(null)
  const group = useRef<Group>(null)
  const data = useScroll()

  useFrame((state, delta) => {
    if (group.current && ref.current && data) {
      group.current.position.z = MathUtils.damp(
        group.current.position.z,
        Math.max(0, data.delta * 100),
        4,
        delta
      )

      //   @ts-ignore
      ref.current.material.grayscale = MathUtils.damp(
        // @ts-ignore
        ref.current.material.grayscale,
        Math.max(0, 1 - data.delta * 1000),
        4,
        delta
      )
    }
  })
  return (
    <group ref={group}>
      <DImage ref={ref} {...props} />
    </group>
  )
}

function Slide({ urls = [""], ...props }) {
  const ref = useRef(null);
  const { width } = useThree((state) => state.viewport);
  const w = width < 10 ? 1.5 / 3 : 0.5 / 2;
  const imgH = width < 10 ? 5 : 4;
  const imgw = width < 10 ? 4 : 3;

  return (
    <group ref={ref} {...props}>
      <DreiImage position={[-width * w, 0, 0]} scale={[imgw, imgH]} url={urls[0]} />
      <DreiImage position={[0, 0, 0]} url={urls[1]} scale={[imgH, imgw]} />
      <DreiImage position={[width * w, 0, 1]} url={urls[2]} scale={[imgw, imgw]} />
    </group>
  )
}

export default function Slides() {
  const { width } = useThree((state) => state.viewport)
  return (
    <>
      <Slide
        position={[0, 0, 0]}
        urls={[
          'https://images.pexels.com/photos/10507540/pexels-photo-10507540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          'https://images.pexels.com/photos/21945944/pexels-photo-21945944.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          'https://images.pexels.com/photos/20802886/pexels-photo-20802886/free-photo-of-rojo-amor-verano-sol.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        ]}
      />
      <Slide
        position={[width * 1, 0, 0]}
        urls={[
          'https://images.pexels.com/photos/21628465/pexels-photo-21628465/free-photo-of-puerto-oporto-barco-muelle.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
                'https://images.pexels.com/photos/10622551/pexels-photo-10622551.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
                'https://images.pexels.com/photos/20508970/pexels-photo-20508970/free-photo-of-hombre-pared-muro-sentado.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'
        ]}
      />
      <Slide
        position={[width * 2, 0, 0]}
        urls={[
          'https://images.pexels.com/photos/15079520/pexels-photo-15079520/free-photo-of-nana.png?auto=compress&cs=tinysrgb&w=600&lazy=load',
          'https://images.pexels.com/photos/20788970/pexels-photo-20788970/free-photo-of-ligero-gente-mujer-nina.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
          'https://images.pexels.com/photos/11114529/pexels-photo-11114529.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
        ]}
      />
    </>
  )
}