/* eslint-disable @typescript-eslint/ban-ts-ignore */
import * as CANNON from 'cannon'
import * as THREE from 'three'
import React, { useRef, useEffect, useState, useContext } from 'react'
import { Canvas, useFrame, addEffect, useThree } from 'react-three-fiber'

// Cannon-world context provider
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const context = React.createContext()

const Physics: React.FC = ({ children }) => {
  // Set up physics
  const [world] = useState(() => new CANNON.World())
  useEffect(() => {
    world.broadphase = new CANNON.NaiveBroadphase()
    world.solver.iterations = 10
    world.gravity.set(0, -25, 0)
  }, [world])
  // Run world stepper every frame
  useFrame(() => world.step(1 / 60))
  // Distribute world via context
  return <context.Provider value={world}>{children}</context.Provider>
}

export default Physics

// Custom hook to maintain a world physics body
// @ts-ignore
export function useCannon({ ...props }, fn, deps = []) {
  const ref = useRef()
  // Get cannon world object
  const world: any = useContext(context)
  // Instanciate a physics body
  const [body] = useState(() => new CANNON.Body(props))
  useEffect(() => {
    // Call function so the user can add shapes
    fn(body)
    // Add body to world on mount
    world.addBody(body)
    // Remove body on unmount
    return () => world.removeBody(body)
  }, deps)
  useFrame(() => {
    if (ref.current) {
      // Transport cannon physics into the referenced threejs object
      // @ts-ignore
      ref.current.position.copy(body.position)
      // @ts-ignore
      ref.current.quaternion.copy(body.quaternion)
    }
  })
  return ref
}
