import React, { useRef, useEffect, forwardRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { Color } from 'three'

/**
 * Heart
 * @param {string}  color   – any CSS/hex color (default #ff4d4d)
 * @param {boolean} autoPlay – play first clip on mount (default true)
 *
 * You can grab the `actions` ref a parent wants by using:
 *   const heartRef = useRef()
 *   ...
 *   <Heart ref={heartRef} />
 *   // heartRef.current.actions now holds all clips
 */
export const Heart = forwardRef(
  ({ color = '#ff5154', autoPlay = true, ...props }, fwdRef) => {
    const group = useRef()
    const { nodes, materials, animations } = useGLTF('/models/heart/model.glb')
    const { actions, names } = useAnimations(animations, group)

    // forward actions & group to parent if they care
    React.useImperativeHandle(fwdRef, () => ({ actions, group }), [actions])

    // tint once the material is ready
    useEffect(() => {
      if (materials.heart) materials.heart.color = new Color(color)
    }, [color, materials])

    // kick off the first clip (or any you want)
    useEffect(() => {
      if (!autoPlay || !names.length) return
      const action = actions[names[0]]
      action.reset().play()
      return () => action.stop()
    }, [autoPlay, actions, names])

    return (
      <group ref={group} {...props} dispose={null}>
        <group name="Sketchfab_Scene">
          <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
            <group name="Root">
              <group name="heart" rotation={[Math.PI / 2, 0, 0]}>
                <mesh
                  name="heart_0"
                  geometry={nodes.heart_0.geometry}
                  material={materials.heart}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    )
  }
)

useGLTF.preload('/models/heart/model.glb')
